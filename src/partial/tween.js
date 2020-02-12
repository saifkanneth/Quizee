function flipCard(card, frame, cb) {
    card.Twn = this.game.add.tween(card.scale);
    card.shape.Twn = this.game.add.tween(card.shape.scale);
    if (card.frameName != frame) {
        if (frame == "back") {
            card.shape.initScaleX = card.shape.scale.x;
            card.shape.initScaleY = card.shape.scale.y;
            card.shape.scale.x = 0;
            card.shape.alpha = 1;
        } else if (frame == "front") {
            card.shape.Twn.to({
                x: 0,
                y: card.shape.initScaleY * 1.2
            }, 250, Phaser.Easing.Back.In, false, 0);
            card.shape.Twn.onComplete.addOnce(function (_card) {
                _card.shape.alpha = 0;
                _card.shape.scale.x = _card.shape.initScaleX;
                _card.shape.scale.y = _card.shape.initScaleY;
            }.bind(this, card));
            card.shape.Twn.start();
        }
        card.initScaleX = card.scale.x;
        card.initScaleY = card.scale.y;
        card.Twn.to({
            x: 0,
            y: card.initScaleY * 1.2
        }, 250, Phaser.Easing.Back.In);
        card.Twn.onComplete.addOnce(function (_card, _frame, _cb) {

            if (frame == "back") {

                _card.shape.Twn.to({
                    x: _card.shape.initScaleX,
                    y: _card.shape.initScaleY
                }, 250, Phaser.Easing.Back.Out, false, 0);
                _card.shape.Twn.start();

            }
            _card.Twn.stop();
            _card.Twn = this.game.add.tween(_card.scale)
            _card.frameName = _frame;
            _card.Twn.to({
                x: _card.initScaleX,
                y: _card.initScaleY
            }, 250, Phaser.Easing.Back.Out, 0);
            (_cb) && (_card.Twn.onComplete.addOnce(_cb.bind(this, _card)));
            _card.Twn.start();



        }.bind(this, card, frame, cb))
        card.Twn.start();
    } else {
        _cb();
    }

}

function moveCard(card,isLast,cb){
    card.Twn = this.game.add.tween(card);
    card.shapeTwn = this.game.add.tween(card.shape);
    card.Twn.to({x:card.newX,y:card.newY},500,Phaser.Easing.Cubic.Out,false);
    card.shapeTwn.to({x:card.newX,y:card.newY},500,Phaser.Easing.Cubic.Out,false);
    (isLast)&&(card.Twn.onComplete.addOnce(cb));
    card.Twn.start();
    card.shapeTwn.start();
}

function removeCard(card) {
    card.Twn = this.game.add.tween(card.scale);
    card.shapeTwn = this.game.add.tween(card.shape.scale);
    card.Twn.to({
        x: 0,
        y: 0
    }, 250, Phaser.Easing.Back.In, false, 0);
    card.shapeTwn.to({
        x: 0,
        y: 0
    }, 250, Phaser.Easing.Back.In, false, 0);
    card.Twn.start();
    card.shapeTwn.start();
}


function scaleIntro(intro, cover, cb) {
    intro.Twn = this.game.add.tween(intro.scale);
    cover.Twn = this.game.add.tween(cover);
    intro.Twn.to({
        x: 1,
        y: 1
    }, 500, Phaser.Easing.Back.Out,false,250);
    intro.Twn.onComplete.addOnce(function () {
        setTimeout(function () {
            intro.Twn.stop();
            intro.Twn = this.game.add.tween(intro.scale);
            intro.Twn2 = this.game.add.tween(intro);
            intro.Twn.onComplete.addOnce(cb)
            intro.Twn.to({
                x: 2.5,
                y: 2.5
            }, 250, Phaser.Easing.Cubic.Out);
            intro.Twn2.to({
                alpha:0
            }, 250, Phaser.Easing.Cubic.Out);
            cover.Twn.to({
                alpha: 0
            }, 200, Phaser.Easing.Cubic.Out);
            intro.Twn.start();
            intro.Twn2.start();
            cover.Twn.start();
        }.bind(this), 250)

    }.bind(this));
    intro.Twn.start();
}






export {
    flipCard,
    removeCard,
    scaleIntro,
    moveCard
}