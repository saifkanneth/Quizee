import {
    Board
} from './board';

export class LevelManager extends Phaser.Group {
    constructor(_game) {
        super(_game);


        this.currentLevel = 0;
        this.boardObj = null;

        this.gotoNextLevel = this.gotoNextLevel.bind(this);
    }
    init() {
        this.gotoNextLevel();
    };


    gotoNextLevel() {
        this.currentLevel++;
        if (this.boardObj!=null)
            this.boardObj.shutdown();
        if(this.currentLevel<=3){
            this.boardObj = new Board(this.game, this.currentLevel);
            this.boardObj.init(this.gotoNextLevel);
        }
        
    }
}