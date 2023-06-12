<?php

/**
 * Database class 
 * 
 * Query the database in order to retrieve information about different papers 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class Paper extends Endpoint
{
   
 
    protected function initialiseSQL() {

        $sql="SELECT paper.paper_id, paper.title, ifnull(paper.award, 'false') AS award, paper.abstract, track.name, track.short_name 
              FROM paper
              JOIN TRACK ON(paper.track_id = track.track_id)";
        
        $params= [];
       if (filter_has_var(INPUT_GET, 'track')) 
            {
                $sql .= " WHERE track.short_name= :track";
                $params[":track"]=$_GET['track'];
             }
             
             $this->setSQL($sql);
             $this->setSQLParams($params);
    
    }


   
 
}