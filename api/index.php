<?php

/**
 * Main page of the SPA (Single Page Application)
 * 
 * @author Razvan Cristian Pintea w20018875
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    exit(0);
} 
 
include 'config/autoloader.php';
spl_autoload_register('autoloader');

include 'config/errorhandler.php';
set_error_handler('errorHandler');

include 'config/exceptionhandler.php';
set_exception_handler('exceptionHandler');
 
define('SECRET', "HpEkSRsJhCcEl0uCA2vzxFbZxGQZZY7r");

    $request = new Request();
    $requestmethods= array( 1  => "GET", 2  => "POST",);
    $method=$_SERVER['REQUEST_METHOD'];
    $request->validateRequestMethod($method, $requestmethods);
switch($request->getPath()) {
    case '/':
        $endpoint = new Base($request);
        break;
    case '/author/':
    case '/author':
    case '/authors/':
    case '/authors':
        $endpoint = new Author($request);
        break;
    case '/paper/':
    case '/paper':
    case '/papers/':
    case '/papers':
    $endpoint = new Paper($request);
          break;    
    case '/auth':
    case '/auth/':
        $endpoint= new Authenticate($request);
        break;
    case '/update/':
    case '/update':
        $endpoint = new Update($request);
        break;
    case '/affiliation/':
    case '/affiliation':
        $endpoint = new Affiliation();
        break;
    default:
        $path=$request->getPath();
        $endpoint = new ClientError("Path not found: " . $path, 404);
}
$data = $endpoint->getData();
echo json_encode($data);