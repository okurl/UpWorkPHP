<?php

// Our php-oauth library - used in this example - requires a session
session_start();

require __DIR__ . '/vendor/autoload.php';

// if you already have the tokens, they can be read from session
// or other secure storage
$_SESSION['access_token'] = 'e54e62713aeb39b6938fdc42857b3bdb';
$_SESSION['access_secret']= '6ce6e0db9a90ee7e';

$config = new \Upwork\API\Config(
    array(
        'consumerKey'       => '150e9ef331f23f4eef46287bbdfbcec7',  // SETUP YOUR CONSUMER KEY
        'consumerSecret'    => '7981757d2940ad17',                // SETUP KEY SECRET
        'accessToken'       => $_SESSION['access_token'],       // got access token
        'accessSecret'      => $_SESSION['access_secret'],      // got access secret
//      'verifySsl'         => false,                           // whether to verify SSL
        'debug'             => true,                            // enables debug mode
        'authType'          => 'OAuthPHPLib', // your own authentication type, see AuthTypes directory
        'mode' => 'web'
    )
);

$client = new \Upwork\API\Client($config);

$client->getServer()
        ->getInstance()
        ->addServerToken(
            $config::get('consumerKey'),
            'access',
            $_SESSION['access_token'],
            $_SESSION['access_secret'],
            0
        );

$jobs = new \Upwork\API\Routers\Hr\Jobs($client);
$params = array(
    "buyer_team__reference" => "4940645",
    "title" => "Test oAuth API create job PHP Edit",
    "job_type" => "hourly",
    "description" => "A description edited",
    "visibility" => "public",
    "category2" => "Web, Mobile & Software Dev",
    "subcategory2" => "Web Development",
    "skills" => "python;javascript;php",
    "budget" => "999",
    "duration" => "12"
);
$job_ref = "~01bf00e42095dac02a";
$output=$jobs->editJob($job_ref,$params);
echo json_encode($output);

?>