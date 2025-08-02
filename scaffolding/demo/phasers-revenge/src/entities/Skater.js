import Phaser from 'phaser';

export default class Skater extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'skater');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.speed = 200;
        this.jumpSpeed = 400;
    }

    move(left, right) {
        if (left) {
            this.setVelocityX(-this.speed);
        } else if (right) {
            this.setVelocityX(this.speed);
        } else {
            this.setVelocityX(0);
        }
    }

    jump() {
        if (this.body.blocked.down) {
            this.setVelocityY(-this.jumpSpeed);
        }
    }
}
