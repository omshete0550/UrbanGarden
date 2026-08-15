import React from "react";
import { ImageHotspotViewer } from "react-image-hotspot-viewer";
import './ImageHotspot.css'
import { imageHotspot } from "../../assets";

const hotspots = [
  {
    id: 1,
    title: "Skyie Cotton Planter",
    description:
      "Who doesn't love a good aztec planter, a play of turquoise blue on grey and just the right amount of white to make the designs even more stunning.",
    // image: "https://devcdn.extscape.com/images/SeatSoftGrey.avif",
    position: {
      top: "42%",
      left: "68%",
    },
    action: {
      hasAction: false,
      type: "link",
      url: "https://www.google.com",
      label: "View Product Details",
      icon: "open_in_new",
    },
  },
  {
    id: 2,
    title: "Philodendron Oxycardium Green Plant",
    description:
      "The indoor house plant that has been in trend for generations now, the Philodendron Oxycardium Green can as well be called the original superstar of the plant world.",
    position: {
      top: "30%",
      left: "50%",
    },
    action: {
      hasAction: false,
    },
  },
  {
    id: 3,
    title: "Golden Sedum Plant",
    description:
      "Sedum plant are golden green tufty perennial plants with leaves clustered on thick stems.These chubby cuties golden sedum plant grow horizontally rather than vertically and are popularly planted in clusters",
    position: {
      top: "60%",
      left: "30%",
    },
    action: {
      hasAction: false,
    },
  },
];

const ImageHotspot = () => {
  return (
    <div className="ImageHotspot">
      <h1>Shop The Look</h1>
      <ImageHotspotViewer
        image={imageHotspot}
        hotspots={hotspots}
        imageStyles={{
          borderRadius: "5px",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
        }}
      />
    </div>
  );
};

export default ImageHotspot;
