angular.module('master.services', [])





.service('serverPostReqSrv', function ($http) {

this.send = function (JsonRequest) {
console.log("reached reser");

  var config = {
      headers : {
          'Content-Type': 'application/json'
      }
  }
 


return {
    async: function () {
        return $http.post( '/testPost' , JsonRequest, config)
                .success(function (data, status, headers, config) {
            console.log("POST Method Success: ");
            console.log(data); // remove after testing    
          }).error(function (data, status, header, config) {
                     console.log("POST Method Failed: " );
                });
    }

};



    };

})