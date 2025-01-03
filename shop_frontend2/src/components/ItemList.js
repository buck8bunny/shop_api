import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemsTable = () => {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const getAuthHeaders = () => {
    const authHeaders = JSON.parse(localStorage.getItem('authHeaders'));
    console.log('Auth Headers:', authHeaders);
    if (!authHeaders) {
      console.error('No auth headers found!');
      return {};
    }

    return {
      'Content-Type': 'application/json',
      'access-token': authHeaders['access-token'],
      client: authHeaders.client,
      uid: authHeaders.uid,
    };
  };

  const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Current User from localStorage:', user);
    return user?.id || null;
  };

  const fetchCurrentUser = async () => {
    const userId = getCurrentUserId();
    console.log('Fetching current user with ID:', userId);
    if (!userId) {
      console.error('No user ID found in localStorage');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`, {
        headers: getAuthHeaders(),
      });
      console.log('Current User Response:', response.data);
      setCurrentUser(response.data);
    } catch (err) {
      console.error('Failed to fetch current user:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to fetch current user');
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      console.log('Fetching items...');
      const response = await axios.get('http://localhost:3000/api/v1/items', {
        headers: getAuthHeaders(),
      });
      console.log('Items Response:', response.data);
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch items:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    console.log('Adding new item:', newItem);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/items',
        newItem,
        { headers: getAuthHeaders() }
      );
      console.log('Add Item Response:', response.data);
      setItems([...items, response.data]);
      setNewItem({ name: '', description: '', price: '' });
    } catch (err) {
      console.error('Failed to add item:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to add item');
    }
  };

  const handleDeleteItem = async (id) => {
    console.log('Deleting item with ID:', id);
    try {
      await axios.delete(`http://localhost:3000/api/v1/items/${id}`, {
        headers: getAuthHeaders(),
      });
      console.log('Item deleted successfully');
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to delete item:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to delete item');
    }
  };

  const handleEditItem = async () => {
  console.log('Editing item:', editingItem);
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/items/${editingItem.id}`,
      editingItem,
      { headers: getAuthHeaders() }
    );
    console.log('Edit Item Response:', response.data);

    // Обновляем состояние items
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editingItem.id ? response.data.item : item
      )
    );
    


    // Сброс редактируемого элемента
    setEditingItem(null);
  } catch (err) {
    console.error('Failed to edit item:', err.response?.data || err.message);
    setError(err.response?.data?.error || 'Failed to edit item');
  }
};

  
  

  const handleAddToCart = (item, quantity) => {
    console.log('Adding to cart:', item, 'Quantity:', quantity);
  
    if (quantity <= 0) {
      alert("Quantity must be at least 1");
      return;
    }
  
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity } // Заменяем количество
        : cartItem
    );
  
    // Если товар отсутствует в корзине, добавляем его
    if (!updatedCart.find((cartItem) => cartItem.id === item.id)) {
      updatedCart.push({ ...item, quantity });
    }
  
    setCart(updatedCart);
  };
  

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    try {
      console.log("Initiating checkout with cart:", cart);
  
      const orderResponse = await axios.post(
        'http://localhost:3000/api/v1/orders',
        { user_id: currentUser.id, amount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) },
        { headers: getAuthHeaders() }
      );
  
      console.log("Order Response:", orderResponse.data);
  
      const orderId = orderResponse.data.order?.id; // Проверка вложенности
      if (!orderId) {
        console.error("Order ID is undefined in response");
        return;
      }
  
      await Promise.all(
        cart.map((item) => {
          const payload = {
            order_id: orderId,
            item_id: item.id,
            quantity: item.quantity,
          };
          console.log("Order Description Payload:", payload);
  
          return axios.post(
            'http://localhost:3000/api/v1/order_descriptions',
            payload,
            { headers: getAuthHeaders() }
          );
        })
      );
  
      alert('Order placed successfully!');
      setCart([]);
    } catch (err) {
      console.error('Failed to place order:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to place order');
    }
  };
  

  useEffect(() => {
    fetchCurrentUser();
    fetchItems();
  }, []);

  const filteredItems = (items || []).filter(
    (item) =>
      item.name &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Items Table</h2>
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {currentUser?.role === 'admin' && (
        <div>
          <h3>Add New Item</h3>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      )}

{editingItem && (
  <div>
    <h3>Edit Item</h3>
    <input
      type="text"
      placeholder="Name"
      value={editingItem.name}
      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
    />
    <input
      type="text"
      placeholder="Description"
      value={editingItem.description}
      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
    />
    <input
      type="number"
      placeholder="Price"
      value={editingItem.price}
      onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
    />
    <button onClick={handleEditItem}>Save Changes</button>
    <button onClick={() => setEditingItem(null)}>Cancel</button>
  </div>
)}


      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            {currentUser?.role === 'user' && <th>Quantity</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              {currentUser?.role === 'user' && (
                <td>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    onChange={(e) =>
                      handleAddToCart(item, parseInt(e.target.value) || 1)
                    }
                  />
                </td>
              )}

              
              <td>
                {currentUser?.role === 'admin' && (
                  <>
                    <button onClick={() => setEditingItem(item)}>Edit</button>
                    <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                  </>
                )}
                {currentUser?.role === 'user' && (
                  <button onClick={() => handleAddToCart(item, 1)}>Add to Cart</button>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {currentUser?.role === 'user' && cart.length > 0 && (
        <div>
        <h3>Your Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - 
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  handleAddToCart(item, parseInt(e.target.value) || 1)
                }
              />
              x {item.price}
            </li>
          ))}
        </ul>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
      
      )}

      
    </div>
  );
};

export default ItemsTable;
