import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

const SocketManager = () => {
    console.log('socket manager')
    const [socket, setSocket] = useState();
    const client = socketIOClient(ENDPOINT);
    useEffect(() => {
        client.emit('hello', 'hello iam client');
    }, []);

    return (
        <></>
    );
}

export default SocketManager;
