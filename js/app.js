$(document).ready(function() {

  $('#sandbox-container .input-daterange').datepicker({
      todayHighlight: true,
  });




  // GET
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: "http://localhost:3000/posts"

  }).done(function(content){
      $('.post-body').html(content)
    console.log('GET!');

  }).fail(function(){
    console.log("fail");
  });


  // POST
  $('#submit-new-user').on('click', function(){
      var user = {
        full_name: $('#user-full-name').val(),
        username: $('#user-username').val() ,
        email: $('#user-email').val(),
        password: $('#user-password').text()
      };

      $.ajax({
        type: 'POST',
        dataType: "json",
        url: "http://localhost:3000/posts",
        data: {user: user}
      }).done(function(response){

        console.log(response);

      }).fail(function(){
        console.log("fail");
      });
  });


    // $('#refresh-ads-button').click(function(){
    //   // if select = all url = ads
    //   // else url =
    //   var resultsURL = 'http://localhost:3000/ads';


    //   if($('#filter-ad-category option:selected').text() !== "All"){
    //     var thisCategory = $('#filter-ad-category option:selected').text();
    //     resultsURL = 'http://localhost:3000/filtered_ads/'+thisCategory
    //   }


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





