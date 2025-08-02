import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('backdrop', 'rawart/backdrop.png');
        // treat white as transparent on the sprite sheet then slice into frames in create()
        this.load.image('skaterSheet', 'rawart/sprites.png', { alpha: 0xffffff });
    }

    create() {
        // convert loaded sheet into a spritesheet with 4x4 frames
        const sheet = this.textures.get('skaterSheet').getSourceImage();
        const frameWidth = sheet.width / 4;
        const frameHeight = sheet.height / 4;
        this.textures.addSpriteSheet('skater', sheet, { frameWidth, frameHeight });
        this.textures.remove('skaterSheet');

        const bg = this.add.image(0, 0, 'backdrop')
            .setOrigin(0)
            .setDisplaySize(this.scale.width, this.scale.height);

        const width = bg.displayWidth;
        const height = bg.displayHeight;

        this.physics.world.setBounds(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        const groundY = height * 0.85;
        const ground = this.add.rectangle(width / 2, groundY, width, 10, 0xffffff, 0)
            .setOrigin(0.5, 0);
        this.physics.add.existing(ground, true);

        this.player = this.physics.add.sprite(width / 2, groundY, 'skater', 2)
            .setOrigin(0.5, 1)
            .setScale(0.6);
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(800);
        this.player.body.setSize(frameWidth * 0.6, frameHeight * 0.6, true);
        this.physics.add.collider(this.player, ground);

        this.createAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.trickText = this.add.text(width / 2, 20, '', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5, 0);
    }

    createAnimations() {
        this.anims.create({ key: 'ride', frames: [{ key: 'skater', frame: 1 }], frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'idle', frames: [{ key: 'skater', frame: 2 }], frameRate: 1, repeat: -1 });
        this.anims.create({ key: 'jump', frames: [{ key: 'skater', frame: 3 }], frameRate: 1 });
        this.anims.create({ key: 'kickflip', frames: [{ key: 'skater', frame: 4 }], frameRate: 10 });
        this.anims.create({ key: 'heelflip', frames: [{ key: 'skater', frame: 5 }], frameRate: 10 });
        this.anims.create({ key: 'method-air', frames: [{ key: 'skater', frame: 6 }], frameRate: 10 });
        this.anims.create({ key: 'spin360', frames: [{ key: 'skater', frame: 7 }], frameRate: 10 });
        this.anims.create({ key: 'crouch', frames: [{ key: 'skater', frame: 10 }], frameRate: 10 });
        this.anims.create({ key: 'grab-left', frames: [{ key: 'skater', frame: 12 }], frameRate: 10 });
        this.anims.create({ key: 'grab-right', frames: [{ key: 'skater', frame: 13 }], frameRate: 10 });
        this.anims.create({ key: 'board-flip', frames: [{ key: 'skater', frame: 14 }], frameRate: 10 });
        this.anims.create({ key: 'recover', frames: [{ key: 'skater', frame: 15 }], frameRate: 10 });
    }

    performTrick(animKey, label) {
        this.player.anims.play(animKey, true);
        this.trickText.setText(label);
        this.time.delayedCall(800, () => this.trickText.setText(''));
    }

    update() {
        const onGround = this.player.body.blocked.down;

        if (this.cursors.left.isDown) {
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player.setFlipX(false);
        }

        if (this.keyA.isDown) {
            if (this.cursors.up.isDown) { this.performTrick('kickflip', 'Kickflip'); return; }
            if (this.cursors.right.isDown) { this.performTrick('heelflip', 'Heelflip'); return; }
            if (this.cursors.down.isDown) { this.performTrick('method-air', 'Method Air'); return; }
            if (this.cursors.left.isDown) { this.performTrick('spin360', '360 Spin'); return; }
        }

        if (this.keyS.isDown) {
            if (this.cursors.left.isDown) { this.performTrick('grab-left', 'Grab Left'); return; }
            if (this.cursors.right.isDown) { this.performTrick('grab-right', 'Grab Right'); return; }
            if (this.cursors.up.isDown) { this.performTrick('board-flip', 'Board Flip'); return; }
            if (this.cursors.down.isDown) { this.performTrick('recover', 'Recover'); return; }
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('ride', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('ride', true);
        }
        else {
            this.player.setVelocityX(0);
            if (onGround) {
                this.player.anims.play('idle', true);
            }
        }

        if (this.cursors.up.isDown && onGround) {
            this.player.setVelocityY(-350);
            this.player.anims.play('jump', true);
        }

        if (this.cursors.down.isDown && onGround) {
            this.player.anims.play('crouch', true);
        }
    }
}

