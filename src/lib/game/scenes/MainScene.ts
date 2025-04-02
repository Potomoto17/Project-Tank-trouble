export default class MainScene extends Phaser.Scene {
	private tank!: Phaser.GameObjects.Sprite;

	constructor() {
		super('MainScene');
	}

	preload() {
		this.load.image('tank', './src/lib/assets/game/sprites/tank.png');
	}

	create() {
		this.tank = this.add.sprite(400, 300, 'tank');
	}

	update() {
		// Movement logic here
	}
}
