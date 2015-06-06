


$(document).ready(function() {


// set the name of the resource we are iterating over in handlebars
displayPosts.setResourceName("posts");
// invoke the above IFFE on pageload, to get all the posts and render in handlebars
displayPosts.renderHandlebars();

var me = localStorage.getItem('username');


// $('.me').hide();
// $('.login-link').hide();

if(me !== "null"){
  $('.user-identity').html(localStorage.getItem('username'));
  $('.me').show();
  $('.login-link').hide();

}else{
  console.log("no one logged in")
  $('.me').hide();
  $('login-link').show();
}

  $('#set-post-dates .input-daterange').datepicker({
    startDate: "today",
    todayHighlight: true
  });

  // GET list of users
      // $.ajax({
      //   type: 'GET',
      //   dataType: "json",
      //   url: apiURL+"/users"

      // }).done(function(response){
      //   response.forEach(function(e){
      //     $('#user-list').append(e.full_name)
      //   });
      // }).fail(function(){
      //   console.log("fail");
      // });

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
          console.log(data);
          localStorage.setItem('token', data['token']);
          localStorage.setItem('username', data['username']);
          console.log(data);
          $('.signup-link').hide();
          $('.login-link').hide();
          $('.me').show();
          $('#login-alert').html('<div id="login-alert" class="alert alert-success role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> you\'re now logged in</div>');
          $('.user-identity').html(data['username'])
          setTimeout(function(){
            $('#login-modal').modal('hide');
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

    $('.logout-link').on('click', function(){
      $('.me').hide();
      $('.user-identity').html('');
      $('.login-link').show();
      $('.signup-link').show();


      // $('login-link').show();
      localStorage.setItem('token', null);
      localStorage.setItem('username', null);
      console.log(localStorage.setItem('username', null));
  });


    //   $.ajax({
    //     type:'GET',
    //     url:resultsURL
    //   }).done(function(response){
    //     $('#ad-contents').html('');
    //     console.log(response);
    //     response.forEach(function(ad){
    //       var addHTML = "<p><b> " + ad.title + " </b> " + ad.body + "</b>" + ad.phonenumber + "</b>" +  " " +ad.email + " " +ad.category + " </p>";
    //       $('#ad-contents').append(addHTML);
    //     });
    //   }).fail(function(){
    //     $('#ad-contents').append("error errror i say it's an errrrrrr");
    //   });
    // });


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
