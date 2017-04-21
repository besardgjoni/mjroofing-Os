var app = angular.module("masterApp", []);


app.controller("masterCtrl", function($scope, $window,$http,$location) {


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
$scope.missingField = "";
$scope.req = {};


function validate(userReq) {
    console.log(userReq.fullName );

    if (userReq.curDate ==="" || (typeof userReq.curDate === 'undefined') ) {
        console.log("date empty name empty");
        $scope.missingField = "Date";
        return false;
    }

    else if (userReq.proposalNum ==="" || (typeof userReq.proposalNum === 'undefined') ) {
        console.log("proposalNum empty");
        $scope.missingField = "Proposal Number";
        return false;
    }

    if (userReq.fullName =="" || (typeof userReq.fullName === 'undefined') ) {
        console.log("full name empty");
        $scope.missingField = "Name";
        return false;
    }

    else if (userReq.squares ==="" || (typeof userReq.squares === 'undefined') ) {
        console.log("squaresempty");
        $scope.missingField = "Sqaures";
        return false;
    }

    else if (userReq.jobAddress2 ==="" || (typeof userReq.jobAddress2 === 'undefined') ) {
        console.log("jobAddress2 empty name empty");
        $scope.missingField = "Address";
        return false;
    }

    else if (userReq.subTo ==="" || (typeof userReq.subTo === 'undefined') ) {
        console.log("email empty");
        $scope.missingField = "Email";
        return false;
    }

    else if (userReq.phone ==="" || (typeof userReq.phone === 'undefined') ) {
        console.log("phone empty");
        $scope.missingField = "Phone";
        return false;
    }

    else if (userReq.seller ==="" || (typeof userReq.seller === 'undefined') ) {
        console.log("seller empty");
        $scope.missingField = "Seller";
        return false;
    }

    else if (userReq.subTot ==="" || (typeof userReq.subTot === 'undefined') ) {
        console.log("subtotal tax empty");
        $scope.missingField = "Sub Total";
        return false;
    }

    else if (userReq.saleTax ==="" || (typeof userReq.saleTax === 'undefined') ) {
        console.log("sale tax empty");
        $scope.missingField = "Sale Tax";
        return false;
    }

    else {
        return true;
    }

}



$scope.submitReq = function (req) {
    
    var userReq = angular.copy(jsonContract); // format the user req to the contract
    userReq = angular.extend(userReq, req); // merge user req to the json contract


        // if(!validate(userReq)) {
        //     $scope.showError = true;
        //     console.log("failed");


        // } else {
            console.log("passed");
        console.log(userReq);

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
                                 console.log("POST Method Failed: here 2" );
                            });


            setTimeout(function(){ $window.location.href = '/completed'; }, 1500);
        // }

}; // end submitReq




// precheck check box if the a commnet is entered
$scope.preCheck = function(tbComment) {
    if (tbComment=="" || tbComment == null) {
        
        return false;
    }
    else { 

        return true;}
} // end preCheck


}); // end master Controller



app.controller("ResultCtrl", function($scope,$window,$http,$location) {
    console.log("resultCtrl is working.");
    setTimeout(function(){ $window.location.href = '/temp/temp.pdf'; }, 3000);

});


app.controller("formResultCtrl", function($scope) {


});




