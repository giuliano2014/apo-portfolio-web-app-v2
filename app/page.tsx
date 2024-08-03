import OneItemBlock from "@/components/oneItemBlock/oneItemBlock";
import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";
import styles from "./page.module.css";

// lib/queries.js
const getHomePageData = `
  query GetHomePageData {
    homepages {
      projects {
        ... on SoloProject {
          __typename
          hashtag
          id
          media {
            height
            url(transformation: {})
            width
          }
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
            title
          }
        }
      }
    }
  }
`;

// lib/graphql.js
const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("GraphQL endpoint is not defined in environment variables.");
}

const fetchGraphQLData = async (query, variables = {}) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_KEY}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors.map((error) => error.message).join(", "));
    }

    return data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
};

const ProjectRenderer = ({ project }) => {
  const { __typename } = project;

  if (__typename === "SoloProject") {
    const { hashtag, id, media, title } = project;

    return (
      <OneItemBlock
        key={id}
        hashtag={hashtag}
        height={media.height}
        id={id}
        title={title}
        url={media.url}
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
      titles={[firstBloc.title, secondBloc.title]}
      urls={[firstBloc.media.url, secondBloc.media.url]}
      widths={[firstBloc.media.width, secondBloc.media.width]}
    />
  );
};

export default async function Home() {
  const data = await fetchGraphQLData(getHomePageData);
  const projects = data.homepages[0].projects;

  return (
    <main className={styles.homePage}>
      {projects.map((project) => (
        <ProjectRenderer key={project.id} project={project} />
      ))}
    </main>
  );
}
