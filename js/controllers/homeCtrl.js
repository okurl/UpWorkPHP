/*
	Home controller for NG_POLICIES app.
*/

NG_PMOne.controller("homeCtrl", function($rootScope,$scope, $timeout, Hyper,$location,$window,SITE_SETTINGS){
	
    console.log('home loaded');

    $scope.gettestData = function(){
        var url="_api/web/lists/GetByTitle('Test')/items";
		Hyper.get(url)
		.success(function (data, status, headers, config) {  
			console.log("Success - " , data.d);
        }).error(function (data, status, headers, config) {  
			console.log("Error - " , data, status, headers, config)
        });
    };
    
    //function for checking post
    $scope.addItem = function(){
        var listName='Test';

        var url = "_api/Web/Lists/getByTitle('"+listName+"')/Fields";
        var metaType = listName.split(" ").join("_x0020_");
        
        var values = {
            "__metadata": {
                type: "SP.Field"
            },
            'Title':$scope.title, 
            'FieldTypeKind': $scope.ID,
        }
        var data = JSON.stringify(values);		
        Hyper.post(url, data)
        .success(function (data, status, headers, config) {  
            console.log('Update success',JSON.stringify(data));    
        }).error(function (data, status, headers, config) {  
            console.log("Update Error - " , data, status, headers, config);
        });
    }

    $scope.gettestData();
});