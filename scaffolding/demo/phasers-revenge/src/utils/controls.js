import Phaser from 'phaser';

export default class Controls {
    constructor(scene) {
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            // Remap jump to the "S" key
            jump: Phaser.Input.Keyboard.KeyCodes.S,
            // New kick / speed boost action on the "A" key
            kick: Phaser.Input.Keyboard.KeyCodes.A
        });

        if (scene.input.gamepad) {
            scene.input.gamepad.once('connected', pad => {
                this.pad = pad;
            });
        }
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

    // Kick (speed boost) triggered by the "A" key or gamepad B button
    get kick() {
        return Phaser.Input.Keyboard.JustDown(this.keys.kick) || (this.pad && this.pad.B);
    }
}
