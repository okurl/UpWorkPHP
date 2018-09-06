<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Upwork Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--All JS required included here-->
    <script src="js/libs/angular.min.js"></script>
    
</head>
<body ng-app="UpWork">
    <div ng-controller="mainCtrl" id="asd" style="height: 100%;width: 100%;position: absolute;background: #fff;z-index: 99999;text-align: center;display: table;">
        <div style="display:table-cell;vertical-align:middle;">
            <img src="img/upwork-logo.svg" height="80" width="300"/>
            <p style="margin-top:15px;"><b>{{msg}}</b></p>
        </div>
    </div>




    <!--Other JS required included here-->
    <script src="js/libs/jquery.min.js"></script>
    <script src="js/libs/bootstrap.min.js"></script>
    <script src="js/controllers/login.js"></script>

    <?php
        /**
         * Authentication library for Upwork API using OAuth
         * Example: using your own authentication OAuth client
         *
         * @final
         * @package     UpworkAPI
         * @since       05/20/2014
         * @copyright   Copyright 2014(c) Upwork.com
         * @author      Maksym Novozhylov <mnovozhilov@upwork.com>
         * @license     Upwork's API Terms of Use {@link https://developers.upwork.com/api-tos.html}
         */

        // Our php-oauth library - used in this example - requires a session
        session_start();

        require __DIR__ . '/vendor/autoload.php';

        // if you already have the tokens, they can be read from session
        // or other secure storage
        //$_SESSION['access_token'] = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
        //$_SESSION['access_secret']= 'xxxxxxxxxxxx';

        $config = new \Upwork\API\Config(
            array(
                'consumerKey'       => '8242b98f8b9f13fa54618b3cd3664268',  // SETUP YOUR CONSUMER KEY
                'consumerSecret'    => '67f56bf386761969',                // SETUP KEY SECRET
                'requestToken'       => $_GET['oauth_token'],       // got access token
                'verifier'      => $_GET['oauth_verifier'],      // got access secret
        //      'verifySsl'         => false,                           // whether to verify SSL
                //'debug'             => true,                            // enables debug mode
                'authType'          => 'OAuthPHPLib', // your own authentication type, see AuthTypes directory
                'mode' => 'web'
            )
        );

        $client = new \Upwork\API\Client($config);
        /*
        // our example AuthType allows assigning already known token data
        if (!empty($_SESSION['access_token']) && !empty($_SESSION['access_secret'])) {
            $client->getServer()
                ->getInstance()
                ->addServerToken(
                    $config::get('consumerKey'),
                    'access',
                    $_SESSION['access_token'],
                    $_SESSION['access_secret'],
                    0
                );
        } else 
        {
            // $accessTokenInfo has the following structure
            // array('access_token' => ..., 'access_secret' => ...);
            // keeps the access token in a secure place
            // gets info of authenticated user
            $accessTokenInfo = $client->auth();
        }
        */
        $accessTokenInfo = $client->auth();

print_r($accessTokenInfo);
echo '<br/>';
echo 'access Token:- '.$accessTokenInfo['access_token'].'<br/>';
echo 'access Secret:- '.$accessTokenInfo['access_secret'].'<br/>';

?>

    <script>
        if(localStorage.getItem('sitetoken')==null || localStorage.getItem('sitetoken')==undefined || localStorage.getItem('sitetoken')==""){
            localStorage.setItem('userId','<?php echo $_SESSION['userId'] ?>');
            localStorage.setItem('sitetoken','<?php echo $_SESSION['sitetoken'] ?>');
        }
        localStorage.setItem('access_token','<?php echo $accessTokenInfo['access_token']; ?>');
        localStorage.setItem('access_secret','<?php echo $accessTokenInfo['access_secret']; ?>');
        
    </script>

<?php
$client->getServer()
        ->getInstance()
        ->addServerToken(
            $config::get('consumerKey'),
            'access',
            $accessTokenInfo['access_token'],
            $accessTokenInfo['access_secret'],
            0
        );

$auth = new \Upwork\API\Routers\Auth($client);
print_r($auth->getUserInfo());

?>
</body>
</html>

