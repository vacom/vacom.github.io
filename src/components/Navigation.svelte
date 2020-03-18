<script>
  import { link } from "svelte-routing";
</script>

<style>
  
  .navbar-nav .nav-link {
    padding: 20px 15px !important;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 700;
    color: #000;
  }

  .main-nav .header-top-socials a {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
    padding: 20px 6px;
  }

  .navbar-nav .nav-link {
    padding: 20px 15px !important;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 700;
  }
</style>

<nav class="navbar navbar-expand-lg main-nav " id="navbar">
  <div class="container">
    <a class="navbar-brand" href="/" use:link>
      <h3>vacom</h3>
    </a>

    <button
      class="navbar-toggler collapsed"
      type="button"
      data-toggle="collapse">
      <span class="ti-align-justify" />
    </button>

    <div class="collapse navbar-collapse" id="navbarsExample09">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/" use:link>Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/about" use:link>About</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/projects" use:link>Projects</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/opensource" use:link>Open-source</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/themes" use:link>Themes</a>
        </li>

      </ul>
    </div>
  </div>
</nav>
