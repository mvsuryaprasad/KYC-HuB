import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  LineChartOutlined,
  BarChartOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          <Link to="/">Product Details</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LineChartOutlined />}>
          <Link to="/compare">Compare Products</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BarChartOutlined />}>
          <Link to="/cart">
            <span>Cart</span>
            <span style={{ float: "right" }}>
              <ShoppingCartOutlined />
            </span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
