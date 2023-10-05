import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ActiveLink from "@/components/shared/ActiveLink";
import Head from "next/head";
import Noticias from "@/components/blocks/Noticias";

const noticiasPage = ({ news, apiUrl, seo, categories }) => {
  const { categorias: { data:categoriesData } } = categories;

  return (
    <>
      <Head>
        <title>{seo?.metaTitle || 'Noticas | Entérate de lo último'}</title>
        <meta name="description" content={seo?.metaDescription || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <div className="section-container">
          <div className="two-columns-left">
            <div className="margin-column">
              <h2 className="section-title-md">Categorías</h2>
              <ul className="custom-list">
                {
                  categoriesData.map(item => {
                    return (
                      <ActiveLink href={`/noticias?category=${item.attributes.slug}`}>
                        <li>
                          {item.attributes.name}
                        </li>
                      </ActiveLink>
                    )
                  })
                }
                <ActiveLink href={`/noticias`}>
                <li>
                  Todas
                </li>
                </ActiveLink>
              </ul>
            </div>
            <div>
              <h2 className="section-title">Todas las Noticias</h2>
              <Noticias data={news} apiUrl={apiUrl} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default noticiasPage

export const getServerSideProps = async ({ query }) => {
  const { category } = query;
  const API_URL = (process.env.API_BASE_URL).slice(0, -1);

  const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
  });

  const { data: news } = await client.query({
    query: gql`
      query newsByCategory($slug: String) {
        noticias(
          sort: ["publishedAt:DESC"]
          filters: {
            categoria: {
              slug: {
                contains: $slug
              }
            }
          }
        ) {
          data {
            attributes {
              Titulo
              slug
              publishedAt
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              categoria {
                data {
                  attributes {
                    name
                  }
                }
              }
            }
          }
        } 
      }
    `,
    variables: {
      slug: category || ''
    }
  });

  const { data: categories } = await client.query({
    query: gql`
      query categories {
        categorias {
          data {
            attributes {
              name
              slug
            }
          }
        }
      }
    `
  });

  return {
    props: {
      news: news.noticias.data,
      apiUrl: API_URL,
      categories
    }
  }
}
