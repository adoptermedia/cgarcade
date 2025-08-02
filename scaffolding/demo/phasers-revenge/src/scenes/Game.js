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
        // Load backdrop artwork (placeholder until real pixel art arrives)
        this.load.image('background', '/rawart/background.png');

        // Create a very simple placeholder sprite sheet for the skater
        const size = 32;
        const canvas = this.textures.createCanvas('skater-temp', size * 5, size);
        const ctx = canvas.getContext();
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, size, size); // idle
        ctx.fillStyle = '#bbbbbb'; ctx.fillRect(size, 0, size, size); // skate
        ctx.fillStyle = '#ffff00'; ctx.fillRect(size * 2, 0, size, size); // jump
        ctx.fillStyle = '#ff8800'; ctx.fillRect(size * 3, 0, size, size); // kick
        ctx.fillStyle = '#ff00ff'; ctx.fillRect(size * 4, 0, size, size); // trick
        canvas.refresh();
        this.textures.addSpriteSheet('skater', canvas.canvas, { frameWidth: size, frameHeight: size });
        this.textures.remove('skater-temp');
    }

    create() {
        const { width, height } = this.scale;

        // Add the pixel-art background
        this.add.image(width / 2, height / 2, 'background');

        // Halfpipe parameters based on provided pixel mapping
        this.pipe = { centerX: 400, centerY: 200, radius: 300 };

        // Precompute an exact y-map so the skater aligns with pixel art
        this.yMap = Array(width + 1).fill(null);
        const { centerX, centerY, radius } = this.pipe;
        for (let x = 0; x <= width; x++) {
            const dx = x - centerX;
            if (Math.abs(dx) <= radius) {
                this.yMap[x] = Math.round(centerY + Math.sqrt(radius * radius - dx * dx));
            }
        }

        this.physics.world.gravity.y = 800;
        this.physics.world.setBounds(0, 0, width, height);

        const startY = this.getPipeY(centerX) - 20;
        this.skater = new Skater(this, centerX, startY);
        this.controls = new Controls(this);
        this.hud = new HUD(this);

        // Define animations
        this.anims.create({ key: 'idle', frames: [{ key: 'skater', frame: 0 }] });
        this.anims.create({ key: 'skate', frames: this.anims.generateFrameNumbers('skater', { frames: [0, 1] }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'jump', frames: [{ key: 'skater', frame: 2 }] });
        this.anims.create({ key: 'kick', frames: [{ key: 'skater', frame: 3 }] });
        this.anims.create({ key: 'trick', frames: [{ key: 'skater', frame: 4 }] });

        this.skater.play('idle');
    }

    getPipeY(x) {
        const xInt = Math.round(x);
        return this.yMap[xInt] ?? null;
    }

    getPipeSlope(x) {
        const { centerX, radius } = this.pipe;
        const dx = x - centerX;
        if (Math.abs(dx) >= radius) {
            return 0;
        }
        return -(dx) / Math.sqrt(radius * radius - dx * dx);
    }

    update() {
        this.skater.move(this.controls.left, this.controls.right);

        if (this.controls.jump) {
            this.skater.jump();
        }

        if (this.controls.kick) {
            if (this.skater.body.blocked.down || this.skater.onPipe) {
                this.skater.kick();
            } else {
                this.skater.trick();
            }
        }

        // Halfpipe collision and response
        const pipeY = this.getPipeY(this.skater.x);
        if (this.skater.y >= pipeY && this.skater.body.velocity.y >= 0) {
            const slope = this.getPipeSlope(this.skater.x);
            this.skater.onPipe = true;
            this.skater.y = pipeY;
            // Align vertical velocity with slope to preserve momentum
            this.skater.body.velocity.y = this.skater.body.velocity.x * slope;
        } else {
            this.skater.onPipe = false;
        }

        if (!this.skater.onPipe) {
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
