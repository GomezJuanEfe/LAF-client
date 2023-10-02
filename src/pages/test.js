import Hero from "@/components/blocks/Hero";
import Image from 'next/image';
import img1 from '@public/img/1.jpg';
import img2 from '@public/img/2.jpg';

const test = () => {

  return (
    <>
      <Hero>
        <div>
          <Image
            src={img1}
            alt="Picture 1"
          />
        </div>
        <div>
          <Image
            src={img2}
            alt="Picture 2"
          />
        </div>
      </Hero>
      <div>This is a test page</div>
    </>
  )
}

export default test