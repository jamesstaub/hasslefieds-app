


$(document).ready(function() {


  // set the name of the resource we are iterating over in handlebars
  displayPosts.setResourceName("posts");
  // invoke the above IFFE on pageload, to get all the posts and render in handlebars
  // pass the allowCreateComent method as a callback, to ensure comment template is added after the posts get rendered
  authenticateDOM.updateNavBar();
  authenticateDOM.allowCreatePost();
  // displayPosts.renderHandlebars(authenticateDOM.allowCreateComment);
  displayPosts.renderHandlebars();

});



