// UserManagementPage.tsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

interface User {
    id: number;
    name: string;
    email: string;
    joinDate: string;
    role: string;
}

function UserManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'John Doe', email: 'johndoe@email.com', joinDate: '2024-01-01', role: 'User' },
        { id: 2, name: 'Alice Bob', email: 'alice@email.com', joinDate: '2023-12-20', role: 'Admin' },
    ]);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: '', email: '', joinDate: '', role: '' });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };

    const handleAddUser = () => {
        if (!newUser.name || !newUser.email || !newUser.joinDate || !newUser.role) return;
        const id = users.length ? users[users.length - 1].id + 1 : 1;
        setUsers(prev => [...prev, { id, ...newUser }]);
        setNewUser({ name: '', email: '', joinDate: '', role: '' });
        setIsAddUserModalOpen(false);
    };

    const openEditUserModal = (user: User) => {
        setUserToEdit({ ...user });
        setIsEditUserModalOpen(true);
    };

    const handleEditUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (userToEdit) setUserToEdit({ ...userToEdit, [name]: value });
    };

    const handleUpdateUser = () => {
        if (!userToEdit) return;
        setUsers(prev => prev.map(user => user.id === userToEdit.id ? userToEdit : user));
        setUserToEdit(null);
        setIsEditUserModalOpen(false);
    };

    const handleDeleteUser = (id: number) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-md shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-2.5 text-gray-500" />
                        <input
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            className="pl-10 py-2 px-3 border rounded-md text-sm"
                        />
                    </div>
                    <button onClick={() => setIsAddUserModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded-md text-sm flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add User
                    </button>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 text-sm">{user.name}</td>
                                <td className="px-6 py-4 text-sm">{user.email}</td>
                                <td className="px-6 py-4 text-sm">{user.joinDate}</td>
                                <td className="px-6 py-4 text-sm">{user.role}</td>
                                <td className="px-6 py-4 text-sm text-right space-x-2">
                                    <button onClick={() => openEditUserModal(user)} className="text-indigo-600 hover:text-indigo-900">
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {isAddUserModalOpen && (
                <Modal title="Add User" onClose={() => setIsAddUserModalOpen(false)} onSave={handleAddUser}>
                    <UserForm user={newUser} onChange={handleNewUserInputChange} />
                </Modal>
            )}

            {/* Edit User Modal */}
            {isEditUserModalOpen && userToEdit && (
                <Modal title="Edit User" onClose={() => setIsEditUserModalOpen(false)} onSave={handleUpdateUser}>
                    <UserForm user={userToEdit} onChange={handleEditUserInputChange} />
                </Modal>
            )}
        </div>
    );
}

const Modal = ({ title, onClose, onSave, children }: any) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
            <div className="mt-4 flex justify-end space-x-2">
                <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
                <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
        </div>
    </div>
);

const UserForm = ({ user, onChange }: { user: any, onChange: any }) => (
    <>
        <div className="mb-2">
            <label className="block text-sm">Name</label>
            <input name="name" value={user.name} onChange={onChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-2">
            <label className="block text-sm">Email</label>
            <input name="email" value={user.email} onChange={onChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-2">
            <label className="block text-sm">Join Date</label>
            <input type="date" name="joinDate" value={user.joinDate} onChange={onChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-2">
            <label className="block text-sm">Role</label>
            <select name="role" value={user.role} onChange={onChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
        </div>
    </>
);

export default UserManagementPage;
