import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:3000/api/v1/users', {
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
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`, {
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
        `http://localhost:3000/api/v1/users/${updatedUser.id}`,
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
      <h2>Admin Users Table</h2>
      <table border="1">
        <thead>
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
                    <button onClick={() => handleUpdate(editingUser)}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingUser(user)}>Edit</button>
                    {currentUser.role === 'admin' && (
                      <button onClick={() => handleDelete(user.id)}>Delete</button>
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
