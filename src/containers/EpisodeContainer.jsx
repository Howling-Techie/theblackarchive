import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchEpisode} from "../services/supabase"; // Assuming your function is in this file
import EpisodeInfo from "../components/EpisodeInfo";

const EpisodeContainer = () => {
    const {episode_id} = useParams();
    const [episode, setEpisode] = useState(null);

    useEffect(() => {
        const fetchEpisodeData = async () => {
            try {
                const episodeData = await fetchEpisode(episode_id);
                setEpisode(episodeData);
            } catch (error) {
                console.error("Error fetching episode:", error);
            }
        };

        fetchEpisodeData();
    }, [episode_id]);

    return (
        <div>
            {episode && <EpisodeInfo episode={episode}/>}
        </div>
    );
};

export default EpisodeContainer;