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
  
    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;
  
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <div className="alert alert-warning text-center">You have no orders.</div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div className="col-md-6 mb-4" key={order.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order.id}</h5>
                    <p className="card-text">
                      <strong>Amount:</strong> {order.amount} $
                    </p>
                    <button
                      className={`btn btn-${expandedOrderId === order.id ? 'secondary' : 'primary'}`}
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                  {expandedOrderId === order.id && order.details && (
                    <div className="card-footer">
                      <h6>Order Details:</h6>
                      <ul className="list-group list-group-flush">
                        {order.details.order_descriptions.map((desc) => (
                          <li className="list-group-item" key={desc.id}>
                            <strong>Item:</strong> {desc.item?.name || 'N/A'} <br />
                            <strong>Quantity:</strong> {desc.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  export default UserOrders;
  