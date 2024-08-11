// import OneItemBlock from "@/components/oneItemBlock/oneItemBlock";
// import ThreeItemsBlock from "@/components/threeItemsBlock/threeItemsBlock";
import TopProjectBlock from "@/components/topProjectBlock/topProjectBlock";
// import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";
import styles from "./page.module.css";

// lib/queries.js
const getProjectById = `
  query GetProjectByID($id: ID!) {
    project(where: {id: $id}) {
      content {
        ... on DuoBloc {
          firstColumn {
            media {
              height
              url
              width
            }
            text
          }
          secondColumn {
            text
            media {
              height
              url
              width
            }
          }
        }
        ... on SoloBloc {
          text
          media {
            height
            url
            width
          }
        }
        ... on TextBloc {
          text
          surtitle
          title
        }
        ... on TrioBloc {
          firstColumn {
            media {
              height
              url
              width
            }
            text
          }
          secondColumn {
            text
            media {
              height
              url
              width
            }
          }
          thirdColmn {
            text
            media {
              height
              url
              width
            }
          }
        }
      }
      header {
        brand
        description
        hastag
        title
        tools
        year
        leftMedia {
          height
          url
          width
        }
        mobileMedia {
          height
          url
          width
        }
        rightMedia {
          height
          url
          width
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

const fetchGraphQLData = async (
  query: string,
  variables: Record<string, any> = {}
): Promise<any> => {
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
      throw new Error(errors.map((error: any) => error.message).join(", "));
    }

    return data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
};

const Page = async({ params }: { params: { slug: string } }) => {
  const projectId = params.slug;
  const data = await fetchGraphQLData(getProjectById, { id: projectId });
  console.log('SINGLE PROJECT', data.project);

  // Extraire les données de l'en-tête
  const headerData = data.project.header;

  return (
    <main className={styles.projectPage}>
      <TopProjectBlock {...headerData} />
      {/* <ThreeItemsBlock />
      <TwoItemsBlock />
      <OneItemBlock /> */}
    </main>
  );
}

export default Page;
