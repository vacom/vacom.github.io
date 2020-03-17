<script>
  import { link } from "svelte-routing";
</script>

<nav class="navbar navbar-expand-lg main-nav " id="navbar">
  <div class="container">
    <a class="navbar-brand" href="/" use:link>
      <h3>vacom</h3>
    </a>

    <button
      class="navbar-toggler collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExample09"
      aria-controls="navbarsExample09"
      aria-expanded="false"
      aria-label="Toggle navigation">
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
