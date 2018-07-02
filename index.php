<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Up Work Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body{
            margin:0;
            padding:0;
        }
    </style>
    
</head>
<body>
    <div style="height: 100%;width: 100%;position: absolute;background: #fff;z-index: 99999;text-align: center;display: table;">
        <p style="display: table-cell;vertical-align: middle;">Redirecting to Upwork.....</p>
    </div>
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

$_SESSION['userId'] = $_GET['userId'];
?>
    <script>
        localStorage.setItem('userId','<?php echo $_SESSION['userId'] ?>');
    </script>

<?php
require __DIR__ . '/vendor/autoload.php';

// if you already have the tokens, they can be read from session
// or other secure storage
//$_SESSION['access_token'] = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
//$_SESSION['access_secret']= 'xxxxxxxxxxxx';

$config = new \Upwork\API\Config(
    array(
        'consumerKey'       => '150e9ef331f23f4eef46287bbdfbcec7',  // SETUP YOUR CONSUMER KEY
        'consumerSecret'    => '7981757d2940ad17',                // SETUP KEY SECRET
//        'accessToken'       => $_SESSION['access_token'],       // got access token
//        'accessSecret'      => $_SESSION['access_secret'],      // got access secret
//        'verifySsl'         => false,                           // whether to verify SSL
        'debug'             => true,                            // enables debug mode
        'authType'          => 'OAuthPHPLib', // your own authentication type, see AuthTypes directory
        'mode' => 'web'
    )
);

$client = new \Upwork\API\Client($config);

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

$auth = new \Upwork\API\Routers\Auth($client);
$info = $auth->getUserInfo();

print_r($info);
?>
</body>
</html>