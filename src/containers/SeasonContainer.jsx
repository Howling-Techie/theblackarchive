import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchEpisodesBySeason, fetchSeason} from "../services/supabase";
import SeasonInfo from "../components/SeasonInfo.jsx";

const EpisodeContainer = () => {
    const {season_id} = useParams();
    const [season, setSeason] = useState(null);
    const [episodes, setEpisodes] = useState(null);

    useEffect(() => {
        const fetchSeasonData = async () => {
            try {
                const seasonData = await fetchSeason(season_id);
                const episodesData = await fetchEpisodesBySeason(season_id);

                setSeason(seasonData);
                setEpisodes(episodesData);
            } catch (error) {
                console.error("Error fetching episode:", error);
            }
        };

        fetchSeasonData();
    }, [season_id]);

    return (
        <div>
            {season && <SeasonInfo season={season} episodes={episodes}/>}
        </div>
    );
};

export default EpisodeContainer;