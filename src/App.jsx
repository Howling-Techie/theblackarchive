import * as React from "react";

import Container from "@mui/joy/Container";
import Box from "@mui/joy/Box";
import AppRouter from "./routes/AppRouter.jsx";

export default function App() {
    return (
        <Container>
            <Box sx={{my: 4}}>
                <AppRouter/>
            </Box>
        </Container>
    );
}