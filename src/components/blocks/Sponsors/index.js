import styles from '@styles/Sponsors.module.css'
import Image from 'next/image'

const Sponsors = ({data, apiUrl}) => {
  return (
    <>
      <h3 className='light-title'>Patrocinadores:</h3>
      <div className={styles.sponsors_containers}>
        {
          data.map(item => {
            return (
                <div
                  className={styles.image_container}
                  key={item.attributes.url}
                >
                  <Image
                    src={`${apiUrl}${item.attributes.url}`}
                    style={{
                      objectFit: 'contain'
                    }}
                    alt={item.attributes.name}
                    height={110}
                    width={220}
                  />
                </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Sponsors