<script>
  import { link } from "svelte-routing";
  import { fade } from "svelte/transition";
  export let category = "Web";
  export let title = "Web Project";
  export let image = "images/portfolio/4.jpg";
  export let url = "/project/1";
</script>

<style>
  .inner-box {
    position: relative;
  }

  .inner-box .image {
    position: relative;
    overflow: hidden;
  }

  .inner-box .image img {
    position: relative;
    width: 100%;
    display: block;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .inner-box .image .overlay-box {
    position: absolute;
    left: 0px;
    bottom: 0px;
    right: 0px;
    top: 0px;
    z-index: 2;
    opacity: 0;
    display: block;
    -webkit-transition: all 0.6s ease;
    transition: all 0.6s ease;
    overflow: hidden;
  }

  .inner-box .image .overlay-box:before {
    position: absolute;
    content: "";
    left: -450px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    background-color: #bcc3ca;
  }

  .inner-box:hover .image img {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .inner-box:hover .image .overlay-box:before {
    opacity: 1;
    left: 0px;
  }

  .inner-box:hover .image .overlay-box {
    opacity: 1;
  }

  .inner-box:hover .image .overlay-box .overlay-content h5 {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }

  .inner-box:hover .image .overlay-box .overlay-content p {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }

  .inner-box .image .overlay-box .overlay-inner {
    position: absolute;
    left: 0px;
    bottom: 30px;
    z-index: 1;
    padding: 10px 40px;
  }

  .overlay-content {
    text-decoration: none;
  }

  .overlay-content h5 {
    text-transform: capitalize;
    padding: 0px 8px;
    margin-bottom: 0px;
    -webkit-transform: translateX(-150px);
    transform: translateX(-150px);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .overlay-content p {
    font-size: 14px;
    margin-bottom: 0px;
    padding: 0px 8px;
    margin-top: 2px;
    text-transform: capitalize;
    color: #2f3238;
    -webkit-transform: translateX(-150px);
    transform: translateX(-150px);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
</style>

<div class="col-lg-4 col-6 mb-4 shuffle-item" transition:fade>
  <a class="overlay-content" href={url} use:link>
    <div class="position-relative inner-box">
      <div class="image position-relative">
        <img
          src={image}
          alt="portfolio-image"
          class="img-fluid w-100 d-block" />
        <div class="overlay-box">
          <div class="overlay-inner">
            <span class="overlay-content">
              <h5 class="mb-0">{category}</h5>
              <p>{title}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </a>

</div>
