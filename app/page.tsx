import OneItemBloc from "@/components/oneItemBloc/OneItemBloc";
import TwoItemsBlock from "@/components/twoItemsBlock/TwoItemsBlock";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
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

const GET_HOME_PAGE_DATA = gql`
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
  const client = getClient();
  const { data } = await client.query<HomePageData>({
    query: GET_HOME_PAGE_DATA,
  });
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
