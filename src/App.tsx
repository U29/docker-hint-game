import { useEffect, useState, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Title from "./components/Title";
import "./App.css";
import { lightTheme, darkTheme } from './components/Themes';
import ColorSchemeSwitch from "./components/ColorSchemeSwitch";
import DebugButtons from "./components/DebugButtons";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TopPage from "./pages/TopPage";
import RoomPage from "./pages/RoomPage";
import RedirectToTop from "./components/RedirectToTop";
import { Socket } from "socket.io";

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [darkMode, setDarkMode] = useState(useMemo(() => prefersDarkMode, [prefersDarkMode]));
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
                <Container maxWidth="sm">
                    <Title />
                    <ColorSchemeSwitch prefersDarkMode={prefersDarkMode} darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Router>
                        <Routes>
                            <Route path="/" element={<TopPage />} />
                            <Route path="/join/:roomId" element={<TopPage />} />
                                <Route path="/room" element={<RedirectToTop />} />
                                <Route path="/room/:roomId" element={<RoomPage roomId={'1234'} />} />

                        </Routes>
                    </Router>
                    <DebugButtons />
                </Container>
        </ThemeProvider>
    );
}

export default App;