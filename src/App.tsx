import { useEffect, useState, useMemo, useLayoutEffect } from "react";
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
import { lightTheme, darkTheme } from './components/Themes';
import ColorSchemeSwitch from "./components/ColorSchemeSwitch";
import DebugButtons from "./components/DebugButtons";
import SocketIOListener from "./components/SocketIOListener";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TopPage from "./pages/TopPage";
import RoomPage from "./pages/RoomPage";
import RedirectToTop from "./components/RedirectToTop";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";
const initSocket = io();

const App = () => {
    // Cookie
    const [cookies, setCookies, removeCookies] = useCookies();

    // ダークモード or ライトモード
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [darkMode, setDarkMode] = useState(useMemo(() => prefersDarkMode, [prefersDarkMode]));

    // Socket.IO 初期化
    const [socket, setSocket] = useState(initSocket);
    const [initializedSocket, setInitializedSocket] = useState(false);
    socket.on('connect', () => {
        setInitializedSocket(true);
    });
    useEffect(() => {
        if (initializedSocket) {
            console.log(`you are ${socket.id}`);
            setSocket(socket);
        }
    }, [initializedSocket]);

    /* RoomオブジェクトState
    /  Roomさえ取得すればゲームが可能な設計を目指す */
    const [room, setRoom] = useState({roomId: ''});

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
                <Container maxWidth="sm">
                    <Title />
                    <ColorSchemeSwitch prefersDarkMode={prefersDarkMode} darkMode={
                        // darkMode
                        false // TODO Debug
                        } setDarkMode={setDarkMode} />
                    <Router>
                        <SocketIOListener socket={socket} />
                        <Routes>
                            <Route path="/" element={<TopPage socket={socket} initializedSocket={initializedSocket} />} />
                            <Route path="/join/:roomId" element={<TopPage socket={socket} initializedSocket={initializedSocket} />} />
                            <Route path="/room" element={<RedirectToTop />} />
                            <Route path="/room/:roomId" element={<RoomPage socket={socket} room={room} cookies={cookies} setCookies={setCookies} />} />
                        </Routes>
                    </Router>
                    <DebugButtons socket={socket} />
                </Container>
        </ThemeProvider>
    );
}

export default App;