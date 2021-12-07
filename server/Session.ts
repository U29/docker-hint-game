import Player from "./Player";

export default class Session {
    sessionNum: number;
    players: Player[];
    panelist: Partial<Player>;

    constructor(sessionNum: number) {
        this.sessionNum = sessionNum;
        this.players = [];
        this.panelist = {};
    }

    addPlayer(player: Player): void {
        this.players.push(player);
    }

    removePlayer(_playerId: string): void {
        this.players = this.players.filter(player => player.playerId !== _playerId);
        console.log(this.players);
    }
}