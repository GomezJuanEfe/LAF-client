import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import styles from '@/styles/Home.module.css';
import Hero from "@/components/blocks/Hero";
import Head from "next/head";
import Noticias from "@/components/blocks/Noticias";
import Recursos from "@/components/blocks/Recursos";
import SecondaryButton from "@/components/shared/SecondaryButton";
import Sponsors from "@/components/blocks/Sponsors";

const Home = ({ homePage, latestNews, apiUrl }) => {
  const {
    recursos,
    seo,
    blocks: [{Images: {data: heroImages}}, {sponsors: {data: sponsorsImages}}]
  } = homePage;

  return (
    <>
      <Head>
        <title>{seo.metaTitle}</title>
        <meta name="description" content={seo.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <Hero>
          {
            heroImages.map(item => {
              return (
                  <div className={styles.image_container} key={item.attributes.url}>
                    <Image
                      alt="LAF hero image"
                      src={`${apiUrl}${item.attributes.url}`}
                      fill={true}
                      key={item.attributes.url}
                      style={{
                        objectFit: 'cover'
                      }}
                      sizes="100vw"
                    />
                  </div>
              )
            })
          }
        </Hero>
        <div className="section-container">
          <h2 className="section-title">Noticias</h2>
          <div className="two-columns-right">
            <div>
              <Noticias data={latestNews} apiUrl={apiUrl} />
              <SecondaryButton text={'ver mas'} href={'/noticias'} center={true} />
            </div>
            <div>
              <Recursos
                data={recursos}
                apiUrl={apiUrl}
              />
            </div>
          </div>
        </div>
        <div className="gray-background box-sizing-content">
          <div className="section-container">
            <Sponsors
              data={sponsorsImages}
              apiUrl={apiUrl}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home

export const getStaticProps = async () => {

  const API_URL = (process.env.API_BASE_URL);

  const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
  });

  const {data: homePage} = await client.query({
    query: gql`
      query homePage {
        page (id: 1) {
          data {
            attributes {
              title
              seo {
                metaTitle
                metaDescription
                metaImage {
                  data {
                    attributes {
                      url
                      width
                      height
                    }
                  }
                }
              }
              recursos {
                Title
                Text
                URL
                Image {
                  data {
                    attributes {
                      url
                      width
                      height
                    }
                  }
                }
              }
              blocks {
                __typename
                ...on ComponentBlocksHero {
                  Images {
                    data {
                      attributes {
                        url
                        width
                        height
                      }
                    }
                  }
                }
                ...on ComponentBlocksSponsors {
                  sponsors {
                    data {
                      attributes {
                        url
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
    `
  });

  const { data: latestNews } = await client.query({
    query: gql`
      query lastFourNews {
        noticias(
          pagination: {
            limit: 4
          } 
          sort: ["publishedAt:DESC"]
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
    `
  });

  return {
    props: {
      homePage: homePage.page.data.attributes,
      latestNews: latestNews.noticias.data,
      apiUrl: API_URL,
    }
  }
}
