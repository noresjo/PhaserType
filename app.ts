///<reference path='phaser.d.ts'/>

import PhaserModule = Phaser;
var game: Phaser.Game;

window.onload = () => {
    var state = new BattleState();

    game = new PhaserModule.Game(640, 480, Phaser.AUTO, 'phaser-example', state, false, false);
}

class Unit extends Phaser.Sprite {
}

class BattleState extends PhaserModule.State {
    mushroom: Phaser.Sprite;
    counter: number;

    friendlies: Unit[];

    preload() {
        game.load.image('mushroom', 'assets/mushroom2.png');
    }

    create() {
        //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
        this.mushroom = game.add.sprite(200, 200, 'mushroom');
        this.counter = 0;
        this.friendlies = new Array<Unit>();

        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));

        this.friendlies.forEach((u) => game.add.existing(u));

        var currentUnit = this.friendlies[0];
        var tweenProperties = { alpha: 1 };
        currentUnit.alpha = 0;
        var currentFriendlyTween = game.add.tween(currentUnit);

        currentFriendlyTween.to(tweenProperties, 1000, (new Phaser.Easing()).Linear.None, true, 0, true);

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

        var temp: Phaser = this.mushroom;

        if (kSpace) {
            this.counter += 0.1;
            this.mushroom.alpha = Math.sin(this.counter) * 0.5 + 0.5;
        }
    }
}