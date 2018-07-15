<?php

// Our php-oauth library - used in this example - requires a session
session_start();

require __DIR__ . '/vendor/autoload.php';

// if you already have the tokens, they can be read from session
$_SESSION['access_token'] = $_GET['token']; //'e54e62713aeb39b6938fdc42857b3bdb';
$_SESSION['access_secret']= $_GET['secret']; //'6ce6e0db9a90ee7e';

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

//creating client config
$client = new \Upwork\API\Client($config);

//Adding token and secret to the server for authenicated user
$client->getServer()
        ->getInstance()
        ->addServerToken(
            $config::get('consumerKey'),
            'access',
            $_SESSION['access_token'],
            $_SESSION['access_secret'],
            0
        );

/* All main operations starts here---
 * Like Posting job,
 * editing job,
 * cancelling job
 * etc
*/


//Function for posting a job to upwork
if($_GET['operation']=='PostJob' && !empty($_GET['operation']) ){

    //reference id for posting job and other operation
    $buyer_team_reference = "4940645";

    $jobs = new \Upwork\API\Routers\Hr\Jobs($client);

    //Setting all params required to post a job
    $params = array(
        "buyer_team__reference" => $buyer_team_reference,
        "title" => "Test oAuth API create job API",
        "job_type" => "hourly",
        "description" => "A description",
        "visibility" => "public",
        "category2" => "Web, Mobile & Software Dev",
        "subcategory2" => "Web Development",
        "skills" => "python;javascript"
        /*
        "title" => $_GET["title"],
        "job_type" => $_GET["job_type"],
        "description" => $_GET["description"],
        "visibility" => $_GET["visibility"],
        "start_date" => $_GET["start_date"],
        "budget" => $_GET["budget"],
        "duration" => $_GET["duration"],
        "contractor_type" => $_GET["contractor_type"]

        */
    );

    $response = $jobs->postJob($params);

    echo json_encode($response);
}

//Function for posting a job to upwork
if($_GET['operation']=='EditJob' && !empty($_GET['operation']) ){
    //reference id for posting job and other operation
    $buyer_team_reference = "4940645";
    
    $jobs = new \Upwork\API\Routers\Hr\Jobs($client);

    //Setting all params required to edit a job
    $params = array(
        "buyer_team__reference" => $buyer_team_reference,
        "title" => $_GET["title"],
        "job_type" => $_GET["job_type"],
        "description" => $_GET["description"],
        "visibility" => $_GET["visibility"],
        "start_date" => $_GET["start_date"],
        "budget" => $_GET["budget"],
        "duration" => $_GET["duration"],
        "contractor_type" => $_GET["contractor_type"]
    );

    $job_ref = $_GET['job_ref'];

    $response = $jobs->editJob($job_ref,$params);

    echo json_encode($response);
}

//Function for posting a job to upwork
if($_GET['operation']=='CancelJob' && !empty($_GET['operation']) ){

    $jobs = new \Upwork\API\Routers\Hr\Jobs($client);

    //Setting all params required to cancel a job
    $params = array(
        "reason" => "41"
    );

    $job_ref = $_GET['job_ref'];

    $response = $jobs->deleteJob($job_ref,$params);

    echo json_encode($response);
}

if($_GET['operation']=='test' && !empty($_GET['operation']) ){
    $a =  array(
        "title" => $_GET["title"],
        "job_type" => $_GET["job_type"],
        "description" => $_GET["description"],
        "visibility" => $_GET["visibility"],
        "start_date" => $_GET["start_date"],
        "budget" => $_GET["budget"],
        "duration" => $_GET["duration"],
        "contractor_type" => $_GET["contractor_type"],
        "token"=>$_GET["token"],
        "secret"=>$_GET["secret"]
    );
    echo json_encode($a);
}

?>