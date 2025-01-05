import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
   // Функция для получения заголовков авторизации
    const getAuthHeaders = () => {
      // Извлекаем заголовки авторизации из локального хранилища
      const authHeaders = JSON.parse(localStorage.getItem('authHeaders'));
      console.log('Auth Headers:', authHeaders);

      // Если заголовки отсутствуют, выводим сообщение об ошибке
      if (!authHeaders) {
        console.error('No auth headers found!');
        return {};
      }

      // Возвращаем объект с необходимыми заголовками для авторизации
      return {
        'Content-Type': 'application/json', // Указываем тип содержимого
        'access-token': authHeaders['access-token'], // Токен доступа
        client: authHeaders.client, // Идентификатор клиента
        uid: authHeaders.uid, // Идентификатор пользователя
      };
    };

    // Функция для получения списка заказов
    const fetchOrders = async () => {
      try {
        console.log('Fetching user orders...'); // Логируем начало загрузки заказов
        setLoading(true); // Устанавливаем состояние загрузки в true

        // Отправляем GET-запрос на сервер для получения заказов
        const response = await axios.get(`${API_URL}/api/v1/orders`, {
          headers: getAuthHeaders(), // Передаем заголовки авторизации
        });

        console.log('Orders fetched successfully:', response.data); // Логируем успешный ответ
        setOrders(response.data); // Сохраняем полученные заказы в состоянии
      } catch (err) {
        // Обрабатываем ошибку при запросе
        console.error('Failed to fetch orders:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Failed to fetch orders'); // Устанавливаем сообщение об ошибке
      } finally {
        setLoading(false); // Завершаем состояние загрузки
      }
    };

    // Функция для получения деталей конкретного заказа
    const fetchOrderDetails = async (orderId) => {
      try {
        console.log('Fetching details for order ID:', orderId); // Логируем начало запроса деталей заказа

        // Отправляем GET-запрос для получения деталей конкретного заказа
        const response = await axios.get(`${API_URL}/api/v1/orders/${orderId}`, {
          headers: getAuthHeaders(), // Передаем заголовки авторизации
        });

        console.log('Order details fetched successfully:', response.data); // Логируем успешный ответ

        // Обновляем состояние заказов, добавляя детали для указанного заказа
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, details: response.data } : order
          )
        );
      } catch (err) {
        // Обрабатываем ошибку при запросе деталей заказа
        console.error(`Failed to fetch details for order ID ${orderId}:`, err.response?.data || err.message);
        setError(err.response?.data?.error || `Failed to fetch details for order ID ${orderId}`); // Устанавливаем сообщение об ошибке
      }
    };

    // Используем useEffect для загрузки заказов при первом рендере компонента
    useEffect(() => {
      fetchOrders(); // Вызываем функцию загрузки заказов
    }, []);

    // Функция для переключения состояния отображения деталей заказа
    const toggleOrderDetails = (orderId) => {
      if (expandedOrderId === orderId) {
        // Если детали уже открыты, скрываем их
        console.log('Collapsing details for order ID:', orderId);
        setExpandedOrderId(null); // Сбрасываем состояние ID раскрытого заказа
      } else {
        // Если детали закрыты, открываем их
        console.log('Expanding details for order ID:', orderId);
        setExpandedOrderId(orderId); // Устанавливаем ID раскрытого заказа

        // Проверяем, были ли уже загружены детали
        const order = orders.find((o) => o.id === orderId);
        if (!order?.details) {
          // Если детали не загружены, выполняем запрос
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
  