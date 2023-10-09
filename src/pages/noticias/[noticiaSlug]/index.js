import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import Noticia from "@/components/blocks/Noticia";
import Head from "next/head";
import Noticias from "@/components/blocks/Noticias";

const noticiaBySlug = ({noticia, apiUrl}) => {
  const { noticias: { data: [{ attributes: {
    Titulo,
    editor_content,
    publishedAt,
    seo,
    categoria: { data: { attributes: { name: category}}},
    blocks: [{ noticias: { data: relatedNews } }]
  } }] } } = noticia

  return (
    <>
      <Head>
        <title>{`Noticia | ${seo?.metaTitle}`}</title>
        <meta name="description" content={seo?.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className="section-container">
          <Noticia 
            title={Titulo}
            content={editor_content}
            category={category}
            date={publishedAt}
          />
        </div>
        <div className="gray-background box-sizing-content">
          <div className="section-container related_news">
          <h2 className="section-title-md margin-bottom-40">También te puede interesar</h2>
            <Noticias
              data={relatedNews}
              apiUrl={apiUrl}
              center
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default noticiaBySlug

export const getServerSideProps = async ({ params }) => {
  const { noticiaSlug } =  params;

  const API_URL = (process.env.API_BASE_URL);

  const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
  });

  const {data: noticia} = await client.query({
    query: gql`
      query noticiaBySlug($slug: String) {
        noticias(
          filters: {
            slug: {
              eq: $slug
            }
          }
        ) {
          data {
            attributes {
              Titulo
              publishedAt
              categoria {
                data {
                  attributes {
                    name
                  }
                }
              }
              seo {
                metaTitle
                metaDescription
              }
              editor_content
              categoria {
                data {
                  attributes {
                    name
                  }
                }
              }
              blocks {
                __typename
                ...on ComponentBlocksRelatedArticles {
                  noticias {
                    data {
                      attributes {
                        Titulo
                        publishedAt
                        slug
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
              }
            }
          }
        }
      }
    `,
    variables: {
      slug: noticiaSlug
    }
  })

  return {
    props: {
      noticia,
      apiUrl: API_URL
    }
  }
}