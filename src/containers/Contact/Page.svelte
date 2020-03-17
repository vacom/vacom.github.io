<script>
  import { Layout } from "../../components";
</script>

<Layout>

  <section class="page-title section pb-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center">
            <h1 class="text-capitalize mb-0 text-lg">Get in Touch</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- contact form start -->
  <section class="contact section">
    <div class="container">

      <div class="row justify-content-center">
        <div class="col-lg-8">

          <form
            id="contact-form"
            class="contact__form mt-5"
            method="post"
            action="mail.php">
            <!-- form message -->
            <div class="row">
              <div class="col-12">
                <div
                  class="alert alert-success contact__msg"
                  style="display: none"
                  role="alert">
                  Your message was sent successfully.
                </div>
              </div>
            </div>
            <!-- end message -->
            <div class="form-row">
              <div class="col-lg-6">
                <div class="form-group mb-3">
                  <input
                    name="name"
                    type="text"
                    class="form-control"
                    placeholder="Your Name" />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-3">
                  <input
                    name="name"
                    type="text"
                    class="form-control"
                    placeholder="Your Subject" />
                </div>
              </div>

              <div class="col-lg-12">
                <div class="form-group mb-3">
                  <input
                    name="email"
                    type="email"
                    class="form-control"
                    placeholder="Email Address" />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group-2 mb-4">
                  <textarea
                    name="message"
                    class="form-control"
                    rows="6"
                    placeholder="Your Message" />
                </div>

                <div class="text-center">
                  <button class="btn btn-main" name="submit" type="submit">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

</Layout>
