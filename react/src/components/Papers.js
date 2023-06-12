/**
 * Papers component
 * 
 * Filter the papers passed by the App comonent, based on the props.track value
 * 
 * @author Razvan Cristian Pintea w20018875
 */


import React, { useState } from 'react';
import Authors from './Authors.js';
import './Papers.css';


function Papers(props) {


    const [searchTerm, setSearchTerm] = useState('');
    const [selectAward, setSelectAward] = useState("all");


    /**
     * Check if search value matches any
     * paper's abstract or title
     *      
     */ 
    const searchAuthors = (value) => {
        const fulldetails = value.title + " " + value.abstract;
        return fulldetails.toLowerCase().includes(searchTerm.toLowerCase());
    }

    /**
     * Match all papers that have the same track
     * as the props.track, passed from App.js
     *      
     */
    const selectTrack = (value) => {
        return value.short_name.includes(props.track);
    }

    const onChange = (event) => setSearchTerm(event.target.value);
    const onSelect = (event) => setSelectAward(event.target.value);


    /**
     * Display papers based on select value
     * Options are: papers that have an award,
     * papers that do not have an award,
     * or all papers
     *      
     */
    const selectPapers = (value) => {
        if (selectAward === "true")
            return (value.award === selectAward);
        if (selectAward === "false")
            return (value.award != "true");
        return (selectAward === "all");
    }


    /**
     * Check Maximum Length of the user's search result
     *      
     */
    const AllPapersLength = props.data.filter(selectTrack).filter(selectPapers).filter(searchAuthors).length;

    /**
     * Map all papers passed from App.js, filter them based on track,
     * search value, and select value, and 
     * specify desired JSX output
     *      
     */
    const listOfPapers = props.data.filter(selectTrack).filter(searchAuthors).filter(selectPapers).slice(0, props.limit).map(
        (value, key) => <section key={value.paper_id}>
            <h4>{value.title}</h4> <br></br>
            <p id="abstract"><strong>Abstract: </strong>{value.abstract}</p>
            <p><strong>Award received: </strong>{value.award}</p>
            <Authors paper_id={value.paper_id} />
            <br></br><br></br><br></br>
        </section>
    )

    
    /**
     * Check current Length of the user's search result
     *      
     */
    const maxPapersLength = listOfPapers.length;

    const showMore = () => { props.setLimit(props.limit + 15) }


    /**
     * Return all of the papers, based on track, search, and select value
     * Only 15 entries are loaded firstly, but 15 more can be loaded each time the user presses the 'Load More' button
     * If there are no more entries left to be loaded, the button is not displayed anymore
     * If the user's search and select value do not match any entry, appropriate message is displayed
     *      
     */
    return (
        <div>
            <section id="main">
                <h1>{props.name} Papers</h1>
                <br></br>
                <div>
                    <strong>Search Papers by Title or Abstract: </strong>
                    <input value={searchTerm} onChange={onChange} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>Select Papers: </strong><select value={selectAward} onChange={onSelect}>
                        <option value="all">All</option>
                        <option value="true">With awards</option>
                        <option value="false">Without awards</option>
                    </select>
                </div>
                <br></br><br></br>
                {listOfPapers}
                {props.loading && <p>Loading...</p>}
                {maxPapersLength != 0 && maxPapersLength != AllPapersLength && !props.loading && <button onClick={showMore}>Load More</button>}
                <br></br><br></br>
                {!props.loading && maxPapersLength === 0 && <h2>Sorry, No results found. Try Searching for other papers.</h2>}
            </section>
            <footer><strong>Copyright © 2023. All rights are reserved</strong></footer>
        </div>
    )
}


export default Papers;