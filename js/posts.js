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
    renderHandlebars: getResource
  };
})();







$(document).ready(function(){
  // set the name of the resource we are iterating over in handlebars
  displayPosts.setResourceName("posts");
  // invoke the above IFFE on pageload, to get all the posts and render in handlebars
  displayPosts.renderHandlebars();




//submit a comment on a post
  $('body').on('click', '.submit-reply', function(){
    var thisPostID = $(this).data('post-id');
    var thisReplyVal = $('input.input-reply[data-post-id='+thisPostID+' ]').val();

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


});

