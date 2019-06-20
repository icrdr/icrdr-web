import React from 'react'
import { Card } from 'antd';

import { Layout, Menu, Breadcrumb, Typography, Row, Col, Icon } from 'antd';

const { Meta } = Card;

export function CardItem({ info }) {
  return (
    <a href={info.link}>
    <Card
      hoverable
      style={{ width: '100%' }}
      cover={<img alt="example" src={info.imgsrc} />}
    >
      <Meta title={info.title} description={info.subtitle} />
    </Card>
    </a>
  )
}

export default function IcCards({data}) {
  const cardUI = data.map((item, index) => 
  <Col className="m-b:5" xs={24} md={12} key={index}>
    <CardItem info={item} />
  </Col>
  )

  return (
    <Row gutter={24}>
      {cardUI}
    </Row>
  )
}
