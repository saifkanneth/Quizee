import { Global } from '../util/global';

export class Timer extends Phaser.Group {
    constructor(game,_onTimerUpdate) {
        super(game);


        this.onTimerUpdate=_onTimerUpdate;
        this.isActive = false;
        this.timerIcon = null;
        this.roundArcTween=null;
        this.timerTxt = null;
        this.timeTotal = 10;
        this.timerSec = 10;
        this.elapsedTime = 0;
        this.prevTime = 10;
        this.arcInProcess = false;
        this.timerArcVal = { min: 0, max: 360 };

        this.resetTime= this.resetTime.bind(this);
    }
    init() {
        this.timerIcon = this.game.add.sprite(this.game.width / 2, this.game.height * .92, "sprite", "timer");
        this.circleGr = new Phaser.Group(this.game);
        this.timerTxt = this.game.add.text(0, 0, ((this.timerSec >= 10) ? (String(this.timerSec)) : ("0" + String(this.timerSec))), {
            font: "75px BRLNSB",
            fill: "#ffffff"
        });
        this.timerArc = new Phaser.Graphics(this.game);
        this.circleGr.addChild(this.timerArc);
        this.timerArc.position.set(this.game.width * .4995, this.game.height * .921);
        this.timerArc.angle -= 90;
        this.updateTimerArc(this.timerStatus);







        this.timerIcon.anchor.setTo(0.5);
        this.timerTxt.anchor.setTo(0.5);
        this.timerIcon.name = "game-timer-icon";
        this.timerIcon.resizeFactor = 4;
        this.timerTxt.name = "game-timer-text";
        this.timerTxt.resizeFactor = 1;

        this.timerTxt.follows = {
            item: this.timerIcon,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 0
        }

        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

        this.updateTimerArc(this.timerSec*1.2)

    }
    startTimer(){
        this.isActive=true;
    }
    stopTimer(){
        this.isActive=false;
    }

    updateTimerArc(_total) {
        this.timerArcVal.max= (36 * (1+_total))
        if(this.roundArcTween!=null){
            this.roundArcTween.stop();
            this.roundArcTween=null;
        }
        this.roundArcTween = this.game.add.tween(this.timerArcVal).to({ max: 36 * _total }, 990,Phaser.Easing.Linear.None);
        this.setArcStatus(true);
        this.roundArcTween.onComplete.addOnce(this.setArcStatus.bind(this, false))
        this.roundArcTween.start();

    }
    resetTime(){
        this.elapsedTime=0;
        this.prevTime =this.timerSec=10;
        this.timerTxt.text= String(this.timerSec);
        this.timerArcVal = { min: 0, max: 360 };
        this.clearArc();
        this.timerArc.lineStyle(this.game.width * .019, 0x07fc35);
        this.timerArc.arc(0, 0, this.game.width * .06, this.game.math.degToRad(0), this.game.math.degToRad(this.timerArcVal.max), false);
    }
    clearArc(){
        this.timerArc.clear();
    }
    setArcStatus(_status) {
        this.arcInProcess = _status;
    }
    update() {

        if (this.isActive) {
            this.elapsedTime += 33 / 2;
            this.timerSec = 10 - Math.floor((this.elapsedTime / 1000) % 60);
            if (this.timerSec < 0) {
                this.stopTimer();
                this.clearArc();
                this.onTimerUpdate({
                    type:"check-answer"
                })
                return;
            }

            this.timerTxt.text = (this.timerSec >= 10) ? (String(this.timerSec)) : ("0" + String(this.timerSec))
            if (this.prevTime != this.timerSec) {
                this.updateTimerArc(this.timerSec);
            }
            this.prevTime = this.timerSec;
        }
        if (this.arcInProcess) {
            this.clearArc();
            this.timerArc.lineStyle(this.game.width * .019, 0x07fc35);
            this.timerArc.arc(0, 0, this.game.width * .06, this.game.math.degToRad(0), this.game.math.degToRad(this.timerArcVal.max), false);
        }

    }
}