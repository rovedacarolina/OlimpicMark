<script>
  let {
    number = '01',
    title = '',
    items = []
  } = $props();

let expandedIndex = $state(-1);

  function toggleItem(index = 0) {
  expandedIndex = expandedIndex === index ? -1 : index;
}
</script>

<div class="accordion">
  <div class="accordion__header">
    <div class="accordion__number">{number}</div>
    <div class="accordion__title">{title}</div>
  </div>

  <div class="accordion__items">
    {#each items as item, index (index)}
      <button
        class="accordion__item"
        class:expanded={expandedIndex === index}
        onclick={() => toggleItem(index)}
      >
        <div class="accordion__item-label">{item.label}</div>
        <svg class="accordion__chevron" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 15l7 7 7-7"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {#if expandedIndex === index && item.content}
        <div class="accordion__content">
          <p>{item.content}</p>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .accordion {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-9);
    width: 100%;
  }

  .accordion__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    height: 53px;
  }

  .accordion__number,
  .accordion__title {
    font-family: var(--font-primary);
    font-size: var(--font-size-display-md);
    font-weight: var(--font-weight-black);
    color: var(--colors-content-primary);
    letter-spacing: var(--letter-spacing-wide);
    line-height: var(--line-height-tight);
    margin: 0;
  }

  .accordion__number {
    flex-shrink: 0;
    width: auto;
  }

  .accordion__title {
    text-align: right;
    flex-grow: 1;
  }

  .accordion__items {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .accordion__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: var(--spacing-4);
    background-color: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.75;
    transition: opacity 0.3s ease;
    border-bottom: 1px solid transparent;
  }

  .accordion__item:hover {
    opacity: 1;
  }

  .accordion__item.expanded {
    opacity: 1;
    background-color: rgba(8, 112, 237, 0.05);
  }

  .accordion__item-label {
    font-family: var(--font-primary);
    font-size: var(--font-size-display-md);
    font-weight: var(--font-weight-black);
    color: var(--colors-content-secondary);
    text-align: left;
    flex-grow: 1;
    letter-spacing: var(--letter-spacing-wide);
    line-height: var(--line-height-tight);
    margin: 0;
  }

  .accordion__chevron {
    width: 38px;
    height: 38px;
    color: var(--colors-content-secondary);
    flex-shrink: 0;
    transition: transform 0.3s ease;
    stroke: var(--colors-content-secondary);
  }

  .accordion__item.expanded .accordion__chevron {
    transform: rotate(180deg);
  }

  .accordion__content {
    padding: var(--spacing-4) var(--spacing-6) var(--spacing-8);
    background-color: rgba(8, 112, 237, 0.05);
    border-bottom: 1px solid var(--colors-content-secondary);
  }

  .accordion__content p {
    font-family: var(--font-primary);
    font-size: var(--font-size-body);
    color: var(--colors-content-secondary);
    line-height: var(--line-height-relaxed);
    letter-spacing: var(--letter-spacing-wide);
    margin: 0;
  }
</style>
