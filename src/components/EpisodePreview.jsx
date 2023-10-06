import React from "react";
import {Card, Typography, Button, CardActions, Chip} from "@mui/joy";
import {Link} from "react-router-dom";

const EpisodePreview = ({episode}) => {
    const {episode_name, summary, cover_art, tags} = episode;

    return (
        <Card style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between"
        }}>
            <div style={{display: "flex"}}>
                <div style={{marginRight: "20px", flex: 1}}>
                    <img
                        src={cover_art}
                        alt="Episode Artwork"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                        }}
                    />
                </div>
                <div style={{flex: 2}}>
                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                        <div style={{flex: 1}}>
                            <Typography level="h4">{episode_name}</Typography>
                            {tags && tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    sx={{
                                        backgroundColor: tag.colour,
                                        marginRight: "8px",
                                        marginBottom: "8px",
                                    }} size="sm"
                                >{tag.tag_name}</Chip>
                            ))}
                            <Typography level="body-sm">{summary}</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <CardActions sx={{
                alignSelf: "stretch",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start"
            }}>
                <Button variant="outlined" component={Link} to={"/episode/" + episode.episode_id}>
                    View Episode
                </Button></CardActions>
        </Card>
    );
};

export default EpisodePreview;