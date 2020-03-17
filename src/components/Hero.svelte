<script>
  export let initialText = "A great initial text";
  export let text = "A great text to describe";
  export let description = `A great description to show`;
</script>

<section class="section banner">
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
