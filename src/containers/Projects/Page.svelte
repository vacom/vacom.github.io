<script>
  import { Layout } from "../../components";
  import Projects from "./Projects.svelte";
  import { AllProjects } from "./data";

  let data = {
    initialText: "I create",
    colorText: "Projects & Apps.",
    text: "For various types of platforms"
  };
</script>

<svelte:head>
  <title>Vitor Amaral | Projects</title>
</svelte:head>

<Layout>
  <Projects heading={data} data={AllProjects} detailed filters={false} />
</Layout>
