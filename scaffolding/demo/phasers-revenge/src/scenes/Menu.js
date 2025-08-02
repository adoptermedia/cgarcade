import Phaser from 'phaser';

export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 2 - 100, 'Isometric Halfpipe Skater', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const start = this.add.text(width / 2, height / 2, 'Start Game', {
            fontSize: '24px',
            color: '#00ff00'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        const launch = () => this.scene.start('Game');

        start.on('pointerdown', launch);

        this.input.keyboard.once('keydown-SPACE', launch);

        const legend = [
            'Arrow Keys / D-Pad: Move',
            'Space or A: Jump',
            'CTRL / LB: Trick Mod',
            'ALT / RB: Trick Mod'
        ];

        this.add.text(width / 2, height / 2 + 120, legend.join('\n'), {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
    }
}
