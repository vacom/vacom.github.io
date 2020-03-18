<script>
import { fade } from 'svelte/transition';
  export let title = "Work Experiences.";
  export let data = [
    {
      list: [
        {
          title: "UI UX Designer at Behance",
          subTitle: "January 2015 - August 2018",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                nec bibendum mauris. Curabitur quis vehicula leo. Vivamus leo
                ipsum`
        },
        {
          title: "UI UX Designer at Behance",
          subTitle: "January 2015 - August 2018",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                nec bibendum mauris. Curabitur quis vehicula leo. Vivamus leo
                ipsum`
        }
      ]
    },
    {
      list: [
        {
          title: "UI UX Designer at Behance",
          subTitle: "January 2015 - August 2018",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                nec bibendum mauris. Curabitur quis vehicula leo. Vivamus leo
                ipsum`
        },
        {
          title: "UI UX Designer at Behance",
          subTitle: "January 2015 - August 2018",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                nec bibendum mauris. Curabitur quis vehicula leo. Vivamus leo
                ipsum`
        }
      ]
    }
  ];
</script>

<style>
  .section {
    padding: 120px 0px;
  }

  .about-info {
    margin-top: 15px;
  }
</style>

<section class="section about border-top border-bottom" transition:fade>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 mb-5">
        <h3 class="mb-2">{title}</h3>
      </div>

      <div class="col-lg-8">
        <div class="row">

          {#each data as item}
            <div class="col-lg-6">
              {#each item.list as item}
                <div class="about-info mb-5">
                  <span>{item.subTitle}</span>
                  <h4 class="mb-3 mt-1">{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              {/each}

            </div>
          {/each}

        </div>
      </div>
    </div>
  </div>
</section>
