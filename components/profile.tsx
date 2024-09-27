'use client'

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function ProfileComponent() {
  const [skills, setSkills] = useState(['Finance', 'Risk Management', 'Market Research']);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const taskHistory = [
    { id: 1, title: 'Financial Analysis', date: '2023-07-15', feedback: 'Excellent work' },
    { id: 2, title: 'Risk Assessment', date: '2023-07-18', feedback: 'Thorough analysis' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-[#00338D] text-white p-6">
          <h1 className="text-2xl font-bold">Contributor Profile</h1>
        </header>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#00338D]">Profile Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="Senior Consultant" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="Advisory" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="john.doe@kpmg.com" />
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#00338D]">Skills and Expertise</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span key={index} className="bg-[#0091DA] text-white px-3 py-1 rounded-full text-sm flex items-center">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-2 focus:outline-none">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                className="flex-grow border-gray-300 rounded-l-md shadow-sm"
                placeholder="Add a new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button
                onClick={addSkill}
                className="bg-[#005EB8] text-white px-4 py-2 rounded-r-md hover:bg-[#00338D] transition duration-200"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#00338D]">Task History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {taskHistory.map((task) => (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{task.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{task.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
