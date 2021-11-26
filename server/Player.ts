export default class Player {
    playerId: string;
    playerName: string;
    isHost: boolean;
    constructor(playerId: string, playerName: string, isHost = false) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.isHost = isHost;
    }
}