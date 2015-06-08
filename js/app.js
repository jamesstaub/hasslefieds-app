


$(document).ready(function() {


  // set the name of the resource we are iterating over in handlebars
  displayPosts.setResourceName("posts");
  // invoke the above IFFE on pageload, to get all the posts and render in handlebars
  // pass the allowCreateComent method as a callback, to ensure comment template is added after the posts get rendered
  authenticateDOM.updateNavBar();
  authenticateDOM.allowCreatePost();
  // displayPosts.renderHandlebars(authenticateDOM.allowCreateComment);
  displayPosts.renderHandlebars();




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

// var registration = { credentials:
//
//       }
//       // registration = JSON.stringify(registration);

//     $.post(apiURL+"/register",registration, function(){console.log('success');}, 'json').done(function(res){
//       console.log(res.confirmation);
//       console.log("done OK");
//     }).fail(function(){
//         console.log("fail");
//     });



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
          console.log(data);
          $('.signup-link').hide();
          $('.login-link').hide();
          $('.me').show();
          $('#login-alert').html('<div id="login-alert" class="alert alert-success role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> you\'re now logged in</div>');
          $('.user-identity').html(data['username'])
          setTimeout(function(){
            $('#login-modal').modal('hide');
            authenticateDOM.allowCreatePost();
            displayPosts.renderHandlebars(authenticateDOM.allowCreateComment);

          }, 500);


            // eventually write a functionelsewhere that handles all the DOM stuff that happens when a user logs in/out, and just call that here

          }else{
            console.log(textStatus)
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
      displayPosts.renderHandlebars(authenticateDOM.allowCreateComment);

  });
});



// create a form data object
// this will replace existing submit post request
// add the header to this request
// $('#submitpost').on('click', function(e){
//   // first array index is DOM object which has .files method. targets the first file
//     var file = $('#file')[0].files[0];
//     var finished = new FormData();
//     finished.append('image', file);
//     // column name | column value
//     finished.append('title', 'title');
//     finished.append('body', 'title');
//     // etc for post properties


//     $.ajax({
//       url: 'http://localhost:3000/posts',
//       data: finished,
//       type: 'POST',
//       header: //header stuff here
//       // this might fuck with the header
//       contentType: false,
//       cache: false,
//       processData: false
//     });
//   });
