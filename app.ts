///<reference path='phaser.d.ts'/>
///<reference path='pixi.d.ts'/>

var game: Phaser.Game;

window.onload = () => {
    var state = new BattleState();

    game = new Phaser.Game(640, 480, Phaser.PhaserConstants.CANVAS, 'phaser', state, false, false);
}
class Unit extends Phaser.Sprite {
}

class BattleState extends Phaser.State {
    mushroom: Phaser.Sprite;
    counter: number;
    currentUnitIndex : number;
    currentFriendlyTween : Phaser.Tween;
    friendlies: Unit[];

    preload() {
        game.load.image('mushroom', 'assets/mushroom2.png');
    }

    create() {
        this.mushroom = game.add.sprite(200, 200, 'mushroom');
        this.counter = 0;
        this.friendlies = new Array<Unit>();

        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));

        this.friendlies.forEach((u) => game.add.existing(u));

        this.currentUnitIndex = 0
    }

    getCurrentUnit() {
        return this.friendlies[this.currentUnitIndex];
    }

    nextCurrentUnit() {
        var old = this.getCurrentUnit();
        old.alpha = 1;
        this.currentUnitIndex = ++this.currentUnitIndex == this.friendlies.length ? 0 : this.currentUnitIndex;
        var newCurrentUnit = this.getCurrentUnit();
        var tweenProperties = { alpha: 1 };
        newCurrentUnit.alpha = 0;
        //this.currentFriendlyTween = game.add.tween(newCurrentUnit);
        //this.currentFriendlyTween.to(tweenProperties, 1000, (new Phaser.Easing()).Linear.None, true, 0, true);

    }

    update() {

        var kSpace = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
        var kLeft = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        var kRight = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
        var kA = game.input.keyboard.justPressed(Phaser.Keyboard.A);

        if(kA) {
            this.nextCurrentUnit();
        }

        if (kLeft) {
            this.mushroom.x += -1;
        }

        if (kRight) {
            this.mushroom.x += 1;
        }

        if (kSpace) {
            this.counter += 0.1;
            this.mushroom.alpha = Math.sin(this.counter) * 0.5 + 0.5;
        }
    }
}