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


// Implement images

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
