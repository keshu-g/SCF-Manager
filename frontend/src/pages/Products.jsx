import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from '../features/products/productsSlice';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input.jsx';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', stock: '', price: '' });
  const [currentProductId, setCurrentProductId] = useState(null);

  const columns = [
    { key: 'name', title: 'Name', dataIndex: 'name' },
    { key: 'stock', title: 'Stock', dataIndex: 'stock' },
    { key: 'price', title: 'Price', dataIndex: 'price' },
    { key: 'actions', title: 'Actions' },
  ];

  const handleAddClick = () => {
    setEditMode(false);
    setFormData({ name: '', stock: '', price: '' });
    setModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditMode(true);
    setCurrentProductId(product.id);
    setFormData({
      name: product.name,
      stock: product.stock,
      price: product.price,
    });
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateProduct({ id: currentProductId, updatedData: formData }));
    } else {
      dispatch(addProduct(formData));
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={handleAddClick}>Add Product</Button>
      </div>

      <Table
        columns={columns}
        data={products.map((product) => ({
          ...product,
          actions: (
            <div className="flex gap-2">
              <Button className="btn-sm" onClick={() => handleEditClick(product)}>Edit</Button>
              <Button className="btn-sm btn-error" onClick={() => handleDeleteClick(product.id)}>Delete</Button>
            </div>
          ),
        }))}
      />

      {modalOpen && (
        <Modal id="product-modal" title={editMode ? 'Edit Product' : 'Add Product'} onClose={() => setModalOpen(false)}>
          <Input
            label="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
          <Input
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={handleSubmit}>{editMode ? 'Update' : 'Add'}</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Products;
