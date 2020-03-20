<script>
  import { Layout } from "../../components";
  import Projects from "../Projects/Projects.svelte";
  import AllProjects from "./data";

  let data = {
    initialText: "I develop",
    colorText: "Open Source projects.",
    text: "Sharing is caring."
  };
</script>

<svelte:head>
  <title>Vitor Amaral | Open Source</title>
</svelte:head>

<Layout>
  <Projects heading={data} data={AllProjects} detailed filters={false} />
</Layout>
