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

    const episodePromises = data.map(async episode => {
        return await fetchEpisode(episode.episode_id);
    });

    return (await Promise.all(episodePromises)).sort((a, b) => a.episode_code > b.episode_code ? 1 : -1);
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

    const episodePromises = data.map(async episode => {
        return await fetchEpisode(episode.episode_id);
    });

    return (await Promise.all(episodePromises)).sort((a, b) => a.episode_code > b.episode_code ? 1 : -1);
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

    const episodePromises = data.map(async episode => {
        return await fetchEpisode(episode.episode_id);
    });

    return (await Promise.all(episodePromises)).sort((a, b) => a.episode_code > b.episode_code ? 1 : -1);
};

const fetchArtwork = async (folder, id) => {

    const {data: exists} = await supabase
        .storage
        .from("cover_art")
        .list(`${folder}`, {
            limit: 10,
            offset: 0,
            search: `${id}.jpg`
        });
    if (exists.length !== 1) {
        return undefined;
    }
    const {data} = supabase
        .storage
        .from("cover_art")
        .getPublicUrl(`${folder}/${id}.jpg`);

    return data;
};
const fetchEpisodeArtwork = async (episode) => {
    let coverArt = await fetchArtwork("episodes", episode.episode_id);
    if (!coverArt && episode.season) {
        coverArt = await fetchArtwork("seasons", episode.season.season_id);
    }
    if (!coverArt && episode.series) {
        coverArt = await fetchArtwork("series", episode.series.series_id);
    }
    if (!coverArt && episode.range) {
        coverArt = await fetchArtwork("ranges", episode.range.range_id);
    }
    if (!coverArt && episode.category) {
        coverArt = await fetchArtwork("categories", episode.category.category_id);
    }
    return coverArt.publicUrl;
};
const fetchSeasonArtwork = async (season) => {
    let coverArt = await fetchArtwork("seasons", season.season_id);
    if (!coverArt && season.series) {
        coverArt = await fetchArtwork("series", season.series.series_id);
    }
    if (!coverArt && season.range) {
        coverArt = await fetchArtwork("ranges", season.range.range_id);
    }
    if (!coverArt && season.category) {
        coverArt = await fetchArtwork("categories", season.category.category_id);
    }
    return coverArt.publicUrl;
};
const fetchSeriesArtwork = async (series) => {
    let coverArt = await fetchArtwork("series", series.series_id);
    if (!coverArt && series.range) {
        coverArt = await fetchArtwork("ranges", series.range.range_id);
    }
    if (!coverArt && series.category) {
        coverArt = await fetchArtwork("categories", series.category.category_id);
    }
    return coverArt.publicUrl;
};
const fetchRangeArtwork = async (range) => {
    let coverArt = await fetchArtwork("ranges", range.range_id);
    if (!coverArt && range.category) {
        coverArt = await fetchArtwork("categories", range.category.category_id);
    }
    return coverArt.publicUrl;
};
const fetchCategoryArtwork = async (category) => {
    return (await fetchArtwork("categories", category.category_id)).publicUrl;
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
    data.cover_art = await fetchCategoryArtwork(data);
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

    const categoryData = data.categories;
    delete data.categories;
    data.category = categoryData;

    data.cover_art = await fetchRangeArtwork(data);

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

    const categoryData = data.ranges.categories;
    delete data.ranges.categories;
    const rangeData = data.ranges;
    delete data.ranges;

    data.category = categoryData;
    data.range = rangeData;

    data.cover_art = await fetchSeriesArtwork(data);

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

    const categoryData = data.series.ranges.categories;
    delete data.series.ranges.categories;
    const rangeData = data.series.ranges;
    delete data.series.ranges;
    const seriesData = data.series;
    delete data.series;

    data.category = await fetchCategory(categoryData.category_id);
    data.range = await fetchRange(rangeData.range_id);
    data.series = await fetchSeries(seriesData.series_id);

    data.cover_art = await fetchSeasonArtwork(data);

    console.log(data);

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

    const episodeData = {
        episode_id: data.episode_id,
        episode_name: data.episode_name,
        episode_number: data.episode_number,
        episode_code: data.episode_code,
        summary: data.summary,
        release_date: data.release_date,
        added_on: data.added_on
    };

    if (data.seasons !== null) {
        const season = data.seasons;
        const series = data.seasons.series;
        const range = data.seasons.series.ranges;
        const category = data.seasons.series.ranges.categories;

        episodeData.season = {season_id: season.season_id, season_name: season.season_name};
        episodeData.series = {series_id: series.series_id, series_name: series.series_name};
        episodeData.range = {range_id: range.range_id, range_name: range.range_name};
        episodeData.category = {category_id: category.category_id, category_name: category.category_name};
    } else if (data.series !== null) {
        const series = data.series;
        const range = data.series.ranges;
        const category = data.series.ranges.categories;

        episodeData.series = {series_id: series.series_id, series_name: series.series_name};
        episodeData.range = {range_id: range.range_id, range_name: range.range_name};
        episodeData.category = {category_id: category.category_id, category_name: category.category_name};
    } else if (data.ranges !== null) {
        const range = data.ranges;
        const category = data.ranges.categories;

        episodeData.range = {range_id: range.range_id, range_name: range.range_name};
        episodeData.category = {category_id: category.category_id, category_name: category.category_name};
    }

    episodeData.cover_art = await fetchEpisodeArtwork(episodeData);

    const {data: prequelData} = await supabase
        .from("episoderelationships")
        .select(`episode:prerequisite_episode_id(episode_code, episode_id, episode_name)`)
        .eq("continuation_episode_id", episodeId);

    const {data: sequelData} = await supabase
        .from("episoderelationships")
        .select(`episode:continuation_episode_id(episode_code, episode_id, episode_name)`)
        .eq("prerequisite_episode_id", episodeId);

    episodeData.prerequisites = prequelData;
    episodeData.followUps = sequelData;
    console.log(episodeData);

    return episodeData;
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