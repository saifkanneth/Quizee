import {
    Global
} from '../util/global';
import {
    shuffle
} from '../util/array-util';
import {
    flipCard,
    removeCard,
    scaleIntro,
    moveCard
} from './tween';


export class Board extends Phaser.Group {
    constructor(_game, _level) {
        super(_game);


        this.difficultyLevel = {
            "1": {
                "row": 4,
                "column": 4,
                "rotate": false,
                "resizeFactor": 7.5,
                "icons": ["circleBlue", "circleRed", "squareBlue", "squareRed", "circleBlue", "circleRed", "squareBlue", "squareRed"],
                "combinations": 8
            },
            "2": {
                "row": 4,
                "column": 5,
                "rotate": false,
                "resizeFactor": 6,
                "icons": ["circleBlue", "circleRed", "squareBlue", "squareRed", "triangleRed", "triangleBlue", "circleBlue", "circleRed", "squareBlue", "squareRed"],
                "combinations": 10
            },
            "3": {
                "row": 4,
                "column": 5,
                "rotate": true,
                "resizeFactor": 6,
                "icons": ["circleBlue", "circleRed", "squareBlue", "squareRed", "triangleRed", "triangleBlue", "triangleRed", "triangleBlue", "circleBlue", "circleRed"],
                "combinations": 10
            }
        }
        this.level = _level;
        this.finalCb = null;
        this.rows = 0;
        this.resizeFactor = 0;
        this.card = null;
        this.columns = 0;
        this.rotate = false;
        this.shouldRotate = false;
        this.prevCard = null;
        this.cardsState = "";
        this.combinationCnt = 0;
        this.cardsActive = [];
        this.icons = [];
        this.combinations = 0;
        this.cards = [];

        this.checkForMatch = this.checkForMatch.bind(this);
        this.onFlipComplete = this.onFlipComplete.bind(this);
        this.addCards = this.addCards.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.onBoardFinish = this.onBoardFinish.bind(this);
        this.rotateBoard = this.rotateBoard.bind(this);
        this.shutdown = this.shutdown.bind(this);
    }
    init(finalCb) {
        this.finalCb = finalCb;
        this.rotate = this.difficultyLevel[String(this.level)]["rotate"];

        this.icons = this.difficultyLevel[String(this.level)]["icons"];
        this.combinations = this.difficultyLevel[String(this.level)]["combinations"];
        this.icons = this.icons.reduce(function (res, current, index, array) {
            return res.concat([current, current]);
        }, []);
        this.icons = shuffle(this.icons);
        console.log(this.icons, " list")
        this.rows = this.difficultyLevel[String(this.level)]["row"];
        this.columns = this.difficultyLevel[String(this.level)]["column"];
        this.shouldRotate = this.difficultyLevel[String(this.level)]["rotate"];
        this.resizeFactor = this.difficultyLevel[String(this.level)]["resizeFactor"];
        this.addCards();

        this.textGr = new Phaser.Group(this.game);
        this.showIntro();

    }
    addCards() {
        for (var i = 0; i < this.rows; i++) {
            this.cardKey = (this.cardKey == "card1") ? "card2" : "card1";
            for (var j = 0; j < this.columns; j++) {

                this["card" + String(i) + String(j)] = this.game.add.sprite(0, (i > 0) ? (this.prevCard.y + this.prevCard.height * 1.2) : 0, "card", "front");
                this["card" + String(i) + String(j)].name = "memory-card-" + String(i) + "-" + String(j) + "-" + String(this.level);
                this["card" + String(i) + String(j)].resizeFactor = this.resizeFactor;
                this["card" + String(i) + String(j)].anchor.setTo(0.5);
                this["card" + String(i) + String(j)].inputEnabled = true;
                this["shape" + String(i) + String(j)] = this.game.add.sprite(0, 0, "shapes", this.icons[this.columns * i + j]);
                this["card" + String(i) + String(j)].shape = this["shape" + String(i) + String(j)]
                this["shape" + String(i) + String(j)].name = "memory-shape-" + String(i) + "-" + String(j) + "-" + String(this.level);
                this["shape" + String(i) + String(j)].resizeFactor = this.resizeFactor * .75;
                this["shape" + String(i) + String(j)].anchor.setTo(0.5);
                this["card" + String(i) + String(j)].events.onInputDown.add(this.onCardClick.bind(this, (String(i) + String(j))));
                this["card" + String(i) + String(j)].rowIndex = i;
                this["card" + String(i) + String(j)].columnIndex = j;
                this.cards.push(this["card" + String(i) + String(j)])
                if (j > 0) {
                    this["card" + String(i) + String(j)].follows = {
                        item: this.prevCard,
                        axis: "xy",
                        Xdirection: 1,
                        Xfactor: 1.2,
                        Ydirection: 1,
                        Yfactor: 0,

                    }
                }
                this["shape" + String(i) + String(j)].follows = {
                    item: this["card" + String(i) + String(j)],
                    axis: "xy",
                    Xdirection: 1,
                    Xfactor: 0,
                    Ydirection: 1,
                    Yfactor: 0,
                }
                this.prevCard = this["card" + String(i) + String(j)];
                this.addChild(this.prevCard);
                this.addChild(this["shape" + String(i) + String(j)]);
                this["shape" + String(i) + String(j)].alpha = 0;
            }
            Global.responsiveObj.notify("item-fill-and-resize-all", {
                scene: this
            });
        }

        this.x = (this.game.canvas.width - this.width) / 2 + this.prevCard.width / 2;
        this.y = (this.game.canvas.height - this.height) / 2 + this.prevCard.height / 2;

        setTimeout(function () {

        }.bind(this), 0)
    }
    showIntro() {
        this.introCover = new Phaser.Graphics(this.game);
        this.textGr.addChild(this.introCover);
        this.introCover.beginFill(0x000000, 0.5);
        this.introCover.drawRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.introCover.endFill();
        this.boardState = this.game.add.text(this.game.canvas.width * .5, this.game.canvas.height * .5, "Level " + String(this.level), {
            "font": "200px BRLNSB",
            "fill": "#f9dd36"
        });
        this.boardState.anchor.setTo(0.5);
        this.boardState.name = "borad-intro-" + String(this.level);
        this.boardState.resizeFactor = 1;
        this.textGr.addChild(this.boardState);
        Global.responsiveObj.notify("item-fill-and-resize-one", {
            scene: this,
            props: {
                item: this.boardState
            }
        });

        this.boardState.scale.setTo(0);
        scaleIntro.call(this, this.boardState, this.introCover, this.destroyIntro.bind(this))
    }

