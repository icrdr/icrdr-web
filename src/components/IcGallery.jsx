import React, { useState } from 'react'
import { useWindowSize } from '../hocks'
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css'; // This only needs to be imported once in your app
import StackGrid from "react-stack-grid";

export default function IcGallery({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const WindowWidth = useWindowSize()[0]

  const imgUI = data.map((item, index) =>
    <img onClick={() => {
      setIsOpen(true)
      setPhotoIndex(index)
    }}
      width={"100%"} height={"100%"} src={item.thumbnail} alt={item.thumbnail} key={index}

    />
  )
  return (
    <div>
      <StackGrid
        columnWidth={WindowWidth < 768 ? "100%" : "33.33%"}
        style={{ overflow: "hidden" }}
        monitorImagesLoaded
      >
        {imgUI}
      </StackGrid>
      {isOpen && (
        <Lightbox
          mainSrc={data[photoIndex].src}

          prevSrc={data[(photoIndex + data.length - 1) % data.length].src}
          nextSrc={data[(photoIndex + 1) % data.length].src}

          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + data.length - 1) % data.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % data.length)}
        />
      )}
    </div>
  )
}
