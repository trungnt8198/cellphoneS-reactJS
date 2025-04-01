import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import style from "./Slider.module.scss";

const slides = [
  {
    image: "/src/assets//header-slides/Top banner_Chinh hang.svg",
    title: "Top Banner Chính Hãng",
  },
  {
    image: "/src/assets/header-slides/Top banner_Giao hang.svg",
    title: "Top Banner Giao Hàng",
  },
  {
    image: "/src/assets/header-slides/Top banner_Smember.svg",
    title: "Top Banner Smember",
  },
  {
    image: "/src/assets/header-slides/Top banner_Thu cu.svg",
    title: "Top Banner Thu Cũ",
  },
];

function Slider() {
  function handleOnChange(swiper) {
    if (swiper.isBeginning) {
      swiper.navigation.prevEl.style.visibility = "hidden";
    } else {
      swiper.navigation.prevEl.style.visibility = "visible";
    }
    if (swiper.isEnd) {
      swiper.navigation.nextEl.style.visibility = "hidden";
    } else {
      swiper.navigation.nextEl.style.visibility = "visible";
    }
  }

  return (
    <Swiper
      className={style.wrapper}
      modules={[Navigation, A11y]}
      slidesPerView={3}
      spaceBetween={10}
      navigation
      autoplay
      onSlideChange={handleOnChange}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img
            className={style.slide__image}
            src={slide.image}
            alt={slide.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
