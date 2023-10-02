import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import styles from '@/styles/LafHome.module.css';
import Hero from "@/components/blocks/Hero";

const home = ({ data }) => {
  const { blocks: [{Images: {data: heroImages}}] } = data;

  return (
    <div>
      <Hero>
        {
          heroImages.map(item => {
            return (
                <div className={`${styles.image_container}`} key={item.attributes.url}>
                  <Image
                    alt="LAF hero image"
                    src={`http://localhost:1337${item.attributes.url}`}
                    fill={true}
                    key={item.attributes.url}
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </div>
            )
          })
        }
      </Hero>
    </div>
  )
}

export default home

export const getStaticProps = async () => {

  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache()
  });

  const {data} = await client.query({
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
              blocks {
                __typename
                ...on ComponentBlocksHero {
                  id
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
              }
            }
          }
        }
      }
    `
  });

  return {
    props: {
      data: data.page.data.attributes
    }
  }
}
