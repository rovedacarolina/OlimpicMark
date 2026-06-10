<script>
	let {
		selected = $bindable('POSITIVA'),
		options = ['NEGATIVA', 'INCERTA', 'POSITIVA']
	} = $props();
</script>

<div class="verdetto">
	{#each options as option}
		<button
			class="verdetto__button"
			class:active={selected === option}
			onclick={() => (selected = option)}
		>
			{option}
		</button>
	{/each}
</div>

<style>
	.verdetto {
		display: flex;
		width: 100%;
		max-width: 760px;
		margin-left: auto;
		border: 1px solid var(--colors-content-secondary);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.verdetto__button {
		flex: 1;
		height: 48px;
		border: 0;
		background: transparent;
		color: var(--colors-content-secondary);
		font-family: var(--font-primary);
		font-size: var(--font-size-ui);
		font-weight: var(--font-weight-medium);
		text-transform: uppercase;
		cursor: pointer;
	}

	.verdetto__button.active {
		background: var(--colors-content-primary);
		color: var(--colors-neutral-white);
		border-radius: var(--radius-full);
	}
</style>