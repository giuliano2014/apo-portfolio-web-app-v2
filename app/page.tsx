import OneItemBloc from "@/components/oneItemBloc/oneItemBloc";
import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";
import styles from "./page.module.css";

enum Hashtag {
  Art = "Art",
  Education = "Education",
  Music = "Music",
  Science = "Science",
  Tech = "Tech",
}

type Media = {
  height: number;
  url: string;
  width: number;
};

type SoloProject = {
  hashtag: Hashtag;
  id: string;
  media: Media;
  slug: string;
  title: string;
};

type DuoProject = {
  __typename: "DuoProject";
  id: string;
  firstBloc: SoloProject;
  secondBloc: SoloProject;
};

type Project = ({ __typename: "SoloProject" } & SoloProject) | DuoProject;

type HomePageData = {
  homepages: {
    projects: Project[];
  }[];
};

// lib/queries.js
const getHomePageData = `
  query GetHomePageData {
    homepages {
      projects(first: 100) {
        ... on SoloProject {
          __typename
          hashtag
          id
          media {
            height
            url(transformation: {})
            width
          }
          slug
          title
        }
        ... on DuoProject {
          __typename
          id
          firstBloc {
            id
            hashtag
            media {
              height
              url(transformation: {})
              width
            }
            slug
            title
          }
          secondBloc {
            id
            hashtag
            media {
              height
              url(transformation: {})
              width
            }
            slug
            title
          }
        }
      }
    }
  }
`;

// lib/graphql.js
const endpoint: string | undefined = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("GraphQL endpoint is not defined in environment variables.");
}

// @TODO: Move this function to a shared file
const fetchGraphQLData = async (
  query: string,
  variables: Record<string, any> = {}
): Promise<HomePageData> => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_KEY}`,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors.map((error: any) => error.message).join(", "));
    }

    return data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
};

type ProjectRendererProps = {
  project: Project;
};

const ProjectRenderer = ({ project }: ProjectRendererProps) => {
  const { __typename } = project;

  if (__typename === "SoloProject") {
    const { hashtag, id, media, slug, title } = project;

    return (
      <OneItemBloc
        key={id}
        desktopMediaUrl={media.url}
        hashtag={hashtag}
        height={media.height}
        id={id}
        slug={slug}
        title={title}
        width={media.width}
      />
    );
  }

  const { firstBloc, secondBloc } = project;

  return (
    <TwoItemsBlock
      key={project.id}
      hashtags={[firstBloc.hashtag, secondBloc.hashtag]}
      heights={[firstBloc.media.height, secondBloc.media.height]}
      ids={[firstBloc.id, secondBloc.id]}
      slugs={[firstBloc.slug, secondBloc.slug]}
      titles={[firstBloc.title, secondBloc.title]}
      urls={[firstBloc.media.url, secondBloc.media.url]}
      widths={[firstBloc.media.width, secondBloc.media.width]}
    />
  );
};

const Home = async () => {
  const data = await fetchGraphQLData(getHomePageData);
  const projects = data.homepages[0].projects;

  return (
    <main className={styles.homePage}>
      {projects.map((project: Project) => (
        <ProjectRenderer key={project.id} project={project} />
      ))}
    </main>
  );
};

export default Home;
