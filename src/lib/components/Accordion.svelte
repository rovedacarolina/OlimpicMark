<script>
	let { number = '01', title = '', items = [] } = $props();

	let expandedIndex = $state(-1);

	function toggleItem(index = 0) {
		expandedIndex = expandedIndex === index ? -1 : index;
	}
</script>

<section class="accordion">
	<div class="accordion__list">
		{#each items as item, index}
			<div class="accordion__row" class:is-open={expandedIndex === index}>
				<button class="accordion__trigger" onclick={() => toggleItem(index)}>
					<span>{item.label}</span>
					<span class="accordion__icon">
	{#if expandedIndex === index}
		<i class="fi fi-sr-square-minus"></i>
	{:else}
		<i class="fi fi-sr-square-plus"></i>
	{/if}
</span>
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
		min-height: 100vh;

		display: flex;
		align-items: center;

		padding-block: var(--spacing-10);
		font-family: var(--font-secondary);
	}

	.accordion__list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-7);
	}

	.accordion__row {
		width: 100%;
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

		font-family: var(--font-secondary);
		font-size: var(--font-size-hero);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		text-align: left;

		color: var(--colors-content-secondary);
	}

	.accordion__trigger {
	color: var(--colors-content-secondary);
	transition: color 0.25s ease;
}

.accordion__trigger {
	color: var(--colors-content-secondary);
	transition: color 0.25s ease;
}

.accordion__icon i {
	color: var(--colors-content-secondary);
	transition: color 0.25s ease;
}

	.accordion__row.is-open .accordion__trigger {
		margin-bottom: var(--spacing-6);
	}

	.accordion__icon {
		width: 76px;
		height: 76px;


		border-radius: var(--radius-round);

		display: inline-flex;
		align-items: center;
		justify-content: center;

		font-size: var(--font-size-display-lg);
		font-weight: var(--font-weight-black);
		line-height: 1;

		color: var(--colors-content-secondary);
		flex-shrink: 0;
	}

	.accordion__icon,
.accordion__icon i {
	color: inherit;
	transition: color 0.25s ease;
}

.accordion__trigger:hover {
	color: var(--colors-content-primary);
}

.accordion__trigger:hover .accordion__icon i {
	color: var(--colors-content-primary);
}
	.accordion__content {
		width: min(900px, 82vw);
		padding-left: var(--spacing-4);
	}

	.accordion__content p {
		margin: 0 0 var(--spacing-4);

		font-family: var(--font-primary);
		font-size: var(--font-size-h3);
		font-weight: var(--font-weight-regular);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-normal);

		color: var(--colors-content-primary);
	}

	.accordion__content p:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		.accordion {
			min-height: auto;
			padding-block: var(--spacing-8);
		}

		.accordion__list {
			gap: var(--spacing-6);
		}

		.accordion__trigger {
			font-size: var(--font-size-display-lg);
		}

		.accordion__icon {
			width: 48px;
			height: 48px;
			border-width: 5px;
			font-size: var(--font-size-h3);
		}

		.accordion__content {
			width: 100%;
			padding-left: 0;
		}

		.accordion__content p {
			font-size: var(--font-size-body);
		}
	}
</style>