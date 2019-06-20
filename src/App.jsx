import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu, Typography, Row, Col, Icon } from 'antd';

import { GalleryPage, LabPage } from './pages/mainPage';

import { menus } from './data.json';

const { Text } = Typography
const { Header, Content, Footer } = Layout;


function App() {
  const menuUI = menus.map((item, index) =>
    <Menu.Item key={index} >
      <Link to={item.link}>
        <Icon type={item.icon} />
        <span>{item.title}</span>
      </Link>
    </Menu.Item>
  )

  return (
    <Router>
      <Layout className="layout">
        <Header className="p:0">
          <Row>
            <Col xs={0} md={2} className="t-a:c" style={{ width: 120}}>
              <Text className="f:2 f-w:500" style={{ color: '#fff'}} >马南</Text>
            </Col>
            <Col span={20}><Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['0']}
              style={{ lineHeight: '64px' }}
            // selectedKeys = {['0']}
            >
              {menuUI}
            </Menu></Col>
          </Row>

        </Header>
        <Content className="p-t:1">
          <Row type="flex" justify="center">
              <Route exact path="/" component={GalleryPage} />
              <Route path="/gallery" component={GalleryPage} />
              <Route path="/lab" component={LabPage} />
          </Row>
        </Content>
        <Footer className="t-a:c">1-mu.net ©2018 Created by icrdr</Footer>
      </Layout>
      {/* <TopBar title="icrdr" link="./" />

      <MenuSide variant='permanent' /> */}


    </Router>
  );
}

export default App;