<script lang="ts">
	type props = {
		href: string;
		text: string;
		addClass?: string;
	};

	let { href, text, addClass }: props = $props();
</script>

<a
	{href}
	class="bg-blueKeppel cursor-pointer rounded-2xl p-2 text-center text-lg font-bold text-black uppercase transition-all duration-150 ease-in-out hover:opacity-80 {addClass}"
	>{text}</a
>
