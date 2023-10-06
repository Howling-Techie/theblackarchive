import {AspectRatio, Card, CardContent, CardOverflow, Typography} from "@mui/joy";

const RowCard = (props) => {
    const {img_url, title, caption, label} = props;
    return (
        <Card orientation="horizontal" variant="outlined">
            <CardOverflow>
                <AspectRatio ratio="1" sx={{width: 120}}>
                    <img
                        src={img_url}
                        srcSet={img_url}
                        loading="lazy"
                        alt={title}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent sx={{justifyContent: "center"}}>
                <Typography fontWeight="md">
                    {title}
                </Typography>
                {caption && <Typography level="body-sm">{caption}</Typography>}
            </CardContent>
            <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                    px: 0.2,
                    writingMode: "vertical-rl",
                    textAlign: "center",
                    fontSize: "xs",
                    fontWeight: "xl",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    borderLeft: "1px solid",
                    borderColor: "divider",
                    justifyContent: "center",
                }}
            >
                {label}
            </CardOverflow>
        </Card>
    );
};

export default RowCard;