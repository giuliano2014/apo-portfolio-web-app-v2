import DuoBloc from "@/components/duoBloc/duoBloc";
import SoloBloc from "@/components/soloBloc/soloBloc";
import TopProjectBlock from "@/components/topProjectBlock/topProjectBlock";
import TrioBloc from "@/components/trioBloc/trioBloc";
import RemoteVideoPlayer from "@/components/ui/remoteVideoPlayer/RemoteVideoPlayer";
import TextBloc from "@/components/ui/textBloc/TextBloc";
import TextLines from "@/components/ui/textLines/TextLines";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import styles from "./page.module.css";

const GET_PROJECT_BY_ID = gql`
  query GetProjectByID($slug: String!) {
    projects(where: { slug: $slug }) {
      content(first: 100) {
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

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const client = getClient();
  const { data } = await client.query({
    // @TODO: Add types
    query: GET_PROJECT_BY_ID,
    variables: { slug: (await params).slug },
  });

  const headerData = data.projects[0].header;
  const contentData = data.projects[0].content;

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
