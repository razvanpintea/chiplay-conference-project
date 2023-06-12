/**
 * App component
 * 
 * Fetch all papers from the API and define the routes of the application
 * 
 * @author Razvan Cristian Pintea w20018875
 */


import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage.js';
import Menu from './components/Menu.js';
import Papers from './components/Papers.js';
import AdminPage from './components/AdminPage';
import React, { useState, useEffect } from 'react';




function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const handleAuthenticated = (isAuthenticated) => { setAuthenticated(isAuthenticated) }
  const [mainUser, setMainUser]=useState("");

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [update, setUpdated] = useState(0);
  const handleUpdate = () => { setUpdated(update + 1) }

  const [fullpapersLimit, fullpapersSetLimit] = useState(15);
  const [interactivityLimit, interactivitySetLimit] = useState(15);
  const [doctoralLimit, doctoralSetLimit] = useState(15);
  const [wipLimit, wipSetLimit] = useState(15);
  const [rapidLimit, rapidSetLimit] = useState(15);
  const [competitionLimit, competitionSetLimit] = useState(15);






  useEffect(() => {
    fetch("https://razwebdev.com/chiplay/api/papers")
      .then(
        (response) => response.json()
      )
      .then(
        (json) => {
          setLoading(false);
          setPapers(json.data);
        }
      )
      .catch((err) => {
        console.log(err.message);
      });
  }, [update]);

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/papers" element={<Papers track="" name="" />} />
        <Route path="/fullpapers" element={<Papers data={papers} track="fullpapers" name="Fullpapers" loading={loading} limit={fullpapersLimit} setLimit={fullpapersSetLimit} />} />
        <Route path="/Interactivity" element={<Papers data={papers} track="Interactivity" name="Interactivity" loading={loading} limit={interactivityLimit} setLimit={interactivitySetLimit}/>} />
        <Route path="/doctoral" element={<Papers data={papers} track="doctoral" name="Doctoral" loading={loading} limit={doctoralLimit} setLimit={doctoralSetLimit}/>} />
        <Route path="/wip" element={<Papers data={papers} track="wip" name="Wip" loading={loading} limit={wipLimit} setLimit={wipSetLimit}/>} />
        <Route path="/competition" element={<Papers data={papers} track="competition" name="Competition" loading={loading} limit={competitionLimit} setLimit={competitionSetLimit}/>} />
        <Route path="/rapid" element={<Papers data={papers} track="rapid" name="Rapid" loading={loading} limit={rapidLimit} setLimit={rapidSetLimit}/>} />
        <Route path="/admin" element={<AdminPage papers={papers} authenticated={authenticated} handleAuthenticated={setAuthenticated} handleUpdate={handleUpdate} mainUser={mainUser} setMainUser={setMainUser}/>} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </div>
  );
}

export default App;