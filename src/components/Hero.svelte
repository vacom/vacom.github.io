<script>
  import { fade } from "svelte/transition";

  export let initialText = "A great initial text";
  export let text = "A great text to describe";
  export let description = `A great description to show`;
</script>

<style>
  .text-color {
    color: #00f;
  }
  .section {
    padding: 120px 0px;
  }

  .cd-headline.clip span {
    padding: 0px;
  }

  .banner .cd-headline {
    font-size: 56px;
    line-height: 70px;
  }

  @media (max-width: 575px) {
    .banner .cd-headline {
      font-size: 32px;
      line-height: 42px;
    }
  }

  @media (max-width: 400px) {
    .banner .cd-headline {
      font-size: 32px;
      line-height: 42px;
    }
  }

  @media (max-width: 767px) {
    .banner .cd-headline {
      font-size: 32px;
      line-height: 42px;
    }
  }

  @media (max-width: 991px) {
    .banner .cd-headline {
      font-size: 32px;
      line-height: 42px;
    }
  }
</style>

<section class="section banner" transition:fade>
  <div class="container">
    <div class="row">
      <div class="col-lg-10">
        <h2 class="cd-headline clip is-full-width mb-4 ">
          {initialText}
          <br />
          <span class="cd-words-wrapper text-color">
            <b>{text}</b>
          </span>
        </h2>
        <p>{description}</p>
      </div>
    </div>
  </div>
</section>
