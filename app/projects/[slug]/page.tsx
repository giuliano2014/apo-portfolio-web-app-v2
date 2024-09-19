import DuoBloc from "@/components/duoBloc/duoBloc";
import SoloBloc from "@/components/soloBloc/soloBloc";
import TopProjectBlock from "@/components/topProjectBlock/topProjectBlock";
import TrioBloc from "@/components/trioBloc/trioBloc";
import RemoteVideoPlayer from "@/components/ui/remoteVideoPlayer/RemoteVideoPlayer";
import TextBloc from "@/components/ui/textBloc/TextBloc";
import TextLines from "@/components/ui/TextLines";
import styles from "./page.module.css";

// lib/queries.js
const getProjectById = `
  query GetProjectByID($slug: String!) {
    projects(where: {slug: $slug}) {
      content {
        ... on DuoBloc {
          __typename
          id
          firstColumn {
            id
            media {
              height
              mimeType
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
              mimeType
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
            mimeType
            url
            width
          }
          mobileMedia {
            height
            mimeType
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
              mimeType
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
              mimeType
              url
              width
            }
          }
          thirdColumn {
            id
            text
            media {
              height
              mimeType
              url
              width
            }
          }
        }
        ... on VideoBloc {
          __typename
          id
          poster {
            url
          }
          url
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
      slug
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

const Page = async ({ params }: { params: { slug: string } }) => {
  const { projects } = await fetchGraphQLData(getProjectById, {
    slug: params.slug,
  });
  const headerData = projects[0].header;
  const contentData = projects[0].content;

  return (
    <main className={styles.projectPage}>
      <TopProjectBlock {...headerData} />
      {contentData.map((bloc: any) => {
        // @TODO: Improve this part of code
        switch (bloc.__typename) {
          case "DuoBloc":
            return <DuoBloc key={bloc.id} {...bloc} />;
          case "SoloBloc":
            const { desktopMedia, id, mobileMedia, text } = bloc;
            return (
              <SoloBloc
                key={id}
                desktopMediaUrl={desktopMedia.url}
                id={id}
                height={desktopMedia.height}
                mimeType={desktopMedia.mimeType}
                mobileMediaUrl={mobileMedia?.url}
                width={desktopMedia.width}
              >
                {text && <TextLines text={text} />}
              </SoloBloc>
            );
          case "TextBloc":
            return <TextBloc key={bloc.id} {...bloc} />;
          case "TrioBloc":
            return <TrioBloc key={bloc.id} {...bloc} />;
          case "VideoBloc":
            return (
              <RemoteVideoPlayer
                key={bloc.id}
                poster={bloc.poster.url}
                url={bloc.url}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
};

export default Page;
