<script>
  export let href = "";
</script>

<style>
  .btn {
    padding: 18px 38px;
    border: 2px solid transparent;
    text-transform: uppercase;
    border-radius: 0px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    box-shadow: #999999 0px 0px 0px 0px;
    border-radius: 3px;
  }

  .btn:focus {
    outline: 0px;
    border: 0px;
    box-shadow: none;
  }

  .btn-main {
    background: #000;
    color: #fff;
  }

  .btn-main:hover {
    color: #fff !important;
    background: #00f;
  }
</style>

<a {href} class="btn btn-main btn-small">
  <slot />
</a>
