
import { ResponsiveGame } from './util/responsive-util';
import { Global } from './util/global';
import { Loader } from './states/Loader';
import { Game } from './states/Game';
import { SocketAPI } from './socketApi/socketApi';


export default class Boot {
    constructor() {

    }
    init() {
        setTimeout(function () {
            Global.connectionEP = new SocketAPI();
            Global.connectionEP.open();
        }, 2000)
        Global.responsiveObj = new ResponsiveGame();
        Global.defaultDimension = Global.responsiveObj.init({
            orientation: "portrait",
            defaultDimension: {
                width: 1080,
                height: 1920
            }

        });
        this.g = new Phaser.Game(Global.defaultDimension.width, Global.defaultDimension.height, (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? Phaser.AUTO : Phaser.CANVAS), "game-sec", {
            preload: this.preload,
            create: this.create
        }, true, true);
    }
    preload() {

        this.game.state.add("Loader", Loader);
        this.game.state.add("Game", Game);
        this.game.load.image('loaderBG', 'assets/loaderBG.jpg');
        this.game.load.image('loaderDots', 'assets/loaderDots.png')
    }
    create() {
        Global.responsiveObj.notify("subscribe", {
            scene: this
        });
        this.game.state.start("Loader");
    }
}


var bootObj = new Boot();
bootObj.init();