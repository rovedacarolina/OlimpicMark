<script>
  let {
    mainPercentage = 72,
    leftPercentage = 64,
    rightPercentage = 69,
    backgroundImageUrl = ''
  } = $props();
</script>

<div class="data-viz">
  {#if backgroundImageUrl}
    <img src={backgroundImageUrl} alt="Background" class="data-viz__background" />
  {/if}

  <div class="data-viz__content">
    <div class="data-viz__left">
      <div class="data-viz__percentage left">
        <span class="data-viz__value">{leftPercentage}</span>
        <span class="data-viz__unit">%</span>
      </div>
    </div>

    <div class="data-viz__center">
      <div class="data-viz__percentage main">
        <span class="data-viz__value">{mainPercentage}</span>
        <span class="data-viz__unit">%</span>
      </div>
    </div>

    <div class="data-viz__right">
      <div class="data-viz__percentage right">
        <span class="data-viz__value">{rightPercentage}</span>
        <span class="data-viz__unit">%</span>
      </div>
    </div>
  </div>
</div>

<style>
  .data-viz {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 600px;
  }

  .data-viz__background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
    z-index: 0;
  }

  .data-viz__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    padding: var(--spacing-8);
    position: relative;
    z-index: 1;
  }

  .data-viz__left,
  .data-viz__right {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .data-viz__center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .data-viz__percentage {
    display: flex;
    align-items: baseline;
    font-family: var(--font-primary);
    font-weight: var(--font-weight-black);
    font-style: italic;
    letter-spacing: var(--letter-spacing-wide);
    line-height: var(--line-height-tight);
  }

  .data-viz__percentage.main {
    font-size: 250px;
    color: var(--colors-content-secondary);
  }

  .data-viz__percentage.left,
  .data-viz__percentage.right {
    font-size: 73px;
    color: rgba(246, 246, 246, 0.48);
    opacity: 0.7;
  }

  .data-viz__value {
    font-size: inherit;
    color: inherit;
  }

  .data-viz__unit {
    font-size: 0.5em;
    margin-left: 0.1em;
    opacity: 0.8;
    color: inherit;
  }

  .data-viz__percentage.main .data-viz__unit {
    font-size: 0.55em;
  }
</style>
