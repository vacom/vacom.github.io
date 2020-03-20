<script>
  import { Layout, Action } from "../../components";
  import { fade } from 'svelte/transition';
  import Block from "./Block.svelte";

  export let name = "Vitor Amaral";
  export let subTitle = "Full Stack Developer & Management and Information Programming";
  export let description = `I'm 27 years old from Portugal, I am a Full Stack Developer.
   With experience in different fields such as creating mobile applications, web, desktop and APIs in GraphQL or Rest.
   I invite you to look at my work and my Linkedin for more information.`;

  export let list = ["React", "TypeScript", "Nodejs", "GraphQL", "Serverless", "Svelte"];
</script>

<style>
  .section {
    padding: 120px 0px;
  }

  .banner-3 {
    position: relative;
  }

  .about-list {
    line-height: 40px;
  }

  .about-list li {
    text-transform: capitalize;
    color: #000;
  }
</style>

<svelte:head>
  <title>Vitor Amaral | About</title>
</svelte:head>

<Layout>

  <section class="section banner-3" transition:fade>
    <div class="container">
      <div class="row justify-content-center align-items-center">

        <div class="col-lg-7">
          <h2>{name}</h2>
          <p class="lead mb-4">{subTitle}</p>
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

  <Block />
  <br>
  <Action title="Want to learn more about me?" action="Check my Linkedin" url="https://www.linkedin.com/in/vacom/"/>

</Layout>
