<script>
	import { fly } from 'svelte/transition';

	let { tabs = [] } = $props();
	let activeIndex = $state(0);
	let activeTab = $derived(tabs[activeIndex] ?? tabs[0]);

	/** @param {number} index */
	function setActiveTab(index) {
		activeIndex = index;
	}

	/** @param {KeyboardEvent} event */
	function handleTabKeydown(event) {
		if (!tabs.length) return;

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			activeIndex = (activeIndex + 1) % tabs.length;
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			activeIndex = (activeIndex - 1 + tabs.length) % tabs.length;
		}
	}
</script>

{#if tabs.length}
	<div class="accordion-tabs">
		<div class="accordion-tabs__list" role="tablist" aria-label="Dettagli del contenuto">
			{#each tabs as tab, index (tab.value ?? tab.title)}
				<button
					class="accordion-tabs__tab"
					class:is-active={activeIndex === index}
					type="button"
					role="tab"
					aria-selected={activeIndex === index}
					aria-controls={`accordion-tab-panel-${tab.value ?? index}`}
					id={`accordion-tab-${tab.value ?? index}`}
					onclick={() => setActiveTab(index)}
					onkeydown={handleTabKeydown}
				>
					<span class="accordion-tabs__tab-label">{tab.title}</span>
				</button>
			{/each}
		</div>

		<div class="accordion-tabs__stage">
			{#key activeTab?.value ?? activeTab?.title}
				<div
					class="accordion-tabs__panel"
					role="tabpanel"
					id={`accordion-tab-panel-${activeTab?.value ?? activeIndex}`}
					aria-labelledby={`accordion-tab-${activeTab?.value ?? activeIndex}`}
					in:fly={{ y: 18, duration: 280 }}
				>
					<h3>{activeTab.title}</h3>
					<p>{activeTab.content}</p>
				</div>
			{/key}
		</div>
	</div>
{/if}

<style>
	.accordion-tabs {
		width: 100%;
	}

	.accordion-tabs__list {
		width: max-content;
		max-width: 100%;
		display: flex;
		align-items: center;
		gap: var(--spacing-6);
		overflow-x: auto;
		padding: 0 0 var(--spacing-4);
		border-bottom: 2px solid rgba(var(--colors-content-secondary-rgb), 0.34);
		background: transparent;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
	}

	.accordion-tabs__list::-webkit-scrollbar {
		display: none;
	}

	.accordion-tabs__tab {
		position: relative;
		flex: 0 0 auto;
		padding: 0 0 var(--spacing-2);
		border: 0;
		background: transparent;
		color: rgba(var(--colors-content-secondary-rgb), 0.72);
		font-family: var(--font-primary);
		font-size: clamp(18px, 1.4vw, 24px);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		transition:
			color 0.22s ease,
			transform 0.22s ease;
	}

	.accordion-tabs__tab::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -22px;
		height: 4px;
		background: var(--colors-content-primary);
		opacity: 0;
		transform: scaleX(0);
		transform-origin: left;
		transition:
			opacity 0.24s ease,
			transform 0.24s ease;
	}

	.accordion-tabs__tab:hover,
	.accordion-tabs__tab.is-active {
		color: var(--colors-neutral-white);
	}

	.accordion-tabs__tab.is-active::after {
		opacity: 1;
		transform: scaleX(1);
	}

	.accordion-tabs__tab:hover {
		transform: translateY(-1px);
	}

	.accordion-tabs__tab-label {
		position: relative;
		z-index: 1;
		display: block;
		white-space: nowrap;
	}

	.accordion-tabs__stage {
		position: relative;
		min-height: 320px;
		margin-top: var(--spacing-8);
	}

	.accordion-tabs__panel {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-5);
		width: 75%;
	}

	.accordion-tabs__panel h3 {
		margin: 0;
		color: var(--colors-content-secondary);
		font-family: var(--font-primary);
		font-size: var(--font-size-h1);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 0;
		text-transform: uppercase;
	}

	.accordion-tabs__panel p {
		margin: 0;
		color: rgba(var(--colors-content-secondary-rgb), 0.88);
		font-family: var(--font-primary);
		font-size: clamp(36px, 3.2vw, 56px);
		font-weight: var(--font-weight-regular);
		line-height: var(--line-height-relaxed);
		letter-spacing: 0;
	}

	@media (max-width: 1024px) {
		.accordion-tabs__panel {
			width: 100%;
		}
	}

	@media (max-width: 768px) {
		.accordion-tabs__list {
			gap: var(--spacing-4);
		}

		.accordion-tabs__tab {
			font-size: 16px;
		}

		.accordion-tabs__stage {
			min-height: 0;
			margin-top: var(--spacing-5);
		}

		.accordion-tabs__panel {
			width: 100%;
			gap: var(--spacing-4);
		}

		.accordion-tabs__panel h3 {
			font-size: var(--font-size-h4);
		}

		.accordion-tabs__panel p {
			font-size: var(--font-size-ui-sm);
		}
	}
</style>
