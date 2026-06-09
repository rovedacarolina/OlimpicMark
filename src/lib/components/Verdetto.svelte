<script>
	let {
		selected = $bindable(''),
		options = ['NEGATIVA', 'INCERTA', 'POSITIVA']
	} = $props();
</script>

<div class="verdetto">
  {#each options as option, index (index)}
    <button
      class="verdetto__button"
      class:active={selected === option}
      class:positive={option === 'POSITIVA'}
      onclick={() => selected = option}
    >
      <span class="verdetto__text">{option}</span>
    </button>
  {/each}
</div>

<style>
  .verdetto {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 0;
    width: 100%;
    height: 129px;
  }

  .verdetto__button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--colors-content-secondary);
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: var(--radius-xl);
    font-family: var(--font-primary);
  }

  .verdetto__button:first-child,
  .verdetto__button:nth-child(2) {
    border-radius: var(--radius-xl) 0 0 var(--radius-xl);
  }

  .verdetto__button:last-child {
    border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
  }

  .verdetto__button.positive {
    background-color: var(--colors-content-primary);
    border-color: var(--colors-content-primary);
  }

  .verdetto__button.positive .verdetto__text {
    color: var(--colors-neutral-white);
  }

  .verdetto__button:not(.positive) .verdetto__text {
    color: var(--colors-content-secondary);
  }

  .verdetto__button:hover:not(.active) {
    background-color: rgba(8, 112, 237, 0.1);
  }

  .verdetto__button.active:not(.positive) {
    background-color: rgba(8, 112, 237, 0.2);
  }

  .verdetto__text {
    font-size: var(--font-size-display-lg);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--letter-spacing-wide);
    text-transform: uppercase;
    line-height: var(--line-height-tight);
    transition: color 0.3s ease;
  }
</style>
