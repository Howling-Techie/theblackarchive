import React, {useEffect, useState} from "react";
import {} from "../services/supabase";
import {fetchProgress} from "../services/supabase.analytics.js";
import ProgressInfo from "../components/ProgressInfo.jsx";

const ProgressContainer = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchProgressData = async () => {
            try {
                const analyticsData = await fetchProgress();
                console.log("Fetching analytics");
                setAnalytics(analyticsData);
            } catch (error) {
                console.error("Error fetching progress:", error);
            }
        };

        fetchProgressData();
    }, []);

    return (
        <div>
            {analytics && <ProgressInfo progress={analytics}/>}
        </div>
    );
};

export default ProgressContainer;