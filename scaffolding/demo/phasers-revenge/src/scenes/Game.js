import Phaser from 'phaser';
import Skater from '../entities/Skater';
import Controls from '../utils/controls';
import HUD from '../utils/hud';
import { checkTrick } from '../utils/tricks';

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.score = 0;
        this.currentTrick = null;
    }

    preload() {
        const g = this.add.graphics();
        g.fillStyle(0xffffff, 1);
        g.fillRect(0, 0, 32, 16);
        g.generateTexture('skater', 32, 16);
        g.destroy();
    }

    create() {
        const { width, height } = this.scale;

        // Draw simple isometric halfpipe
        const pipe = this.add.graphics({ x: width / 2, y: height / 2 + 100 });
        pipe.fillStyle(0x808080, 1);
        pipe.fillRect(-200, -50, 400, 100);
        pipe.rotation = Phaser.Math.DegToRad(45);

        this.physics.world.setBounds(0, 0, width, height);

        this.skater = new Skater(this, width / 2, height / 2 - 50);
        this.controls = new Controls(this);
        this.hud = new HUD(this);
    }

    update() {
        this.skater.move(this.controls.left, this.controls.right);

        if (this.controls.jump) {
            this.skater.jump();
        }

        if (!this.skater.body.blocked.down) {
            const trick = checkTrick(this.controls);
            if (trick && trick !== this.currentTrick) {
                this.currentTrick = trick;
                this.score += 100;
                this.hud.showTrick(trick);
                this.hud.updateScore(this.score);
            }
        } else {
            this.currentTrick = null;
        }
    }
}
