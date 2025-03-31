<script lang="ts">
	type props = {
		inputId: string;
		inputName: string;
		inputType: string;
		inputPlaceholder?: string;
	};

	let { inputId, inputName, inputType, inputPlaceholder }: props = $props();

	let canShowPassword = $state(false);

	function togglePasswordVisibility() {
		canShowPassword = !canShowPassword;
	}
</script>

<div class="relative flex flex-col items-start justify-center gap-1">
	<label for={inputId} class="text-blueNyanza text-lg font-bold">{inputName}</label>
	<div class="relative w-full md:w-80">
		<input
			class="bg-blueNyanza focus:border-blueNyanza w-full rounded-2xl border-2 border-black p-2 pr-10 text-black"
			type={inputType === 'password' && canShowPassword
				? canShowPassword
					? 'text'
					: 'password'
				: inputType}
			id={inputId}
			name={inputName.toLowerCase()}
			placeholder={inputPlaceholder}
		/>
		{#if inputType === 'password'}
			<button
				type="button"
				class="text-blueNyanza absolute top-1/2 right-3 -translate-y-1/2 transform"
				onclick={togglePasswordVisibility}
			>
				{#if canShowPassword}
					👁️
				{:else}
					👁️‍🗨️
				{/if}
			</button>
		{/if}
	</div>
</div>
