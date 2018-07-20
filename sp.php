<?php
    include("../SharePointAPI.php");


    use Thybag\SharePointAPI;
    $sp = new SharePointAPI('projectmarketplace@tatacommunications.com', 'Tata@2016', 'SPAPI/Lists.xml');

    $resp = $sp->read('UpWorkTokens');

    echo $resp;
?>