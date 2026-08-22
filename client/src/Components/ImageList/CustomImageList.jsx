import React from "react";
import { FaStar } from "react-icons/fa";
import "./CustomImageList.css";

export default function CustomImageList({ photos = [] }) {
  const fallbackImages = [
    "https://imgmedia.lbb.in/media/2022/12/63aaa318e9c4cc0f83cc8598_1672127256471.jpg",
    "https://bute-park.com/wp-content/uploads/ChayGardens-18.jpg",
    "https://media.istockphoto.com/id/1125570422/photo/florists-women-working-with-flowers-in-a-greenhouse.jpg?s=612x612&w=0&k=20&c=74NBqdnSF1Z5zS8hKjkI9xE6dnnrvdARjy1rcxqnjj8=",
    "https://t4.ftcdn.net/jpg/03/35/91/53/360_F_335915319_m5RPlCsyNFe24hDInTBQvrgzCYpXdYMG.jpg",
  ];
  const images = Array.isArray(photos) && photos.length ? photos : fallbackImages;

  return (
    <div className="customImageGrid">
      {images.map((image, index) => (
        <figure className={`customImageItem ${index === 0 ? "featured" : ""}`} key={`${image}-${index}`}>
          <img src={image} alt={`Nursery ${index + 1}`} loading="lazy" />
          <figcaption><span>Nursery</span><FaStar /></figcaption>
        </figure>
      ))}
    </div>
  );
}
