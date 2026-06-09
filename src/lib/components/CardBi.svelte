<script>
  let {
    imageUrl = '',
    beforeLabel = 'BEFORE',
    afterLabel = 'AFTER'
  } = $props();
</script>

<div class="card-bi">
  {#if imageUrl}
    <img src={imageUrl} alt="Before and After comparison" class="card-bi__image" />
  {/if}

  <div class="card-bi__overlay">
    <div class="card-bi__before-label">{beforeLabel}</div>
    <div class="card-bi__after-label">{afterLabel}</div>

    <div class="card-bi__divider">
      <svg viewBox="0 0 2 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <line x1="1" y1="0" x2="1" y2="100" stroke="var(--colors-content-primary)" stroke-width="2" />
      </svg>
    </div>

    <div class="card-bi__center-circle">
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="55" fill="none" stroke="var(--colors-content-primary)" stroke-width="2" />
        <circle cx="60" cy="60" r="45" fill="var(--colors-content-primary)" opacity="0.1" />
      </svg>

      <svg class="card-bi__arrow left-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="15 18 9 12 15 6" fill="none" stroke="var(--colors-content-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <svg class="card-bi__arrow right-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="9 18 15 12 9 6" fill="none" stroke="var(--colors-content-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</div>

<style>
  .card-bi {
    position: relative;
    width: 100%;
    max-width: 1432px;
    aspect-ratio: 1432 / 904;
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .card-bi__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .card-bi__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-bi__before-label,
  .card-bi__after-label {
    position: absolute;
    font-family: var(--font-primary);
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-black);
    color: var(--colors-background-secondary);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing-wide);
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .card-bi__before-label {
    left: var(--spacing-6);
  }

  .card-bi__after-label {
    right: var(--spacing-6);
  }

  .card-bi__divider {
    position: absolute;
    width: 2px;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .card-bi__divider svg {
    width: 100%;
    height: 100%;
  }

  .card-bi__center-circle {
    position: absolute;
    width: 120px;
    height: 120px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-bi__center-circle svg:first-child {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .card-bi__arrow {
    position: absolute;
    width: 38px;
    height: 38px;
    z-index: 4;
  }

  .left-arrow {
    left: -50px;
  }

  .right-arrow {
    right: -50px;
  }
</style>
