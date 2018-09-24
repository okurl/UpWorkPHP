<?php

// Our php-oauth library - used in this example - requires a session
session_start();

require __DIR__ . '/vendor/autoload.php';

ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// if you already have the tokens, they can be read from session
$_SESSION['access_token'] = $_POST['token']; //'e54e62713aeb39b6938fdc42857b3bdb';
$_SESSION['access_secret']= $_POST['secret']; //'6ce6e0db9a90ee7e';

$config = new \Upwork\API\Config(
    array(
        'consumerKey'       => '8242b98f8b9f13fa54618b3cd3664268',  // SETUP YOUR CONSUMER KEY
        'consumerSecret'    => '67f56bf386761969',                // SETUP KEY SECRET
        'accessToken'       => $_SESSION['access_token'],       // got access token
        'accessSecret'      => $_SESSION['access_secret'],      // got access secret
//      'verifySsl'         => false,                           // whether to verify SSL
 //     'debug'             => true,                            // enables debug mode
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
if($_POST['operation']=='team' && !empty($_POST['team']) ){
    $teams = new \Upwork\API\Routers\Organization\Teams($client);
    echo json_encode($teams->getList());
}

//Getting team of User account
$teams = new \Upwork\API\Routers\Organization\Teams($client);
$tempTeam = $teams->getList();
$buyerteamreference = $tempTeam[0]['reference'];

//Function for posting a job to upwork
if($_POST['operation']=='PostJob' && !empty($_POST['operation']) ){

    //reference id for posting job and other operation
    $buyer_team_reference = $buyerteamreference; //"4940645";

    $jobs = new \Upwork\API\Routers\Hr\Jobs($client);

    //Setting all params required to post a job
    $params = array(
        "buyer_team__reference" => $buyer_team_reference,
        /*
        "title" => "Test oAuth API create job APIS",
        "job_type" => "hourly",
        "description" => "A description",
        "visibility" => "public",
        "category2" => "Web, Mobile & Software Dev",
        "subcategory2" => "Web Development",
        "skills" => "python;javascript",
        "budget" => "100",
        "duration" => "12"
        */
        "title" => $_POST["title"],
        "job_type" => $_POST["job_type"],
        "description" => $_POST["description"],
        "visibility" => $_POST["visibility"],
        "start_date" => $_POST["start_date"],
        "budget" => $_POST["budget"],
        "duration" => $_POST["duration"],
        "contractor_type" => $_POST["contractor_type"],
        "category2" => $_POST["category2"],
        "subcategory2" => $_POST["subcategory2"]
    );

    $response = $jobs->postJob($params);
    if(gettype ($response) == 'string'){
        echo $response;
    }
    else{
        echo json_encode($response);
    }
}

//Function for posting a job to upwork
if($_POST['operation']=='EditJob' && !empty($_POST['operation']) ){
    //reference id for posting job and other operation
    $buyer_team_reference = $buyerteamreference; //"4940645";

    $jobs = new \Upwork\API\Routers\Hr\Jobs($client);

    //Setting all params required to edit a job
    $params = array(
        "buyer_team__reference" => $buyer_team_reference,
        "title" => $_POST["title"],
        "job_type" => $_POST["job_type"],
        "description" => $_POST["description"],
        "visibility" => $_POST["visibility"],
        "start_date" => $_POST["start_date"],
        "budget" => $_POST["budget"],
        "duration" => $_POST["duration"],
        "contractor_type" => $_POST["contractor_type"],
        "category2" => $_POST["category2"],
        "subcategory2" => $_POST["subcategory2"]
    );

    $job_ref = $_POST['job_ref'];

    $response = $jobs->editJob($job_ref,$params);

    if(gettype ($response) == 'string'){
        echo $response;
    }
    else{
        echo json_encode($response);
    }
}

//Function for posting a job to upwork
if($_POST['operation']=='CancelJob' && !empty($_POST['operation']) ){

    $jobs = new \Upwork\API\Routers\Hr\Jobs($client);

    //Setting all params required to cancel a job
    $params = array("reason_code" => "41");

    $job_ref = $_POST['job_ref'];

    $response = $jobs->deleteJob($job_ref,$params);

    if(gettype ($response) == 'string'){
        echo $response;
    }
    else{
        echo json_encode($response);
    }
}

if($_POST['operation']=='test' && !empty($_POST['operation']) ){
    $metadata = new \Upwork\API\Routers\Metadata($client);
    $a = $metadata->getCategoriesV2();
    echo $a;
}

?>