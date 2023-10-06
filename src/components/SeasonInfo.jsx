import React from "react";
import {
    Typography,
    Grid,
    Button,
    Badge, Avatar, CardContent, Card
} from "@mui/joy";
import EpisodePreview from "./EpisodePreview";
import {AddCircleOutline, PlaylistAddCheck, Download, StarBorder, Queue} from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import {green} from "@mui/material/colors";
import RowCard from "./RowCard.jsx";

const SeasonInfo = ({season, episodes}) => {
    const {season_name, season_code, summary, cover_art, series, range, category} = season;

    return (
        <div>
            <Card>
                <CardContent>
                    <div style={{display: "flex", alignItems: "flex-start", marginBottom: "16px"}}>
                        <div style={{flex: 1, marginRight: "20px"}}>
                            <img
                                src={cover_art}
                                alt="Season Artwork"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    aspectRatio: "1/1",
                                }}
                            />
                        </div>
                        <div style={{flex: 2}}>
                            <Typography level="h1">{season_name}</Typography>
                            <Typography level="body-md">
                                {season_code}
                            </Typography><br/>
                            <Typography level="body2">{summary}</Typography>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Grid container spacing={2} sx={{flexGrow: 1}} style={{marginTop: "10px"}}
                                  sx={{mx: "10px"}}>
                                <Grid xs={12} sm={6} md={4}>
                                    <RowCard img_url={series.cover_art} title={series.series_name}
                                             label={"Series"} style={{width: "100%"}} sx={{flexGrow: 1}}/>
                                </Grid>
                                <Grid xs={12} sm={6} md={4}>
                                    <RowCard img_url={range.cover_art} title={range.range_name}
                                             label={"Range"} style={{width: "100%"}} sx={{flexGrow: 1}}/>
                                </Grid>
                                <Grid xs={12} sm={6} md={4}>
                                    <RowCard img_url={category.cover_art} title={category.category_name}
                                             label={"Collection"} style={{width: "100%"}} sx={{flexGrow: 1}}/>
                                </Grid>
                            </Grid>
                            <div><Grid container spacing={2} style={{padding: "16px"}}>
                                <Grid item xs={6}>
                                    <Button startDecorator={<StarBorder/>} variant="solid" fullWidth>
                                        Add All to Wish List
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button startDecorator={<Download/>} variant="solid" fullWidth>
                                        Add All to Collection
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button startDecorator={<Queue/>} variant="solid" fullWidth>
                                        Add all to Queue
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button startDecorator={<AddCircleOutline/>} variant="solid" fullWidth>
                                        Mark all as Played
                                    </Button>
                                </Grid>
                            </Grid></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Grid container spacing={4} style={{marginTop: "20px"}}>
                {episodes.map((episode, index) => (

                    <Grid item xs={12} sm={6} md={4} lg={4} key={index}><Badge size="lg"
                                                                               variant="solid"
                                                                               color="success"
                                                                               invisible={!(episode.owned === true)}
                                                                               badgeContent={episode.owned &&
                                                                                             <CheckIcon
                                                                                             />}

                                                                               sx={{height: "100%"}}
                    >
                        <EpisodePreview episode={episode} size="small"/>
                    </Badge>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default SeasonInfo;