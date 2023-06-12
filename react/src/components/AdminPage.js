/**
 * Admin Page
 * 
 * Log in in order to remove/give awards to all papers
 * 
 * @author Razvan Cristian Pintea w20018875
 */

import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import UpdateAward from './UpdateAward.js';
import './AdminPage.css';


function AdminPage(props) {

    const [limit, setLimit] = useState(30);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                props.handleAuthenticated(true)
            }
        }
        , [])



    /**
     * Post username and password to the API 
     * and validate them
     *      
     */
    const handleClick = () => {

        const encodedString = Buffer.from(
            username + ":" + password
        ).toString('base64');


        fetch("https://razwebdev.com/chiplay/api/auth",
            {
                method: "POST",
                headers: new Headers({ "Authorization": "Basic " + encodedString })

            })
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (json) => {
                    if (json.message != "endpoint under construction")
                        setLoginStatus("Sorry, " + json.message);
                    else {
                        localStorage.setItem('token', json.data.token);
                        props.handleAuthenticated(true);
                        setLoginStatus("");
                        props.setMainUser(username);
                    }

                })
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )

    }

    /**
     * Sign out the user
     * Reset the username and password fields to blank
     *      
     */
    const handleSignOut = () => {
        localStorage.removeItem('token');
        props.handleAuthenticated(false);
        setUsername("");
        setPassword("");
        props.setMainUser("");
    }

    const showMore = () => { setLimit(limit + 30) }

    const MaxPapersLength = props.papers.length;

    /**
     * Map all papers to a variable and specify
     * desired JSX output
     *      
     */
    const allPapers = props.papers.slice(0, limit).map(
        (value, key) => <section key={key}>
            <UpdateAward paper={value} handleUpdate={props.handleUpdate} />
        </section>
    )




    /**
     * Define what Admin Page displays whether the user is signed in or not
     * If user is not signed in, a log in form will be visible
     * If the user is not signed in, all the papers and their awards will be visible
     *      
     */
    return (
        <div>

            {!props.authenticated && <div>
                <section id="adminMain">
                    <h2>Sign in</h2>
                    <br></br><br></br>
                    Username: <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={handleUsername}
                    />
                    <br></br><br></br>
                    Password <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handlePassword}
                    />
                    <br></br><br></br>
                    <input type="button"
                        value="   Log in    "
                        onClick={handleClick}
                    />
                    <br></br><br></br>
                    <p>{loginStatus}</p>
                    <footer id="firstFooter"><strong>Razvan-Cristian Pintea, 20018875</strong></footer>
                </section>
            </div>
            }

            {props.authenticated && <div>
                <h2>Admin Page</h2>
                <p id="user"><strong>User logged in:</strong> {props.mainUser}</p>
                <input id="adminButton" type="button" value="   Log out   " onClick={handleSignOut} />
                <br></br><br></br><br></br>
                {allPapers}
                {allPapers.length != MaxPapersLength && <button onClick={showMore}>Load More</button>}
                <footer id="secondFooter"><strong>Razvan-Cristian Pintea, 20018875</strong></footer>
            </div>}
        </div>
    )

}
export default AdminPage;