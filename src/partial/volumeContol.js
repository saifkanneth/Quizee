export class VolumeControl {
    constructor() {
        this.musicOn = true;

        this.swapMusic = this.swapMusic.bind(this);
    }


    swapMusic(_status) {
        this.musicOn = (_status == 1);
    }
}