<script>
  export let detailed = false;
</script>

{#if detailed}
  <section class="section banner pb-0">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h2>
            I provide
            <span class="text-color">Design Solutions.</span>
            <br />
            My work is presented here, check them below.
          </h2>
        </div>
      </div>
    </div>
  </section>
{/if}

<section class="portfolio ">
  <div class="container">

    {#if detailed}
      <div class="row mb-5 justify-content-center">
        <div class="col-10 text-center">
          <div class="btn-group btn-group-toggle " data-toggle="buttons">
            <label class="btn active ">
              <input
                type="radio"
                name="shuffle-filter"
                value="all"
                checked="checked" />
              All Projects
            </label>
            <label class="btn">
              <input type="radio" name="shuffle-filter" value="design" />
              UI/UX Design
            </label>
            <label class="btn">
              <input type="radio" name="shuffle-filter" value="branding" />
              branding
            </label>
            <label class="btn">
              <input type="radio" name="shuffle-filter" value="illustration" />
              Web Development
            </label>
            <label class="btn">
              <input type="radio" name="shuffle-filter" value="photo" />
              Photography
            </label>
          </div>
        </div>
      </div>
    {:else}
      <div class="row mb-5">
        <div class="col-10">
          <div class="btn-group btn-group-toggle " data-toggle="buttons">
            <label class="btn active ">
              <input
                type="radio"
                name="shuffle-filter"
                value="all"
                checked="checked" />
              All Projects
            </label>
            <label class="btn">
              <input type="radio" name="shuffle-filter" value="design" />
              UI/UX Design
            </label>
            <label class="btn">
              <input type="radio" name="shuffle-filter" value="branding" />
              branding
            </label>
            <label class="btn">
              <input type="radio" name="shuffle-filter" value="illustration" />
              Web Development
            </label>
            <label class="btn">
              <input type="radio" name="shuffle-filter" value="photo" />
              Photography
            </label>
          </div>
        </div>
      </div>
    {/if}

    <div class="row shuffle-wrapper portfolio-gallery">
      <div
        class="col-lg-4 col-6 mb-4 shuffle-item"
        data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
        <div class="position-relative inner-box">
          <div class="image position-relative ">
            <img
              src="images/portfolio/1.jpg"
              alt="portfolio-image"
              class="img-fluid w-100 d-block" />
            <div class="overlay-box">
              <div class="overlay-inner">
                <a class="overlay-content" href="portfolio-single.html">
                  <h5 class="mb-0">Painting</h5>
                  <p>Design</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-lg-4 col-6 mb-4 shuffle-item"
        data-groups="[&quot;branding&quot;]">
        <div class="position-relative inner-box">
          <div class="image position-relative ">
            <img
              src="images/portfolio/4.jpg"
              alt="portfolio-image"
              class="img-fluid w-100 d-block" />
            <div class="overlay-box">
              <div class="overlay-inner">
                <a class="overlay-content" href="portfolio-single.html">
                  <h5 class="mb-0">Web app</h5>
                  <p>Development</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-lg-4 col-6 mb-4 shuffle-item"
        data-groups="[&quot;illustration&quot;]">
        <div class="position-relative inner-box">
          <div class="image position-relative ">
            <img
              src="images/portfolio/3.jpg"
              alt="portfolio-image"
              class="img-fluid w-100 d-block" />
            <div class="overlay-box">
              <div class="overlay-inner">
                <a class="overlay-content" href="portfolio-single.html">
                  <h5 class="mb-0">Business</h5>
                  <p>marketing</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-lg-4 col-6 mb-4 shuffle-item"
        data-groups="[&quot;design&quot;,&quot;branding&quot;]">
        <div class="position-relative inner-box">
          <div class="image position-relative ">
            <img
              src="images/portfolio/5.jpg"
              alt="portfolio-image"
              class="img-fluid w-100 d-block" />
            <div class="overlay-box">
              <div class="overlay-inner">
                <a class="overlay-content" href="portfolio-single.html">
                  <h5 class="mb-0">Portfolio</h5>
                  <p>Design</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-lg-4 col-6 mb-4 shuffle-item"
        data-groups="[&quot;illustration&quot;]">
        <div class="position-relative inner-box">
          <div class="image position-relative ">
            <img
              src="images/portfolio/6.jpg"
              alt="portfolio-image"
              class="img-fluid w-100 d-block" />
            <div class="overlay-box">
              <div class="overlay-inner">
                <a class="overlay-content" href="portfolio-single.html">
                  <h5 class="mb-0 ">Modern web</h5>
                  <p>Seo</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-lg-4 col-6 mb-4 shuffle-item"
        data-groups="[&quot;design&quot;,&quot;photo&quot;]">
        <div class="position-relative inner-box">
          <div class="image position-relative ">
            <img
              src="images/portfolio/7.jpg"
              alt="portfolio-image"
              class="img-fluid w-100 d-block" />
            <div class="overlay-box">
              <div class="overlay-inner">
                <a class="overlay-content" href="portfolio-single.html">
                  <h5 class="mb-0">Agency web</h5>
                  <p>Design</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
