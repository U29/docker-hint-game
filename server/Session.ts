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

    pushPlayer(player: Player): void {
        this.players.push(player);
    }
}