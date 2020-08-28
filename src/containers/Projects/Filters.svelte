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

<style>
  .portfolio .btn-group .btn {
    border-radius: 0px !important;
    padding-left: 0px;
    font-weight: 700;
  }

  .portfolio .btn-group .btn:hover {
    color: #00f;
  }

  .btn {
    padding: 18px 38px;
    border: 2px solid transparent;
    text-transform: uppercase;
    border-radius: 0px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    box-shadow: #999999 0px 0px 0px 0px;
  }

  .btn:focus {
    outline: 0px;
    border: 0px;
    box-shadow: none;
  }

  @media (max-width: 575px) {
    .btn-group {
      display: block;
    }
    .btn-group > .btn {
      padding: 20px;
    }
  }

  @media (max-width: 400px) {
    .btn-group {
      display: block;
    }
    .btn-group > .btn {
      padding: 20px;
    }
  }

  @media (max-width: 767px) {
    .btn-group {
      display: block;
    }
    .btn-group > .btn {
      padding: 20px;
    }
  }

  @media (max-width: 991px) {
    .btn-group {
      display: block;
    }
    .btn-group > .btn {
      padding: 20px;
    }
  }
</style>

<div class="row mb-5" class:justify-content-center={center}>
  <div class="col-10 " class:text-center={center}>
    <div class="btn-group btn-group-toggle " data-toggle="buttons">

      {#each filters as item, i (item.id)}
        <label class="btn active" class:active={item.active} for="button">
          {item.title}
        </label>
      {/each}

    </div>
  </div>
</div>
