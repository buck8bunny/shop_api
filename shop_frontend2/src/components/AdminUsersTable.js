import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получить токены из localStorage и настроить заголовки
  const getAuthHeaders = () => {
    const authHeaders = JSON.parse(localStorage.getItem('authHeaders'));
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

  // Получить текущего пользователя из localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setCurrentUser(user);
  }, []);

  // Получить список пользователей
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/v1/users`, {
          headers: getAuthHeaders(),
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Удалить пользователя
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/v1/users/${id}`, {
        headers: getAuthHeaders(),
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Failed to delete user:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to delete user');
    }
  };

  // Обновить пользователя
  const handleUpdate = async (updatedUser) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/users/${updatedUser.id}`,
        updatedUser,
        { headers: getAuthHeaders() }
      );
      setUsers(users.map((user) => (user.id === updatedUser.id ? response.data.user : user)));
      setEditingUser(null);
    } catch (err) {
      console.error('Failed to update user:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to update user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {currentUser.role === 'admin' ? (
      <h2 className="text-center mb-4">Admin Panel</h2>
    ) : (
      <h2 className="text-center mb-4">Your profile data</h2>
    )}
      <table className="table table-striped table-hover">
  <thead className="thead-dark">
    <tr>
      <th>Email</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>
          {editingUser && editingUser.id === user.id ? (
            <input
              type="text"
              className="form-control"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
          ) : (
            user.email
          )}
        </td>
        <td>
          {editingUser && editingUser.id === user.id ? (
            <input
              type="text"
              className="form-control"
              value={editingUser.first_name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, first_name: e.target.value })
              }
            />
          ) : (
            user.first_name
          )}
        </td>
        <td>
          {editingUser && editingUser.id === user.id ? (
            <input
              type="text"
              className="form-control"
              value={editingUser.last_name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, last_name: e.target.value })
              }
            />
          ) : (
            user.last_name
          )}
        </td>
        <td>
          {currentUser.role === 'admin' && editingUser && editingUser.id === user.id ? (
            <select
              className="form-select"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            user.role
          )}
        </td>
        <td>
          {editingUser && editingUser.id === user.id ? (
            <>
              <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(editingUser)}>
                Save
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary btn-sm me-2" onClick={() => setEditingUser(user)}>
                Edit
              </button>
              {currentUser.role === 'admin' && (
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              )}
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default AdminUsersTable;
