<script>
  import { fade } from "svelte/transition";
  export let initialText = "I provide";
  export let colorText = "Design Solutions.";
  export let text = "My work is presented here, check them below.";
</script>

<style>
  .text-color {
    color: #00f;
  }
  .section {
    padding: 120px 0px;
  }
  .banner {
    font-size: 56px;
    line-height: 70px;
  }

  @media (max-width: 575px) {
    .banner {
      font-size: 32px;
      line-height: 42px;
    }
  }

  @media (max-width: 400px) {
    .banner {
      font-size: 32px;
      line-height: 42px;
    }
  }

  @media (max-width: 767px) {
    .banner {
      font-size: 32px;
      line-height: 42px;
    }
  }

  @media (max-width: 991px) {
    .banner {
      font-size: 32px;
      line-height: 42px;
    }
  }
</style>

<section class="section banner pb-0" transition:fade>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 text-center">
        <h2>
          {initialText}
          <span class="text-color">{colorText}</span>
          <br />
          {text}
        </h2>
      </div>
    </div>
  </div>
</section>
