<script>
	let {
		items = [
			{
				value: 72,
				text: 'Lo considera uno dei casi più riusciti di legacy olimpica.'
			},
			{
				value: 64,
				text: 'Associa Anterselva ad un rafforzamento dell’identità degli sport invernali.'
			},
			{
				value: 69,
				text: 'Vorrebbe mantenere, anche dopo i Giochi, il sistema di trasporti attivato.'
			},
			{
				value: 58,
				text: 'Collega Anterselva a una maggiore visibilità internazionale.'
			}
		],
		intervalMs = 4200
	} = $props();

	let activeIndex = $state(0);
	let isPaused = $state(false);

	/** @param {number} index */
	function getPosition(index) {
		const diff = (index - activeIndex + items.length) % items.length;

		if (diff === 0) return 'active';
		if (diff === 1) return 'next';
		if (diff === items.length - 1) return 'previous';
		return 'hidden';
	}

	/** @param {number} index */
	function selectIndex(index) {
		activeIndex = index;
	}

	$effect(() => {
		if (isPaused || items.length < 2) return;

		const interval = setInterval(() => {
			activeIndex = (activeIndex + 1) % items.length;
		}, intervalMs);

		return () => clearInterval(interval);
	});
</script>

<section
	class="data-viz"
	aria-label="Dati sulla percezione della legacy"
	onmouseenter={() => (isPaused = true)}
	onmouseleave={() => (isPaused = false)}
	onfocusin={() => (isPaused = true)}
	onfocusout={() => (isPaused = false)}
>
	<div class="data-viz__numbers" aria-hidden="true">
		{#each items as item, index}
			<button
				type="button"
				class="data-viz__item"
				class:is-active={getPosition(index) === 'active'}
				class:is-previous={getPosition(index) === 'previous'}
				class:is-next={getPosition(index) === 'next'}
				class:is-hidden={getPosition(index) === 'hidden'}
				onclick={() => selectIndex(index)}
				aria-label={`Mostra dato ${item.value}%`}
				aria-current={index === activeIndex ? 'true' : 'false'}
			>
				<span>{item.value}%</span>
			</button>
		{/each}
	</div>

	<p class="data-viz__text" aria-live="polite">{items[activeIndex]?.text}</p>

	<div class="data-viz__controls" aria-label="Seleziona dato">
		{#each items as item, index}
			<button
				type="button"
				class="data-viz__dot"
				class:is-active={index === activeIndex}
				onclick={() => selectIndex(index)}
				aria-label={`Dato ${index + 1}: ${item.value}%`}
			></button>
		{/each}
	</div>
</section>

<style>
	.data-viz {
		position: relative;
		width: 100%;
		min-height: 620px;
		padding-block: var(--spacing-8);
		overflow: hidden;
	}

	.data-viz__numbers {
		position: relative;
		height: 360px;
	}

	.data-viz__item {
		position: absolute;
		top: 50%;
		left: 50%;
		border: 0;
		padding: 0;
		background: transparent;
		color: rgba(var(--colors-content-secondary-rgb), 0.5);
		font-family: var(--font-secondary);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 0;
		text-align: center;
		cursor: pointer;
		opacity: 0;
		transform: translate(-50%, -50%) scale(0.72);
		transition:
			transform 760ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 760ms cubic-bezier(0.22, 1, 0.36, 1),
			color 760ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.data-viz__item span {
		display: block;
		font-size: 112px;
		letter-spacing: 0;
	}

	.data-viz__item.is-active {
		z-index: 4;
		color: var(--colors-content-secondary);
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}

	.data-viz__item.is-active span {
		font-size: 260px;
	}

	.data-viz__item.is-previous {
		z-index: 3;
		opacity: 1;
		transform: translate(calc(-50% - 390px), -50%) scale(0.76);
	}

	.data-viz__item.is-next {
		z-index: 3;
		opacity: 1;
		transform: translate(calc(-50% + 390px), -50%) scale(0.76);
	}

	.data-viz__item.is-hidden {
		pointer-events: none;
	}

	.data-viz__text {
		max-width: 680px;
		min-height: 86px;
		margin: var(--spacing-6) auto 0;
		font-family: var(--font-secondary);
		font-size: var(--font-size-h2);
		font-weight: var(--font-weight-regular);
		line-height: var(--line-height-normal);
		letter-spacing: 0;
		text-align: center;
		text-transform: uppercase;
		color: var(--colors-content-secondary);
	}

	.data-viz__controls {
		display: flex;
		justify-content: center;
		gap: var(--spacing-3);
		margin-top: var(--spacing-6);
	}

	.data-viz__dot {
		width: 44px;
		height: 4px;
		border: 0;
		padding: 0;
		background: rgba(var(--colors-content-secondary-rgb), 0.3);
		cursor: pointer;
		transition:
			background 220ms ease,
			width 220ms ease;
	}

	.data-viz__dot.is-active {
		width: 72px;
		background: var(--colors-content-primary);
	}

	@media (max-width: 1100px) {
		.data-viz__item span {
			font-size: 86px;
		}

		.data-viz__item.is-active span {
			font-size: 190px;
		}

		.data-viz__item.is-previous {
			transform: translate(calc(-50% - 260px), -50%) scale(0.74);
		}

		.data-viz__item.is-next {
			transform: translate(calc(-50% + 260px), -50%) scale(0.74);
		}
	}

	@media (max-width: 768px) {
		.data-viz {
			min-height: 460px;
			padding-block: var(--spacing-6);
		}

		.data-viz__numbers {
			height: 240px;
		}

		.data-viz__item span {
			font-size: 48px;
		}

		.data-viz__item.is-active span {
			font-size: 112px;
		}

		.data-viz__item.is-previous {
			transform: translate(calc(-50% - 138px), -50%) scale(0.72);
		}

		.data-viz__item.is-next {
			transform: translate(calc(-50% + 138px), -50%) scale(0.72);
		}

		.data-viz__text {
			max-width: 340px;
			min-height: 96px;
			font-size: 22px;
		}
	}
</style>
