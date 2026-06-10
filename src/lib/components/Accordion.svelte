<script>
	let { number = '01', title = '', items = [] } = $props();

	let expandedIndex = $state(-1);

	function toggleItem(index = 0) {
		expandedIndex = expandedIndex === index ? -1 : index;
	}
</script>

<section class="accordion">
	<header class="accordion__header">
		<span class="accordion__number">{number}</span>
		<span class="accordion__title">{title}</span>
	</header>

	<div class="accordion__list">
		{#each items as item, index}
			<div class="accordion__row">
				<button
					class="accordion__trigger"
					class:is-open={expandedIndex === index}
					onclick={() => toggleItem(index)}
				>
					<span>{item.label}</span>
					<span class="accordion__icon">{expandedIndex === index ? '−' : '+'}</span>
				</button>

				{#if expandedIndex === index}
					<div class="accordion__content">
						{#each item.content.split('\n\n') as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style>
	.accordion {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: var(--spacing-10);
		font-family: var(--font-primary);
	}

	.accordion__header {
		display: contents;
	}

	.accordion__number {
		grid-column: 1;
		justify-self: start;
		color: var(--colors-content-primary);
		font-size: var(--font-size-h3);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
        padding-bottom: var(--spacing-4);
	}

	.accordion__title {
		grid-column: 2;
		justify-self: start;
		color: var(--colors-content-primary);
		font-size: var(--font-size-h3);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
        padding-bottom: var(--spacing-4);
	}

	.accordion__list {
		grid-column: 2;
		margin-top: var(--spacing-8);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-6);
	}

	.accordion__trigger {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-6);
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font-family: var(--font-primary);
		font-size: var(--font-size-h4);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		color: rgba(var(--colors-content-secondary-rgb), 0.72);
	}

	.accordion__trigger:hover,
	.accordion__trigger.is-open {
		color: var(--colors-content-primary);
	}

	.accordion__icon {
		width: 24px;
		height: 24px;
		border: 2px solid currentColor;
		border-radius: var(--radius-round);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-ui-sm);
		font-weight: var(--font-weight-medium);
		line-height: 1;
		flex-shrink: 0;
	}

	.accordion__content {
		max-width: 650px;
		margin-top: var(--spacing-3);
		color: var(--colors-content-primary);
	}

	.accordion__content p {
		margin: 0 0 var(--spacing-3);
		font-family: var(--font-primary);
		font-size: var(--font-size-ui-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-normal);
		color: var(--colors-content-primary);
	}

	.accordion__content p:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		.accordion {
			grid-template-columns: 1fr;
			row-gap: var(--spacing-4);
		}

		.accordion__number,
		.accordion__title,
		.accordion__list {
			grid-column: 1;
		}

		.accordion__list {
			margin-top: var(--spacing-4);
		}
	}
</style>