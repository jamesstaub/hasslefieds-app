"use strict";

var apiURL = "http://localhost:3000";

Handlebars.registerHelper('each-reverse', function(context, options) {
    var ret = '';
    if (context && context.length > 0) {
        for (var i = context.length - 1; i >= 0; i--) {
            ret += options.fn(context[i]);
        }
    } else{
        ret = options.inverse(this);
    }
    return ret;
});



var displayPosts = (function(resource){
  var setResourceName = function(resName){
    resource = resName;
  }
  var getResource = function(){
    $.get( apiURL+"/"+resource).done(function(response){
      _renderResourceEach(response);
    });

  };
  var _renderResourceEach = function(renderedResource){
    var templatingFunction = Handlebars.compile($('#display-'+resource).html());
    var result = templatingFunction({
      resource: renderedResource
    });
    $('#'+resource+'-container').html(result);


	authenticateDOM.allowCreateComment();
    authenticateDOM.allowDeleteContent();

  };
  return {
    setResourceName: setResourceName,
    renderHandlebars: getResource,
  };
})();

 var authenticateDOM = (function(){
    var updateNavBar = function(){
      if( _userloggedIn() ){
        $('.user-identity').html(' ' +localStorage.getItem('username'));
        $('.me').show();
        $('.login-link').hide();
        $('.signup-link').hide();
      }else{
        $('.me').hide();
        $('.login-link').show();
        $('.signup-link').show();
      }
    }
    var allowCreatePost = function(){
      if(_userloggedIn()){
        $('#top').prepend(
        '<div id="create-post-form" class="col-md-6"> \
          <h1>create post</h1> \
            <form id="create-post-form"> \
              <div class="form-group"> \
                <label for="create-post-title">Title</label> \
                <input type="text" id="create-post-title" class="input-sm form-control"> \
                <div class="row"> \
                  <div class="col-md-6">\
                    <div id="set-post-dates"> \
                      <label for="datepicker">Dates Visible</label> \
                      <div class="input-daterange input-group" id="datepicker"> \
                        <input type="text" id="start_date" class="input-sm form-control" name="start" /> \
                        <span class="input-group-addon">to</span> \
                        <input type="text" id="end_date" class="input-sm form-control" name="end" /> \
                      </div> \
                    </div> \
                  </div> \
                </div> \
              </div> \
              <div class="form-group"> \
                <label for="create-post-body">Body</label> \
                <textarea id="create-post-body" type="text" class="form-control"  placeholder=""></textarea> \
              </div> \
                <div id="new-post-submit" class="btn btn-default">Submit</div> \
            </form> \
        </div>'
        );
      } else{
        $('#create-post-form').remove()
      }

      // config date picker
      $('#set-post-dates .input-daterange').datepicker({
        startDate: "today",
        todayHighlight: true
      });
    };

    var allowCreateComment = function(){
      // only show the new comment form if user is logged in!
      if(_userloggedIn()){
        $('.post-replies').each(function(){
          var thisPostID = $(this).data('post-id');
          // $('.post-reply-form').remove();
          $(this).prepend(
            '<div class="post-reply-form"> \
              <label>Leave a reply \
                <textarea data-post-id="'+thisPostID+'" class="input-reply form-control" type="text" placeholder="your reply here"></textarea> \
              </label> \
              <button data-post-id="'+thisPostID+'" type="submit" class="submit-reply btn btn-default">submit</button> \
            </div>'
          );
        });
      }
    };

    var allowDeleteContent = function(){
    	// hides/shows delete buttons on given post/reply if the logged in user matches the token attached to that post.
			var myid = localStorage.getItem('uid');
			myid = parseInt(myid)
			$('.delete-post, .delete-reply').each(function(){
				var uid = $(this).data('user-id');
				uid = parseInt(uid);
				if(uid === myid){
					$(this).show();
					console.log()
				}else{
					console.log("should hide now")
					$(this).hide();
				}
			});

    };

    var _userloggedIn = function(){
       var me = localStorage.getItem('username');
       return me !== "null";
    };
    return {
      updateNavBar: updateNavBar,
      allowCreatePost: allowCreatePost,
      allowCreateComment: allowCreateComment,
      allowDeleteContent: allowDeleteContent
    };
  })();


$(document).ready(function(){

  // POST create a new post
  $('body').on('click','#new-post-submit', function(){ //bubble up here
    $.ajax({
      url: apiURL+"/posts",
      type: 'POST',
      data: {post: {
            title: $('#create-post-title').val(),
            body: $('#create-post-body').val(),
            start_date: $('#start_date').val(),
            end_date: $('#end_date').val()
          }},
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') }
    }).done(function(res){
      // clear the fields
      $('#create-post-form input, #create-post-form textarea').val('');
        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars(authenticateDOM.allowCreateComment);
    }).fail(function(){
        console.log("failed to create post");
    });
  });



// POST submit a reply on a post
  $('body').on('click', '.submit-reply', function(){
    var thisPostID = $(this).data('post-id');
    var thisReplyVal = $('textarea.input-reply[data-post-id='+thisPostID+' ]').val();
     $.ajax({
        url: apiURL+"/replies",
        type: 'POST',
        data: {
          reply: {
          body: thisReplyVal,
          post_id: thisPostID
        }},
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') }
    }).done(function(res){
      console.log("set-post-dates succesfully");
      // then update the list of posts and replies
        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars(authenticateDOM.allowCreateComment);
    }).fail(function(res){
      console.log("failed to post");
    });
  });


  // delete a post!
  $('body').on('click', '.delete-post', function(){
    var thisPostID = $(this).data('post-id');
    $.ajax({
      dataType: "json",
      url: apiURL+"/posts/"+thisPostID,
      type: 'DELETE',
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') }
    }).done(function(response){
        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars(authenticateDOM.allowCreateComment);

    }).fail(function(){
      console.log("could not complete delete request");
    });
  });


  // delete a comment!
  $('body').on('click', '.delete-reply', function(){
    var thisReplyID = $(this).data('reply-id');
    $.ajax({
      dataType: "json",
      url: apiURL+"/replies/"+thisReplyID,
      type: 'DELETE',
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') }
    }).done(function(response){
        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars();

    }).fail(function(){
      console.log("could not complete delete request");
    });
  });

});

