<script>
  export let center = false;
  export let filters = [
    {
      id: "all-projects",
      title: "All Projects",
      active: true
    },
    {
      id: "branding",
      title: "branding",
      active: false
    },
    {
      id: "web-development",
      title: "Web Development",
      active: false
    },
    {
      id: "photography",
      title: "Photography",
      active: false
    }
  ];
</script>

<div class="row mb-5" class:justify-content-center={center}>
  <div class="col-10 " class:text-center={center}>
    <div class="btn-group btn-group-toggle " data-toggle="buttons">

      {#each filters as item, i (item.id)}
        <label class="btn active" class:active={item.active}>
          {item.title}
        </label>
      {/each}

    </div>
  </div>
</div>
