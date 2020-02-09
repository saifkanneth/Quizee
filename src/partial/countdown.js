import { Global } from '../util/global';
export class CountDown extends Phaser.Group {
    constructor(game, onFinish,QnInd) {
        super(game);

        this.QnInd=QnInd;
        this.onFinish = onFinish;
        this.countDownFrames = ["one", "two", "start"];
        this.frameInd = 0;
        this.elapsedTime = 0;
        this.prevSec = 0;
        this.sec = 0;
        this.isActive=false;
        this.cntDn=null;

        this.addCountDown= this.addCountDown.bind(this);
    }

    addCountDown(data) {
        this.isActive=true;
        if(this.cntDn==null){
            this.cntDn = this.game.add.sprite(data.x,data.y, "sprite", this.countDownFrames[this.frameInd])
            this.cntDn.anchor.setTo(0.5);
            this.cntDn.name="countdown-"+String(data.Ind);
            this.cntDn.resizeFactor=1;
    
            Global.responsiveObj.notify("item-fill-and-resize-all", {
                scene: this
            });
        }else{
            this.cntDn.revive();
            this.frameInd=-1;
            this.updateFrame();
        }
        
    }
    updateFrame() {
        this.frameInd++;
        if(this.frameInd>=this.countDownFrames.length){
            this.isActive=false;
            this.onFinish();
            //this.shutdown();
        }else{
            this.cntDn.frameName = this.countDownFrames[this.frameInd]

        }
    }
    update() {
        if(this.isActive){
            this.elapsedTime += 33 / 2;
            this.sec = Math.floor((this.elapsedTime / 1000) % 60);
            if (this.sec != this.prevSec) {
                this.updateFrame();
            }
            this.prevSec = this.sec;
        }

    }
    removeCountDown(){
        this.cntDn.kill();
    }
}