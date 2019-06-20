import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Typography, Row, Col, Icon } from 'antd';

import { GalleryPage, LabPage } from './pages/mainPage';

import { menus } from './data.json';

const { Title, Text } = Typography
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
        <Header>
          <Text className="fl:l p-r:8 f:2 f-w:500" style={{ color: '#fff' }} level={4} >马南</Text>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            style={{ lineHeight: '64px' }}
            // selectedKeys = {['0']}
          >
            {menuUI}
          </Menu>
        </Header>
        <Content className="p-t:1">
          <Row type="flex" justify="center">
            <Col xs={20} md={16}>
              <div className="p:5" style={{ background: '#fff', minHeight: 900}}>
                <Route exact path="/" component={GalleryPage} />
                <Route path="/gallery" component={GalleryPage} />
                <Route path="/lab" component={LabPage} />
              </div>
            </Col>
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