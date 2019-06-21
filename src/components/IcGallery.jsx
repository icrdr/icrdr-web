import React, { useState } from 'react'
import { useWindowSize } from '../hocks'
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css'; // This only needs to be imported once in your app
import StackGrid from "react-stack-grid";

export function IcImg({ src, width, height, alt }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div>
      <img display={loaded?"inherit":"none"} width={"100%"} height={"100%"}
          onLoad={() => setLoaded(true)}
          src={src} alt={alt}
        />
      {!loaded &&
        (<div style={{ width: width, height: height, background: '#eee' }}
        />)
      }
    </div>
  )
}


export default function IcGallery({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const WindowWidth = useWindowSize()[0]

  const imgUI = data.map((item, index) =>
    <div style={{ width: "100%", height: "100%" }} onClick={() => {
          setIsOpen(true)
          setPhotoIndex(index)
        }}>
      <IcImg width={"100%"} height={200} src={item.thumbnail} alt={item.thumbnail}
      />
    </div>
  )
  return (
    <div>
      <StackGrid
        columnWidth={WindowWidth < 768 ? "100%" : "33.33%"}
        style={{ overflow: "hidden" }}
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

          enableZoom={true}
        />
      )}
    </div>
  )
}
