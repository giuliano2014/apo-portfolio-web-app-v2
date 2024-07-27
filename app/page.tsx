import OneItemBlock from "@/components/oneItemBlock/oneItemBlock";
import TwoItemsBlock from "@/components/twoItemsBlock/twoItemsBlock";
import styles from "./page.module.css";

// lib/graphql.js
const endpoint =
  "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clwt16l4202v007uvdo2lhj3v/master";

export const fetchGraphQLData = async (query: any, variables = {}) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjE0MDQyMDMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2x3dDE2bDQyMDJ2MDA3dXZkbzJsaGozdi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiMDVmMmY5OGItZTRkNC00NWQ3LTg3OTEtODRiYmJmN2E5ZmMxIiwianRpIjoiY2x5c3ZtN3gzMDBhdjA3dzY0ZWNuN3BkZiJ9.GhfAyQREkagPJHBSjLNXuPwh8t_z0r23Pqv1rdvc0E7QGJoSbHlosp15JK1NbqdVj5Jz8GQxFO8OYdEOaJhGWejgAKr65Bdftv4Ewo6ZWlgG1rjHvs2LuISfmUDPzaAt2XAcmw0viNmSv3IIE0Lh9NmSz5RNgkxqp1qrkT8HF8BBabGclcZSayeA-n4rxx-24NuKAnQiTaVMWAXdXG_9LnebyeSmkVix1KmndT73whhwoIteXbvbOsyBM359ZpbSIkF5B5kvcitKMZsLoAjv5c1C4zk8ZsUm6lZ6guh7uJxNhepjThozbP4hoNdpAo9wNw7eKroGAfywCRTxCkCwGAKcuDhEtIAAKzRXEguS0EMv0qLaIWfukgsOnUiawK_BpiDXH_DOMayTHSGs-TxcvZleHWib2Uh0cm-DCDikx9GFJ9pB7IEfpGqhTPGhlVomkho-PunxWKM0RTAurNTghzI9TCfZoRvigl8v4RtzUjTKwxMlRzXmt_LqIt72OHmDcoRVpomTN_MP2m3bXHok6zfNQC9_EZRyUkA9QsXEhFa3mqEdYrpsgH3RNlrZTDkEk_olHbLtYX_V_nhi2pU7jovcUFBlgvLYjGnWl2o_fdwU2IpYQRJSvl2IboXYRvPbhYInXnj8xfgnIg4FOR3VueXuv2O86XzDnvfM7s8dGiA", // Ajoutez cette ligne si vous avez besoin d'authentification
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

// lib/queries.js
export const getHomePageData = `
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
      const hashtags = project.projects.map((subProject: any) => subProject.hashtag);
      const heights = project.projects.map((subProject: any) => subProject.media.height);
      const ids = project.projects.map((subProject: any) => subProject.id);
      const titles = project.projects.map((subProject: any) => subProject.title);
      const urls = project.projects.map((subProject: any) => subProject.media.url);
      const widths = project.projects.map((subProject: any) => subProject.media.width);
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
