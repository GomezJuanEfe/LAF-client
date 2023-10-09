import styles from '@/styles/Recursos.module.css'
import Link from "next/link"
import Image from "next/image"

const RecursoCard = ({url, title, text, image, key}) => {
  return (
    <div className={styles.card_container}>
      <Link href={url}>
        <div className={styles.flex_container}>

          <div className={styles.image_container}>
            <Image
              alt={`${title} - Imagen.`}
              src={image}
              fill
              style={{
                objectFit: 'cover'
              }}
            />
          </div>

          <div className={styles.body_container}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>

        </div>
      </Link>
    </div>
  )
}

export default RecursoCard