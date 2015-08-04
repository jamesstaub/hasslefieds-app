"use strict";

var apiURL = "https://secret-bastion-8487.herokuapp.com/";


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
// resource is unclear var name
var displayPosts = (function(resource){
  var setResourceName = function(resName){
    resource = resName;
  }
  var getResource = function(){
    $.get( apiURL+"/"+resource).done(function(response){
      _renderResourceEach(response);
      $('.loading img').hide("slow");
    });

  };
  var _renderResourceEach = function(renderedResource){
    var templatingFunction = Handlebars.compile($('#display-'+resource).html());
    var result = templatingFunction({
      resource: renderedResource
    });
    $('#'+resource+'-container').html(result);

// DOM updates after handlebars renders
	 authenticateDOM.allowCreateComment();
    authenticateDOM.allowDeleteContent();

    //FIX: this does not belong here!
    Date.prototype.addDays = function(days){
     var dat = new Date(this.valueOf());
     dat.setDate(dat.getDate() + days);
     return dat;
   }
   var today = new Date();
   var defaultEnd = today.addDays(20);

    $('#start_date').datepicker('setDate', today);
    $('#end_date').datepicker('setDate', defaultEnd);
  };

  return {
    setResourceName: setResourceName,
    renderHandlebars: getResource
  };
})();

 var authenticateDOM = (function(){
    var updateNavBar = function(){

      if( _userloggedIn() ){
        $('.user-identity').html(' ' + localStorage.getItem('username'));
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
      	if(!$('#top').has('#create-post-form')){$('#create-post-form').remove();}
        $('#top').prepend(
        '<div id="create-post-form"> \
            <form id="create-post-form"> \
            <h2>new post:</h2>\
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
                  <div class="col-md-6"> \
                    <label for="input-category">Category</label> \
                    <select id="category-select" class="form-control"> \
                    </select> \
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
        _generateCategoryList();

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

				}else{
					$(this).hide();
				}
			});
    };

    var _userloggedIn = function(){
       var me = localStorage.getItem('username');
       // 4 hours later I learned that sometimes it's null and sometimes it's "null"
       return me !== "null" && me !== null;
    };


    var _generateCategoryList = function(){
      $.get( apiURL+"/categories").done(function(response){
        response.forEach(function(e){
          $('#category-select').append('<option value='+e.id+'>'+e.name+'</option>');
        });


      }).fail(function(res){
        console.log(res);
        console.log("failed to get categories")
      });

    }


    return {
      updateNavBar: updateNavBar,
      allowCreatePost: allowCreatePost,
      allowCreateComment: allowCreateComment,
      allowDeleteContent: allowDeleteContent
    };
  })();




var validateInputs = (function(){
	var post = function(){
		$('.validation-alert').remove();
		// form input [id's, names for alert]
		var inputs = [['#create-post-title', 'Title'], ['#start_date', 'Start Date'], ['#end_date', 'End Date'], ['#create-post-body', 'Post Body']];
		var validCount = 0;
		for (var i=0; i<inputs.length; i++){
			if(!$(inputs[i][0]+'').val()){
				_alert(inputs[i]);
			}else{
				validCount ++;
			}
		}
		if(validCount === (inputs.length)){
			return true;
		}else{
			return false;
		}
	};
	var reply = function(){
		$('.validation-alert').remove();
		var input = ['.input-reply', 'Reply'];
    console.log(!$(input[0]).val())
		if(!$(input[0]).val()){
			_alert(input);
			return false;
		}else{
			return true;
		}
	};

	var login = function(){
		// to do
	};

	var signup = function(){
		// to do
	};

	var _alert = function(e){
		var thiselement = e[0]
		$(thiselement).after('<div class="validation-alert alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error: </span>'+e[1]+' is empty</div>');
	}


	return {
		post: post,
		reply: reply,
		login: login,
		signup: signup
	}

})();
