import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import Noticia from "@/components/blocks/Noticia";
import Head from "next/head";

const noticiaBySlug = ({noticia}) => {

  const { noticias: { data: [{ attributes: {
    Titulo,
    editor_content,
    publishedAt,
    seo,
    categoria: { data: { attributes: { name: category}}}
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
      </main>
    </>
  )
}

export default noticiaBySlug

export const getServerSideProps = async ({ params }) => {
  const { noticiaSlug } =  params;

  const API_URL = (process.env.API_BASE_URL).slice(0, -1);

  const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
  });

  const {data: noticia} = await client.query({
    query: gql`
      query pageBySlug($slug: String) {
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
    }
  }
}