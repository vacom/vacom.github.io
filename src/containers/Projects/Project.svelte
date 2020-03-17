<script>
  import { link } from "svelte-routing";
  export let category = "Web";
  export let title = "Web Project";
  export let image = "images/portfolio/4.jpg";
  export let url = "/project/1";
</script>

<div class="col-lg-4 col-6 mb-4 shuffle-item">
  <div class="position-relative inner-box">
    <div class="image position-relative">
      <img src={image} alt="portfolio-image" class="img-fluid w-100 d-block" />
      <div class="overlay-box">
        <div class="overlay-inner">
          <a class="overlay-content" href={url} use:link>
            <h5 class="mb-0">{category}</h5>
            <p>{title}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
