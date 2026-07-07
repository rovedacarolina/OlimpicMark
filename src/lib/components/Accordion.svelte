<script>
	import AccordionTabs from './AccordionTabs.svelte';

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
				<button class="accordion__trigger" type="button" onclick={() => toggleItem(index)}>
					<span>{item.label}</span>
					<span class="accordion__icon">
						<span
							class:accordion__mark--minus={expandedIndex === index}
							class:accordion__mark--plus={expandedIndex !== index}
							class="accordion__mark"
							aria-hidden="true"
						></span>
					</span>
				</button>

				{#if expandedIndex === index}
					<div class="accordion__content">
						{#if item.tabs?.length}
							<AccordionTabs tabs={item.tabs} />
						{:else if item.content}
							{#each item.content.split('\n\n') as paragraph}
								<p>{paragraph}</p>
							{/each}
						{/if}
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
		gap: 0;
	}

	.accordion__row {
		width: 100%;
		padding-block: var(--spacing-6);
		border-bottom: 1px solid rgba(var(--colors-content-secondary-rgb), 0.38);
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
		transition: color 0.25s ease;
	}

	.accordion__row.is-open .accordion__trigger {
		margin-bottom: var(--spacing-6);
	}

	.accordion__icon {
		width: 64px;
		height: 64px;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		color: var(--colors-content-secondary);
		flex-shrink: 0;
	}

	.accordion__mark {
		position: relative;
		display: block;
		width: 42px;
		height: 42px;
		color: currentColor;
		transition:
			color 0.25s ease,
			transform 0.25s ease;
	}

	.accordion__mark::before,
	.accordion__mark::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100%;
		height: 5px;
		border-radius: 999px;
		background: currentColor;
		transform: translate(-50%, -50%);
	}

	.accordion__mark::after {
		transform: translate(-50%, -50%) rotate(90deg);
		transition: opacity 0.2s ease;
	}

	.accordion__mark--minus::after {
		opacity: 0;
	}

	.accordion__trigger:hover {
		color: var(--colors-content-primary);
	}

	.accordion__trigger:hover .accordion__mark {
		color: var(--colors-content-primary);
		transform: scale(1.04);
	}

	.accordion__content {
		width: 100%;
		padding-left: 0;
	}

	.accordion__content p {
		margin: 0 0 var(--spacing-4);

		font-family: var(--font-primary);
		font-size: var(--font-size-h1);
		font-weight: var(--font-weight-regular);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-normal);

		color: var(--colors-content-secondary);
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
			gap: 0;
		}

		.accordion__row {
			padding-block: var(--spacing-5);
		}

		.accordion__trigger {
			font-size: var(--font-size-display-lg);
		}

		.accordion__icon {
			width: 48px;
			height: 48px;
		}

		.accordion__mark {
			width: 34px;
			height: 34px;
		}

		.accordion__mark::before,
		.accordion__mark::after {
			height: 4px;
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
