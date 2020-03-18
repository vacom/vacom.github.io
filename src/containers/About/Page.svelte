<script>
  import { Layout } from "../../components";
  import Block from "./Block.svelte";

  export let name = "Vitor Amaral";
  export let subTitle = "I create premium designs and technology";
  export let description = `I was born in Los Angeles in 1980.I'm 23 years old creative web
            designer, specializing in User Interface Design and
            Development.Veritatis culpa sunt alias esse fuga accusamus nostrum,
            iusto neque.`;

  export let list = ["Web Design", "Brand Identity", "Development"];
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

<Layout>

  <section class="section banner-3">
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
  <Block />

</Layout>
