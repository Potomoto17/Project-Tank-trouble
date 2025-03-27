# NAVODILA ZA FRONTEND

## 📌 Tehnologije

Ta frontend projekt uporablja naslednje tehnologije:

- **SvelteKit** - Framework za gradnjo modernih spletnih aplikacij.
- **Tailwind CSS** - Utility-first CSS framework za hitro stilizacijo.
- **Phaser.js** - Knjižnica za izdelavo 2D iger.
- **WebSockets** - Za komunikacijo v realnem času.

---

## 🛠️ Namestitev in zagon

### 1️⃣ Kloniraj repozitorij

```sh
git clone <repo-url>
cd <ime-projekta>
```

### 2️⃣ Namesti odvisnosti

```sh
npm install
```

### 3️⃣ Zaženi razvojni strežnik

```sh
npm run dev
```

Po zagonu bo aplikacija dostopna na `http://localhost:5173`.

---

## 🎨 Uporaba Tailwind CSS

Tailwind je že integriran. Stilizacijo lahko dodajaš z razredi, npr.:

```svelte
<div class="rounded-lg bg-blue-500 p-4 text-white">To je modri gumb</div>
```

Vse prilagoditve se nahajajo v `tailwind.config.cjs`.
Za več poglej: [Tailwind Docs](https://tailwindcss.com/docs/installation/using-vite).

---

## 🎮 Uporaba Phaser.js

Phaser je integriran kot Svelte komponenta.

### 1️⃣ Ustvari novo Phaser sceno

V `src/lib/Game.svelte`:

```svelte
<script>
	import { onMount } from 'svelte';
	import Phaser from 'phaser';

	let game;

	onMount(() => {
		const config = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			parent: 'game-container',
			scene: {
				preload: function () {
					this.load.image('logo', '/logo.png');
				},
				create: function () {
					this.add.image(400, 300, 'logo');
				}
			}
		};
		game = new Phaser.Game(config);
	});
</script>

<div id="game-container"></div>
```

Phaser se nahaja v `src/lib/Game.svelte`.

---

## 🔗 WebSockets

### 1️⃣ Povezava na WebSocket strežnik

V `src/stores/websocket.js`:

```js
import { writable } from 'svelte/store';

export const socket = writable(null);

export function connectWebSocket() {
	const ws = new WebSocket('ws://localhost:8080');
	ws.onopen = () => console.log('WebSocket povezan');
	ws.onmessage = (event) => console.log('Sporočilo:', event.data);
	socket.set(ws);
}
```

### 2️⃣ Pošiljanje podatkov

```js
socket.subscribe((ws) => {
	if (ws) ws.send(JSON.stringify({ type: 'move', x: 100, y: 200 }));
});
```

---

## 🔀 Git delovni proces

### 1️⃣ Ustvari novo vejo za funkcionalnost

```sh
git checkout -b feature-ime-funkcionalnosti
```

### 2️⃣ Po končanem delu dodaj in potisni spremembe

```sh
git add .
git commit -m "Dodana nova funkcionalnost"
git push origin feature-ime-funkcionalnosti
```

### 3️⃣ Ustvari **Pull Request (PR)** na GitHubu za združitev v `phaser-integration`.

### 4️⃣ Združitev `phaser-integration` v glavno vejo

Ko so vse funkcionalnosti testirane in preverjene, združi `phaser-integration` v `main`:

```sh
git checkout main
git pull origin main
git merge phaser-integration
git push origin main
```

Po združitvi lahko izbrišeš vejo `phaser-integration`:

```sh
git branch -d phaser-integration
git push origin --delete phaser-integration
```

---

## 🛠️ Dodatni ukazi

| Namen                        | Ukaz              |
| ---------------------------- | ----------------- |
| Posodobi odvisnosti          | `npm update`      |
| Gradnja aplikacije           | `npm run build`   |
| Preveri napake               | `npm run check`   |
| Zaženi strežnik v produkciji | `npm run preview` |

---

🚀 **Srečno kodiranje!**
