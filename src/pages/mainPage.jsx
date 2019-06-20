import React from 'react'
import { Col } from 'antd';

import IcPageTitle from '../components/IcPageTitle';
import IcCards from '../components/IcCards';
import IcGallery from '../components/IcGallery'
import { pages } from '../data.json';


import { experiments, artworks } from '../data.json';


export function GalleryPage() {
  return (
    <Col span={24}>
    <main className="p:.1" style={{ minHeight: 1, overflow: 'auto' }}>
      <IcGallery data={artworks} />
    </main>
    </Col>
  )
}

export function LabPage() {
  return (
    <Col xs={24} md={16}>
    <main className="p:2" style={{ background: '#fff', minHeight: 900 }}>
      <IcPageTitle title={pages.lab.title} describe={pages.lab.describe} />
      <IcCards data={experiments} />
    </main>
    </Col>
  )
}