import Card from './Card';
import styles from '@/styles/Noticias.module.css'
import { formatDate } from '@/utils';

const Noticias = ({ data, apiUrl }) => {
  return (
      <section className={styles.noticias_container}>
        {
          data.map(item => {
            return(
              <Card 
                key={item.attributes.slug}
                image={`${apiUrl}${item.attributes.image.data.attributes.url}`}
                title={item.attributes.Titulo}
                tag={item.attributes.categoria.data.attributes.name}
                date={formatDate(item.attributes.publishedAt)}
                slug={item.attributes.slug}
              />
            )
          })
        }
      </section>
  )
}

export default Noticias