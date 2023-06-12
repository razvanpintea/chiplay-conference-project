<?php

/**
 * Base Endpoint of the API
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class Base extends Endpoint {
    /**
     * Override the constructor 
     * endpoint.
     */

    public function __construct() {


        /**
         * Assign student details to $student
         */
        $student = array(
            "first_name" => "Razvan-Cristian",
            "last_name" => "Pintea",
            "student_id" => "w20018875"
        );

        /**
         * Assign module details to $student
         */
        $module = array(
            "code" => "KF6012",
            "name" => "Web Application Integration",
            "level" => 6,
            "module_tutor" => "John Rooksby",
        );

        $db = new Database(DATABASE);

        $this -> initialiseSQL();

        /**
         * Retrieve name of conference from the database and assign it to $conference
         */
        $conference = $db -> executeSQL($this -> sql, $this -> sqlParams);


        /**
         * Define what $data contains
         */
        $data = array(
            "name" => $student,
            "module" => $module,
            "conference"=> $conference
        );

        $this -> setData(array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }


    /**
     * Define SQL and SQL parameters
     */
    protected function initialiseSQL() {
        $sql = "SELECT name FROM conference_information";
        $params = [];
        $this -> setSQL($sql);
        $this -> setSQLParams($params);
    }
}

