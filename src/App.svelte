<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./containers/Home/Page.svelte";
  import About from "./containers/About/Page.svelte";
  import Projects from "./containers/Projects/Page.svelte";
  import ProjectDetails from "./containers/Projects/Details.svelte";
  import OpenSource from "./containers/OpenSource/Page.svelte";
  import Themes from "./containers/Themes/Page.svelte";

  let url = "";
</script>

<Router {url}>
  <Route path="themes" component={Themes} />
  <Route path="opensource" component={OpenSource} />
  <Route path="project/:id" let:params>
    <ProjectDetails {params} />
  </Route>
  <Route path="projects" component={Projects} />
  <Route path="about" component={About} />
  <Route path="/">
    <Home />
  </Route>
</Router>
