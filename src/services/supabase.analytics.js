import {createClient} from "@supabase/supabase-js";
import configData from "../config/config.json";

const supabase = createClient(configData.SUPABASE_URL, configData.SUPABASE_KEY);

const fetchCategoryProgress = async () => {
    const {count: categoryCount} = await supabase
        .from("categories")
        .select("*", {count: "exact", head: true});

    const {count: missingSummaryCount} = await supabase
        .from("categories")
        .select("*", {count: "exact", head: true})
        .is("summary", null);

    const {data: missingImageData} = await supabase
        .storage
        .from("cover_art")
        .list("categories");

    return {
        total: {name: "Total Categories", value: categoryCount},
        missingSummary: {name: "Missing Summary", value: missingSummaryCount},
        missingImage: {name: "Missing Image", value: categoryCount - missingImageData.length}
    };
};
const fetchRangeProgress = async () => {
    const {count: rangeCount} = await supabase
        .from("ranges")
        .select("*", {count: "exact", head: true});

    const {count: missingSummaryCount} = await supabase
        .from("ranges")
        .select("*", {count: "exact", head: true})
        .is("summary", null);

    const {count: missingCodeCount} = await supabase
        .from("ranges")
        .select("*", {count: "exact", head: true})
        .is("range_code", null);

    const {data: missingImageData} = await supabase
        .storage
        .from("cover_art")
        .list("ranges");

    return {
        total: {name: "Total Ranges", value: rangeCount},
        missingSummary: {name: "Missing Summary", value: missingSummaryCount},
        missingCode: {name: "Missing Range Code", value: missingCodeCount},
        missingImage: {name: "Missing Image", value: rangeCount - missingImageData.length}
    };
};

const fetchSeriesProgress = async () => {
    const {count: seriesCount} = await supabase
        .from("series")
        .select("*", {count: "exact", head: true});

    const {count: missingSummaryCount} = await supabase
        .from("series")
        .select("*", {count: "exact", head: true})
        .is("summary", null);

    const {count: missingCodeCount} = await supabase
        .from("series")
        .select("*", {count: "exact", head: true})
        .is("series_code", null);

    const {data: missingImageData} = await supabase
        .storage
        .from("cover_art")
        .list("series", {limit: 1000});

    return {
        total: {name: "Total Series", value: seriesCount},
        missingSummary: {name: "Missing Summary", value: missingSummaryCount},
        missingCode: {name: "Missing Series Code", value: missingCodeCount},
        missingImage: {name: "Missing Image", value: seriesCount - missingImageData.length}
    };
};

const fetchSeasonProgress = async () => {
    const {count: seasonCount} = await supabase
        .from("seasons")
        .select("*", {count: "exact", head: true});

    const {count: missingSummaryCount} = await supabase
        .from("seasons")
        .select("*", {count: "exact", head: true})
        .is("summary", null);

    const {count: missingNumberCount} = await supabase
        .from("seasons")
        .select("*", {count: "exact", head: true})
        .is("season_number", null);

    const {data: missingImageData} = await supabase
        .storage
        .from("cover_art")
        .list("seasons");

    return {
        total: {name: "Total Ranges", value: seasonCount},
        missingSummary: {name: "Missing Summary", value: missingSummaryCount},
        missingNumber: {name: "Missing Season Number", value: missingNumberCount},
        missingImage: {name: "Missing Image", value: seasonCount - missingImageData.length}
    };
};

const fetchEpisodeProgress = async () => {
    const {count: episodeCount} = await supabase
        .from("episodes")
        .select("*", {count: "exact", head: true});

    const {count: missingSummaryCount} = await supabase
        .from("episodes")
        .select("*", {count: "exact", head: true})
        .is("summary", null);

    const {count: missingCodeCount} = await supabase
        .from("episodes")
        .select("*", {count: "exact", head: true})
        .is("episode_code", null);

    const {count: missingNumberCount} = await supabase
        .from("episodes")
        .select("*", {count: "exact", head: true})
        .is("episode_number", null);

    const {data: missingImageDataP1} = await supabase
        .storage
        .from("cover_art")
        .list("episodes", {limit: 1000});
    const {data: missingImageDataP2} = await supabase
        .storage
        .from("cover_art")
        .list("episodes", {limit: 1000, offset: 1000});

    return {
        total: {name: "Total Episodes", value: episodeCount},
        missingSummary: {name: "Missing Summary", value: missingSummaryCount},
        missingCode: {name: "Missing Episode Code", value: missingCodeCount},
        missingNumber: {name: "Missing Episode Number", value: missingNumberCount},
        missingImage: {
            name: "Missing Image",
            value: episodeCount - missingImageDataP1.length - missingImageDataP2.length
        }
    };
};

const fetchProgress = async () => {
    const progress = {
        categories: await fetchCategoryProgress(),
        ranges: await fetchRangeProgress(),
        series: await fetchSeriesProgress(),
        seasons: await fetchSeasonProgress(),
        episodes: await fetchEpisodeProgress()
    };
    console.log(progress);
    return progress;
};

export {
    fetchProgress
};