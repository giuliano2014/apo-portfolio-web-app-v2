import DuoBloc from "@/components/duoBloc/duoBloc";
import OneItemBloc from "@/components/oneItemBloc/oneItemBloc";
import TopProjectBlock from "@/components/topProjectBlock/topProjectBlock";
import TrioBloc from "@/components/trioBloc/trioBloc";
import styles from "./page.module.css";

// lib/queries.js
const getProjectById = `
  query GetProjectByID($id: ID!) {
    project(where: {id: $id}) {
      content {
        ... on DuoBloc {
          __typename
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
          media {
            height
            url
            width
          }
        }
        ... on TextBloc {
          __typename
          text
          surtitle
          title
        }
        ... on TrioBloc {
          __typename
          id
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
          thirdColumn {
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

const TextBloc = ({ text, surtitle, title }: any) => (
  <div>
    <h3>{surtitle}</h3>
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
);

const Page = async ({ params }: { params: { slug: string } }) => {
  const projectId = params.slug;
  const data = await fetchGraphQLData(getProjectById, { id: projectId });

  const headerData = data.project.header;
  const contentData = data.project.content;

  console.log(contentData);

  return (
    <main className={styles.projectPage}>
      <TopProjectBlock {...headerData} />
      {/* <OneItemBloc />
      <TwoItemsBlock />
      <TrioBloc /> */}
      {contentData.map((bloc: any, index: number) => {
        switch (bloc.__typename) {
          case "DuoBloc":
            return <DuoBloc key={index} {...bloc} />;
          case "SoloBloc":
            return (
              <OneItemBloc
                key={bloc.id}
                id={bloc.id}
                height={bloc.media.height}
                url={bloc.media.url}
                width={bloc.media.width}
              >
                <p>{bloc.text}</p>
              </OneItemBloc>
            );
          // case 'TextBloc':
          //   return <TextBloc key={index} {...bloc} />;
          case "TrioBloc":
            return <TrioBloc key={bloc.id} {...bloc} />;
          // return <TrioBloc key={index} {...bloc} />;
          default:
            return null;
        }
      })}
    </main>
  );
};

export default Page;
