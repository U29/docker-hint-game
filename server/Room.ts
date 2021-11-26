import Session from './Session';
import Player from './Player';

export default class Room {
    // 型宣言
    roomId: string;
    hostId: string;
    sessions: Session[];
    currentSessionNum: number;

    constructor(roomId: string, hostId: string) {
        this.roomId = roomId;
        this.hostId = hostId;
        this.currentSessionNum = 0;
        this.sessions = [];
        this.sessions.push(new Session(this.currentSessionNum));
    }

    getCurrentSession() :Session {
        return this.sessions[this.currentSessionNum];
    }
}