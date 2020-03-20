<script>
  import { Layout, Action, Heading } from "../../components";
  import { fade } from "svelte/transition";

  export let name = "Storytics";
  export let description = `Storytics is a design studio from Portugal. 
  We design and create Themes and Templates for bloggers, entrepreneurs, and creatives.
  A Web Design Studio with a story to tell. Every theme we create tells a story.`;

  export let list = [
    "Templates",
    "Themes",
    "Agencies",
    "CSS",
    "Html",
  ];
</script>

<style>
  .theme-section {
    margin: 120px 0;
  }
</style>

<svelte:head>
  <title>Vitor Amaral | Themes</title>
</svelte:head>

<Layout>

  <Heading initialText="I create" colorText="Themes & Templates" text="Beautiful and simple themes for agencies and photographers" />

  <section class="section banner-3 theme-section" transition:fade>
    <div class="container">
      <div class="row justify-content-center align-items-center">

        <div class="col-lg-7">
          <h2>{name}</h2>
          <p class="mb-4">{description}</p>
        </div>

        <div class="col-lg-5">
          <ul class="list-unstyled mt-3 mb-5 about-list">
            {#each list as item}
              <li>{item}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <Action
    title="Take a look at our themes"
    action="Check out the themes"
    url="https://creativemarket.com/storytics" />

</Layout>
