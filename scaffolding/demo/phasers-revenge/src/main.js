import Phaser from 'phaser';
import Menu from './scenes/Menu';
import Game from './scenes/Game';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [Menu, Game]
};

export default new Phaser.Game(config);
