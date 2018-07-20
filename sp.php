<?php



ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$token = 'Bearer '.$_GET['token'];
$url = "https://tatacommunications.sharepoint.com/sites/projectmarketplace_v1/_api/web/lists/GetByTitle('UpWorkTokens')/items?\$select=*&\$filter=EmployeeName/ID eq 10330";
$resource = curl_init($url);
$headers = array(
    "Accept" => "application/json;odata=verbose",
    "crossDomain"=>"true",
    "Authorization"=>$token
);
curl_setopt($resource, CURLOPT_HTTPHEADER, $headers);
curl_setopt($resource, CURLOPT_CUSTOMREQUEST, ‘GET’);



// Send the request & save response to $resp
$resp = curl_exec($curl);
// Close request to clear up some resources

echo $resp;

curl_close($curl);









?>