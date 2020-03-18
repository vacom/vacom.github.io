<script>
  import { Layout, Hero } from "../../components";
  import Projects from "../Projects/Projects.svelte";
  import { FeaturedProjects } from "../Projects/data.js";
</script>


<Layout>
  <Hero initialText="CREATIVITY IS" text="INTELLIGENCE HAVING FUN." description="Please check my portfolio. My creative and simplicity modern projects." />
  <Projects data={FeaturedProjects} />
</Layout>
