import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EpisodePage from "../pages/EpisodePage.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/episode/:episode_id" element={<EpisodePage/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;