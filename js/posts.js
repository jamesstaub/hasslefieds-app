"use strict";

var apiURL = "http://localhost:3000";

var displayposts = (function(){
  var getPosts = function(){
    $.get( apiURL+"/posts").done(function(response){
      _renderPosts(response);
    });
  };
  var _renderPosts = function(displayposts){
    // your code starts here
    var templatingFunction = Handlebars.compile($('#display-posts').html());
    var result = templatingFunction({
      posts: displayposts
    });
    $('#posts-container').html(result);
  };
  return {
    indexPosts: getPosts
  };

})();


$(document).ready(function(){
   // invoke the above IFFE on pageload, to get all the posts and render in handlebars
  displayposts.indexPosts();

//submit a comment on a post
  $('body').on('click', '.submit-reply', function(){
    var thisPostID = $(this).data('post-id');
    var thisReplyVal = $('input.input-reply[data-post-id='+thisPostID+' ]').val();

    console.log();
    $.post(apiURL+"/replies",
    {
      reply: {
        body: thisReplyVal,
        post_id: thisPostID,
        user_id:""
      }
    }).done(function(res){
      console.log(res);
    });


  });


});

