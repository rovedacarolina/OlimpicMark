<script>
	let {
		beforeImage = '',
		afterImage = '',
		beforeLabel = 'BEFORE',
		afterLabel = 'AFTER'
	} = $props();

	let position = $state(50);
</script>

<div class="card-bi" style={`--position: ${position}%`}>
	<div class="card-bi__image card-bi__before">
		{#if beforeImage}
			<img src={beforeImage} alt="Before" />
		{/if}
	</div>

	<div class="card-bi__image card-bi__after">
		{#if afterImage}
			<img src={afterImage} alt="After" />
		{/if}
	</div>

	<span class="card-bi__label card-bi__label--before">{beforeLabel}</span>
	<span class="card-bi__label card-bi__label--after">{afterLabel}</span>

	<div class="card-bi__divider"></div>

	<div class="card-bi__handle">
		<span>‹</span>
		<span>›</span>
	</div>

	<input
		class="card-bi__range"
		type="range"
		min="0"
		max="100"
		bind:value={position}
		aria-label="Before after slider"
	/>
</div>

<style>
	.card-bi {
		position: relative;
		width: 100%;
		aspect-ratio: 1432 / 904;
		overflow: hidden;
		background:
			linear-gradient(45deg, #e8e8e8 25%, transparent 25%),
			linear-gradient(-45deg, #e8e8e8 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #e8e8e8 75%),
			linear-gradient(-45deg, transparent 75%, #e8e8e8 75%);
		background-color: #f6f6f6;
		background-size: 64px 64px;
		background-position:
			0 0,
			0 32px,
			32px -32px,
			-32px 0;
	}

	.card-bi__image {
		position: absolute;
		inset: 0;
	}

	.card-bi__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.card-bi__before {
		background: #f6f6f6;
	}

	.card-bi__after {
		width: var(--position);
		overflow: hidden;
		background: rgba(8, 112, 237, 0.12);
	}

	.card-bi__label {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 4;
		font-family: var(--font-primary);
		font-size: var(--font-size-ui-sm);
		font-weight: var(--font-weight-black);
		color: var(--colors-content-primary);
		text-transform: uppercase;
	}

	.card-bi__label--before {
		left: var(--spacing-6);
	}

	.card-bi__label--after {
		right: var(--spacing-6);
	}

	.card-bi__divider {
		position: absolute;
		top: 0;
		left: var(--position);
		width: 2px;
		height: 100%;
		background: var(--colors-content-primary);
		transform: translateX(-50%);
		z-index: 5;
		pointer-events: none;
	}

	.card-bi__handle {
		position: absolute;
		left: var(--position);
		top: 50%;
		width: 48px;
		height: 48px;
		transform: translate(-50%, -50%);
		border-radius: var(--radius-round);
		border: 2px solid var(--colors-content-primary);
		background: rgba(246, 246, 246, 0.2);
		color: var(--colors-content-primary);
		z-index: 6;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2px;
		font-family: var(--font-primary);
		font-size: 24px;
		font-weight: var(--font-weight-black);
		pointer-events: none;
	}

	.card-bi__range {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: ew-resize;
		z-index: 10;
	}
</style>