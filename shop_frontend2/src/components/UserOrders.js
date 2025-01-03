import React, { useEffect, useState } from 'react';
import axios from 'axios';
const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
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
  
    const fetchOrders = async () => {
      try {
        console.log('Fetching user orders...');
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/v1/orders', {
          headers: getAuthHeaders(),
        });
        console.log('Orders fetched successfully:', response.data);
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
  
    const fetchOrderDetails = async (orderId) => {
      try {
        console.log('Fetching details for order ID:', orderId);
        const response = await axios.get(`http://localhost:3000/api/v1/orders/${orderId}`, {
          headers: getAuthHeaders(),
        });
        console.log('Order details fetched successfully:', response.data);
  
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, details: response.data } : order
          )
        );
      } catch (err) {
        console.error(`Failed to fetch details for order ID ${orderId}:`, err.response?.data || err.message);
        setError(err.response?.data?.error || `Failed to fetch details for order ID ${orderId}`);
      }
    };
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const toggleOrderDetails = (orderId) => {
      if (expandedOrderId === orderId) {
        console.log('Collapsing details for order ID:', orderId);
        setExpandedOrderId(null);
      } else {
        console.log('Expanding details for order ID:', orderId);
        setExpandedOrderId(orderId);
        const order = orders.find((o) => o.id === orderId);
        if (!order?.details) {
          fetchOrderDetails(orderId);
        }
      }
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
  
    return (
      <div>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <div>
                  <strong>Order ID:</strong> {order.id} <br />
                  <strong>Amount:</strong> {order.amount}
                  <button onClick={() => toggleOrderDetails(order.id)} style={{ marginLeft: '10px' }}>
                    {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {expandedOrderId === order.id && (() => {
                  console.log('Checking order details for order ID:', order.id);
                  console.log('Order details:', order.details);
  
                  if (!order.details) {
                    console.warn('Order details are undefined for order ID:', order.id);
                    return null;
                  }
  
                  if (!order.details.order_descriptions) {
                    console.warn('Order descriptions are undefined for order ID:', order.id);
                    return null;
                  }
  
                  console.log('Order descriptions:', order.details.order_descriptions);
  
                  return (
                    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                      <h4>Order Details:</h4>
                      <ul>
                        {order.details.order_descriptions.map((desc) => {
                          console.log('Rendering order description:', desc);
                          return (
                            <li key={desc.id}>
                              <strong>Item Name:</strong> {desc.item?.name || 'N/A'} <br />
                              <strong>Quantity:</strong> {desc.quantity}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })()}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default UserOrders;
  