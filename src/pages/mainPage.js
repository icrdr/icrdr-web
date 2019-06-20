import React from 'react'
import { Typography, Button} from 'antd'
import Gallery from 'react-grid-gallery';

import IcPageTitle from '../components/IcPageTitle';
import IcCards from '../components/IcCards';
import {pages} from '../data.json';



import { experiments, artworks } from '../data.json';

const { Title } = Typography

export const GalleryPage = () => {
  return (
    <main style={{ minHeight: 1, overflow: 'auto' }}>
    <Gallery enableImageSelection={false} rowHeight={270} images={artworks}/>
    </main>
  )
}

export const LabPage = () => {
  return (
    <main >
      <IcPageTitle title={pages.lab.title} describe={pages.lab.describe} />
        <IcCards data={experiments}/>
    </main>
  )
}