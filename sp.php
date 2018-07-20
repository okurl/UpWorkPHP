<?php



    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $token = 'Bearer '.$_GET['token'];
    
    $url = "https://tatacommunications.sharepoint.com/sites/projectmarketplace_v1/_api/web/lists/GetByTitle('UpWorkTokens')/items?\$select=*&\$filter=EmployeeName/ID eq 10330";

    $request_headers = array();
    $request_headers[] = 'Accept: application/json;odata=verbose';
    $request_headers[] = 'Authorization:'.$token;


    // Performing the HTTP request
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
    $response_body = curl_exec($ch);

    echo $response_body;








?>