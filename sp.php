<?php
    
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    include("../SharePointAPI.php");


    use Thybag\SharePointAPI;
    $sp = new SharePointAPI('projectmarketplace@tatacommunications.com', 'Tata@2016', 'SPAPI/Lists.xml');

    $resp = $sp->read('UpWorkTokens');

    echo $resp;
?>