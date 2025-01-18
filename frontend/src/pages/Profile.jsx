import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, logout, updateUsername } = useAuth(); // Assuming you have user info in context
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${user.id}`, // Assuming the backend supports this endpoint
        {
          username,
          password: password || undefined, // Update password only if provided
        },
        { withCredentials: true }
      );
      updateUsername(username);
      // const response = await axios.get(`http://localhost:8080/api/users/email/${user.email}`, { withCredentials: true });
      console.log(response.data);
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src="https://via.placeholder.com/150" // Placeholder image
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            {editing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded px-3 py-1"
              />
            ) : (
              username
            )}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      {editing && (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default Profile;
