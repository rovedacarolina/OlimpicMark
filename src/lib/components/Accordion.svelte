<script>
	let { number = '01', title = '', items = [] } = $props();

	let expandedIndex = $state(-1);

	function toggleItem(index = 0) {
		expandedIndex = expandedIndex === index ? -1 : index;
	}
</script>

<section class="accordion">
	<header class="accordion__header">
		<span>{number}</span>
		<span>{title}</span>
	</header>

	<div class="accordion__items">
		{#each items as item, index (index)}
			<button
				class="accordion__item"
				class:expanded={expandedIndex === index}
				onclick={() => toggleItem(index)}
			>
				<span>{item.label}</span>
				<span class="icon">⊙</span>
			</button>

			{#if expandedIndex === index}
				<div class="accordion__content">
					<p>{item.content}</p>
				</div>
			{/if}
		{/each}
	</div>
</section>

<style>
	.accordion {
		width: 100%;
		max-width: 760px;
		margin-left: auto;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-6);
	}

	.accordion__header {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-primary);
		font-size: var(--font-size-ui);
		font-weight: var(--font-weight-black);
		color: var(--colors-content-primary);
	}

	.accordion__items {
		display: flex;
		flex-direction: column;
	}

	.accordion__item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: transparent;
		border: 0;
		padding: var(--spacing-3) 0;
		cursor: pointer;
		font-family: var(--font-primary);
		font-size: var(--font-size-ui);
		font-weight: var(--font-weight-black);
		color: var(--colors-content-secondary);
		text-align: left;
	}

	.accordion__item:hover,
	.accordion__item.expanded {
		color: var(--colors-content-primary);
	}

	.icon {
		font-size: var(--font-size-ui-sm);
	}

	.accordion__content {
		padding-bottom: var(--spacing-4);
		color: var(--colors-content-secondary);
	}

	.accordion__content p {
		margin: 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-ui-sm);
		line-height: var(--line-height-relaxed);
	}
</style>