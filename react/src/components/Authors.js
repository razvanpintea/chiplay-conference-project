/**
 * Authors component
 * 
 * Retrieve all authors of a certain paper
 * 
 * @author Razvan Cristian Pintea w20018875
 */


import './Authors.css';
import React, { useState } from 'react';
import AuthorAffiliation from './AuthorAffiliation.js';


function Authors(props) {


    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [buttonState, setButtonState] = useState("Show");




    /**
     * Send request to the API and retrieve
     * all authors of paper and assign them
     * to 'authors' variable
     *      
     */
    const fetchActors = () => {
        fetch("https://razwebdev.com/chiplay/api/authors?paper_id=" + props.paper_id)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setLoading(false);
                    setAuthors(json.data);
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }


    /**
     * Map fetch result to a variable and specify
     * desired JSX output
     *      
     */
    const listOfAuthors =
        authors.map(
            (value, key) => <section key={key}>
                <section><strong>Name: </strong>{value.first_name} {value.last_name} <AuthorAffiliation author_id={value.author_id} paper_id={props.paper_id} /></section>

            </section>
        )

    
    /**
     * Function activated on button click
     * Changes state of button(show authors/hide authors)
     * Makes authors of paper visible
     *      
     */
    const showDetails = () => {
        fetchActors();
        setVisible(!visible);
        if(buttonState==="Show")
        setButtonState("Hide");
        else
        setButtonState("Show");
    }

    return (
        <div>
            <button id="button" onClick={showDetails}>{buttonState} Authors</button>
            <br></br><br></br>
            {visible && <div>
                {loading && <p>Loading...</p>}
                {listOfAuthors}
            </div>}
        </div>
    )
}


export default Authors;