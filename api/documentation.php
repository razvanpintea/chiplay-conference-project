<?php

/**
 *Documentation endpoint 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

include 'config/autoloader.php';
spl_autoload_register('autoloader');

include 'config/errorhandler.php';
set_error_handler('errorHandler');

include 'config/exceptionhandler.php';
set_exception_handler('exceptionHandler');


$title="API Documentation";
$heading="API Documentation";
$documentation =new Webpage($title,$heading);

$documentation->addParagraph("Name: Razvan Cristian Pintea");
$documentation->addParagraph("Student ID: 20018875");

$documentation->addHeading2("API Endpoints");
$documentation->addHeading4("1. Base Endpoint");
$documentation->addParagraph("This Endpoint only allows POST or GET requests and displays information about the author of the API and some details about the  KF6012 module of Northumbria University ");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/'>http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/</a><br></br>");

$documentation->addHeading4("2. Authors Endpoint");
$documentation->addParagraph("This Endpoint only allows POST or GET requests and displays information about the authors of the papers from the Chiplay 2021 Conference");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/authors'>http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/authors</a>");
$documentation->addParagraph("The authors Endpoint also accepts a <strong>paper_id</strong> parameter. For example, adding <strong>paper_id=64455</strong> as a parameter, would display all the authors that are associated with the conference paper that has the id 64455.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/authors?paper_id=64455'>http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/authors?paper_id=64455</a><br></br>");

$documentation->addHeading4("3. Papers Endpoint");
$documentation->addParagraph("This Endpoint only allows POST or GET requests and displays information about the papers from the Chiplay 2021 Conference");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/papers'>http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/papers</a>");
$documentation->addParagraph("The authors Endpoint also accepts a <strong>track</strong> parameter. For example, adding <strong>track=fullpapers</strong> as a parameter, would display all the papers belonging to the fullpapers track. Other available tracks are Interactivity, doctoral, wip, rapid and competition.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/papers?track=fullpapers'>http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/papers?track=fullpapers</a><br></br>");

$documentation->addHeading4("4. Authentification Endpoint");
$documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/auth");
$documentation->addParagraph("This endpoint only allows POST requests, and it accepts two authentication headers, a username and a password, 
which are compared with details from a database. If the username and passord match the ones from the database, the endpoint generates a valid JWT (Jason Web Token).
 If details are wrong or left empty, appropiate messages are returned instead.<br></br>");

 $documentation->addHeading4("5. Update Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/update");
 $documentation->addParagraph("The Update Endpoint only allows POST requests, and it accepts 2 parameteres, <strong>paper_id</strong> and <strong>award</strong>. The allowed values for the award parameter 
 are true or false, and the paper which has the same ID as the <strong>paper_id</strong> parameter, will change its award accordingly to the <strong>award</strong> parameter.");
 $documentation->addParagraph("To be noted that the actions above can only take place if the user is signed in with a valid JWT (Jason Web Token)");
 $documentation->addParagraph("If a token can not be found or the token is invalid, the page throws a 401 http response code, and if one of the <strong>paper_id</strong> or the <strong>award</strong> parameters is missing, the page throws a 400 http response code.<br></br>");

 $documentation->addHeading4("5. Affiliation Endpoint");
 $documentation->addParagraph("This endpoint only allows POST or GET requests and accepts two parameters, <strong>author_id</strong> and <strong>paper_id</strong>. A valid request would return all the affiliations of the author that has the same ID as the <strong>author_id</strong> parameter, in relevance to the paper that has the same ID as the <strong>paper_id</strong> parameter.");
 $documentation->addParagraph("For example, the link below retrieves all the affiliations of the author with the <strong>author_id</strong> 64632, belonging to the paper with the <strong>paper_id</strong> 64825");
 $documentation->addParagraph("<a href=' http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/affiliation?author_id=64632&paper_id=64825'> http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/affiliation?author_id=64632&paper_id=64825</a><br></br>");

 $documentation->addHeading4("6. Invalid Endpoints");
 $documentation->addParagraph("If requests are going to be made to other endpoints, users will be displayed with a ''path not found/'path' '' message, and the page throws a 404 http response code."); 
 $documentation->addParagraph("An example of an invalid endpoint is: <a href='http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/invalid'>http://unn-w20018875.newnumyspace.co.uk/year3/assessment2/invalid</a><br></br><br></br>"); 

 $documentation->addHeading2("HTTP Response Codes");

 $documentation->addParagraph("This API will throw 4 different HTTP response codes, in 4 different situations.<br></br>"); 
 $documentation->addHeading4("1. 400 Response Code");
 $documentation->addParagraph("The 400 HTTP response code will be used on the Update Endpoint, if one of the <strong>paper_id</strong> or the <strong>award</strong> parameters is missing.<br></br>"); 

 $documentation->addHeading4("2. 401 Response Code");
 $documentation->addParagraph("The 401 HTTP response code will be used on the Update Endpoint, If a valid JWT (Jason Web Token) can not be found or the token is invalid.<br></br>");
 
 $documentation->addHeading4("3. 404 Response Code");
 $documentation->addParagraph("The 404 HTTP response code will be used in the scenario where the path can not be found, such as Example nr. 6 above,  called ''Invalid Endpoints''.<br></br>");

 $documentation->addHeading4("5. 500 Response Code");
 $documentation->addParagraph("The 500 HTTP response code takes place when any error or exception is caught.");

 echo $documentation->generateWebpage();
