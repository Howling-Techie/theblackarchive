import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EpisodePage from "../pages/EpisodePage.jsx";
import SeasonPage from "../pages/SeasonPage.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/episode/:episode_id" element={<EpisodePage/>}/>
                <Route path="/season/:season_id" element={<SeasonPage/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;