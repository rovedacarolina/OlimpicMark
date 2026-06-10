<script>
	let { verdict = 'POSITIVA' } = $props();

	let section;
	let hasAnimated = $state(false);

	let finalAngle = $derived(
		verdict === 'NEGATIVA' ? -55 : verdict === 'INCERTA' ? 0 : 55
	);

	$effect(() => {
		if (!section) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					hasAnimated = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.45 }
		);

		observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section class="verdict" bind:this={section}>
	<div class="verdict__label">VERDETTO</div>

	<div class="gauge">
		<div class="gauge__arc"></div>

		<div
			class="gauge__needle"
			class:animate={hasAnimated}
			style={`--final-angle: ${finalAngle}deg`}
		></div>

		<div class="gauge__center"></div>

		<div class="gauge__scale">
			<span>NEGATIVA</span>
			<span>INCERTA</span>
			<span>POSITIVA</span>
		</div>
	</div>

	<h2 class:visible={hasAnimated}>{verdict}</h2>
</section>

<style>
	.verdict {
		width: 100%;
		min-height: 560px;
		padding-block: var(--spacing-10);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		font-family: var(--font-primary);
		color: var(--colors-content-secondary);
	}

	.verdict__label {
		margin-bottom: var(--spacing-8);

		font-size: var(--font-size-ui);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;

		color: var(--colors-content-primary);
	}

	.gauge {
		position: relative;
		width: min(720px, 80vw);
		height: 340px;

		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.gauge__arc {
		position: absolute;
		bottom: 0;

		width: 100%;
		aspect-ratio: 2 / 1;

		border: 2px solid rgba(var(--colors-content-secondary-rgb), 0.35);
		border-bottom: 0;
		border-radius: var(--radius-full) var(--radius-full) 0 0;
	}

	.gauge__needle {
		position: absolute;
		bottom: 0;
		left: 50%;

		width: 4px;
		height: 250px;

		background: var(--colors-content-primary);
		border-radius: var(--radius-full);
		box-shadow: 0 0 24px rgba(var(--colors-content-primary-rgb), 0.55);

		transform-origin: bottom center;
		transform: translateX(-50%) rotate(-55deg);
	}

	.gauge__needle.animate {
		animation: needle-sweep 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	.gauge__center {
		position: absolute;
		bottom: 0;
		left: 50%;

		width: var(--spacing-5);
		height: var(--spacing-5);

		border-radius: var(--radius-round);
		background: var(--colors-content-secondary);

		transform: translate(-50%, 50%);
		z-index: 2;
	}

	.gauge__scale {
		position: absolute;
		bottom: calc(var(--spacing-8) * -1);
		left: 0;

		width: 100%;

		display: flex;
		justify-content: space-between;

		font-size: var(--font-size-ui);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		text-transform: uppercase;

		color: rgba(var(--colors-content-secondary-rgb), 0.5);
	}

	h2 {
		margin: var(--spacing-10) 0 0;

		font-size: var(--font-size-hero);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;

		color: var(--colors-content-primary);

		opacity: 0;
		transform: translateY(var(--spacing-3));

		transition:
			opacity 0.6s ease,
			transform 0.6s ease;
	}

	h2.visible {
		opacity: 1;
		transform: translateY(0);
	}

	@keyframes needle-sweep {
		0% {
			transform: translateX(-50%) rotate(-55deg);
		}

		30% {
			transform: translateX(-50%) rotate(55deg);
		}

		50% {
			transform: translateX(-50%) rotate(-18deg);
		}

		70% {
			transform: translateX(-50%) rotate(32deg);
		}

		100% {
			transform: translateX(-50%) rotate(var(--final-angle));
		}
	}

	@media (max-width: 768px) {
		.verdict {
			min-height: 480px;
			padding-block: var(--spacing-8);
		}

		.gauge {
			width: 90vw;
			height: 250px;
		}

		.gauge__needle {
			height: 185px;
		}

		h2 {
			font-size: var(--font-size-display-lg);
		}

		.gauge__scale {
			font-size: var(--font-size-ui-sm);
		}
	}
</style>