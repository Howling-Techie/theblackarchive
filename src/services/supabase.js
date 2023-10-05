import {createClient} from "@supabase/supabase-js";
import configData from "../config/config.json";

const supabase = createClient(configData.SUPABASE_URL, configData.SUPABASE_KEY);

const fetchCategories = async () => {
    const {data, error} = await supabase
        .from("categories")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const fetchRangesByCategory = async (categoryId) => {
    if (!Number.isSafeInteger(+categoryId)) {
        return [];
    }

    const {data, error} = await supabase
        .from("ranges")
        .select("*")
        .eq("category_id", categoryId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const fetchSeriesByRange = async (rangeId) => {
    if (!Number.isSafeInteger(+rangeId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("series")
        .select("*")
        .eq("range_id", rangeId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const fetchSeasonsBySeries = async (seriesId) => {
    if (!Number.isSafeInteger(+seriesId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("seasons")
        .select("*")
        .eq("series_id", seriesId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const fetchEpisodesBySeason = async (seasonId) => {
    if (!Number.isSafeInteger(+seasonId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("episodes")
        .select("*")
        .eq("season_id", seasonId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const fetchEpisodesBySeries = async (seriesId) => {
    if (!Number.isSafeInteger(+seriesId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("episodes")
        .select("*")
        .eq("series_id", seriesId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const fetchEpisodesByRange = async (rangeId) => {
    if (!Number.isSafeInteger(+rangeId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("episodes")
        .select("*")
        .eq("range_id", rangeId);

    if (error) {
        return [];
    }
    return data;
};

const fetchArtwork = async (folder, id) => {
    const {data} = supabase
        .storage
        .from("cover-art")
        .getPublicUrl(`${folder}/${id}.jpg`);

    return data;
};

const fetchCategory = async (categoryId) => {
    if (!Number.isSafeInteger(+categoryId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("categories")
        .select("*")
        .eq("category_id", categoryId)
        .maybeSingle();

    if (error) {
        return [];
    }
    return data;
};

const fetchRange = async (rangeId) => {
    if (!Number.isSafeInteger(+rangeId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("ranges")
        .select(`*, categories(category_id, category_name)`)
        .eq("range_id", rangeId)
        .maybeSingle();

    if (error) {
        return [];
    }
    return data;
};

const fetchSeries = async (seriesId) => {
    if (!Number.isSafeInteger(+seriesId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("series")
        .select("*, ranges(range_id, range_name, categories(category_id, category_name))")
        .eq("series_id", seriesId)
        .maybeSingle();

    if (error) {
        return [];
    }
    return data;
};

const fetchSeason = async (seasonId) => {
    if (!Number.isSafeInteger(+seasonId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("seasons")
        .select("*, series(series_id, series_name, ranges(range_id, range_name, categories(category_id, category_name)))")
        .eq("season_id", seasonId)
        .maybeSingle();

    if (error) {
        return [];
    }
    return data;
};

const fetchEpisode = async (episodeId) => {
    if (!Number.isSafeInteger(+episodeId)) {
        return [];
    }
    const {data, error} = await supabase
        .from("episodes")
        .select(`*,
        seasons(season_id, season_name, series(series_id, series_name, ranges(range_id, range_name, categories(category_id, category_name)))),
        series(series_id, series_name, ranges(range_id, range_name, categories(category_id, category_name))),
        ranges(range_id, range_name, categories(category_id, category_name))`)
        .eq("episode_id", episodeId)
        .maybeSingle();

    if (error) {
        return [];
    }
    return data;
};

export {
    fetchCategories,
    fetchRangesByCategory,
    fetchSeriesByRange,
    fetchSeasonsBySeries,
    fetchEpisodesBySeason,
    fetchEpisodesBySeries,
    fetchEpisodesByRange,
    fetchArtwork,
    fetchCategory,
    fetchRange,
    fetchSeries,
    fetchSeason,
    fetchEpisode
};