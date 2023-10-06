import React from "react";
import {
    Card,
    CardContent,
    Table,
    Button,
    IconButton,
    CardActions,
    Typography,
    Link,
    Chip,
    Grid,
    Box
} from "@mui/joy";
import {
    AddCircleOutline,
    PlaylistAddCheck,
    Queue,
    StarBorder,
    ArrowBack,
    ArrowForward, Eject,
} from "@mui/icons-material";

const EpisodeInfo = ({episode}) => {
    const {
        episode_name,
        episode_code,
        cover_art,
        summary,
        range,
        series,
        season,
        prerequisites,
        followUps,
        tags,
        category,
    } = episode;
    //const episodeURL = `/${range.code}/${series.code}/${season.code}/${episode_code}`;

    return (
        <Card>
            <CardContent>
                <div style={{display: "flex", alignItems: "flex-start", marginBottom: "16px", marginTop: "8px"}}>
                    <div style={{marginRight: "16px"}}>
                        <Typography level="h2">
                            {episode_name}
                        </Typography>
                        <Typography level="body-md">
                            {episode_code}
                        </Typography><br/>
                        <Typography level="body2">{summary}</Typography>
                    </div>

                    {cover_art && <div style={{marginLeft: "auto", marginRight: "10px"}}>
                        <img
                            src={cover_art}
                            alt="Episode Artwork"
                            style={{
                                width: "200px",
                                aspectRatio: "1/1",
                                borderRadius: "8px",
                            }}
                        />
                    </div>}
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {prerequisites && prerequisites.length > 0 && (
                        <div style={{flex: 1, marginRight: "8px", marginLeft: "8px"}}>
                            {prerequisites.map((prereq, index) => (
                                <Button
                                    key={index}
                                    startDecorator={<ArrowBack/>}
                                    variant="soft"
                                    style={{
                                        marginBottom: "8px",
                                        width: "100%"
                                    }}
                                >
                                    {prereq.production_code} - {prereq.episode_name}
                                </Button>
                            ))}
                        </div>
                    )}
                    {followUps && followUps.length > 0 && (
                        <div style={{flex: 1, marginLeft: "8px", marginRight: "8px"}}>
                            {followUps.map((followUp, index) => (
                                <Button
                                    key={index}
                                    endDecorator={<ArrowForward/>}
                                    variant="soft"
                                    style={{
                                        marginBottom: "8px",
                                        width: "100%"
                                    }}
                                    sx={{px: "4px"}}
                                >
                                    {followUp.production_code} - {followUp.episode_name}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
                <Table>
                    {season && <tr>
                        <td>Season:</td>
                        <td>
                            <Link
                                href={`/season/${season.season_id}`}>{season.season_name}</Link>
                        </td>
                    </tr>}
                    {series && <tr>
                        <td>Series:</td>
                        <td>
                            <Link
                                href={`/series/${series.series_id}`}>{series.series_name}</Link>
                        </td>
                    </tr>}
                    {range && <tr>
                        <td>Range:</td>
                        <td>
                            <Link href={`/range/${range.range_id}`}>{range.range_name}</Link>
                        </td>
                    </tr>}
                    {category && <tr>
                        <td>Collection:</td>
                        <td>
                            <Link
                                href={`/collection/${category.category_id}`}>{category.category_name}</Link>
                        </td>
                    </tr>}
                </Table>
                <br/>
                <Box
                    sx={{display: "flex", gap: 1, alignItems: "left", mt: "12px"}}>
                    {tags && tags.map((tag, index) => (
                        <Chip
                            key={index}
                            sx={{
                                backgroundColor: tag.colour,
                                marginRight: "8px",
                                marginBottom: "8px",
                            }}
                        >{tag.tag_name}</Chip>
                    ))}
                </Box>
            </CardContent>
            <Grid container spacing={2} style={{padding: "4px"}}>
                <Grid item xs={6}>
                    <Button startDecorator={<StarBorder/>} variant="solid" fullWidth>
                        Add to Wish List
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button startDecorator={<PlaylistAddCheck/>} variant="solid" fullWidth>
                        Add to Queue
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button startDecorator={<Queue/>} variant="solid" fullWidth>
                        Add to Queue
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button startDecorator={<AddCircleOutline/>} variant="solid" fullWidth>
                        Mark as Played
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default EpisodeInfo;
