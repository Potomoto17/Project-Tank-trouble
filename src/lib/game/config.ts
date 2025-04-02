import type { Types } from 'phaser';
import MainScene from './scenes/MainScene';

export const config: Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: { gravity: { x: 0, y: 0 } }
	},
	scene: [MainScene],
	parent: 'game-container'
};
