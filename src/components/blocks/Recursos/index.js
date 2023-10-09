import styles from '@/styles/Recursos.module.css'
import RecursoCard from './Card'

const Recursos = ({data, apiUrl}) => {
  return (
    <>
      <h2 className="section-title-md">Recursos</h2>
      <section className={styles.recursos_container}>
        {
          data.map((item, index) => {
            return (
              <div key={index}>
                <RecursoCard
                  text={item.Text}
                  title={item.Title}
                  url={item.URL}
                  image={`${apiUrl}${item.Image.data.attributes.url}`}
                />
              </div>
            )
          })
        }
      </section>
    </>
  )
}

export default Recursos