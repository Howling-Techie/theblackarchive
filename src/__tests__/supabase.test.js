import {
    fetchCategories, fetchCategory, fetchEpisode, fetchEpisodesBySeason, fetchRange,
    fetchRangesByCategory, fetchSeason,
    fetchSeasonsBySeries, fetchSeries,
    fetchSeriesByRange
} from "../services/supabase.js";
import * as matchers from "jest-extended";

expect.extend(matchers);

describe("fetchCategories", () => {
    it("fetches categories from Supabase", async () => {
        const categories = await fetchCategories();

        categories.forEach((category) => {
            expect(category).toMatchObject({
                category_id: expect.any(Number),
                category_name: expect.any(String),
                summary: expect.toBeOneOf([expect.any(String), null])
            });
        });
    });
});

describe("fetchRangesByCategory", () => {
    it("fetches ranges from Supabase based on category ID", async () => {
        const ranges = await fetchRangesByCategory(1);
        expect(ranges.length > 0);
        ranges.forEach((range) => {
            expect(range).toMatchObject({
                range_id: expect.any(Number),
                category_id: 1,
                range_name: expect.any(String),
                range_code: expect.toBeOneOf([expect.any(String), null]),
                summary: expect.toBeOneOf([expect.any(String), null])
            });
        });
    });
    it("fetches an empty array when provided an invalid datatype", async () => {
        const ranges = await fetchRangesByCategory(1.1);
        expect(ranges.length === 0);
    });
});

describe("fetchSeriesByRanges", () => {
    it("fetches series from Supabase based on range ID", async () => {
        const series = await fetchSeriesByRange(2);
        expect(series.length > 0);
        series.forEach((element) => {
            expect(element).toMatchObject({
                series_id: expect.any(Number),
                range_id: 2,
                series_name: expect.any(String),
                series_code: expect.toBeOneOf([expect.any(String), null]),
                summary: expect.toBeOneOf([expect.any(String), null])
            });
        });
    });
    it("fetches an empty array when provided an invalid datatype", async () => {
        const ranges = await fetchSeriesByRange("Main Range");
        expect(ranges.length === 0);
    });
});

describe("fetchSeasonsBySeries", () => {
    it("fetches seasons from Supabase based on series ID", async () => {
        const seasons = await fetchSeasonsBySeries(3);
        expect(seasons.length > 0);
        seasons.forEach((season) => {
            expect(season).toMatchObject({
                series_id: 3,
                season_id: expect.any(Number),
                season_name: expect.any(String),
                season_code: expect.toBeOneOf([expect.any(String), null]),
                summary: expect.toBeOneOf([expect.any(String), null])
            });
        });
    });
    it("fetches an empty array when provided an invalid datatype", async () => {
        const ranges = await fetchSeasonsBySeries("3 1 2");
        expect(ranges.length === 0);
    });
});

describe("fetchEpisodesBySeason", () => {
    it("fetches episodes from Supabase based on season ID", async () => {
        const episodes = await fetchEpisodesBySeason(3);
        expect(episodes.length > 0);
        episodes.forEach((episode) => {
            expect(episode).toMatchObject({
                episode_id: expect.any(Number),
                season_id: 3,
                series_id: null,
                range_id: null,
                added_on: expect.any(String),
                episode_name: expect.any(String),
                episode_number: expect.any(Number),
                episode_code: expect.toBeOneOf([expect.any(String), null]),
                summary: expect.toBeOneOf([expect.any(String), null])
            });
        });
    });
    it("fetches an empty array when provided an invalid datatype", async () => {
        const ranges = await fetchEpisodesBySeason("Season 1");
        expect(ranges.length === 0);
    });
});

describe("fetchCategory", () => {
    it("fetches category from Supabase based on category ID", async () => {
        const category = await fetchCategory(2);
        expect(category).toMatchObject({
            category_id: 2,
            category_name: "The New Series",
            summary: null
        });
    });
    it("fetches null when provided an invalid datatype", async () => {
        const ranges = await fetchCategory("The Old Series");
        expect(ranges.length === 0);
    });
});

describe("fetchRange", () => {
    it("fetches range from Supabase based on range ID", async () => {
        const range = await fetchRange(21);
        expect(range).toMatchObject({
            range_id: 21,
            range_name: "The Eighth Doctor Adventures (8DA)",
            category_id: 1,
            categories: {category_id: 1, category_name: "The Classic Series"},
            summary: null,
            range_code: null
        });
    });
    it("fetches null when provided an invalid datatype", async () => {
        const range = await fetchEpisodesBySeason("The Eighth Doctor Adventures (8DA)");
        expect(range === null);
    });
});

describe("fetchSeries", () => {
    it("fetches a series from Supabase based on series ID", async () => {
        const series = await fetchSeries(73);
        expect(series).toMatchObject({
            series_id: 73,
            series_name: "The Outlaws",
            ranges: {
                range_id: 12,
                range_name: "The First Doctor Adventures (1DA)",
                categories: {category_id: 1, category_name: "The Classic Series"}
            },
            series_code: null,
            summary: expect.any(String)
        });
    });
    it("fetches null when provided an invalid datatype", async () => {
        const series = await fetchSeries("Series 5");
        expect(series === null);
    });
});

describe("fetchSeason", () => {
    it("fetches season from Supabase based on season ID", async () => {
        const season = await fetchSeason(88);
        expect(season).toMatchObject({
            season_id: 88,
            season_name: "Series 2 - Other Worlds",
            series: {
                series_id: 221,
                series_name: "Rose Tyler The Dimension Cannon (RT)",
                ranges: {
                    range_id: 42,
                    range_name: "Special Releases",
                    categories: {
                        category_id: 3,
                        category_name: "The Worlds of Doctor Who"
                    }
                }
            },
            summary: expect.any(String)
        });
    });
    it("fetches null when provided an invalid datatype", async () => {
        const ranges = await fetchSeason("Season 1");
        expect(ranges.length === 0);
    });
});

describe("fetchEpisode", () => {
    it("fetches episode from Supabase based on episode ID", async () => {
        const episode = await fetchEpisode(1523);
        expect(episode).toMatchObject({
            episode_id: 1523,
            episode_name: "Assets of War",
            seasons: {
                season_id: 90,
                season_name: "Series 1",
                series: {
                    series_id: 223,
                    series_name: "Susan's War (SW)",
                    ranges: {
                        range_id: 42,
                        range_name: "Special Releases",
                        categories: {
                            category_id: 3,
                            category_name: "The Worlds of Doctor Who"
                        }
                    }
                }
            },
            added_on: expect.any(String),
            episode_number: 3,
            episode_code: "SW 1.03",
            summary: expect.any(String)
        });
    });
    it("fetches null when provided an invalid datatype", async () => {
        const ranges = await fetchEpisode("Rose");
        expect(ranges.length === 0);
    });
});