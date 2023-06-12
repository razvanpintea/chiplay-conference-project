/**
 * Home page component
 * 
 * This is the main page of the application
 * 
 * @author first last
 */

import picture from './img/picture.jpg';
import './HomePage.css';



function HomePage() {
    return (
        <div>
            <section id="homeMain">
                <h1>Welcome to the home page!</h1><br></br>
                <p>This application allows users to browse freely through all the papers that were presented at the 2021 Chiplay Conference.</p>
                <p>Under the menu dropdown, there are 6 different conference tracks that can be selected, all the papers being organized by track.</p>
                <p>Each paper has a title, an abstract, its authors, and it can be seen whether it had received an award or not.</p>
                <p>Each author has at least one country and institution, which represent his/her affiliation(s) to the selected paper.</p>
                <p>Under the Admin page, the administrator can log in with the secret credentials, and give or remove awards for all the papers.</p>
                <img src={picture} alt="Nature Picture" />
                <p><a href="https://unsplash.com/photos/NRQV-hBF10M">Photo </a>by <a href="https://unsplash.com/@baileyzindel">Bailey Zindel </a> on <a href="https://unsplash.com/">Unsplash</a></p>
            </section>
            <footer id="homeFooter"><strong>Copyright © 2023. All rights are reserved</strong></footer>

        </div>
    );
}

export default HomePage;