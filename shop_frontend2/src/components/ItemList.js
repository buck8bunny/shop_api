import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('/items');
        setItems(response.data);
      } catch (error) {
        alert('Failed to load items');
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;