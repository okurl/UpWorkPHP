<?php
function connect(){

    $token = $_GET['token'];
    $url = "https://tatacommunications.sharepoint.com/sites/projectmarketplace_v1/_api/web/lists/GetByTitle('UpWorkTokens')/items?\$select=*&\$filter=EmployeeName/ID eq 10330";
    
    $ch = curl_init();
    
    $headers = array(
        'Accept: application/json;odata=verbose',
        'Authorization: Bearer '.$token,
    );
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET"); 

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Timeout in seconds
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    $authToken = curl_exec($ch);

    return $authToken;
}