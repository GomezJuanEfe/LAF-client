import styles from './character.module.css'
import Image from 'next/image';

const CharacterPage = ({ characters }) => {
  console.log(characters);
  return (
    <>
      <h2
        className={styles.character_title}
      >
        Personajes
      </h2>
      <div className={styles.character_content}>
        {characters.map((character) => {
          return (
            <div className={styles.character_card} key={character.id}>
              <h2>{character.name}</h2>
              <Image
                src={character.image}
                alt={`Imagen del personaje ${character.name}`}
                width={300}
                height={300}
                loading="lazy"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CharacterPage

export const getServerSideProps = async () => {
  console.log('Estoy en el servidor');

  const responseAPI = await fetch('https://rickandmortyapi.com/api/character');
  const characters = await responseAPI.json();

  return {
    props: {
      characters: characters.results
    }
  }
}