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
		]
	} = $props();

	let activeIndex = $state(0);

	function getPosition(index) {
		const diff = (index - activeIndex + items.length) % items.length;

		if (diff === 0) return 'active';
		if (diff === 1) return 'right';
		if (diff === 2) return 'hidden';
		return 'left';
	}

	function next() {
		activeIndex = (activeIndex + 1) % items.length;
	}

	$effect(() => {
		const interval = setInterval(next, 3600);
		return () => clearInterval(interval);
	});
</script>

<section class="data-viz">
	<div class="data-viz__circle"></div>

	<div class="data-viz__wheel">
		{#each items as item, index}
			<button
				class="data-viz__item"
				class:is-active={getPosition(index) === 'active'}
				class:is-left={getPosition(index) === 'left'}
				class:is-right={getPosition(index) === 'right'}
				class:is-hidden={getPosition(index) === 'hidden'}
				onclick={() => (activeIndex = index)}
			>
				<span>{item.value}%</span>

				{#if getPosition(index) === 'active'}
					<p>{item.text}</p>
				{/if}
			</button>
		{/each}
	</div>
</section>

<style>
	.data-viz {
		position: relative;
		width: 100%;
		min-height: 680px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.data-viz__circle {
		position: absolute;
		width: min(680px, 72vw);
		aspect-ratio: 1;
		border-radius: var(--radius-round);
		background: radial-gradient(
			circle at center,
			var(--colors-content-primary) 0%,
			var(--colors-background-primary) 78%
		);
		z-index: 1;
	}

	.data-viz__wheel {
		position: relative;
		width: 100%;
		max-width: 1180px;
		height: 420px;
		z-index: 2;
	}

	.data-viz__item {
		position: absolute;
		top: 50%;
		left: 50%;

		border: 0;
		background: transparent;
		cursor: pointer;

		font-family: var(--font-primary);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-tight);
		text-align: center;

		color: color-mix(in srgb, var(--colors-content-secondary) 45%, transparent);

		transition:
			transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
			color 900ms cubic-bezier(0.22, 1, 0.36, 1);

		will-change: transform, opacity;
	}

	.data-viz__item span {
		display: block;
		font-size: var(--font-size-display-lg);
	}

	.data-viz__item.is-active {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
		color: var(--colors-content-secondary);
		z-index: 4;
	}

	.data-viz__item.is-active span {
		font-size: clamp(var(--font-size-hero), 16vw, 280px);
		letter-spacing: -0.06em;
	}

	.data-viz__item.is-left {
		transform: translate(calc(-50% - 460px), -50%) scale(1);
		opacity: 0.75;
		z-index: 3;
	}

	.data-viz__item.is-right {
		transform: translate(calc(-50% + 460px), -50%) scale(1);
		opacity: 0.75;
		z-index: 3;
	}

	.data-viz__item.is-hidden {
		transform: translate(-50%, -50%) scale(0.4);
		opacity: 0;
		pointer-events: none;
		z-index: 0;
	}

	p {
		max-width: 360px;
		margin: var(--spacing-3) auto 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-body);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-normal);
		color: var(--colors-content-secondary);
	}

	@media (max-width: 768px) {
		.data-viz {
			min-height: 520px;
		}

		.data-viz__circle {
			width: 86vw;
		}

		.data-viz__wheel {
			height: 340px;
		}

		.data-viz__item span {
			font-size: var(--font-size-h4);
		}

		.data-viz__item.is-active span {
			font-size: 96px;
		}

		.data-viz__item.is-left {
			transform: translate(calc(-50% - 180px), -50%) scale(1);
		}

		.data-viz__item.is-right {
			transform: translate(calc(-50% + 180px), -50%) scale(1);
		}

		p {
			max-width: 240px;
			font-size: var(--font-size-ui-sm);
		}
	}
</style>