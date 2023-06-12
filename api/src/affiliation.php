<?php
/**
 * Affiliation endpoint  
 * 
 * Retrieve all the affiliations of a certain author, on a specific conference paper
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class Affiliation extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT author.author_id, author.first_name, author.middle_initial, author.last_name, affiliation.country, affiliation.institution, affiliation.paper_id
            FROM AUTHOR 
            JOIN AFFILIATION ON(author.author_id=affiliation.person_id)";
        $params=[];

       if (filter_has_var(INPUT_GET, 'author_id') && filter_has_var(INPUT_GET, 'paper_id')) 
            {
              
            $sql .="WHERE author.author_id= :id AND affiliation.paper_id= :paperID" ;
               
                $params[":id"]=$_GET['author_id'];
                $params[":paperID"]=$_GET['paper_id'];
             }
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}