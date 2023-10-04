import Image from "next/image";
import Link from "next/link";
import styles from '@styles/Noticias.module.css'

function Card({image, title, tag, date, slug}) {
  return (
    <div className={styles.card_container}>
      <Link href={`/noticias/${slug}`}>
        <div className={styles.image_container}>
          <Image
            src={image}
            alt="picture"
            fill
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
        <div className={styles.body_container}>
          <h2>
          {title}
          </h2>
          <p>
            <span>{tag}</span> | {date}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Card