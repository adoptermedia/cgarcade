import Phaser from 'phaser';

export default class Skater extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'skater', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = 200;
        this.jumpSpeed = 400;
        this.kickBoost = 100;
        this.direction = 1; // 1 = right, -1 = left
        this.onPipe = false;
    }

    move(left, right) {
        const grounded = this.body.blocked.down || this.onPipe;

        if (left) {
            this.direction = -1;
            this.setFlipX(true);
            this.setVelocityX(-this.speed);
            if (grounded) {
                this.anims.play('skate', true);
            }
        } else if (right) {
            this.direction = 1;
            this.setFlipX(false);
            this.setVelocityX(this.speed);
            if (grounded) {
                this.anims.play('skate', true);
            }
        } else {
            this.setVelocityX(0);
            if (grounded) {
                this.anims.play('idle', true);
            }
        }
    }

    jump() {
        if (this.body.blocked.down || this.onPipe) {
            this.setVelocityY(-this.jumpSpeed);
            this.anims.play('jump', true);
            this.onPipe = false;
        }
    }

    // Apply a speed boost in the current facing direction
    kick() {
        this.setVelocityX(this.direction * (this.speed + this.kickBoost));
        this.anims.play('kick', true);
    }

    // Simple in-air trick animation
    trick() {
        this.anims.play('trick', true);
    }
}
