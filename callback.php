
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
        'consumerKey'       => '150e9ef331f23f4eef46287bbdfbcec7',  // SETUP YOUR CONSUMER KEY
        'consumerSecret'    => '7981757d2940ad17',                // SETUP KEY SECRET
        'requestToken'       => $_GET['oauth_token'],       // got access token
       'verifier'      => $_GET['oauth_verifier'],      // got access secret
//        'verifySsl'         => false,                           // whether to verify SSL
        'debug'             => true,                            // enables debug mode
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