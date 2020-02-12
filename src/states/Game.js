import {
    Global
} from '../util/global';
import {LevelManager} from '../partial/levelManager';

export class Game extends Phaser.State {
    constructor() {
        super();


        this.levelMgr=null;
        this.gameLevel=1;

    }
    init() {

    }
    create() {
        this.levelMgr= new LevelManager(this.game);
        this.levelMgr.init();
    }
    
   

}