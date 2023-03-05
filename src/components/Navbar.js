import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/products">Product Details</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/compare">Compare Products</Link>
        </Menu.Item>
      </Menu>
      <div style={{ float: "right" }}>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default Navbar;
