// react related
import React from "react";

// third party imports
import { Layout, Menu } from "antd";

// project imports
import logo from "../bcg.png";
import PolicyDetailContainer from "../components/policy/PolicyDetailContainer";

const { Header, Content, Footer } = Layout;

export default function LayoutComponent() {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header>
        <div className="logo">
          <img className="logo__img" src={logo} alt="" />
        </div>

        <Menu theme="dark" mode="horizontal"></Menu>
      </Header>
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <div className="site-layout-content">
          <PolicyDetailContainer />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>BCG Gamma ©2021</Footer>
    </Layout>
  );
}
