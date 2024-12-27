import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders');
        setOrders(response.data);
      } catch (error) {
        alert('Failed to load orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - Total: ${order.amount}
            <ul>
              {order.order_descriptions.map((desc) => (
                <li key={desc.id}>
                  Item #{desc.item_id} - Quantity: {desc.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;