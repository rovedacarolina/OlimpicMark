<script>
	import OlympicMap from '$lib/components/OlympicMap.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<svelte:head>
	<title>Mappa - Olympic Mark</title>
</svelte:head>

<div class="map-page">
	<TopBar />
	<OlympicMap />
</div>

<style>
	.map-page {
		min-height: 100vh;
		overflow-x: hidden;
		background: #080810;
	}

	.map-page :global(.top-bar) {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 40;
		width: 100%;
		background: transparent;
	}

	.map-page :global(.top-bar__brand),
	.map-page :global(.top-bar__link) {
		color: rgba(255, 255, 255, 0.74);
		text-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
	}

	.map-page :global(.top-bar__brand:hover),
	.map-page :global(.top-bar__link:hover) {
		color: #ffffff;
	}
</style>
