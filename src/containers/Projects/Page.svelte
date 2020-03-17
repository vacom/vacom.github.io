<script>
  import { Layout } from "../../components";
  import Projects from "./Projects.svelte";
  import { AllProjects } from "./data";

  let data = {
    initialText: "I provide open",
    colorText: "Design Solutions.",
    text: "My work is presented here, check them below."
  };
</script>

<Layout>
  <Projects heading={data} data={AllProjects} detailed filters />
</Layout>
