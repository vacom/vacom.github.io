<script>
  import { Layout, ButtonLink } from "../../components";

  export let data = {
    title: "A project title",
    subTitle: "A project nice subtitle",
    client: "Microsoft",
    category: "Web Design",
    url: "https://www.google.com",
    description: [
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              eligendi fugiat ad cupiditate hic, eum debitis ipsum, quos non
              mollitia. Commodi suscipit obcaecati et, aperiam quas vero quo,
              labore tempore.`,
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              debitis beatae doloremque cupiditate vel repellat nam est
              voluptates, magnam quod explicabo fugit, quidem.`
    ],
    images: ["images/portfolio/02.jpg", "images/portfolio/02.jpg"]
  };
</script>

<style>
  .page-title h1 {
    position: relative;
    padding-bottom: 30px;
  }

  .page-title h1:after {
    position: absolute;
    content: "";
    left: 50%;
    bottom: 0px;
    width: 40px;
    height: 2px;
    margin-left: -25px;
    background: #00f;
  }

  .section {
    padding: 120px 0px;
  }
</style>

<Layout>
  <section class="page-title section pb-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center">
            <h1 class="text-capitalize mb-0 text-lg">{data.title}</h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section portfolio-single">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="project-info">
            <h3 class="mb-4">{data.subTitle}</h3>
            {#each data.description as description}
              <p>{description}</p>
            {/each}
          </div>
        </div>

        <div class="col-lg-4">
          <div class="info">
            <h5 class="mb-0">Client</h5>
            <p>{data.client}</p>
          </div>
          <div class="info">
            <h5 class="mb-0">Category</h5>
            <p>{data.category}</p>
          </div>
          <div class="mt-5">
            <ButtonLink href={data.url}>View project</ButtonLink>
          </div>
        </div>
      </div>

      {#each data.images as image}
        <div class="row mt-5">
          <div class="col-lg-12">
            <img src={image} alt="" class="img-fluid w-100" />
          </div>
        </div>
      {/each}

    </div>
  </section>
</Layout>
