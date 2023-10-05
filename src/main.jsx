import * as React from "react";
import App from "./App";
import {createRoot} from "react-dom/client";

import {CssVarsProvider} from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <React.StrictMode> <CssVarsProvider disableTransitionOnChange>
        <CssBaseline/>
        <App/>
    </CssVarsProvider>
    </React.StrictMode>
);