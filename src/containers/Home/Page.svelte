<script>
  import { Layout, Hero } from "../../components";
  import Projects from "../Projects/Projects.svelte";
  import { FeaturedProjects } from "../Projects/data.js";
</script>


<Layout>
  <Hero initialText="A great initial text" text="A great text to describe" description="A great description to show" />
  <Projects data={FeaturedProjects} />
</Layout>
