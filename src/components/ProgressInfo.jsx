import React from "react";
import {
    Accordion, AccordionDetails,
    AccordionGroup, AccordionSummary,
    Card,
    CardContent, LinearProgress, Typography,
} from "@mui/joy";

const ProgressInfo = ({progress}) => {
    const {
        categories,
        ranges,
        series,
        seasons,
        episodes
    } = progress;
    console.log(progress);
    return (
        <Card>
            <CardContent>
                <AccordionGroup
                    color="neutral"
                    size="lg"
                    variant="outlined"
                >
                    <Accordion>
                        <AccordionSummary><Typography level="h3">Categories</Typography></AccordionSummary>
                        <AccordionDetails>
                            {Object.values(categories)
                                .filter(unfilteredStat => !unfilteredStat.name.includes("Total"))
                                .map((stat, index) => (
                                    <div key={index}><br/><LinearProgress
                                        determinate
                                        variant="outlined"
                                        color="neutral"
                                        size="sm"
                                        thickness={32}
                                        value={(stat.value / categories.total.value) * 100}
                                    >
                                        <Typography
                                            level="body-xs"
                                            fontWeight="xl"
                                            textColor="common.white"
                                            sx={{mixBlendMode: "difference"}}
                                        >
                                            {stat.name} [{stat.value}/{categories.total.value}]
                                        </Typography>
                                    </LinearProgress></div>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><Typography level="h3">Ranges</Typography></AccordionSummary>
                        <AccordionDetails>
                            {Object.values(ranges)
                                .filter(unfilteredStat => !unfilteredStat.name.includes("Total"))
                                .map((stat, index) => (
                                    <div key={index}><br/><LinearProgress
                                        determinate
                                        variant="outlined"
                                        color="neutral"
                                        size="sm"
                                        thickness={32}
                                        value={(stat.value / ranges.total.value) * 100}
                                    >
                                        <Typography
                                            level="body-xs"
                                            fontWeight="xl"
                                            textColor="common.white"
                                            sx={{mixBlendMode: "difference"}}
                                        >
                                            {stat.name} [{stat.value}/{ranges.total.value}]
                                        </Typography>
                                    </LinearProgress></div>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><Typography level="h3">Series</Typography></AccordionSummary>
                        <AccordionDetails>
                            {Object.values(series)
                                .filter(unfilteredStat => !unfilteredStat.name.includes("Total"))
                                .map((stat, index) => (
                                    <div key={index}><br/><LinearProgress
                                        determinate
                                        variant="outlined"
                                        color="neutral"
                                        size="sm"
                                        thickness={32}
                                        value={(stat.value / series.total.value) * 100}
                                    >
                                        <Typography
                                            level="body-xs"
                                            fontWeight="xl"
                                            textColor="common.white"
                                            sx={{mixBlendMode: "difference"}}
                                        >
                                            {stat.name} [{stat.value}/{series.total.value}]
                                        </Typography>
                                    </LinearProgress></div>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><Typography level="h3">Seasons</Typography></AccordionSummary>
                        <AccordionDetails>
                            {Object.values(seasons)
                                .filter(unfilteredStat => !unfilteredStat.name.includes("Total"))
                                .map((stat, index) => (
                                    <div key={index}><br/><LinearProgress
                                        determinate
                                        variant="outlined"
                                        color="neutral"
                                        size="sm"
                                        thickness={32}
                                        value={(stat.value / seasons.total.value) * 100}
                                    >
                                        <Typography
                                            level="body-xs"
                                            fontWeight="xl"
                                            textColor="common.white"
                                            sx={{mixBlendMode: "difference"}}
                                        >
                                            {stat.name} [{stat.value}/{seasons.total.value}]
                                        </Typography>
                                    </LinearProgress></div>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><Typography level="h3">Episodes</Typography></AccordionSummary>
                        <AccordionDetails>
                            {Object.values(episodes)
                                .filter(unfilteredStat => !unfilteredStat.name.includes("Total"))
                                .map((stat, index) => (
                                    <div key={index}><br/><LinearProgress
                                        determinate
                                        variant="outlined"
                                        color="neutral"
                                        size="sm"
                                        thickness={32}
                                        value={(stat.value / episodes.total.value) * 100}
                                    >
                                        <Typography
                                            level="body-xs"
                                            fontWeight="xl"
                                            textColor="common.white"
                                            sx={{mixBlendMode: "difference"}}
                                        >
                                            {stat.name} [{stat.value}/{episodes.total.value}]
                                        </Typography>
                                    </LinearProgress></div>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                </AccordionGroup>
            </CardContent>
        </Card>
    );
};

export default ProgressInfo;
