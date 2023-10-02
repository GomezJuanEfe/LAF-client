import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Hero = ({children}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dotClass: 'custom-dots',
  };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
}

export default Hero