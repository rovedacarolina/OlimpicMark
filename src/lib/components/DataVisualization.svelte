<script>
	let { mainPercentage = 72, leftPercentage = 64, rightPercentage = 69 } = $props();
</script>

<section class="data-viz">
	<div class="side-value left">{leftPercentage}%</div>

	<div class="circle">
		<div class="main-value">{mainPercentage}%</div>
		<p>Lo considera uno dei casi più riusciti di legacy olimpica.</p>
	</div>

	<div class="side-value right">{rightPercentage}%</div>
</section>

<style>
	.data-viz {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 560px;
	}

	.circle {
		width: min(560px, 70vw);
		aspect-ratio: 1;
		border-radius: var(--radius-round);
		background: radial-gradient(circle at center, #0870ed 0%, #173b68 70%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.main-value {
		font-family: var(--font-primary);
		font-size: clamp(120px, 14vw, 220px);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		color: var(--colors-content-secondary);
		letter-spacing: -0.06em;
	}

	p {
		max-width: 220px;
		margin: var(--spacing-3) 0 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-ui-sm);
		line-height: var(--line-height-normal);
		color: var(--colors-content-secondary);
	}

	.side-value {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-family: var(--font-primary);
		font-size: var(--font-size-h1);
		font-weight: var(--font-weight-black);
		color: rgba(246, 246, 246, 0.5);
	}

	.left {
		left: 8%;
	}

	.right {
		right: 8%;
	}
</style>
