///<reference path='phaser.d.ts'/>

var game: Phaser.Game;

window.onload = () => {
    var state = new Battle();

    game = new Phaser.Game(640, 480, Phaser.CANVAS, 'phaser', state, false, false);
}

class Battle extends Phaser.State {
    mushroom: Phaser.Sprite;
    counter: number;

    preload() {
        game.load.image('mushroom', 'assets/mushroom2.png');
    }

    create() {
        //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
        this.mushroom = game.add.sprite(200, 200, 'mushroom');
        this.counter = 0;
    }

    update() {

        var kSpace = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
        var kLeft = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        var kRight = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

        if (kLeft) {
            this.mushroom.x += -1;
        }

        if (kRight) {
            this.mushroom.x += 1;
        }

        var temp:any = this.mushroom;

        if (kSpace) {
            this.counter += 0.1;
            temp.alpha = Math.sin(this.counter) * 0.5 + 0.5;
        }
    }
}