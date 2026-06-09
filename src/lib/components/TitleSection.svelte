<script>
  let { title = '', subtitle = '' } = $props();
</script>

<section class="title-section">
  <div class="title-section__content">
    {#if title}
      <h1 class="title-section__title">{title}</h1>
    {/if}
    {#if subtitle}
      <p class="title-section__subtitle">{subtitle}</p>
    {/if}
  </div>
</section>

<style>
  .title-section {
    padding: var(--unit-40);
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .title-section__content {
    display: flex;
    flex-direction: column;
  }

  .title-section__title {
    font-family: var(--font-primary);
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-black);
    color: var(--colors-content-primary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    line-height: var(--line-height-tight);
    margin: 0;
    margin-bottom: 0.2em;
  }

  .title-section__subtitle {
    font-family: var(--font-primary);
    font-size: var(--font-size-h1);
    font-weight: var(--font-weight-regular);
    color: var(--colors-content-primary);
    line-height: 1.3;
    letter-spacing: var(--letter-spacing-wide);
    margin: 0;
  }
</style>
