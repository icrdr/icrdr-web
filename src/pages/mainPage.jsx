import React from 'react'
import { Col } from 'antd';

import IcPageTitle from '../components/IcPageTitle';
import IcCards from '../components/IcCards';
import IcGallery from '../components/IcGallery'

import ThreeTest from '../threejs/ThreeTest'
import { pages } from '../data.json';
import DicomViewer from '../threejs/DicomViewer'

import { experiments, artworks } from '../data.json';


export function GalleryPage() {
  return (
    <Col xs={24} md={22} className="p:.1" style={{ minHeight: 1, overflow: 'auto' }}>
      <IcGallery data={artworks} />
    </Col>
  )
}

export function LabPage() {
  return (
    <Col xs={24} md={16} className="p:2" style={{ background: '#fff', minHeight: 900 }}>
      <IcPageTitle title={pages.lab.title} describe={pages.lab.describe} />
      <IcCards data={experiments} />
    </Col>
  )
}

export function DicomPage() {
  return (
    <Col xs={24} md={16} style={{ background: '#fff', minHeight: 900 }}>
      <DicomViewer/>
    </Col>
  )
}