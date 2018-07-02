/*
	Created :03-Sep-2017
	NG_PMOne is an Angular Module crated for TPMOne Sharepoint site.
	NG_PMOne will be reffered to create Controllers, Services, Directives etc., and will extend as needed.
*/
NG_PMOne = angular.module("UpWork", []);

NG_PMOne.constant("SITE_SETTINGS", {
    site_url:"https://tatacommunications.sharepoint.com/sites/projectmarketplace_v1",
    token:"",
    service_url:'https://tatacommunications.sharepoint.com/',
    digest_value:''
});

