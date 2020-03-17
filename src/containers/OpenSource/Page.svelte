<script>
  import { Layout } from "../../components";
  import Projects from "../Projects/Projects.svelte";

  let data = {
    initialText: "I provide open",
    colorText: "Design Solutions.",
    text: "My work is presented here, check them below."
  };
</script>

<Layout>
  <Projects heading={data} detailed filters={false} />
</Layout>
