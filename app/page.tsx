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
    console.log("GraphQL data:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
};

// lib/queries.js
export const GET_EXAMPLE_DATA = `
  query GetExampleData {
    homepages {
      projects {
        ... on OneProject {
          id
          title
        }
        ... on TwoProject {
          id
          projects {
            id
            title
          }
        }
      }
    }
  }
`;

export default async function Home() {
  const data = await fetchGraphQLData(GET_EXAMPLE_DATA);
  console.log("DATA", data);
  console.log("YEAH BABY", data.homepages[0].projects[0]);
  const test = data.homepages[0].projects.map((project: any) => {
    console.log("PROJECT", project);
  });
  return (
    <main className={styles.homePage}>
      <TwoItemsBlock />
      <OneItemBlock />
      <TwoItemsBlock />
      <TwoItemsBlock />
      <OneItemBlock />
    </main>
  );
}
