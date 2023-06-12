<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/** 
 * Update Award
 * 
 * Update the langauge for a specified film. A valid JWT is required.
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class Update extends Endpoint {
    public function __construct() {

        /**
         * Validate request method, token and the award and paper_id parameters 
         *
         */
        $this -> validateRequestMethod("POST");
        $this -> validateToken();
        $this -> validateUpdateParams();

        /**
         * Connect to database, initialise SQL, and store query result in $queryResult
         *
         */
        $db = new Database("db/chiplay.sqlite");
        $this -> initialiseSQL();
        $queryResult = $db -> executeSQL($this -> getSQL(), $this -> getSQLParams());

        $this -> setData(array(
            "length" => 0,
            "message" => "endpoint under construction",
            "data" => null
        ));
    }


    private function validateToken() {
        /**
         * Assign the secret key
         *
         */
        $secretKey = SECRET;


        /**
         * Get all headers from the http request
         *
         */
        $allHeaders = getallheaders();
        $authorizationHeader = "";

        /**
         * Look for an Authorization header 
         *
         *It might start with a capital A, or a lowercase a 
         *
         */
        if (array_key_exists('Authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['Authorization'];
        } elseif(array_key_exists('authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['authorization'];
        }

        /**
         * Check if there is a Bearer token in the header
         *
         */
        if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
            throw new ClientErrorException("Bearer token required", 401);
        }

        /**
         * Extract the JWT from the header (by cutting the text 'Bearer ')
         *
         */
        $jwt = trim(substr($authorizationHeader, 7));


        /**
         * Use the JWT class to decode the token
         *
         */
        try {
            $decoded = JWT:: decode($jwt, new Key($secretKey, 'HS256'));
        } catch (Exception $e) {
            throw new ClientErrorException($e -> getMessage(), 401);
        }

        if ($decoded -> iss != $_SERVER['HTTP_HOST']) {
            throw new ClientErrorException("invalid token issuer", 401);
        }
    }



    /**
     * Validate the existence of the award and paper_id parameters
     *
     *Throw Custom exceptions and http response codes if they don't exist
     *
     */
    private function validateUpdateParams() {

        if (!filter_has_var(INPUT_POST, 'award')) {
            throw new ClientErrorException("award parameter required", 400);
        }
        if (!filter_has_var(INPUT_POST, 'paper_id')) {
            throw new ClientErrorException("paper_id parameter required", 400);
        }

        $awards = ["true", "false"];
        if (!in_array(strtolower($_POST['award']), $awards)) {
            throw new ClientErrorException("invalid award", 400);
        }
    }


    /**
     * Set SQL statement and SQL parameters
     * 
     */
    protected function initialiseSQL() {
        $awards = ["true"=> "true", "false"=> "false"];
        $award = $awards[strtolower($_POST['award'])];

        $sql = "UPDATE paper SET award = :award WHERE paper_id = :paper_id";
        $this -> setSQL($sql);
        $this -> setSQLParams(['award'=> $award, 'paper_id'=> $_POST['paper_id']]);
    }


    /**
     * Validate  HTTP request methods
     *
     * This function validates the HTTP request method used, by checking the valid HTTP request method passed as an argument 
     * If the server request method used is not equal to the parameter, an error message is displayed
     *
     * @param  String   $method          A string which represents the used HTTP request 
     * @
     */
    private     function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            die(json_encode(array(
                "message" => "invalid request method"
            )));
        }
    }


}