    destroyIntro() {
        this.introCover.destroy();
        this.boardState.destroy();
        this.setCardState.call(this, "enabled")
    }

    setCardState(_state) {
        this.cardsState = _state;
    }
    onFlipComplete(card) {

        if (card) {
            this.cardsActive.push(card);
            if (this.cardsActive.length < 2) {
                this.setCardState("enabled");
            } else {
                this.checkForMatch();
            }
        } else {
            if (this.rotate) {
                this.rotateBoard();
            } else {
                this.setCardState("enabled");
            }

        }

    }
    onBoardFinish() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                removeCard.call(this, this["card" + String(i) + String(j)])
            }
        }
        setTimeout(this.finalCb, 500)
    }
    rotateBoard() {
        this.cards.forEach(function (card) {
            card.newIndex = {};

            Global.rotateLink.forEach(function (obj) {
                if (card.rowIndex == obj["from"].x && card.columnIndex == obj["from"].y) {
                    console.log(obj["to"], " for", card.name);
                    card.newIndex = obj["to"];
                }
            }.bind(this));
            this.cards.forEach(function (_card) {
                if (_card.rowIndex == card.newIndex.x && _card.columnIndex == card.newIndex.y) {
                    card.newX = _card.x;
                    card.newY = _card.y;
                }
            }.bind(this));
        }.bind(this));
        this.lastProcessedCard=null;
        this.cards.forEach(function (card,index) {
            moveCard.call(this, card,(index==this.cards.length-1),this.setCardState.bind(this,"enabled"));
        }.bind(this));
        
    }

    checkForMatch() {
        if (this.cardsActive[0].shape.frameName == this.cardsActive[1].shape.frameName) {
            this.cardsActive[0].events.onInputDown.removeAll();
            this.cardsActive[0].alpha = this.cardsActive[0].shape.alpha = 0.5;
            this.cardsActive[1].alpha = this.cardsActive[1].shape.alpha = 0.5;
            this.combinationCnt++;
            if (this.combinationCnt >= this.combinations) {
                this.onBoardFinish();
            } else {
                if (this.rotate) {
                    this.rotateBoard();
                } else {
                    this.setCardState("enabled");
                }

            }
        } else {
            flipCard.call(this, this.cardsActive[0], "front");
            flipCard.call(this, this.cardsActive[1], "front", (this.rotate) ? this.rotateBoard : this.setCardState.bind(this, "enabled"));
        }
        this.cardsActive = [];
    }
    onCardClick(postFix) {
        if (this.cardsState == "enabled") {
            this.setCardState("disabled");
            flipCard.call(this, this["card" + String(postFix)], "back", this.onFlipComplete);
        }

    }

    shutdown() {
        this.destroy();
    }

}