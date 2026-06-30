<svelte:head>
	<title>Mappa - Olympic Mark</title>
</svelte:head>

<div class="map-page">
	<iframe
		class="map-page__frame"
		src="/olympicmark-2-11/index.html?view=map"
		title="Mappa Olympic Mark"
	></iframe>
</div>

<style>
	.map-page {
		position: fixed;
		inset: 0;
		min-height: 100vh;
		background: #080810;
	}

	.map-page__frame {
		display: block;
		width: 100%;
		height: 100vh;
		border: 0;
	}
</style>
