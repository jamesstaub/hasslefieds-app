$(document).ready(function() {

  $('#sandbox-container .input-daterange').datepicker({
      todayHighlight: true,
  });

  // GET posts
    $('#refresh-posts').on('click', function(){
      $.ajax({
        type: 'GET',
        dataType: "json",
        url: apiURL+"/posts"

      }).done(function(response){
        response.forEach(function(e){
          $('.post-body').append(e.title)
        });
      }).fail(function(){
        console.log("fail you fucking miserable failure");
      });
    });

  // GET users
    $('#refresh-users').on('click', function(){
      $.ajax({
        type: 'GET',
        dataType: "json",
        url: apiURL+"/users"

      }).done(function(response){
        response.forEach(function(e){
          $('#user-list').append(e.full_name)
        });
      }).fail(function(){
        console.log("fail");
      });
    });



  // POST post
  $('#submit-new-post').on('click', function(){

    $.post( apiURL+"/posts",
    {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val()
      }
    }).done(function(res){
      console.log(res);
      console.log("done OK");
    }).fail(function(){
        console.log("fail");
    });
  });




  // POST user
  $('#submit-new-user').on('click', function(){
    $.post( apiURL+"/users",
    {
       user: {
        full_name: $('#user-full-name').val(),
        username: $('#user-username').val(),
        email: $('#user-email').val(),
        password: "password"
      }
    }).done(function(res){
      console.log(res);
      console.log("done OK");
    }).fail(function(){
        console.log("fail");
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





