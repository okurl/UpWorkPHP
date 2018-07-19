NG_PMOne.service("Hyper", function ($http, $q, SITE_SETTINGS){
	
	this.get=function(url, headers){
		
		var _headers = { 
			"Accept": "application/json;odata=verbose",
			"Authorization":'Bearer ' + localStorage.getItem('sitetoken') 
		};
		
		if(headers!=undefined){
			for(var x in headers){
				_headers[x] = headers[x];
			}
		}
		
		return $http({
			method:"GET",
			url:SITE_SETTINGS.site_url + url,
			headers: _headers
		})	

	}
	this.update=function(url, data, headers){
		var _headers = {
	            "Accept": "application/json;odata=verbose",
	            "Content-Type": "application/json;odata=verbose",
	            "Authorization":'Bearer ' + localStorage.getItem('sitetoken'),
	            "IF-MATCH": "*",
	            "X-Http-Method": "MERGE"
		};
		
		if(headers!=undefined){
			for(var x in headers){
				_headers[x] = headers[x];
			}
		}
		
		return $http({
			method:"POST",
			url:SITE_SETTINGS.site_url + url,
			headers: _headers,
			data:data
		})	
	}
	
	this.post=function(url, data, headers){
		var _headers = {
	            "Accept": "application/json;odata=verbose",
	            "Content-Type": "application/json;odata=verbose",
	            "Authorization":'Bearer ' + localStorage.getItem('sitetoken'),
	            "IF-MATCH": "*",
	            "X-Http-Method": "POST"
		};
		
		if(headers!=undefined){
			for(var x in headers){
				_headers[x] = headers[x];
			}
		}
		
		return $http({
			method:"POST",
			url:SITE_SETTINGS.site_url + url,
			headers: _headers,
			data:data
		})	
	}

	this.uploadFile=function(elementId, docLibrary, fileName){
		var deferred = $q.defer();
		var element = document.getElementById(elementId);
		
		var file = element.files[0];
        if (file == undefined) {
            return null;
        } else if (file == null) {
            return null;
        }
		
		if(fileName==undefined){
			var parts = element.value.split('\\');
			var fileName = parts[parts.length - 1];
		}
		
		var reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = function (e) {
			var arrBuff = e.target.result;
			var fileCollectionEndpoint = SITE_SETTINGS.site_url + "_api/Web/Lists/getByTitle('"+docLibrary+"')/RootFolder/Files/Add(url='"+fileName+"', overwrite=true)?$expand=ListItemAllFields";
			var request = $http({
			    url: fileCollectionEndpoint,
			    method: "POST",
			    processData: false,
			    data: arrBuff,
			    transformRequest: angular.identity,
			    headers: {
			        "accept": "application/json;odata=verbose",
			        "Authorization":'Bearer ' + localStorage.getItem('sitetoken'),
			        "Content-Type": undefined,
			        "Content-Length": arrBuff.byteLength
			    }
			}).success(function(data){
				deferred.resolve(data.d);
			}).error(function(){
				deferred.reject("Error");
			})
			
		}
		return deferred.promise;
	}
	
	this.moveFile=function(url){
		var _headers = {
	            "Accept": "application/json;odata=verbose",
	            "Content-Type": "application/json;odata=verbose",
	            "Authorization":'Bearer ' + localStorage.getItem('sitetoken'),
	            "IF-MATCH": "*",
	            "X-Http-Method": "MERGE"
		};
		
		return $http({
			method:"POST",
			url:SITE_SETTINGS.site_url + url,
			headers: _headers,
		})	
	}

	this.siteDelete=function(url, data, headers){
		var _headers = {
	            "Accept": "application/json;odata=verbose",
	            "Content-Type": "application/json;odata=verbose",
	            "Authorization":'Bearer ' + localStorage.getItem('sitetoken'),
	            "IF-MATCH": "*",
	            "X-Http-Method": "POST"
		};
		
		if(headers!=undefined){
			for(var x in headers){
				_headers[x] = headers[x];
			}
		}
		
		return $http({
			method:"DELETE",
			url:SITE_SETTINGS.site_url + url,
			headers: _headers,
			data:data
		})	
	}
	
	this.listItemDelete=function(url,headers){
		var _headers = {
	            "Accept": "application/json;odata=verbose",
	            "Content-Type": "application/json;odata=verbose",
	            "Authorization":'Bearer ' + localStorage.getItem('sitetoken'),
	            "IF-MATCH": "*",
	            "X-Http-Method": "DELETE"
		};
		
		if(headers!=undefined){
			for(var x in headers){
				_headers[x] = headers[x];
			}
		}
		
		return $http({
			method:"POST",
			url:SITE_SETTINGS.site_url + url,
			headers: _headers,
		})	
	}

	
});