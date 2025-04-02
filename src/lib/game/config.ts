import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

export const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 800,
	physics: {
		default: 'arcade',
		arcade: { gravity: { x: 0, y: 0 } }
	},
	scene: [MainScene],
	parent: 'game-container',
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
};
