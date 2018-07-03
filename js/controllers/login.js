/*
	Login controller for NG_POLICIES app.
*/

NG_PMOne.controller("mainCtrl", function ($rootScope, $scope, Hyper,$timeout, $http, $location, $window, SITE_SETTINGS) {

	console.log('login loaded');
	$scope.msg = 'Logging in to upwork portal. Please wait...';
	//Global Variables
	$scope.login = {
		email: 'projectmarketplace@tatacommunications.com',
		password: 'Tata@2016'
	};

	$scope.error = {
		msg: '',
		isError: false
	}
	if (localStorage.getItem('sitetoken') != undefined) {
		//$window.location.href = '#/home';
	}

	$scope.loginUser = function () {

		$http({
			method: "GET",
			url: "https://login.microsoftonline.com/getuserrealm.srf?login=" + $scope.login.email
		}).then(function success(response) {
			console.log(response.data);
			$scope.gotUserRelem(response.data);
		}, function error(error) {
			console.log(error)
		});
	}

	//Getting user Relem for log in user
	$scope.gotUserRelem = function (data) {
		switch (data.NameSpaceType) {
			case 'Managed':
				//console.log('Managed');
				$scope.getMicrosoftOnlineSrf(data.AuthURL, 'Managed');
				break;
			case 'Federated':
				var endp = data.AuthURL.split('://')[1];
				endp = endp.split('/')[0];
				endp = 'https://' + endp + '/adfs/services/trust/2005/usernamemixed/'
				$scope.getMicrosoftOnlineSrf('urn:federation:MicrosoftOnline', 'Federated', endp);
				break;
			case 'unknown':
				console.log('Something went wrong check user name :', data);
				$scope.error.msg = 'Check Username and Password';
				$scope.error.isError = true;
				break;

			default:
				console.log('Something went wrong :', data);
				$scope.error.msg = 'Check Username and Password';
				$scope.error.isError = true;
				break;
		}
	}

	//getting microsoft online SRF
	$scope.getMicrosoftOnlineSrf = function (authURL, type, endpoint) {
		var url = 'https://login.microsoftonline.com/extSTS.srf';
		if (endpoint != undefined) {
			url = endpoint;
		}

		var soap = '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> \
                  <s:Header> \
                    <a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action> \
                      <a:ReplyTo> \
                        <a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address> \
                      </a:ReplyTo> \
                      <a:To s:mustUnderstand="1">'+ url + '</a:To> \
                      <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"> \
                        <o:UsernameToken> \
                          <o:Username>'+ $scope.login.email + '</o:Username> \
                          <o:Password>'+ $scope.login.password + '</o:Password> \
                        </o:UsernameToken> \
                      </o:Security> \
                    </s:Header> \
                    <s:Body> \
                      <t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust"> \
                        <wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy"> \
                          <a:EndpointReference> \
                            <a:Address>urn:federation:MicrosoftOnline</a:Address> \
                          </a:EndpointReference> \
                        </wsp:AppliesTo> \
                        <t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType> \
                      <t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType> \
                      <t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType> \
                    </t:RequestSecurityToken> \
                  </s:Body> \
                </s:Envelope>';


		/*
		var soap = '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" \
				xmlns:a="http://www.w3.org/2005/08/addressing" \
				xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> \
			<s:Header> \
			  <a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action> \
			  <a:ReplyTo> \
				<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address> \
			  </a:ReplyTo> \
			  <a:To s:mustUnderstand="1">https://login.microsoftonline.com/extSTS.srf</a:To> \
			  <o:Security s:mustUnderstand="1" \
				 xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"> \
				<o:UsernameToken> \
				  <o:Username>'+ $scope.login.email + '</o:Username> \
				  <o:Password>'+ $scope.login.password + '</o:Password> \
				</o:UsernameToken> \
			  </o:Security> \
			</s:Header> \
			<s:Body> \
			  <t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust"> \
				<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy"> \
				  <a:EndpointReference> \
					<a:Address>'+ endpointRef + '</a:Address> \
				  </a:EndpointReference> \
				</wsp:AppliesTo> \
				<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType> \
				<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType> \
				<t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType> \
			  </t:RequestSecurityToken> \
			</s:Body> \
		  </s:Envelope>';
		*/

		$http.post(url, soap, { headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' } })
			.then(function success(response) {
				console.log('Microsoft online SRF', response.data);
				var respXML = response.data;

				if (respXML.indexOf('FailedAuthentication') >= 0) {
					$scope.error.msg = 'Check Username and Password';
					$scope.error.isError = true;
					console.log('Check Username and Password');
				} else {
					if (type == 'Federated') {
						var saml = respXML.match(/<t\:RequestedSecurityToken\>(.+?)<\/t\:RequestedSecurityToken>/);
						if (saml.length >= 1) {
							$scope.getFedAuh('urn:federation:MicrosoftOnline', saml[1]);
						}
						else {
							$scope.error.msg = 'Check Username and Password';
							$scope.error.isError = true;
							console.log('Check Username and Password');
						}
					} else {
						$scope.stripTokenAndGetFedAuth(respXML);
					}
				}
			}, function error(error) {
				console.log('Microsoft online SRF Error', error)
			});
	}

	//function for getting fed AUth
	$scope.getFedAuh = function (endPoint, saml) {
		var url = 'https://login.microsoftonline.com/extSTS.srf';
		var endpointRef = endPoint;
		var siteUrl = SITE_SETTINGS.site_url;
		let soap = ['<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">',
			'<s:Header>',
			'<a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>',
			'<a:ReplyTo>',
			'<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>',
			'</a:ReplyTo>',
			'<a:To s:mustUnderstand="1">https://login.microsoftonline.com/extSTS.srf</a:To>',
			'<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">',
			saml, '</o:Security>',
			'</s:Header>',
			'<s:Body>',
			'<t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">',
			'<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">',
			'<a:EndpointReference>',
			'<a:Address>' + siteUrl + '</a:Address>',
			'</a:EndpointReference>',
			'</wsp:AppliesTo>',
			'<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>',
			'<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>',
			'<t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>',
			'</t:RequestSecurityToken>',
			'</s:Body>',
			'</s:Envelope>'].join('');

		$http.post(url, soap, { headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' } })
			.then(function success(response) {
				console.log('Microsoft online SRF', response.data);
				var respXML = response.data;

				if (respXML.indexOf('FailedAuthentication') >= 0) {
					$scope.error.msg = 'Check Username and Password';
					$scope.error.isError = true;
					console.log('Check Username and Password');
				} else {
					let tokenNode = respXML.match(/<wsse\:BinarySecurityToken (.+?)\>(.+?)<\/wsse\:BinarySecurityToken>/);
					if (tokenNode.length >= 1) {
						let token = tokenNode[0].split('>')[1]
						token = token.split('</')[0]
						$scope.stripTokenAndGetFedAuth(token);
					} else {
						console.log('Check Username and Password');
					}
				}
			}, function error(error) {
				console.log('Get Fed Auth Error', error)
			});
	}

	//getting token and fed auth
	$scope.stripTokenAndGetFedAuth = function (data) {

		if (data.indexOf('t=') == 0) {
			$scope.token = data;
		}
		else {
			$scope.token = 't=' + data;
		}

		SITE_SETTINGS.token = $scope.token;
		var url = SITE_SETTINGS.service_url + "_forms/default.aspx?wa=wsignin1.0";
		var data = $scope.token;
		var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

		$http.post(url, data, { headers: headers })
			.then(function success(response) {
				console.log('Strip Token and Fed Auth', response.data);
				let respXML = response.data;
				$scope.getDigestValue();
			}, function error(error) {
				console.log('Strip Token and Fed Auth Error', error)
			});

	}

	//Getting Digest Value for Performing post and get actions
	$scope.getDigestValue = function () {
		var url = SITE_SETTINGS.site_url + '/_vti_bin/sites.asmx';
		var tokenReq = '<?xml version="1.0" encoding="utf-8"?>';
		tokenReq += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
		tokenReq += '  <soap:Body>';
		tokenReq += '    <GetUpdatedFormDigestInformation xmlns="http://schemas.microsoft.com/sharepoint/soap/" >';
		tokenReq += '    <url>' + SITE_SETTINGS.site_url + '</url>';
		tokenReq += '    </GetUpdatedFormDigestInformation>';
		tokenReq += '  </soap:Body>';
		tokenReq += '</soap:Envelope>';

		var headers = {
			'Content-Type': 'text/xml; charset="utf-8"',
			'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/GetUpdatedFormDigestInformation',
			'X-RequestForceAuthentication': 'true'
		}

		$http.post(url, tokenReq, { headers: headers })
			.then(function success(response) {
				console.log('Digest Value', response.data);
				var respXML = response.data;
				var dig = respXML.split('<DigestValue>')[1];
				dig = dig.split('</DigestValue>')[0];
				SITE_SETTINGS.digest_value = dig;
				localStorage.setItem('sitetoken', dig);
				$scope.getUpWorkToken();
			}, function error(error) {
				console.log('Strip Token and Fed Auth Error', error)
			});

	}
	
	//get UpWork TOken for User
	$scope.getUpWorkToken = function () {
		var userId = localStorage.getItem('userId');
		var url = "/_api/web/lists/GetByTitle('UpWorkTokens')/items?$select=*&$filter=EmployeeName/ID eq "+userId;
		Hyper.get(url)
			.success(function (data, status, headers, config) {
				console.log("Success - ", data.d);
				if(data.d.results.length>0){
					$scope.msg = "Login successfully. window will close automatically.";
					$window.close();
				}
				else{					
						$scope.saveUpWorkTokens();
				}
			}).error(function (data, status, headers, config) {
				console.log("Error - ", data, status, headers, config);
				alert('Something went wrong please try again. token');
				//$window.close();
			});
	};

	//saving upwork tokens
	$scope.saveUpWorkTokens = function(){
		if(localStorage.getItem('access_token')!=null && localStorage.getItem('access_token')!=undefined && localStorage.getItem('access_token')!="" && localStorage.getItem('access_secret')!=null && localStorage.getItem('access_secret')!=undefined && localStorage.getItem('access_secret')!=""){
			var listName='UpWorkTokens';
			var url = "/_api/Web/Lists/getByTitle('"+listName+"')/items";
			var metaType = listName.split(" ").join("_x0020_");
			
			var values = {
					"__metadata": {
							type: "SP.Data."+metaType+"ListItem"
					},
					'EmployeeNameId':localStorage.getItem('userId'), 
					'UpWorkToken': localStorage.getItem('access_token'),
					'UpWorkTokenSecret': localStorage.getItem('access_secret')
			}
			var data = JSON.stringify(values);		
			Hyper.post(url, data)
			.success(function (data, status, headers, config) {  
					console.log('Add Token success',data); 
					$scope.msg = "Login successfully. window will close automatically.";  
					$window.close(); 
			}).error(function (data, status, headers, config) {  
					console.log("Add Token Error - " , data, status, headers, config);
					alert('Something went wrong please try again.');
					//$window.close();
			});
		}
		else{
			$timeout(function () {	
				$scope.saveUpWorkTokens();
			},1100);
		}
	}
	
	//Initialize all functioins
	$scope.onInit = function () {
		if(localStorage.getItem('sitetoken')!=null){
			$scope.getUpWorkToken();
		}
		else{
			$timeout(function () {	
				$scope.onInit();
			},1000);
		}	
	}
	$scope.onInit();
});






