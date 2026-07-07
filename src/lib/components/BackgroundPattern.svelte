<script>
	let { text = 'OLYMPIC MARK' } = $props();

	const rows = Array(9);
	const words = Array(5);
</script>

<div class="background-pattern" aria-hidden="true">
	{#each rows as _, rowIndex}
		<div class="background-pattern__row" class:is-offset={rowIndex % 2 === 1}>
			{#each words as _}
				<span>{text}</span>
			{/each}
		</div>
	{/each}
</div>

<style>
	.background-pattern {
		position: fixed;
		inset: 0;
		z-index: 0;

		display: flex;
		flex-direction: column;
		justify-content: center;

		gap: var(--spacing-6);

		overflow: hidden;
		pointer-events: none;

		opacity: 0.028;
	}

	.background-pattern__row {
		display: flex;
		align-items: center;

		gap: var(--spacing-10);

		white-space: nowrap;
		transform: translateX(-8%);
	}

	.background-pattern__row.is-offset {
		transform: translateX(14%);
	}

	.background-pattern span {
		font-family: var(--font-primary);
		font-size: clamp(120px, 11vw, 220px);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: -0.08em;
		text-transform: uppercase;

		color: var(--colors-content-secondary);

		user-select: none;
	}
</style>