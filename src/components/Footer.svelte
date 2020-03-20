<script>
  export let text = "Copyrights © 2020. ";
  export let author = "Vitor Amaral | vacom";
  export let url = "https://www.linkedin.com/in/vacom/";
  export let facebook = "https://www.facebook.com/storytics.studio";
  export let twitter = "https://twitter.com/vacom_me";
  export let github = "https://github.com/vacom";
  export let linkedin = "https://www.linkedin.com/in/vacom/";
  export let store = "https://creativemarket.com/storytics";
</script>

<style>
  .footer {
    padding: 60px 0px;
    background: #6b7c8d;
  }

  .copy,
  .footer-widget a {
    color: #000;
  }

  .footer-widget a {
    text-transform: capitalize;
  }

  .footer-widget a:hover {
    color: #00f;
  }
</style>

<section class="footer">
  <div class="container">
    <div class="row ">
      <div class="col-lg-6">
        <p class="copy mb-0">
          {text}
          <a href={url} target="_blank" class="text-white">{author}</a>
        </p>
      </div>
      <div class="col-lg-6">
        <div class="widget footer-widget text-lg-right mt-5 mt-lg-0">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a href={facebook} target="_blank">
                <i class="fab fa-facebook-f" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href={twitter} target="_blank">
                <i class="fab fa-twitter" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href={github} target="_blank">
                <i class="fab fa-github" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href={linkedin} target="_blank">
                <i class="fab fa-linkedin-in" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href={store} target="_blank">
                <i class="fas fa-store" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
