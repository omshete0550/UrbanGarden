import React, { useEffect } from 'react'
import AOS from 'aos'
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Hero/Hero';
import Service from '../../Components/Service/Service';
import CategoryBox from '../../Components/Category/CategoryBox';
import Footer from '../../Components/Footer/Footer'
import ProductSlider from '../../Components/Carousel/ProductSlider';
import Timeline from '../../Components/Timeline/Timeline';
import Testimonial from '../../Components/Testimonial/Testimonial';
import UserSeller from '../../Components/UserSeller/UserSeller';
import TestimonialSeller from '../../Components/Testimonial/TestimonialSeller';
import { FaAngleDoubleRight } from 'react-icons/fa';
import 'aos/dist/aos.css'
import './LandingPage.css';
import 'react-multi-carousel/lib/styles.css';

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 })
  }, []);

  return (
    <>

      <Navbar />

      <Hero />

      {/* CATEGORIES  */}
      <div className="category_section" data-aos="zoom-in-down">
        <h1>CATEGORIES TO BAG</h1>

        <main className="page-content">
          {/* <Link to="/categ"> */}
          <CategoryBox

            title="GARDENING"
            content="Go green or else we all will scream!"
          />
          {/* </Link> */}
          <CategoryBox
            image="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-g-miniature-rose-button-rose-any-color-plant_600x600.jpg?v=1636708766"
            title="PLANTS"
            content="He who plants a tree, plants a HOPE"
          />
          <CategoryBox
            image="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-g-jasminum-sambac-mogra-arabian-jasmine_600x600.jpg?v=1634222612"
            title="SEEDS"
            content="Every seed has a story, but only the ones that make it from the ground get to tell theirs"
          />
          <CategoryBox
            image="https://cdn.shopify.com/s/files/1/0047/9730/0847/collections/nurserylive-vegetable-herb-seeds-category-image_217x217.jpg?v=1665397559"
            title="BULBS"
            content="Flowers don't tell, they show"
          />
          <CategoryBox
            image="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-combo-packs-pots-4-5-inch-11-cm-ronda-no-1110-round-plastic-planter-mix-color-pack-of-six-16968482029708_600x600.jpg?v=1634208583"
            title="POTS"
            content="Wherever Life plants you, bloom with grace"
          />
          <CategoryBox
            image="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-soil-and-fertilizers-vermicompost-1-kg-set-of-2_600x600.jpg?v=1666354072"
            title="SOIL & FERTILIZERS"
            content="The best fertilizer was a gardener's hard work :)"
          />
          <CategoryBox
            image="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-pebbles-aquarium-pebbles-mix-color-small-1-kg-16969333080204_600x600.jpg?v=1634213479"
            title="PEBBLES"
            content="Life is tough but so are you!"
          />
          <CategoryBox
            image="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-gardening-tools-bonsai-set-no-1025-gardening-tools-16968648360076_600x600.jpg?v=1634214773"
            title="GARDENING TOOLS"
            content="Green up your indoor space with exciting accessories"
          />
        </main>
      </div>
      {/* CATEGORIES  */}

      <Timeline />

      <Service />

      <Testimonial />

      <h2 className="carouselheading">Some of Featured products <FaAngleDoubleRight style={{ paddingTop: "10px", fontSize: "35px" }} /></h2>
      <ProductSlider />

      <UserSeller />

      <TestimonialSeller />

      <Footer />
    </>
  );
}

export default Header