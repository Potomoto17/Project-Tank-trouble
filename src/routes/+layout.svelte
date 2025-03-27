<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="font-workSans">
	{@render children()}
</main>
