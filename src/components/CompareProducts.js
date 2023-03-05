import React, { useState } from "react";
import { Table, Button, Modal, Tag, Space } from "antd";
import { Link, useNavigate, useParams, search } from "react-router-dom";

const CompareDetails = (props) => {
  const [selectedProducts, setSelectedProducts] = useState(
    props.selectedProducts
  );
  const [compareProducts, setCompareProducts] = useState(
    props.selectedProducts
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useNavigate();

  const handleRemoveFromCompare = (productId) => {
    const newSelectedProducts = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(newSelectedProducts);
    props.onStateChange(newSelectedProducts);
    setCompareProducts(
      compareProducts.filter((product) => product.id !== productId)
    );
  };

  const handleAddToCompare = (productId) => {
    const productToAdd = props.products.find(
      (product) => product.id === productId
    );
    if (productToAdd) {
      setSelectedProducts([...selectedProducts, productToAdd]);
      setCompareProducts([...compareProducts, productToAdd]);
    }
  };

  const handleCompare = () => {
    const productIds = compareProducts.map((product) => product.id);
    history.push(`/compare/${productIds.join(",")}`);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddProducts = (products) => {
    const productsToAdd = products.filter(
      (product) =>
        !selectedProducts.some(
          (selectedProduct) => selectedProduct.id === product.id
        )
    );
    setSelectedProducts([...selectedProducts, ...productsToAdd]);
    setCompareProducts([...compareProducts, ...productsToAdd]);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title"
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
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (text) => <Tag color="orange">{`${text}% off`}</Tag>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => (
        <img src={text} alt="thumbnail" style={{ height: "50px" }} />
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="danger"
          onClick={() => handleRemoveFromCompare(record.id)}
        >
          Remove
        </Button>
      )
    }
  ];
  const columns2 = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title"
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

  const addProductsModal = (
    <Modal
      title="Add More Products"
      visible={isModalVisible}
      onOk={() => handleModalOk()}
      onCancel={() => handleModalCancel()}
    >
      <Table
        dataSource={props.products}
        columns={columns2}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) =>
            handleAddProducts(selectedRows)
        }}
        pagination={{ pageSize: 5 }}
        scroll={{ y: 400 }}
      />
    </Modal>
  );

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add More Products
      </Button>
      <Table
        dataSource={selectedProducts}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ y: 400 }}
      />
      {addProductsModal}
    </div>
  );
};

export default CompareDetails;
