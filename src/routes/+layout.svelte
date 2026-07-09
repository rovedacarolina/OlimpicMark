<script>
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import SiteGradientBackground from '$lib/components/SiteGradientBackground.svelte';
	import SiteVideoIntro from '$lib/components/SiteVideoIntro.svelte';

	import '$lib/styles/reset.css';
	import '$lib/styles/tokens.css';

	let { children } = $props();
	let showGradientBackground = $derived(!page.url.pathname.startsWith('/mappa'));
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />

	<link rel="preconnect" href="https://api.fontshare.com" />
	<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2,3,4,5,6,7,8,9&display=swap" />
</svelte:head>

{#if showGradientBackground}
	<SiteGradientBackground />
{/if}

<div class="site-layout-content">
	{@render children()}
</div>

<SiteVideoIntro />
<PageTransition />

<style>
	.site-layout-content {
		position: relative;
		z-index: 1;
		width: 100%;
		min-height: 100vh;
		overflow-x: hidden;
	}
</style>
