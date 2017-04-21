var app = angular.module("masterApp", []);


app.controller("masterCtrl", function($scope, $window,$http,$location) {
    //console.log("masterCtrl is working.");

    //intitial values
    var jsonContract = {
"cb1": false, "cb2": false, "cb3": false, "cb4": false, "cb5": false, "cb6": false, "cb7": false, "cb8": false,
"cb9": false, "cb10": false, "cb11": false, "cb12": false, "cb13": false, "cb14": false, "cb15": false, "cb16": false,
"cb17": false, "cb18": false, "cb19": false, "cb20": false, "cb21": false, "cb51": false, "cb52": false, "discount": "",
"fullName": "", "jobAddress2": "", "phone": "", "proposalNum": "", "saleTax": "", "squares": "", "subTo": "",
"subTot": "", "tb1": "", "tb2": "", "tb3": "", "tb4": "", "tb5": "", "tb7": "", "tb8": "", "tb9": "",
"tb10": "", "tb11": "", "tb12": "", "tb13": "", "tb14": "", "tb15": "", "tb16": "", "tb17": "", "tb18": "",
"tb19": "", "tb20": "", "tb21": "", "tb61": "", "tb131": false, "tb132": false, "tb133": false, "seller": ""
};

$scope.date = new Date();
$scope.showError = false;
$scope.req = {};

// Start Validations
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}






// End validations



$scope.submitReq = function (req) {
	//console.log(req);
	

    var userReq = angular.copy(jsonContract); // format the user req to the contract
    userReq = angular.extend(userReq, req); // merge user req to the json contract
    console.log(userReq);


    // if(userReq.fullName == "" || userReq.jobAddress2 == "" 
    //     || userReq.subTo == "" || userReq.phone == "" || userReq.proposalNum == "" ||
    //      validateEmail(userReq.subTo) == false || userReq.subTot == "" ||
    //      userReq.saleTax == "" || isNaN(userReq.subTot) == true || isNaN(userReq.saleTax) == true ) {
    
    //     $scope.showError = true;

    // } else {
       
 var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }; // end config

$http.post( '/sendFormPost' , userReq, config)
                .success(function (data, status, headers, config) {
            console.log("POST Method Success: " );
            console.log(data); // remove after testing
                })
                .error(function (data, status, header, config) {
                     console.log("POST Method Failed: " );
                });


setTimeout(function(){ $window.location.href = '/completed'; }, 1500);


   // }


};



// precheck check box if the a commnet is entered
$scope.preCheck = function(tbComment) {
    if (tbComment=="" || tbComment == null) {
        
        return false;
    }
    else { 

        return true;}
}




// precheck check box if the a commnet is entered
$scope.testMe = function() {
//console.log("R");

}



});



app.controller("ResultCtrl", function($scope,$window,$http,$location) {
    console.log("resultCtrl is working.");
    setTimeout(function(){ $window.location.href = '/temp/temp.pdf'; }, 3000);

});


app.controller("formResultCtrl", function($scope) {


});
