import React, { useState } from "react";
import { Table, Button, Modal, Tag, Space, message } from "antd";
import { Link } from "react-router-dom";

const ProductDetails = (props) => {
  const [selectedProducts, SetselectedProducts] = useState(
    props.selectedProducts
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleAddToCompare = (productId) => {
    if (selectedProducts.length >= 4) {
      message.warning("Cannot compare more than 4 products");
      return;
    }

    const selectedProduct = props.products.find(
      (product) => product.id === productId
    );

    const newSelectedProducts = [...selectedProducts, selectedProduct];
    SetselectedProducts(newSelectedProducts);
    props.onStateChange(newSelectedProducts);
    // window.location.href = `/compare`;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
      // render: (text, record) => (
      //   <Space size="middle">
      //     <Link to={`/product/${record.id}`}>{text}</Link>
      //   </Space>
      // )
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag color="geekblue">{text}</Tag>
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <Tag color="green">{`$${text}`}</Tag>
    },
    {
      title: "Compare",
      key: "compare",
      render: (text, record) => (
        <Button
          type="primary"
          disabled={selectedProducts.length >= 4}
          onClick={() => handleAddToCompare(record.id)}
        >
          {console.log(record.id)}
          {props.products.some((p) => p.id === record.id)
            ? "Added"
            : "Add to Compare"}
        </Button>
      )
    }
  ];

  const data = props.products.map((product) => {
    return {
      key: product.id,
      id: product.id,
      disccription: product.description,
      name: product.title,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      brand: product.brand,
      category: product.category,
      price: product.price,
      thumbnail: product.thumbnail
    };
  });

  return (
    <div>
      {console.log("->", selectedProducts)}
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />

      <Modal
        title="Add More Products"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  );
};
export default ProductDetails;
