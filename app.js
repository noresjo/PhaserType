///<reference path='phaser.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PhaserModule = Phaser;
var game;

window.onload = function () {
    var state = new BattleState();

    game = new PhaserModule.Game(640, 480, Phaser.AUTO, 'phaser-example', state, false, false);
};

var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit() {
        _super.apply(this, arguments);
    }
    return Unit;
})(Phaser.Sprite);

var BattleState = (function (_super) {
    __extends(BattleState, _super);
    function BattleState() {
        _super.apply(this, arguments);
    }
    BattleState.prototype.preload = function () {
        game.load.image('mushroom', 'assets/mushroom2.png');
    };

    BattleState.prototype.create = function () {
        //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
        this.mushroom = game.add.sprite(200, 200, 'mushroom');
        this.counter = 0;
        this.friendlies = new Array();

        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));
        this.friendlies.push(new Unit(game, 10, 100 * (this.friendlies.length + 1), 'mushroom', 0));

        this.friendlies.forEach(function (u) {
            return game.add.existing(u);
        });

        var currentUnit = this.friendlies[0];
        var tweenProperties = { alpha: 1 };
        currentUnit.alpha = 0;
        var currentFriendlyTween = game.add.tween(currentUnit);

        currentFriendlyTween.to(tweenProperties, 1000, (new Phaser.Easing()).Linear.None, true, 0, true);
    };

    BattleState.prototype.update = function () {
        var kSpace = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
        var kLeft = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        var kRight = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

        if (kLeft) {
            this.mushroom.x += -1;
        }

        if (kRight) {
            this.mushroom.x += 1;
        }

        var temp = this.mushroom;

        if (kSpace) {
            this.counter += 0.1;
            this.mushroom.alpha = Math.sin(this.counter) * 0.5 + 0.5;
        }
    };
    return BattleState;
})(PhaserModule.State);
//# sourceMappingURL=app.js.map
