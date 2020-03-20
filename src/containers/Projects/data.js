//public/
const publicFolder = "public/";

export const FeaturedProjects = [
  {
    id: "pr-primrose",
    title: "Web App",
    category: "Primrose",
    image: `${publicFolder}images/projects/primrose/cover.png`
  }
];

export const AllProjects = [...FeaturedProjects];

export const ProjectsDetails = [
  {
    id: "pr-primrose",
    title: "Primrose",
    subTitle: "Application to summarize and analyze Primavera data",
    client: "KSI",
    category: "Web App",
    url: null,
    description: [
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              eligendi fugiat ad cupiditate hic, eum debitis ipsum, quos non
              mollitia. Commodi suscipit obcaecati et, aperiam quas vero quo,
              labore tempore.`,
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              debitis beatae doloremque cupiditate vel repellat nam est
              voluptates, magnam quod explicabo fugit, quidem.`
    ],
    images: ["images/portfolio/02.jpg", "images/portfolio/02.jpg"]
  }
];
