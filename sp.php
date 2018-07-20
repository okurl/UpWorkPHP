<?php
$token = 'Bearer '.$_GET['token'];
$url = "https://tatacommunications.sharepoint.com/sites/projectmarketplace_v1/_api/web/lists/GetByTitle('UpWorkTokens')/items?$select=*&$filter=EmployeeName/ID eq 10330";
$resource = curl_init($url);
$headers = array(
    "Accept" => "application/json;odata=verbose",
    "crossDomain"=>"true",
    "Authorization"=>$token
);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, ‘GET’);



// Send the request & save response to $resp
$resp = curl_exec($curl);
// Close request to clear up some resources

echo $resp;

curl_close($curl);









?>