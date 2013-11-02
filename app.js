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
    var state = new Battle();

    game = new PhaserModule.Game(640, 480, Phaser.AUTO, 'phaser-example', state, false, false);
};

var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        _super.apply(this, arguments);
    }
    Battle.prototype.preload = function () {
        game.load.image('mushroom', 'assets/mushroom2.png');
    };

    Battle.prototype.create = function () {
        //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
        this.mushroom = game.add.sprite(200, 200, 'mushroom');
        this.counter = 0;
    };

    Battle.prototype.update = function () {
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
    return Battle;
})(PhaserModule.State);
//# sourceMappingURL=app.js.map
