import mdToHTML from "@/utils/snarkdown";
import styles from '@/styles/Noticia.module.css'
import { formatDate } from "@/utils";

const Noticia = ({title, content, date, category}) => {
  return (
    <div className={styles.noticia_container}>
      <h2>{title}</h2>
      <p><span>{category}</span> | {formatDate(date, true)}</p>
      <div dangerouslySetInnerHTML={{ __html: mdToHTML(content)}} />
    </div>
  )
}

export default Noticia