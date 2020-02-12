import {
    Global
} from '../util/global';

export class Loader extends Phaser.State {
    constructor() {
        super();

        this.loaderInt = null;
        this.dostCnt = 0;
        this.onLoad = this.onLoad.bind(this);
    }
    init() {}

    preload() {
        var version = "1.0.1"
        this.game.load.atlas("card","assets/card.png","assets/card.json");
        this.game.load.atlas("shapes","assets/shapes.png","assets/shapes.json");
    }
    onLoad(v) {

    }
    create() {
        Global.responsiveObj.notify("clear", null);
        this.game.state.start("Game");
    }
}