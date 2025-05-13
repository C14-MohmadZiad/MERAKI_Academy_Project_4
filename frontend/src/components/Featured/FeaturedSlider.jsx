import React from "react";
import Slider from "react-slick";
import "./FeaturedSlider.css";

const featuredItems = [
  {
    title: "Smart Devices",
    subtitle: "Explore the latest smart devices and gadgets at amazing prices.",
    image:
      "https://media.istockphoto.com/id/2149923567/photo/family-sitting-on-sofa-looking-at-mobile-phone.jpg?s=612x612&w=0&k=20&c=l3fXarxSCw4IAnIkmWqOQZg73UHqLSIqsid2RYKOp8w=",
    cta: "Shop Now",
    link: "/shop",
    scroll: false,
  },
  {
    title: "Internet Offers",
    subtitle:
      "High speed, affordable price, and exclusive entertainment bundles",
    image:
      "https://media.istockphoto.com/id/2170143478/photo/happy-woman-using-smartphone-and-credit-card-for-online-shopping-on-sofa-at-home.jpg?s=2048x2048&w=is&k=20&c=gq9FrAD_s_WwG64OX6pWmxN2K9eqaeblL3U_zhGNrLM=",
    cta: "Explore Plans ⇲",
    link: "products-section", 
    scroll: true, 
  },
];

const FeaturedSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const handleClick = (item) => {
    if (item.scroll) {
      const target = document.getElementById(item.link);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = item.link;
    }
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {featuredItems.map((item, index) => (
          <div key={index} className="slider-slide">
            <div className="slider-content">
              <div className="slider-text">
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
                <button onClick={() => handleClick(item)}>{item.cta}</button>
              </div>
              <div className="slider-image">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedSlider;
