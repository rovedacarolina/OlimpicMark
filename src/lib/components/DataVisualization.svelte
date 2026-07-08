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
	let timerKey = $state(0);

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
		timerKey += 1;
	}

	function showNextItem() {
		activeIndex = (activeIndex + 1) % items.length;
		timerKey += 1;
	}

	$effect(() => {
		const index = activeIndex;
		const key = timerKey;
		const duration = intervalMs;

		if (items.length < 2) return;

		const timeout = setTimeout(showNextItem, duration);

		return () => clearTimeout(timeout);
	});
</script>

<section
	class="data-viz"
	aria-label="Dati sulla percezione della legacy"
	style={`--data-viz-duration: ${intervalMs}ms;`}
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
			>
				{#if index === activeIndex}
					{#key `${activeIndex}-${timerKey}`}
						<span class="data-viz__dot-fill" aria-hidden="true"></span>
					{/key}
				{/if}
			</button>
		{/each}
	</div>
</section>

<style>
	.data-viz {
		position: relative;
		width: 100%;
		min-height: clamp(500px, 56vw, 620px);
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
		width: min(100%, 680px);
		min-height: 86px;
		margin: var(--spacing-6) auto 0;
		font-family: var(--font-secondary);
		font-size: clamp(30px, 3.4vw, var(--font-size-h2));
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
		position: relative;
		width: 72px;
		height: 5px;
		border: 0;
		padding: 0;
		overflow: hidden;
		background: rgba(var(--colors-content-secondary-rgb), 0.3);
		cursor: pointer;
		transition: background 220ms ease;
	}

	.data-viz__dot.is-active {
		background: rgba(var(--colors-content-secondary-rgb), 0.22);
	}

	.data-viz__dot:hover {
		background: rgba(var(--colors-content-secondary-rgb), 0.46);
	}

	.data-viz__dot-fill {
		position: absolute;
		inset: 0;
		background: var(--colors-content-primary);
		transform: scaleX(0);
		transform-origin: left;
		animation: data-viz-progress var(--data-viz-duration) linear forwards;
	}

	@keyframes data-viz-progress {
		to {
			transform: scaleX(1);
		}
	}

	@media (max-width: 1100px) {
		.data-viz {
			min-height: 540px;
		}

		.data-viz__numbers {
			height: 300px;
		}

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

	@media (max-width: 900px) {
		.data-viz__item span {
			font-size: 66px;
		}

		.data-viz__item.is-active span {
			font-size: 150px;
		}

		.data-viz__item.is-previous {
			transform: translate(calc(-50% - 205px), -50%) scale(0.72);
		}

		.data-viz__item.is-next {
			transform: translate(calc(-50% + 205px), -50%) scale(0.72);
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
			width: min(100%, 430px);
			min-height: 96px;
			font-size: clamp(20px, 5.2vw, 28px);
		}

		.data-viz__dot {
			width: clamp(44px, 14vw, 54px);
		}
	}

	@media (max-width: 480px) {
		.data-viz {
			min-height: 390px;
			padding-block: var(--spacing-5);
		}

		.data-viz__numbers {
			height: 190px;
		}

		.data-viz__item span {
			font-size: 38px;
		}

		.data-viz__item.is-active span {
			font-size: 86px;
		}

		.data-viz__item.is-previous {
			transform: translate(calc(-50% - 106px), -50%) scale(0.7);
		}

		.data-viz__item.is-next {
			transform: translate(calc(-50% + 106px), -50%) scale(0.7);
		}

		.data-viz__text {
			min-height: 86px;
			margin-top: var(--spacing-4);
			font-size: clamp(18px, 5.8vw, 24px);
		}

		.data-viz__controls {
			gap: var(--spacing-2);
			margin-top: var(--spacing-4);
		}

		.data-viz__dot {
			width: clamp(42px, 18vw, 58px);
			height: 4px;
		}
	}
</style>
