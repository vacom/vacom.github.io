<script>
  import { Layout, Hero } from "../../components";
  import Projects from "../Projects/Projects.svelte";
  import { FeaturedProjects } from "../Projects/data.js";
</script>

<svelte:head>
  <title>Vitor Amaral | Home</title>
</svelte:head>

<Layout>
  <Hero
    initialText="CREATIVITY IS"
    text="INTELLIGENCE HAVING FUN."
    description="Please check my portfolio. My creative and simplicity modern
    projects." />
  <Projects data={FeaturedProjects} />
</Layout>
