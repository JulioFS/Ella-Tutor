var School = (function () {
    let initialize = function () {
        /* Create Events */
        $('#submit-code').on('click', handleLogin);
        $('#logout').on('click', handleLogout);
    };

    /* 
     * opts is a dictionary containing:
     * {endpoint: '', method: ''}
     * Example { endPoint: '/student/1', method: 'GET' }
    */
   let queryAPI = function (opts) {
       /* Returns the standard ajax promise object, use .then() and .fail()
        * to handle it in your calling function/method
        */
       let ajaxOpts = {};

       /* This is standard AJAX "stuff", define the object containing
        * the information to pass to the Python process..
        */
       ajaxOpts = {
           url: 'http://127.0.0.1:5000' + opts.endPoint,
           method: opts.method,
           dataType: 'json',
           beforeSend: function (jqXHR) {
               jqXHR.setRequestHeader('Content-Type', 'application/json');
           }
       };
       return $.ajax(ajaxOpts);
   };

   let handleLogin = function (event) {
       let student_code = $('#student-code').val();
       if (student_code.length > 0) {
           queryAPI({ endPoint: '/students/login/' + student_code, method: 'GET' }).then(function (results) {
               if (results) {
                    STUDENT = {name: results.name, id: results.id};
                    $('#student-name').html(results.name);
                    $('#content').show();
                    $('#login').hide();
                    $('#success-login').show();
               } else {
                   alert('Student Not Found. Please Try Again.');
               }
           }).fail(function (err) {
               alert('Error executing AJAX, is the backend server running?');
           });
       } else {
           alert('Please enter a valid student code value.')
       }
       return false;
   };

   let handleLogout = function(event) {
       STUDENT = {};
       $('#content').hide();
       $('#login').show();
       $('#success-login').hide();
   };

    return {
        initialize: initialize
    };
}());