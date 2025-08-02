import Phaser from 'phaser';

export default class Controls {
    constructor(scene) {
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            ctrl: Phaser.Input.Keyboard.KeyCodes.CTRL,
            alt: Phaser.Input.Keyboard.KeyCodes.ALT
        });

        scene.input.gamepad.once('connected', pad => {
            this.pad = pad;
        });
    }

    get up() {
        return this.keys.up.isDown || (this.pad && this.pad.up);
    }

    get down() {
        return this.keys.down.isDown || (this.pad && this.pad.down);
    }

    get left() {
        return this.keys.left.isDown || (this.pad && this.pad.left);
    }

    get right() {
        return this.keys.right.isDown || (this.pad && this.pad.right);
    }

    get jump() {
        return Phaser.Input.Keyboard.JustDown(this.keys.jump) || (this.pad && this.pad.A);
    }

    get ctrl() {
        return this.keys.ctrl.isDown || (this.pad && this.pad.LB);
    }

    get alt() {
        return this.keys.alt.isDown || (this.pad && this.pad.RB);
    }
}
