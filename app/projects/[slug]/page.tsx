import DuoBloc from "@/components/duoBloc/duoBloc";
import OneItemBloc from "@/components/oneItemBloc/oneItemBloc";
import TopProjectBlock from "@/components/topProjectBlock/topProjectBlock";
import TrioBloc from "@/components/trioBloc/trioBloc";
import TextBloc from "@/components/ui/textBloc/TextBloc";
import styles from "./page.module.css";

// lib/queries.js
const getProjectById = `
  query GetProjectByID($id: ID!) {
    project(where: {id: $id}) {
      content {
        ... on DuoBloc {
          __typename
          id
          firstColumn {
            id
            media {
              height
              url
              width
            }
            text
          }
          secondColumn {
            id
            text
            media {
              height
              url
              width
            }
          }
        }
        ... on SoloBloc {
          __typename
          id
          text
          desktopMedia {
            height
            url
            width
          }
          mobileMedia {
            height
            url
            width
          }
        }
        ... on TextBloc {
          __typename
          id
          text
          surtitle
          title
        }
        ... on TrioBloc {
          __typename
          id
          firstColumn {
            id
            media {
              height
              url
              width
            }
            text
          }
          secondColumn {
            id
            text
            media {
              height
              url
              width
            }
          }
          thirdColumn {
            id
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

// @TODO: Move this function to a shared file
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

const Page = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);
  const projectId = params.slug;
  const { project } = await fetchGraphQLData(getProjectById, { id: projectId });
  console.log(project);
  const headerData = project.header;
  const contentData = project.content;

  return (
    <main className={styles.projectPage}>
      <TopProjectBlock {...headerData} />
      {contentData.map((bloc: any) => {
        // @TODO: Improve this part of code
        switch (bloc.__typename) {
          case "DuoBloc":
            return <DuoBloc key={bloc.id} {...bloc} />;
          case "SoloBloc":
            return (
              <OneItemBloc
                key={bloc.id}
                desktopMediaUrl={bloc.desktopMedia.url}
                id={bloc.id}
                height={bloc.desktopMedia.height}
                mobileMediaUrl={bloc.mobileMedia?.url}
                width={bloc.desktopMedia.width}
              >
                <p>{bloc.text}</p>
              </OneItemBloc>
            );
          case "TextBloc":
            return <TextBloc key={bloc.id} {...bloc} />;
          case "TrioBloc":
            return <TrioBloc key={bloc.id} {...bloc} />;
          default:
            return null;
        }
      })}
    </main>
  );
};

export default Page;
