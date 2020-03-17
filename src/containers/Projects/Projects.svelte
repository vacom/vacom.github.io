<script>
  import { Heading } from "../../components";
  import Filters from "./Filters.svelte";
  import Project from "./Project.svelte";

  export let heading = {};
  export let detailed = false;
  export let filters = false;
</script>

{#if detailed}
  <Heading {...heading} />
  <br />
{/if}

<section class="portfolio ">
  <div class="container">

    {#if filters}
      <Filters center={detailed} />
    {/if}

    <div class="row shuffle-wrapper portfolio-gallery">

      <Project />
      <Project />
      <Project />
      <Project />
      <Project />
      <Project />

    </div>
  </div>
</section>
