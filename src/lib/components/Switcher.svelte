<script>
	let active = $state('left');

	function toggle() {
		active = active === 'left' ? 'right' : 'left';
	}
</script>

<button
	class="switcher"
	onclick={toggle}
	aria-label="Switch mode"
>
	<div class="switcher__track">
		<div class:active={active === 'left'} class="switcher__dot"></div>
		<div class:active={active === 'right'} class="switcher__dot"></div>
	</div>
</button>

<style>
	.switcher {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.switcher__track {
		display: flex;
		align-items: center;
		gap: 4px;

		padding: 3px;

		border: 1px solid rgba(255,255,255,.25);
		border-radius: 999px;
	}

	.switcher__dot {
		width: 8px;
		height: 8px;

		border-radius: 50%;

		border: 1px solid rgba(255,255,255,.35);
		background: transparent;

		transition: all .2s ease;
	}

	.switcher__dot.active {
		background: #0f7bff;
		border-color: #0f7bff;
	}
</style>