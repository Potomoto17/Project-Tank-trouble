export default class MainScene extends Phaser.Scene {
	private tank!: Phaser.Physics.Arcade.Sprite;
	private cursors!: any;
	private tankSpeed: number = 200;
	private lastUpdateTime: number = 0;
	private updateInterval: number = 100;

	private readonly USER_ID: number = 123;
	private readonly GAME_ID: number = 456;
	private socket!: WebSocket;

	private endpoint: string = 'ws://localhost:8000';

	preload() {
		this.load.image('tank', './src/lib/assets/game/sprites/tanks/tank.png');
		this.load.image('background', './src/lib/assets/game/backgrounds/Mathematics.png');
	}

	create() {
		this.add.image(400, 300, 'background');

		this.tank = this.physics.add.sprite(400, 300, 'tank');
		this.tank.setCollideWorldBounds(true);
		this.tank.setOrigin(0.5, 0.5);

		this.cursors = this.input.keyboard?.createCursorKeys();

		this.socket = new WebSocket(this.endpoint);
		this.socket.onopen = () => {
			console.log('Connected to game server');
		};
	}

	update(time: number) {
		this.tank.setVelocity(0);

		if (this.cursors.left.isDown) {
			this.tank.setVelocityX(-this.tankSpeed);
			this.tank.setRotation(-Math.PI / 2);
		} else if (this.cursors.right.isDown) {
			this.tank.setVelocityX(this.tankSpeed);
			this.tank.setRotation(Math.PI / 2);
		}

		if (this.cursors.up.isDown) {
			this.tank.setVelocityY(-this.tankSpeed);
			this.tank.setRotation(0);
		} else if (this.cursors.down.isDown) {
			this.tank.setVelocityY(this.tankSpeed);
			this.tank.setRotation(Math.PI);
		}

		if (time - this.lastUpdateTime > this.updateInterval) {
			this.sendTankUpdate();
			this.lastUpdateTime = time;
		}
	}

	private sendTankUpdate() {
		if (this.socket.readyState === WebSocket.OPEN) {
			const update = {
				command: 'send_update',
				user_id: this.USER_ID,
				game_id: this.GAME_ID,
				position: {
					x: this.tank.x,
					y: this.tank.y
				},
				rotation: Phaser.Math.RadToDeg(this.tank.rotation)
			};

			this.socket.send(JSON.stringify(update));
		}
	}

	onDestroy() {
		if (this.socket) {
			this.socket.close();
		}
	}
}
