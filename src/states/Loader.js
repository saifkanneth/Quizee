import { Global } from '../util/global';
import { CountDown } from '../partial/countdown';

export class Loader extends Phaser.State {
    constructor() {
        super();

        this.loaderInt = null;
        this.dostCnt = 0;
        this.onLoad = this.onLoad.bind(this);
        this.gotoGameScreen = this.gotoGameScreen.bind(this);
    }
    init() {
        this.loaderBG = this.game.add.sprite(0, 0, "loaderBG");
        this.loaderDots = this.game.add.sprite(this.game.width * 0.5, this.game.height * 0.65, "loaderDots");
        this.loaderDots.anchor.setTo(0.5);
        this.loaderDots.name = "loader-dots";
        this.loaderDots.resizeFactor = 2.2;

        this.loaderBG.alpha = this.loaderDots.alpha = 0;
        Global.responsiveObj.notify("set-bg", {
            BG: this.loaderBG
        });
        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

        setTimeout(function () { this.loaderBG.alpha = this.loaderDots.alpha = 1; }.bind(this), 0)
        this.loaderGr = new Phaser.Graphics(this.game);
        new Phaser.Group(this.game).addChild(this.loaderGr);
        this.loaderGr.position.set(this.loaderDots.x - this.loaderDots.width / 2, this.loaderDots.y)
        this.loaderInt = setInterval(this.animateDots.bind(this), 250);


    }
    animateDots() {
        this.loaderGr.clear();

        if (this.dostCnt < 5) {
            this.dostCnt++;
        } else {
            this.dostCnt = 1;
        }
        for (var i = 0; i < this.dostCnt; i++) {
            this.loaderGr.beginFill(0xffffff, 1.0);
            this.loaderGr.drawCircle(this.game.width * .044 + ((i) * ((i == 4) ? this.game.width * .085 : this.game.width * .086)), this.game.height * .016, this.game.width * .064);
            this.loaderGr.beginFill(0xa8ef2b, 1.0);
            this.loaderGr.drawCircle(this.game.width * .044 + ((i) * ((i == 4) ? this.game.width * .085 : this.game.width * .086)), this.game.height * .016, this.game.width * .06);
        }
        this.loaderGr.endFill();
    }
    preload() {
        var version = "1.0.1"
        this.game.load.image("gameBG", "assets/gamebg.jpg?v=" + version);
        this.game.load.atlas('sprite', 'assets/sprite.png?v=' + version, 'assets/sprite.json?v=' + version, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.game.load.json('listJson', 'json/list.json?v=' + version);
    }
    onLoad(v) {

    }
    create() {
        /* Global.responsiveObj.notify("clear", null);
        this.game.state.start("Game"); */
        setTimeout(function () {
            clearInterval(this.loaderInt);
            this.loaderDots.destroy();
            this.loaderGr.destroy();
            this.countDown = new CountDown(this.game, this.gotoGameScreen);
            this.countDown.addCountDown({
                x: this.game.width * .5,
                y: this.game.height * .65,
                Ind: -2
            });

        }.bind(this), 0)


    }
    gotoGameScreen() {
        Global.responsiveObj.notify("clear", null);
        this.game.state.start("Game");
    }
}