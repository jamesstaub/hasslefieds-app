"use strict";

var apiURL = "http://localhost:3000";

// var displayPosts = (function(){
//   var getPosts = function(){
//     $.get( apiURL+"/posts").done(function(response){
//       _renderPosts(response);
//     });
//   };
//   var _renderPosts = function(displayPosts){
//     // your code starts here
//     var templatingFunction = Handlebars.compile($('#display-posts').html());
//     var result = templatingFunction({
//       posts: displayPosts
//     });
//     console.log(displayPosts)
//     $('#posts-container').html(result);
//   };
//   return {
//     indexPosts: getPosts
//   };
// })();

// use the plural resource when passing in the argument
// the handlebars script tag in the html must be named <script id="resource-container">
// currently only works for nested resources like post: [{key: val, key, val}, {key: val, key, val}]
var displayPosts = (function(resource){
  console.log(resource + ' is the name before setter');
  var setResourceName = function(resName){
    resource = resName;
    console.log(resource + ' is the name after setter');
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
  };
  return {
    setResourceName: setResourceName,
    indexResource: getResource
  };
})();







$(document).ready(function(){
  // set the name of the resource we are iterating over
  displayPosts.setResourceName("posts");
  // invoke the above IFFE on pageload, to get all the posts and render in handlebars
  displayPosts.indexResource();




//submit a comment on a post
  $('body').on('click', '.submit-reply', function(){
    var thisPostID = $(this).data('post-id');
    var thisReplyVal = $('input.input-reply[data-post-id='+thisPostID+' ]').val();

// POST create a new reply
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

