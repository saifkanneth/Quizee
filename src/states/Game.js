import { Global } from '../util/global';
import { Question } from '../partial/questions';
import { Paisa } from '../partial/paisa';
import { Timer } from '../partial/timer';
import { Footer } from '../partial/footer';

export class Game extends Phaser.State {
    constructor() {
        super();

        this.paiseObj = null;
        this.timerObj = null;
        this.footerObj = null;
        this.questionObj = null;
        this.questionJSON = null;
        this.gameMode="";
        this.QnStatus = {
            QnIndex: 0, QnTotal: 0
        }

        this.onQnUpdate = this.onQnUpdate.bind(this);
        this.onTimerUpdate = this.onTimerUpdate.bind(this);
        this.onFooterUpdate = this.onFooterUpdate.bind(this);
    }
    init() {
        this.gameMode="solo";
        this.questionJSON = this.game.cache.getJSON("listJson");
    }
    create() {
        this.gameBG = this.game.add.sprite(0, 0, "gameBG");
        this.paiseObj = new Paisa(this.game);
        this.timerObj = new Timer(this.game, this.onTimerUpdate);
        this.footerObj = new Footer(this.game, this.onFooterUpdate);


        this.paiseObj.init();
        this.timerObj.init();
        this.footerObj.init();

        this.showGameQn();



        Global.responsiveObj.notify("set-bg", {
            BG: this.gameBG
        });
        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });


    }
    onFooterUpdate(FtUpdate) {
        switch (FtUpdate.type) {
            case "exit-game":
                alert("exit Game");
                break;
        }
    }

    onTimerUpdate(TmUpdate) {
        switch (TmUpdate.type) {
            case "check-answer":
                this.questionObj.checkAnswer();
                break;
        }
    }
    onQnUpdate(QnStatus) {
        switch (QnStatus.type) {
            case "update-footer":
                this.footerObj.updateQnStatus(QnStatus.data);
                break;
            case "start-timer":
                this.timerObj.startTimer();
                break;
            case "stop-timer":
                this.timerObj.stopTimer();
                break;
            case "clock-update":
                this.timerObj.resetTime();
                break;
            case "add-score":
                this.paiseObj.updateTotalPaisa(QnStatus.data.score);
                break;

        }
        //this.QnStatus = footerQnStatus;


    }
    showGameQn() {
        this.questionObj = new Question(this.game, this.questionJSON, this.onQnUpdate);
        this.questionObj.init(this.gameMode);

    }
}