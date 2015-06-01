$(document).ready(function() {

  $('#sandbox-container .input-daterange').datepicker({
      todayHighlight: true,
  });

  $('submit-user').on('click', function(){
      var user = {
        first_name: $('#new-add-title').val(),
        last_name: $('#new-ad-body').val(),
        username: $('#new-ad-phonenumber').val() ,
        email: $('#new-ad-email').val(),
        password: $('#new-ad-category option:selected').text()
      };

      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/ads",
        data: {ad: user}
      }).done(function(){

      }).fail(function(){
        alert("fail");
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





