/**
 * Affiliation component
 * 
 * Retrieve all affiliations of an author on a certain paper
 * 
 * @author Razvan Cristian Pintea w20018875
 */

import React, { useState, useEffect } from 'react';
 
 
function AuthorAffiliation(props) {
 
 
    const [affiliations, setAffiliations] = useState([]);
    const [loading, setLoading] = useState(true);
 
 
    /**
     * Send request to the API and retrieve
     * affiliations of author and assign them
     * to 'affiliations' variable
     *      
     */
    useEffect( () => {
        fetch("https://razwebdev.com/chiplay/api/affiliation?author_id="+props.author_id+"&paper_id="+props.paper_id)
        .then( 
            (response) => response.json()
        )
        .then( 
            (json) => {
                setLoading(false);
                setAffiliations(json.data);
            } 
        )
        .catch((err) => {
            console.log(err.message);
        });
    }, []);
 
 
    /**
     * Map fetch result to a variable and specify
     * desired JSX output
     *      
     */
    const listOfAffiliations = 
         affiliations.map(
            (value, key) => <section key={key}>
            <p><strong>Country:</strong> {value.country},<strong> Institution: </strong>{value.institution}</p>
            </section>
        )
 

 
    /**
     * Return the affiliations of author once the fetch request
     * is completed. Otherwise, display Loading message
     *      
     */
    return (
        <div>
            {loading && <p>Loading...</p>}
            {listOfAffiliations}
        </div>
    )
}
 
 
export default AuthorAffiliation;