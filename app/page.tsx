import OneItemBlock from "@/components/oneItemBlock/oneItemBlock";
import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";
import styles from "./page.module.css";

//@TODO: Refactor this code

// lib/queries.js
const getHomePageData = `
  query GetHomePageData {
    homepages {
      projects {
        ... on OneProject {
          id
          title
          hashtag
          media {
            url(transformation: {})
            width
            height
          }
        }
        ... on TwoProject {
          id
          projects {
            id
            title
            hashtag
            media {
              height
              url(transformation: {})
              width
            }
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

const fetchGraphQLData = async (query: any, variables = {}) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(
        data.errors.map((error: any) => error.message).join(", ")
      );
    }
    return data.data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
};

export default async function Home() {
  const data = await fetchGraphQLData(getHomePageData);

  const filteredData = data.homepages[0].projects.map((project: any) => {
    if (project.media) {
      return (
        <OneItemBlock
          key={project.id}
          hashtag={project.hashtag}
          height={project.media.height}
          id={project.id}
          title={project.title}
          url={project.media.url}
          width={project.media.width}
        />
      );
    } else if (project.projects) {
      const hashtags = project.projects.map(
        (subProject: any) => subProject.hashtag
      );
      const heights = project.projects.map(
        (subProject: any) => subProject.media.height
      );
      const ids = project.projects.map((subProject: any) => subProject.id);
      const titles = project.projects.map(
        (subProject: any) => subProject.title
      );
      const urls = project.projects.map(
        (subProject: any) => subProject.media.url
      );
      const widths = project.projects.map(
        (subProject: any) => subProject.media.width
      );
      return (
        <TwoItemsBlock
          key={project.id}
          hashtags={hashtags}
          heights={heights}
          ids={ids}
          titles={titles}
          urls={urls}
          widths={widths}
        />
      );
    }
    return null;
  });

  return <main className={styles.homePage}>{filteredData}</main>;
}
