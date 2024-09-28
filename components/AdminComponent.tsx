'use client'

import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSettingsScreen: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Proposal Coordinator' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Contributor' },
  ]);

  const [taskTemplates, setTaskTemplates] = useState([
    { id: 1, name: 'Financial Analysis', description: 'Conduct a comprehensive financial analysis' },
    { id: 2, name: 'Market Research', description: 'Perform in-depth market research and analysis' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'contributor', password: '' });
  const [newTemplate, setNewTemplate] = useState({ name: '', description: '' });

  const addUser = async () => {
    if (newUser.name && newUser.email && newUser.password) {
      try {
        const response = await fetch('/api/create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to create user');
        }

        setUsers([...users, result.user]);
        setNewUser({ name: '', email: '', role: 'contributor', password: '' });
        toast.success('User added successfully!');
      } catch (error) {
        console.error('Error creating user:', error);
        toast.error(`Failed to create user: ${error.message}`);
      }
    } else {
      toast.warn('Please fill in all required fields.');
    }
  };

  const addTemplate = () => {
    if (newTemplate.name && newTemplate.description) {
      setTaskTemplates([...taskTemplates, { ...newTemplate, id: taskTemplates.length + 1 }]);
      setNewTemplate({ name: '', description: '' });
      toast.success('Template added successfully!');
    } else {
      toast.warn('Please fill in all template fields.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-[#00338D] text-white p-6">
          <h1 className="text-2xl font-bold">Admin Settings</h1>
        </header>
        
        <div className="p-6">
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-[#00338D]">User Management</h2>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border-gray-300 rounded-md shadow-sm p-1"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                className="border-gray-300 rounded-md shadow-sm p-1"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Password"
                className="border-gray-300 rounded-md shadow-sm p-1"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              />
              <select
                className="border-gray-300 rounded-md shadow-sm"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="contributor">Contributor</option>
                <option value="coordinator">Proposal Coordinator</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={addUser}
                className="bg-[#005EB8] text-white px-4 py-2 rounded-md hover:bg-[#00338D] transition duration-200 flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" /> Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-[#005EB8] hover:text-[#00338D] mr-2">
                          <Edit size={18} />
                        </button>
                        <button className="text-[#470A68] hover:text-[#483698]">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#00338D]">Task Template Library</h2>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Template Name"
                className="border-gray-300 rounded-md shadow-sm"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Description"
                className="border-gray-300 rounded-md shadow-sm"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
              />
              <button
                onClick={addTemplate}
                className="bg-[#005EB8] text-white px-4 py-2 rounded-md hover:bg-[#00338D] transition duration-200 flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" /> Add Template
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {taskTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="flex justify-end">
                    <button className="text-[#005EB8] hover:text-[#00338D] mr-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-[#470A68] hover:text-[#483698]">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsScreen;