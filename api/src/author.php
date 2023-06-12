<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve information about different authors 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class Author extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT * FROM AUTHOR";
        $params=[];

       if (filter_has_var(INPUT_GET, 'paper_id')) 
            {
              
            $sql="SELECT author_id, author.first_name, author.middle_initial, author.last_name
            FROM AUTHOR 
            JOIN PAPER_HAS_AUTHOR ON (author.author_id = paper_has_author.authorId)
            WHERE paper_has_author.paper_id= :id";
               
                $params[":id"]=$_GET['paper_id'];
             }
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}