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

	$effect(() => {
		const interval = setInterval(() => {
			activeIndex = (activeIndex + 1) % items.length;
		}, 3600);

		return () => clearInterval(interval);
	});
</script>

<section class="data-viz">
	{#each items as item, index}
		<div
			class="data-viz__item"
			class:is-active={getPosition(index) === 'active'}
			class:is-left={getPosition(index) === 'left'}
			class:is-right={getPosition(index) === 'right'}
			class:is-hidden={getPosition(index) === 'hidden'}
		>
			<span>{item.value}%</span>

			{#if getPosition(index) === 'active'}
				<p>{item.text}</p>
			{/if}
		</div>
	{/each}
</section>

<style>
	.data-viz {
		position: relative;
		width: 100%;
		height: 640px;
		margin-top: var(--spacing-6);
		margin-bottom: var(--spacing-10);
		overflow: hidden;
	}

	.data-viz__item {
		position: absolute;
		top: 50%;
		left: 50%;

		font-family: var(--font-secondary);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: -0.06em;
		text-align: center;

		color: rgba(var(--colors-content-secondary-rgb), 0.55);

		transition:
			transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
			color 900ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.data-viz__item span {
		display: block;
		font-size: clamp(64px, 7vw, 120px);
	}

	.data-viz__item.is-active {
		transform: translate(-50%, -50%);
		opacity: 1;
		color: var(--colors-content-secondary);
		z-index: 4;
	}

	.data-viz__item.is-active span {
		font-size: clamp(180px, 21vw, 360px);
		letter-spacing: -0.08em;
	}

	.data-viz__item.is-left {
		transform: translate(calc(-50% - 430px), -50%);
		opacity: 1;
		z-index: 3;
	}

	.data-viz__item.is-right {
		transform: translate(calc(-50% + 430px), -50%);
		opacity: 1;
		z-index: 3;
	}

	.data-viz__item.is-hidden {
		transform: translate(calc(-50% + 760px), -50%) scale(0.8);
		opacity: 0;
		pointer-events: none;
		z-index: 0;
	}

	.data-viz__item p {
		max-width: 620px;
		margin: var(--spacing-8) auto 0;

		font-family: var(--font-secondary);
		font-size: var(--font-size-h2);
		font-weight: var(--font-weight-regular);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;

		color: var(--colors-content-secondary);
	}

	@media (max-width: 768px) {
		.data-viz {
			height: 420px;
		}

		.data-viz__item span {
			font-size: var(--font-size-h3);
		}

		.data-viz__item.is-active span {
			font-size: 110px;
		}

		.data-viz__item.is-left {
			transform: translate(calc(-50% - 140px), -50%);
		}

		.data-viz__item.is-right {
			transform: translate(calc(-50% + 140px), -50%);
		}

		.data-viz__item p {
			max-width: 320px;
			font-size: var(--font-size-body);
		}
	}
</style>