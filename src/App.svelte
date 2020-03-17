<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./containers/Home/Page.svelte";
  import About from "./containers/About/Page.svelte";
  import Projects from "./containers/Projects/Page.svelte";
  import Contact from "./containers/Contact/Page.svelte";

   let url = "";
</script>

<Router {url}>
  <Route path="contact" component={Contact} />
  <Route path="themes" component={About} />
  <Route path="opensource" component={About} />
  <Route path="projects" component={Projects} />
  <Route path="about" component={About} />
  <Route path="/">
    <Home />
  </Route>
</Router>
