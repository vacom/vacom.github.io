<script>
    import ButtonLink from "./ButtonLink.svelte";
    export let title = "A great action title";
    export let action = "A great action";
    export let url = "/"
</script>

<style>
    .section-sm {
        padding: 60px 0px;
    }
</style>

<section class="section-sm pt-0 cta">
    <div class="container">
        <div class="row align-items-center bg-dark p-5">
            <div class="col-lg-8">
                <h3 class="text-white mb-0">{title}</h3>
            </div>
            <div class="col-lg-4 text-lg-right mt-5 mt-lg-0">
                <ButtonLink href={url} target="_blank">
                    {action}
                </ButtonLink>
            </div>
        </div>
    </div>
</section>