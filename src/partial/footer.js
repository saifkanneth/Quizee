import { Global } from '../util/global';
import {VolumeControl} from './volumeContol';

export class Footer extends Phaser.Group {
    constructor(game,_onFooterUpdate) {
        super(game);

        this.onFooterUpdate=_onFooterUpdate;
        this.QnIndex = 0;
        this.QnTotal = 0;
        this.volumeToggle=1;

        this.onVolumeClick= this.onVolumeClick.bind(this);
        this.sendExitStatus= this.sendExitStatus.bind(this);
    }
    init() {
        this.container = new Phaser.Graphics(this.game);
        this.addChild(this.container);
        this.container.position.set(0, this.game.height * .92);
        this.container.beginFill(0x0eb2ef, 1);
        this.container.drawRect(0, 0, this.game.width, this.game.height * .08);
        this.container.endFill();

        this.footerQInfo = this.game.add.text(this.game.width * .04, 0, "", {
            font: "60px ESTRE",
            fill: "#ffffff"
        });
        this.volumeBtn = this.game.add.sprite(this.game.width * .96, this.game.height * .96, "sprite", "volumeOn");
        this.leaveBtn = this.game.add.sprite(0, 0, "sprite", "leave");


        this.volumeBtn.anchor.setTo(1, 0.5);
        this.leaveBtn.anchor.setTo(1, 0.5);
        this.footerQInfo.anchor.setTo(0, .5);

        this.volumeBtn.name = "footer-volume-btn";
        this.leaveBtn.name = "footer-leave-btn";
        this.footerQInfo.name = "q-info-text";


        this.volumeBtn.resizeFactor = 11;
        this.leaveBtn.resizeFactor = 6.5;


        this.leaveBtn.follows = {
            item: this.volumeBtn,
            axis: "xy",
            Xdirection: -1,
            Xfactor: 1.3,
            Ydirection: 1,
            Yfactor: 0
        }
        this.footerQInfo.follows = {
            item: this.volumeBtn,
            axis: "y",
            Ydirection: 1,
            Yfactor: 0.02
        }

        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

        this.volumeObj= new VolumeControl(this);

        this.volumeBtn.inputEnabled=true;
        this.volumeBtn.events.onInputDown.add(this.onVolumeClick);
        this.leaveBtn.inputEnabled=true;
        this.leaveBtn.events.onInputDown.add (this.sendExitStatus)
    }
    sendExitStatus(){
        this.onFooterUpdate({
            type:"exit-game"
        })
    }

    onVolumeClick(){
        this.volumeToggle*=-1;
        this.volumeBtn.frameName=(this.volumeToggle==-1)?"volumeOff":"volumeOn";
        this.volumeObj.swapMusic(this.volumeToggle);
    }

    updateQnStatus(_obj) {
        this.QnIndex = _obj.QnIndex;
        this.QnTotal = _obj.QnTotal;
        this.footerQInfo.text = "Q. " + ((this.QnIndex < 10) ? "0" + String(this.QnIndex) : String(this.QnIndex)) + "/ " + ((this.QnTotal < 10) ? "0" + String(this.QnTotal) : String(this.QnTotal));
    }
}