$(document).ready(function(){

  // POST create a new post
  $('body').on('click','#new-post-submit', function(){
    if(validateInputs.post()){
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
          displayPosts.renderHandlebars();
      }).fail(function(){
          console.log("failed to create post");
      });
    }
  });

// POST submit a reply on a post
  $('body').on('click', '.submit-reply', function(){
    // if (validateInputs.reply()) { Disabled comment validation, pending bug fix.
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
          displayPosts.renderHandlebars();
      }).fail(function(res){
        console.log("failed to post");
      });
    // };
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
      type: 'DELETE',
      headers: { Authorization: 'Token token=' + localStorage.getItem('token') }
    }).done(function(response){
        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars();
    }).fail(function(){
      console.log("could not complete delete request");
    });
  });


    // POST create new user
  $('#signup-submit').on('click', function(){
    $.ajax({
      url: apiURL+"/register",
      type: 'POST',
      //
      dataType: 'text',
      data: {credentials: {
        full_name: $('#signup-fullname').val(),
        username: $('#signup-username').val(),
        email: $('#signup-email').val(),
        password: $('#signup-password').val()
      }}
    })
    .done(function(data, textStatus) {
      if(textStatus === 'success'){
          // Successful signup!
          $('#signup-alert').html('<div id="signup-alert" class="alert alert-success role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span>thanks for signing up!</div>');
          setTimeout(function(){
            $('#signup-modal').modal('hide');
          }, 500);
        }else{
          console.log(textStatus)
          $('#signup-form').html('<div id="signup-alert" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> signup failed</div>');
        }
      }).fail(function(jqxhr, textStatus, errorThrown){
        $('#signup-alert').html('<div id="signup-alert" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> signup failed</div>');
        console.log(textStatus);
        console.log(errorThrown);
      });
    });


    // POST login
    $('#login-submit').on('click', function(){
      $.ajax(apiURL+'/login',{
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
          credentials: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
          }
        }),
        dataType: "json",
        method: "POST"
      }).done(function(data, textStatus) {

        if(textStatus === 'success'){
          // Successful login!
          localStorage.setItem('token', data['token']);
          localStorage.setItem('username', data['username']);
          localStorage.setItem('uid', data['uid']);
          $('.signup-link').hide();
          $('.login-link').hide();
          $('.me').show();
          $('#login-alert').html('<div id="login-alert" class="alert alert-success role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> you\'re now logged in</div>');
          $('.user-identity').html(data['username'])
          setTimeout(function(){
            $('#login-modal').modal('hide');
            authenticateDOM.allowCreatePost();
            displayPosts.renderHandlebars();
          }, 500);

          }else{

            $('#login-form').html('<div id="login-alert" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> login failed</div>');
          }

        }).fail(function(jqxhr, textStatus, errorThrown){
          $('#login-alert').html('<div id="login-alert" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> login failed</div>');
          console.log(textStatus);
          console.log(errorThrown);
        });
      });
    // POST logout
    $('.logout-link').on('click', function(){
      localStorage.setItem('token', null);
      localStorage.setItem('username', null);
      localStorage.setItem('uid', null);
      authenticateDOM.updateNavBar();
      authenticateDOM.allowCreatePost();
      displayPosts.renderHandlebars();
  });




});
