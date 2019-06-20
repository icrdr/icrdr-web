import React from 'react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export default function IcPageTitle(props) {
  return (
    <div>
      <Title>{props.title}</Title>
      <Paragraph>{props.describe}</Paragraph>
    </div>
  )
}
