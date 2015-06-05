$(document).ready(function() {

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


  // POST create a new postpost
  $('#new-post-submit').on('click', function(){
    $.post( apiURL+"/posts",
    {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val(),
        start_date: $('#start_date').val(),
        end_date: $('#end_date').val()
      }
    }).done(function(res){
      // clear the fields
      $('#create-post-form input, #create-post-form textarea').val('');
        displayPosts.setResourceName("posts");
        displayPosts.renderHandlebars();
    }).fail(function(){
        console.log("fail");
    });
  });


  // POST create new user
  $('#signup-submit').on('click', function(){
    $.ajax({
      url: apiURL+"/register",
      type: 'POST',
      dataType: 'json',
      data: {credentials: {
          full_name: $('#signup-fullname').val(),
          username: $('#signup-username').val(),
          email: $('#signup-email').val(),
          password: $('#signup-password').val()
        }}
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })

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
          console.log(textStatus);

          $('#login-alert').html('<div id="login-alert" class="alert alert-success role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span><span class="sr-only">Error:</span> you\'re now logged in</div>');
          $('.me').prepend('<a href="#" class="user-identity dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">'+data['username']+'<span class="caret"></span></a>')
            setTimeout(function(){
              $('#login-modal').modal('hide');
           }, 500);
            localStorage.setItem('token', data['token']);


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





