import { Layout, Menu, MenuProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';

export const App = () => {

  const [current, setCurrent] = useState('');

  const navigate = useNavigate()

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to={'introduction'}>Introducción</Link>
    },
    {
      key: '3',
      label: <Link to={'members'}>Integrantes</Link>
    }
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const goHome = () => {
    navigate('/')
    setCurrent('');
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <HomeOutlined onClick={goHome} style={{ fontSize: '24px', color: '#08c' }} />
          <Menu
            onClick={onClick}
            theme="dark"
            mode="horizontal"
            items={menuItems}
            selectedKeys={[current]}
            style={{ flex: 1, minWidth: 0, margin: 20 }}
          />
        </Header>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Universidad del Valle
        </Footer>
      </Layout>
    </>
  )
}

export default App
