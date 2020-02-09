import { Global } from '../util/global';
import { CountDown } from './countdown';
import { checkMatch } from '../util/array-util';

export class Question extends Phaser.Group {
    constructor(game, _json, _onQnUpdate) {
        super(game);

        this.JSON = _json;
        this.onQnUpdate = _onQnUpdate;
        this.wrongPanel = null;
        this.correctPanel = null;
        this.questionScore = 0;
        this.Question = null;
        this.questionIndex = -1;
        this.questionType = null;
        this.queSec = null;
        this.correntAnswer = null;
        this.wrongTween = null;
        this.gameMode = "";
        this.answers = [];
        this.answerTxts = [];

        this.startQn = this.startQn.bind(this);
    }
    init(_gameMode) {
        this.gameMode = this.gameMode;
        this.coinSpr = this.game.add.sprite(this.game.width * .5, this.game.height * .08, "sprite", "coin");
        this.countDown = new CountDown(this.game, this.startQn);
        this.coinSpr.anchor.setTo(0.5);
        this.coinSpr.name = "question-coin-icon-" + String(this.questionIndex);
        this.coinSpr.resizeFactor = 4;
        this.addElements();
        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });
        this.resetQuestion();
        this.onQnUpdate({
            type: "update-footer", data: {
                QnIndex: this.questionIndex + 1,
                QnTotal: Object.keys(this.JSON).length
            }
        });
    }

    resetQuestion() {
        for (var i = 1; i <= 4; i++) {
            if (this["opt" + String(i)].wrongTween) {
                this["opt" + String(i)].wrongTween.stop();
                this["opt" + String(i)].wrongTween = null;
            }
        }
        if (this.questionIndex < Object.keys(this.JSON).length - 1) {
            this.startQn();
            this.clockResetUpdate();
        } else {
            this.hideElements();
        }
    }
    clockResetUpdate() {
        this.onQnUpdate({
            type: "clock-update", data: {
                QnIndex: this.questionIndex + 1,
                QnTotal: Object.keys(this.JSON).length
            }
        });
    }

    addCountDown() {
        this.countDown.addCountDown({
            x: this.game.width * .5,
            y: this.game.height * .5,
            Ind: this.questionIndex
        });
    }
    startQn() {
        this.showElements();
        this.showQuestion();
    }
    hideElements() {
        for (var i = 1; i <= 4; i++) {
            this["opt" + String(i)].kill();
            this["opt" + String(i) + "Txt"].kill();
        }
        this.rupeeIcon.kill();
        this.queScore.kill();
        this.Question.kill();
    }
    showElements() {
        for (var i = 1; i <= 4; i++) {
            this["opt" + String(i)].revive();
            this["opt" + String(i) + "Txt"].revive();
        }
        this.rupeeIcon.revive();
        this.queScore.revive();
        this.Question.revive();
    }
    addElements() {
        this.rupeeIcon = this.game.add.sprite(0, 0, "sprite", "rupee-icon");
        this.Question = this.game.add.text(this.game.width * .5, 0, "", {
            font: "60px ESTRE",
            fill: "#ffffff",
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.game.width * .8

        });

        this.opt1 = this.game.add.sprite(this.game.width * .5, this.game.height * .46, "sprite", "opt");
        this.opt2 = this.game.add.sprite(0, 0, "sprite", "opt");
        this.opt3 = this.game.add.sprite(0, 0, "sprite", "opt");
        this.opt4 = this.game.add.sprite(0, 0, "sprite", "opt");

        this.queScore = this.game.add.text(this.game.width * .5, 0, "", {
            font: "70px ESTRE",
            fill: "#03cae6",
            align: "center"
        });
        this.opt1Txt = this.game.add.text(this.game.width * .5, 0, "", {
            font: "50px ESTRE",
            fill: "#ffffff",
            align: "center"
        });
        this.opt2Txt = this.game.add.text(this.game.width * .5, 0, "", {
            font: "50px ESTRE",
            fill: "#ffffff",
            align: "center"
        });
        this.opt3Txt = this.game.add.text(this.game.width * .5, 0, "", {
            font: "50px ESTRE",
            fill: "#ffffff",
            align: "center"
        });
        this.opt4Txt = this.game.add.text(this.game.width * .5, 0, "", {
            font: "50px ESTRE",
            fill: "#ffffff",
            align: "center"
        });
        this.Question.lineSpacing = -this.game.width * .005;




        this.rupeeIcon.name = "question-rupee-icon";
        this.queScore.name = "question-score-text";
        this.Question.name = "Question";
        this.opt1.name = "question-opt-1";
        this.opt2.name = "question-opt-2";
        this.opt3.name = "question-opt-3";
        this.opt4.name = "question-opt-4";
        this.opt1Txt.name = "question-opt-1-text";
        this.opt2Txt.name = "question-opt-2-text";
        this.opt3Txt.name = "question-opt-3-text";
        this.opt4Txt.name = "question-opt-4-text"
            ;



        this.rupeeIcon.resizeFactor = 35;
        this.queScore.resizeFactor = 1;
        this.Question.resizeFactor = 1;
        this.opt1.resizeFactor = 1;
        this.opt2.resizeFactor = 1;
        this.opt3.resizeFactor = 1;
        this.opt4.resizeFactor = 1;
        this.opt1Txt.resizeFactor = 1;
        this.opt2Txt.resizeFactor = 1;
        this.opt3Txt.resizeFactor = 1;
        this.opt4Txt.resizeFactor = 1;


        this.rupeeIcon.anchor.setTo(0.5);

        this.queScore.anchor.setTo(0, 0.5);
        this.Question.anchor.setTo(0.5, 1);
        this.opt1.anchor.setTo(0.5);
        this.opt2.anchor.setTo(0.5);
        this.opt3.anchor.setTo(0.5);
        this.opt4.anchor.setTo(0.5);
        this.opt1Txt.anchor.setTo(0.5);
        this.opt2Txt.anchor.setTo(0.5);
        this.opt3Txt.anchor.setTo(0.5);
        this.opt4Txt.anchor.setTo(0.5);


        for (var i = 1; i <= 4; i++) {
            this["opt" + String(i)].coverSpr = this.game.add.sprite(0, 0, "sprite", "ans_green");
            this["opt" + String(i)].coverSpr.anchor.setTo(0.5);
            this["opt" + String(i)].addChild(this["opt" + String(i)].coverSpr);
            this["opt" + String(i)].coverSpr.alpha = 0;
        }

        this.rupeeIcon.follows = {
            item: this.coinSpr,
            axis: "xy",
            Xdirection: -1,
            Xfactor: 0.2,
            Ydirection: 1,
            Yfactor: .52
        };
        this.queScore.follows = {
            item: this.rupeeIcon,
            axis: "xy",
            Ydirection: 1,
            Yfactor: .1,
            Xdirection: 1,
            Xfactor: 1
        };
        this.opt2.follows = {
            item: this.opt1,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 1.2
        };
        this.opt3.follows = {
            item: this.opt2,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 1.2
        };
        this.opt4.follows = {
            item: this.opt3,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 1.2
        };

        this.opt1Txt.follows = {
            item: this.opt1,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 0
        };
        this.opt2Txt.follows = {
            item: this.opt2,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 0
        };
        this.opt3Txt.follows = {
            item: this.opt3,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 0
        };
        this.opt4Txt.follows = {
            item: this.opt4,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 0
        };


    }

    activateOptions() {
        for (var i = 1; i <= 4; i++) {
            this["opt" + String(i)].inputEnabled = true;
            this["opt" + String(i)].events.onInputDown.add(this.saveAnswer.bind(this, this["opt" + String(i) + "Txt"], this["opt" + String(i)]))
            this["opt" + String(i)].coverSpr.alpha = 0;
        }
    }

    saveAnswer(txt, opt) {
        if (this.questionType == "single") {
            this.answers = [txt.text];
            this.answerTxts = [txt];
            for (var i = 1; i <= 4; i++) {
                this["opt"+String(i)].coverSpr.alpha = 0;
            }
            opt.coverSpr.frameName = "ans_green"
            opt.coverSpr.alpha = 0.5;
        } else {
            if (this.answerTxts.indexOf(txt) == -1) {
                this.answers.push(txt.text);
                this.answerTxts.push(txt);
                opt.coverSpr.frameName = "ans_green"
                opt.coverSpr.alpha = 0.5;
            } else {
                this.answers.splice(txt.text, 1);
                var ind = this.answerTxts.indexOf(txt);
                this.answerTxts.splice(ind, 1);
                this.answers.splice(ind, 1);
                opt.coverSpr.alpha = 0;
            }
        }
    }
    deActivateOptions() {
        for (var i = 1; i <= 4; i++) {
            this["opt" + String(i)].events.destroy();
        }
    }

    onAnswerCorrect() {
        this.onQnUpdate({
            type: "add-score", data: {
                score: this.queSec.score
            }

        });
    }

    colorOptionsInFocus() {
        console.log("Color Options In Focus!")
        this.answerTxts.forEach(function (answerTxt) {
            var optIndex = answerTxt.name.split("question-opt-")[1];
            optIndex = optIndex.split("-text")[0];
            if (this.correntAnswer.indexOf(answerTxt.text) == -1) {
                this["opt" + String(optIndex)].coverSpr.frameName = "wrong";
                this["opt" + String(optIndex)].coverSpr.alpha = 0;
                this["opt" + String(optIndex)].wrongTween = this.game.add.tween(this["opt" + String(optIndex)].coverSpr).to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 0, 350, true);
            } /* else {
                this["opt" + String(optIndex)].coverSpr.alpha = 1;
            } */
        }.bind(this))
        for (var i = 1; i <= 4; i++) {
            if (this.correntAnswer.indexOf(this["opt" + String(i) + "Txt"].text) != -1) {
                console.log("Qualify")
                this["opt" + String(i)].coverSpr.alpha = 1;
                this["opt" + String(i)].coverSpr.frameName = "ans_green"
            }
        }
    }
    checkAnswer() {
        if (checkMatch(this.answers, this.correntAnswer)) {
            this.onAnswerCorrect();
        } else {

        }
        this.colorOptionsInFocus();
        this.deActivateOptions();
        setTimeout(this.resetQuestion.bind(this), 1500)
        // console.log(_selectedAnswerObj1.text, "_selectedAnswer")
        // this.correctPanel = this.game.add.sprite(0, 0, "sprite", "ans_green");
        // this.correctPanel.anchor.setTo(0.5);
        /* if (this.correntAnswer == _selectedAnswerObj1.text) {
            _selectedAnswerObj2.addChild(this.correctPanel);
            

        } */ /* else {
            this.wrongPanel = this.game.add.sprite(0, 0, "sprite", "wrong");
            this.wrongPanel.anchor.setTo(0.5);
            _selectedAnswerObj2.addChild(this.wrongPanel);
            for (var i = 1; i <= 4; i++) {
                if (this["opt" + String(i) + "Txt"].text == this.correntAnswer) {
                    this["opt" + String(i)].addChild(this.correctPanel);
                    break;
                }
            }
            this.wrongPanel.alpha = 0
            this.wrongTween = this.game.add.tween(this.wrongPanel).to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 0, 350, true);
        } */


        // this.deActivateOptions();
        /*  this.onQnUpdate({
             type: "stop-timer"
         });
 
         setTimeout(this.resetQuestion.bind(this), 1500) */
    }

    showQuestion() {
        this.answers = [];
        this.answerTxts = [];
        this.questionIndex++;
        this.queSec = this.JSON[this.questionIndex];
        this.Question.text = this.queSec.question;
        this.questionType = this.queSec.que_type;
        this.opt1Txt.text = this.queSec.options[0];
        this.opt2Txt.text = this.queSec.options[1];
        this.opt3Txt.text = this.queSec.options[2];
        this.opt4Txt.text = this.queSec.options[3];
        this.queScore.text = this.queSec.score;
        this.correntAnswer = this.queSec.answer;
        this.rupeeIcon.x = (this.game.width - (this.rupeeIcon.width * .5 + this.queScore.width)) / 2;
        Global.responsiveObj.notify("item-fill-and-resize-one", {
            scene: this,
            props: {
                item: this.queScore
            }
        });
        setTimeout(function () {
            this.Question.y = this.opt1.y - this.opt1.height * .75;
        }.bind(this), 0)
        this.onQnUpdate({
            type: "update-footer", data: {
                QnIndex: this.questionIndex + 1,
                QnTotal: Object.keys(this.JSON).length
            }

        });
        this.onQnUpdate({
            type: "start-timer"
        });
        this.activateOptions();
    }
}