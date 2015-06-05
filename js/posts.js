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
      console.log(response);
      _renderResourceEach(response);
    });
  };
  var _renderResourceEach = function(renderedResource){

    var templatingFunction = Handlebars.compile($('#display-'+resource).html());
    var result = templatingFunction({
      resource: renderedResource
    });
    $('#'+resource+'-container').html(result);
  };
  return {
    setResourceName: setResourceName,
    renderHandlebars: getResource
  };
})();





$(document).ready(function(){
  // set the name of the resource we are iterating over in handlebars
  displayPosts.setResourceName("posts");
  // invoke the above IFFE on pageload, to get all the posts and render in handlebars
  displayPosts.renderHandlebars();



  // POST create a new post
  $('#new-post-submit').on('click', function(){

    $.ajax({
      url: apiURL+"/posts",
      type: 'POST',
      data: {post: {
            title: $('#post-title').val(),
            body: $('#post-body').val(),
            start_date: $('#start_date').val(),
            end_date: $('#end_date').val()
          }},
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') }
    }).done(function(res){
      // clear the fields
      $('#create-post-form input, #create-post-form textarea').val('');
        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars();
    }).fail(function(){
        console.log("fail");
    });
  });



//submit a comment on a post
  $('body').on('click', '.submit-reply', function(){
    var thisPostID = $(this).data('post-id');
    var thisReplyVal = $('textarea.input-reply[data-post-id='+thisPostID+' ]').val();

// POST create a new reply
    $.post(apiURL+"/replies",
    {
      reply: {
        body: thisReplyVal,
        post_id: thisPostID
        // user_id:
      }
    }).done(function(res){
      console.log("posted succesfully");
      // then update the list of replies

        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars();

    }).fail(function(res){
      console.log("failed to post")
    })
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
        displayPosts.renderHandlebars();

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
      type: 'DELETE'
    }).done(function(response){
        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars();

    }).fail(function(){
      console.log("could not complete delete request");
    });
  });




});

