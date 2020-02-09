import { Global } from '../util/global';

export class Paisa extends Phaser.Group{
    constructor(game){
        super(game);

        this.paisaTotal=0;
    }
    init(){
        this.paisaIcon = this.game.add.sprite(this.game.width * .07, this.game.width * .07, "sprite", "paisa")
        this.paisaTxt = this.game.add.text(0, 0, String(this.paisaTotal), {
            font: "60px ESTRE",
            fill: "#03cae6"
        });

        this.paisaIcon.anchor.setTo(0.5);
        this.paisaTxt.anchor.setTo(0,0.5);

        this.paisaIcon.name = "game-paisa-icon";
        this.paisaTxt.name = "game-paisa-text";

        this.paisaIcon.resizeFactor = 20;
        this.paisaTxt.resizeFactor = 1;

        this.paisaTxt.follows={
            item:this.paisaIcon,
            axis:"xy",
            Xdirection:1,
            Xfactor:.75,
            Ydirection:1,
            Yfactor:.05
        }

        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });
    }

    updateTotalPaisa(_score){
        this.paisaTotal+=_score;
        this.paisaTxt.text=String(this.paisaTotal);
    }
}