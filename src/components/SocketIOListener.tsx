import { Socket } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

type SocketIOListenerType = {
    socket: Socket
}

const SocketIOListener = ({socket}: SocketIOListenerType) => {
    const navigate = useNavigate();

    socket.on('loadRoomPage', room => {
        navigate(`/room/${room.roomId}`);
    });

    useEffect(() => {
        socket.on('resRoomData', room => {
            console.log('受信');
            // console.log(room);
        });
    }, []);

    return (
        <></>
    );
}

export default SocketIOListener;