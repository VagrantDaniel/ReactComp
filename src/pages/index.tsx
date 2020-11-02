import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;
import DynamicList from "../components/DynamicList/demo";


const list = [
  {
    key: '/DynamicList',
    title: 'DynamicList',
    component: <DynamicList />
  }
];

export default withRouter(props => {
  const pathname = props.location.pathname;

  return (
    <Router>
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Sider style={{ background: "#fff" }}>
          <Menu mode="inline" selectedKeys={[pathname]}>
            {list.map((item, index) => (
              <Menu.Item key={item.key}>
                <Link to={item.key}>{item.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content
          style={{
            margin: "20px",
            padding: 20,
            background: "#fff",
            borderRadius: 4
          }}
        >
          <Switch>
            <Route exact path="/">
              React 组件库
            </Route>
            {list.map(item => (
              <Route key={item.key} path={item.key}>
                {item.component}
              </Route>
            ))}
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
});
