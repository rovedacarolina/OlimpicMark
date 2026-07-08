<script>
	let { interactive = true } = $props();

	/** @type {HTMLDivElement | undefined} */
	let pointerElement = $state();
	let targetX = 0;
	let targetY = 0;
	let currentX = 0;
	let currentY = 0;
	let frameRequested = false;

	/** @param {MouseEvent} event */
	function handlePointerMove(event) {
		if (!interactive || !pointerElement) return;

		targetX = event.clientX - window.innerWidth / 2;
		targetY = event.clientY - window.innerHeight / 2;
		requestMoveFrame();
	}

	function requestMoveFrame() {
		if (frameRequested) return;
		frameRequested = true;
		requestAnimationFrame(updatePointerPosition);
	}

	function updatePointerPosition() {
		frameRequested = false;
		if (!pointerElement) return;

		currentX += (targetX - currentX) / 22;
		currentY += (targetY - currentY) / 22;
		pointerElement.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(
			currentY
		)}px, 0)`;

		if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
			requestMoveFrame();
		}
	}
</script>

<svelte:window onmousemove={handlePointerMove} />

<div class="site-gradient-bg" aria-hidden="true">
	<svg class="site-gradient-bg__filter" aria-hidden="true">
		<defs>
			<filter id="site-gradient-blur">
				<feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
					result="goo"
				/>
				<feBlend in="SourceGraphic" in2="goo" />
			</filter>
		</defs>
	</svg>

	<div class="site-gradient-bg__field">
		<div class="site-gradient-bg__layer site-gradient-bg__layer--one"></div>
		<div class="site-gradient-bg__layer site-gradient-bg__layer--two"></div>
		<div class="site-gradient-bg__layer site-gradient-bg__layer--three"></div>
		<div class="site-gradient-bg__layer site-gradient-bg__layer--four"></div>
		<div class="site-gradient-bg__layer site-gradient-bg__layer--five"></div>
		{#if interactive}
			<div class="site-gradient-bg__pointer" bind:this={pointerElement}></div>
		{/if}
	</div>
</div>

<style>
	.site-gradient-bg {
		--gradient-background-start: #020207;
		--gradient-background-end: #080810;
		--gradient-first-color: 8, 112, 237;
		--gradient-second-color: 89, 130, 175;
		--gradient-third-color: 222, 230, 239;
		--gradient-fourth-color: 0, 31, 82;
		--gradient-fifth-color: 8, 112, 237;
		--gradient-pointer-color: 89, 130, 175;
		--gradient-size: 88vmax;
		--gradient-blend-mode: screen;

		position: fixed;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
		background:
			radial-gradient(circle at 12% 0%, rgba(var(--gradient-first-color), 0.16), transparent 34%),
			linear-gradient(40deg, var(--gradient-background-start), var(--gradient-background-end));
	}

	.site-gradient-bg::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 2;
		background:
			linear-gradient(to bottom, rgba(2, 2, 7, 0.2), rgba(2, 2, 7, 0.58)),
			radial-gradient(circle at center, transparent 0%, rgba(2, 2, 7, 0.56) 74%);
	}

	.site-gradient-bg__filter {
		position: absolute;
		width: 0;
		height: 0;
	}

	.site-gradient-bg__field {
		position: absolute;
		inset: -16vmax;
		filter: url('#site-gradient-blur') blur(44px);
		opacity: 0.78;
	}

	.site-gradient-bg__layer,
	.site-gradient-bg__pointer {
		position: absolute;
		left: calc(50% - var(--gradient-size) / 2);
		top: calc(50% - var(--gradient-size) / 2);
		width: var(--gradient-size);
		height: var(--gradient-size);
		border-radius: 999px;
		mix-blend-mode: var(--gradient-blend-mode);
		opacity: 0.48;
	}

	.site-gradient-bg__layer--one {
		background: radial-gradient(circle at center, rgba(var(--gradient-first-color), 0.48), transparent 52%);
		transform-origin: center center;
		animation: gradient-move-vertical 34s ease-in-out infinite;
	}

	.site-gradient-bg__layer--two {
		background: radial-gradient(circle at center, rgba(var(--gradient-second-color), 0.34), transparent 54%);
		transform-origin: calc(50% - 30vmax) center;
		animation: gradient-move-circle 32s reverse infinite;
	}

	.site-gradient-bg__layer--three {
		background: radial-gradient(circle at center, rgba(var(--gradient-third-color), 0.13), transparent 50%);
		transform-origin: calc(50% + 28vmax) center;
		animation: gradient-move-circle 52s linear infinite;
	}

	.site-gradient-bg__layer--four {
		background: radial-gradient(circle at center, rgba(var(--gradient-fourth-color), 0.58), transparent 58%);
		transform-origin: calc(50% - 18vmax) calc(50% + 20vmax);
		animation: gradient-move-horizontal 46s ease-in-out infinite;
		opacity: 0.66;
	}

	.site-gradient-bg__layer--five {
		background: radial-gradient(circle at center, rgba(var(--gradient-fifth-color), 0.24), transparent 56%);
		transform-origin: calc(50% - 60vmax) calc(50% + 46vmax);
		animation: gradient-move-circle 28s ease-in-out infinite;
	}

	.site-gradient-bg__pointer {
		background: radial-gradient(circle at center, rgba(var(--gradient-pointer-color), 0.26), transparent 54%);
		opacity: 0.44;
	}

	@keyframes gradient-move-horizontal {
		0%,
		100% {
			transform: translateX(-18%) translateY(-6%);
		}

		50% {
			transform: translateX(18%) translateY(8%);
		}
	}

	@keyframes gradient-move-circle {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes gradient-move-vertical {
		0%,
		100% {
			transform: translateY(-18%);
		}

		50% {
			transform: translateY(18%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site-gradient-bg__layer,
		.site-gradient-bg__pointer {
			animation: none;
		}
	}

	@media (max-width: 768px) {
		.site-gradient-bg {
			--gradient-size: 108vmax;
		}

		.site-gradient-bg__field {
			inset: -12vmax;
			filter: url('#site-gradient-blur') blur(34px);
			opacity: 0.68;
		}
	}
</style>
