export default class HUD {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.trickText = scene.add.text(10, 10, '', { fontSize: '16px', color: '#ffffff' }).setScrollFactor(0);
        this.scoreText = scene.add.text(10, 30, 'Score: 0', { fontSize: '16px', color: '#ffffff' }).setScrollFactor(0);
    }

    showTrick(name) {
        this.trickText.setText(name);
        this.scene.time.delayedCall(1000, () => {
            this.trickText.setText('');
        });
    }

    updateScore(score) {
        this.scoreText.setText('Score: ' + score);
    }
}
