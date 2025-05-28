import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Export the mockHarvestingRecords constant
export const mockHarvestingRecords = [
    { id: 101, cropType: 'Maize', harvestingDate: '2025-08-10', field: 'Field A', yield: '5.2 tons/hectare', plantingRecordId: 1 },
    { id: 102, cropType: 'Maize', harvestingDate: '2024-08-05', field: 'Field B', yield: '4.8 tons/hectare', plantingRecordId: 2 },
    { id: 103, cropType: 'Maize', harvestingDate: '2023-08-15', field: 'Field A', yield: '5.5 tons/hectare', plantingRecordId: 3 },
];

// Export the mockPlantingRecords constant as well
export const mockPlantingRecords = [
    { id: 1, cropType: 'Maize', plantingDate: '2025-03-20', field: 'Field A', variety: 'Hybrid X (Maize)' },
    { id: 2, cropType: 'Maize', plantingDate: '2024-03-15', field: 'Field B', variety: 'Local Yellow (Maize)' },
    { id: 3, cropType: 'Maize', plantingDate: '2023-03-25', field: 'Field A', variety: 'Drought Resistant (Maize)' },
];

function PlantingHarvestingRecordsPage() {
    const [isAddPlantingModalOpen, setIsAddPlantingModalOpen] = useState(false);
    const [isEditPlantingModalOpen, setIsEditPlantingModalOpen] = useState(false);
    const [editingPlantingRecord, setEditingPlantingRecord] = useState(null);
    const [plantingRecords, setPlantingRecords] = useState([...mockPlantingRecords]); // Use a copy for state

    // State for viewing planting details
    const [isViewPlantingModalOpen, setIsViewPlantingModalOpen] = useState(false);
    const [viewingPlantingRecord, setViewingPlantingRecord] = useState(null);

    // State for harvesting records (using a state variable for modifications)
    const [harvestingRecords, setHarvestingRecords] = useState([...mockHarvestingRecords]);
    const [isAddHarvestingModalOpen, setIsAddHarvestingModalOpen] = useState(false);
    const [editingHarvestingRecord, setEditingHarvestingRecord] = useState(null);
    const [isEditHarvestingModalOpen, setIsEditHarvestingModalOpen] = useState(false);
    const [isViewHarvestingModalOpen, setIsViewHarvestingModalOpen] = useState(false);
    const [viewingHarvestingRecord, setViewingHarvestingRecord] = useState(null);

    const openAddPlantingModal = () => {
        setIsAddPlantingModalOpen(true);
    };
    const closeAddPlantingModal = () => {
        setIsAddPlantingModalOpen(false);
    };

    const openEditPlantingModal = (record) => {
        setEditingPlantingRecord(record);
        setIsEditPlantingModalOpen(true);
    };

    const closeEditPlantingModal = () => {
        setIsEditPlantingModalOpen(false);
        setEditingPlantingRecord(null);
    };

    // Functions for viewing planting details
    const openViewPlantingModal = (record) => {
        setViewingPlantingRecord(record);
        setIsViewPlantingModalOpen(true);
    };

    const closeViewPlantingModal = () => {
        setIsViewPlantingModalOpen(false);
        setViewingPlantingRecord(null);
    };

    // Functions for viewing harvesting details
    const openViewHarvestingModal = (record) => {
        setViewingHarvestingRecord(record);
        setIsViewHarvestingModalOpen(true);
    };

    const closeViewHarvestingModal = () => {
        setIsViewHarvestingModalOpen(false);
        setViewingHarvestingRecord(null);
    };

    const handleEditPlantingRecord = (id) => {
        const recordToEdit = plantingRecords.find(record => record.id === id);
        if (recordToEdit) {
            openEditPlantingModal({ ...recordToEdit });
        }
    };

    const handleSavePlantingRecord = (newRecord) => {
        console.log('New Planting Record:', newRecord);
        setPlantingRecords([...plantingRecords, { ...newRecord, id: Date.now() }]);
        closeAddPlantingModal();
    };

    const handleUpdatePlantingRecord = (updatedRecord) => {
        const updatedRecords = plantingRecords.map(record =>
            record.id === updatedRecord.id ? updatedRecord : record
        );
        setPlantingRecords(updatedRecords);
        closeEditPlantingModal();
        setEditingPlantingRecord(null);
    };

    // Function to handle deleting a planting record
    const handleDeletePlantingRecord = (id) => {
        const updatedRecords = plantingRecords.filter(record => record.id !== id);
        setPlantingRecords(updatedRecords);
        // In a real application, you would also make an API call to delete the record from the database.
    };

    // Harvesting Record Functions
    const openAddHarvestingModal = () => {
        setIsAddHarvestingModalOpen(true);
    };

    const closeAddHarvestingModal = () => {
        setIsAddHarvestingModalOpen(false);
    };

    const openEditHarvestingModal = (record) => {
        setEditingHarvestingRecord(record);
        setIsEditHarvestingModalOpen(true);
    };

    const closeEditHarvestingModal = () => {
        setIsEditHarvestingModalOpen(false);
        setEditingHarvestingRecord(null);
    };

    const handleSaveHarvestingRecord = (newRecord) => {
        setHarvestingRecords([...harvestingRecords, { ...newRecord, id: Date.now() }]);
        closeAddHarvestingModal();
    };

    const handleUpdateHarvestingRecord = (updatedRecord) => {
        const updatedRecords = harvestingRecords.map(record =>
            record.id === updatedRecord.id ? updatedRecord : record
        );
        setHarvestingRecords(updatedRecords);
        closeEditHarvestingModal();
        setEditingHarvestingRecord(null);
    };

    // Function to handle deleting a harvesting record
    const handleDeleteHarvestingRecord = (id) => {
        const updatedRecords = harvestingRecords.filter(record => record.id !== id);
        setHarvestingRecords(updatedRecords);
        // In a real application, you would also make an API call to delete the record from the database.
    };

    const handleEditHarvestingRecord = (id) => {
        const recordToEdit = harvestingRecords.find(record => record.id === id);
        if (recordToEdit) {
            openEditHarvestingModal({ ...recordToEdit });
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Link to="/dashboard" className="text-green-600 hover:underline mb-4 block">
                ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Planting & Harvesting Records</h1>

            {/* Planting Records */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Planting Records</h2>
                {plantingRecords.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-left">Crop Type</th>
                                <th className="py-2 text-left">Planting Date</th>
                                <th className="py-2 text-left">Field</th>
                                <th className="py-2 text-left">Variety</th>
                                <th className="py-2">Actions</th> {/* New Actions Column */}
                            </tr>
                        </thead>
                        <tbody>
                            {plantingRecords.map(record => (
                                <tr key={record.id} className="border-b last:border-b-0">
                                    <td className="py-2">{record.cropType}</td>
                                    <td className="py-2">{record.plantingDate}</td>
                                    <td className="py-2">{record.field}</td>
                                    <td className="py-2">{record.variety}</td>
                                    <td className="py-2 flex space-x-2"> {/* Actions Buttons */}
                                        <button
                                            onClick={() => handleEditPlantingRecord(record.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openViewPlantingModal(record)}
                                            className="text-green-600 hover:underline cursor-pointer text-sm"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleDeletePlantingRecord(record.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No planting records found.</p>
                )}
                <button onClick={openAddPlantingModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Add New Planting Record
                </button>
            </div>

            {/* Harvesting Records */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Harvesting Records</h2>
                {harvestingRecords.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-left">Crop Type</th>
                                <th className="py-2 text-left">Harvesting Date</th>
                                <th className="py-2 text-left">Field</th>
                                <th className="py-2 text-left">Yield</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {harvestingRecords.map(record => (
                                <tr key={record.id} className="border-b last:border-b-0">
                                    <td className="py-2">{record.cropType}</td>
                                    <td className="py-2">{record.harvestingDate}</td>
                                    <td className="py-2">{record.field}</td>
                                    <td className="py-2">{record.yield}</td>
                                    <td className="py-2 flex space-x-2">
                                        <button
                                            onClick={() => openViewHarvestingModal(record)}
                                            className="text-green-600 hover:underline cursor-pointer text-sm"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleEditHarvestingRecord(record.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteHarvestingRecord(record.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No harvesting records found.</p>
                )}
                <button onClick={openAddHarvestingModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Add New Harvesting Record
                </button>
            </div>

            {/* Add New Planting Record Modal */}
            {isAddPlantingModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="addPlantingModal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Planting Record</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const newRecord = {
                                cropType: formData.get('cropType'),
                                plantingDate: formData.get('plantingDate'),
                                field: formData.get('field'),
                                variety: formData.get('variety'),
                                plantingMethod: formData.get('plantingMethod'),
                                rowSpacing: formData.get('rowSpacing'),
                                seedSpacing: formData.get('seedSpacing'),
                                seedsPerHill: formData.get('seedsPerHill'),
                                notes: formData.get('notes'),
                            };
                            handleSavePlantingRecord(newRecord);
                        }}>
                            <div className="mb-4">
                                <label htmlFor="add-cropType" className="block text-gray-700 text-sm font-bold mb-2">Crop Type</label>
                                <input type="text" id="add-cropType" name="cropType" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue="Maize" readOnly />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-plantingDate" className="block text-gray-700 text-sm font-bold mb-2">Planting Date</label>
                                <input type="date" id="add-plantingDate" name="plantingDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-field" className="block text-gray-700 text-sm font-bold mb-2">Field</label>
                                <input type="text" id="add-field" name="field" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-variety" className="block text-gray-700 text-sm font-bold mb-2">Variety</label>
                                <input type="text" id="add-variety" name="variety" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                " />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-plantingMethod" className="block text-gray-700 text-sm font-bold mb-2">Planting Method</label>
                                <select id="add-plantingMethod" name="plantingMethod" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="manual">Manual</option>
                                    <option value="mechanized">Mechanized</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-rowSpacing" className="block text-gray-700 text-sm font-bold mb-2">Row Spacing (cm)</label>
                                <input type="number" id="add-rowSpacing" name="rowSpacing" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-seedSpacing" className="block text-gray-700 text-sm font-bold mb-2">Seed Spacing (cm)</label>
                                <input type="number" id="add-seedSpacing" name="seedSpacing" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-seedsPerHill" className="block text-gray-700 text-sm font-bold mb-2">Seeds Per Hill</label>
                                <input type="number" id="add-seedsPerHill" name="seedsPerHill" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-notes" className="block text-gray-700 text-sm font-bold mb-2">Notes</label>
                                <textarea id="add-notes" name="notes" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={closeAddPlantingModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Save Planting
                                </button>
                            </div>
                        </form>
                        <button type="button" className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700" onClick={closeAddPlantingModal}>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.031 2.651 3.031 2.651a1.2 1.2 0 0 1 0 1.697z"/></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Planting Record Modal */}
            {isEditPlantingModalOpen && editingPlantingRecord && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="editPlantingModal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Edit Planting Record</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const updatedRecord = {
                                id: editingPlantingRecord.id,
                                cropType: formData.get('cropType'),
                                plantingDate: formData.get('plantingDate'),
                                field: formData.get('field'),
                                variety: formData.get('variety'),
                                plantingMethod: formData.get('plantingMethod'),
                                rowSpacing: formData.get('rowSpacing'),
                                seedSpacing: formData.get('seedSpacing'),
                                seedsPerHill: formData.get('seedsPerHill'),
                                notes: formData.get('notes'),
                            };
                            handleUpdatePlantingRecord(updatedRecord);
                        }}>
                            <div className="mb-4">
                                <label htmlFor="edit-cropType" className="block text-gray-700 text-sm font-bold mb-2">Crop Type</label>
                                <input type="text" id="edit-cropType" name="cropType" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.cropType} readOnly />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="edit-plantingDate" className="block text-gray-700 text-sm font-bold mb-2">Planting Date</label>
                                <input type="date" id="edit-plantingDate" name="plantingDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.plantingDate} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="edit-field" className="block text-gray-700 text-sm font-bold mb-2">Field</label>
                                <input type="text" id="edit-field" name="field" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.field} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="edit-variety" className="block text-gray-700 text-sm font-bold mb-2">Variety</label>
                                <input type="text" id="edit-variety" name="variety" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.variety} />
                            </div>
                            {editingPlantingRecord.plantingMethod !== undefined && (
                                <div className="mb-4">
                                    <label htmlFor="edit-plantingMethod" className="block text-gray-700 text-sm font-bold mb-2">Planting Method</label>
                                    <select id="edit-plantingMethod" name="plantingMethod" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.plantingMethod}>
                                        <option value="manual">Manual</option>
                                        <option value="mechanized">Mechanized</option>
                                    </select>
                                </div>
                            )}
                            {editingPlantingRecord.rowSpacing !== undefined && (
                                <div className="mb-4">
                                    <label htmlFor="edit-rowSpacing" className="block text-gray-700 text-sm font-bold mb-2">Row Spacing (cm)</label>
                                    <input type="number" id="edit-rowSpacing" name="rowSpacing" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.rowSpacing} />
                                </div>
                            )}
                            {editingPlantingRecord.seedSpacing !== undefined && (
                                <div className="mb-4">
                                    <label htmlFor="edit-seedSpacing" className="block text-gray-700 text-sm font-bold mb-2">Seed Spacing (cm)</label>
                                    <input type="number" id="edit-seedSpacing" name="seedSpacing" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.seedSpacing} />
                                </div>
                            )}
                            {editingPlantingRecord.seedsPerHill !== undefined && (
                                <div className="mb-4">
                                    <label htmlFor="edit-seedsPerHill" className="block text-gray-700 text-sm font-bold mb-2">Seeds Per Hill</label>
                                    <input type="number" id="edit-seedsPerHill" name="seedsPerHill" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.seedsPerHill} />
                                </div>
                            )}
                            {editingPlantingRecord.notes !== undefined && (
                                <div className="mb-4">
                                    <label htmlFor="edit-notes" className="block text-gray-700 text-sm font-bold mb-2">Notes</label>
                                    <textarea id="edit-notes" name="notes" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingPlantingRecord.notes}></textarea>
                                </div>
                            )}
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={closeEditPlantingModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                        <button type="button" className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700" onClick={closeEditPlantingModal}>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.031 2.651 3.031 2.651a1.2 1.2 0 0 1 0 1.697z"/></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* View Planting Record Modal */}
            {isViewPlantingModalOpen && viewingPlantingRecord && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="viewPlantingModal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Planting Record Details</h3>
                        <div>
                            <p><strong>Crop Type:</strong> {viewingPlantingRecord.cropType}</p>
                            <p><strong>Planting Date:</strong> {viewingPlantingRecord.plantingDate}</p>
                            <p><strong>Field:</strong> {viewingPlantingRecord.field}</p>
                            <p><strong>Variety:</strong> {viewingPlantingRecord.variety}</p>
                            {viewingPlantingRecord.plantingMethod && <p><strong>Planting Method:</strong> {viewingPlantingRecord.plantingMethod}</p>}
                            {viewingPlantingRecord.rowSpacing && <p><strong>Row Spacing:</strong> {viewingPlantingRecord.rowSpacing} cm</p>}
                            {viewingPlantingRecord.seedSpacing && <p><strong>Seed Spacing:</strong> {viewingPlantingRecord.seedSpacing} cm</p>}
                            {viewingPlantingRecord.seedsPerHill && <p><strong>Seeds Per Hill:</strong> {viewingPlantingRecord.seedsPerHill}</p>}
                            {viewingPlantingRecord.notes && <p><strong>Notes:</strong> {viewingPlantingRecord.notes}</p>}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeViewPlantingModal}>
                                Close
                            </button>
                        </div>
                        <button type="button" className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700" onClick={closeViewPlantingModal}>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.031 2.651 3.031 2.651a1.2 1.2 0 0 1 0 1.697z"/></svg>
                        </button>
                    </div>
                </div>
            )}
            {/* View Harvesting Record Modal */}
            {isViewHarvestingModalOpen && viewingHarvestingRecord && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="viewHarvestingModal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Harvesting Record Details</h3>
                        <div>
                        <p><strong>Crop Type:</strong> {viewingHarvestingRecord.cropType}</p>
                            <p><strong>Harvesting Date:</strong> {viewingHarvestingRecord.harvestingDate}</p>
                            <p><strong>Field:</strong> {viewingHarvestingRecord.field}</p>
                            <p><strong>Yield:</strong> {viewingHarvestingRecord.yield}</p>
                            {viewingHarvestingRecord.plantingRecordId && <p><strong>Planting Record ID:</strong> {viewingHarvestingRecord.plantingRecordId}</p>}
                            {/* You can add more details here if your mockHarvestingRecords have them */}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeViewHarvestingModal}>
                                Close
                            </button>
                        </div>
                        <button type="button" className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700" onClick={closeViewHarvestingModal}>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.031 2.651 3.031 2.651a1.2 1.2 0 0 1 0 1.697z"/></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Add New Harvesting Record Modal */}
            {isAddHarvestingModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="addHarvestingModal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Harvesting Record</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const newRecord = {
                                cropType: formData.get('cropType'),
                                harvestingDate: formData.get('harvestingDate'),
                                field: formData.get('field'),
                                yield: formData.get('yield'),
                                plantingRecordId: formData.get('plantingRecordId'),
                                // Add more fields as necessary
                            };
                            handleSaveHarvestingRecord(newRecord);
                        }}>
                            <div className="mb-4">
                                <label htmlFor="add-harvesting-cropType" className="block text-gray-700 text-sm font-bold mb-2">Crop Type</label>
                                <input type="text" id="add-harvesting-cropType" name="cropType" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue="Maize" readOnly />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-harvesting-date" className="block text-gray-700 text-sm font-bold mb-2">Harvesting Date</label>
                                <input type="date" id="add-harvesting-date" name="harvestingDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-harvesting-field" className="block text-gray-700 text-sm font-bold mb-2">Field</label>
                                <input type="text" id="add-harvesting-field" name="field" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-harvesting-yield" className="block text-gray-700 text-sm font-bold mb-2">Yield</label>
                                <input type="text" id="add-harvesting-yield" name="yield" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="add-plantingRecordId" className="block text-gray-700 text-sm font-bold mb-2">Planting Record ID</label>
                                <input type="number" id="add-plantingRecordId" name="plantingRecordId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            {/* Add more fields as necessary */}
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={closeAddHarvestingModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Save Harvesting
                                </button>
                            </div>
                        </form>
                        <button type="button" className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700" onClick={closeAddHarvestingModal}>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.031 2.651 3.031 2.651a1.2 1.2 0 0 1 0 1.697z"/></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Harvesting Record Modal */}
            {isEditHarvestingModalOpen && editingHarvestingRecord && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="editHarvestingModal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Edit Harvesting Record</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const updatedRecord = {
                                id: editingHarvestingRecord.id,
                                cropType: formData.get('cropType'),
                                harvestingDate: formData.get('harvestingDate'),
                                field: formData.get('field'),
                                yield: formData.get('yield'),
                                plantingRecordId: formData.get('plantingRecordId'),
                                // Update other fields as necessary
                            };
                            handleUpdateHarvestingRecord(updatedRecord);
                        }}>
                            <div className="mb-4">
                                <label htmlFor="edit-harvesting-cropType" className="block text-gray-700 text-sm font-bold mb-2">Crop Type</label>
                                <input type="text" id="edit-harvesting-cropType" name="cropType" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingHarvestingRecord.cropType} readOnly />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="edit-harvesting-date" className="block text-gray-700 text-sm font-bold mb-2">Harvesting Date</label>
                                <input type="date" id="edit-harvesting-date" name="harvestingDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingHarvestingRecord.harvestingDate} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="edit-harvesting-field" className="block text-gray-700 text-sm font-bold mb-2">Field</label>
                                <input type="text" id="edit-harvesting-field" name="field" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingHarvestingRecord.field} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="edit-harvesting-yield" className="block text-gray-700 text-sm font-bold mb-2">Yield</label>
                                <input type="text" id="edit-harvesting-yield" name="yield" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingHarvestingRecord.yield} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="edit-plantingRecordId" className="block text-gray-700 text-sm font-bold mb-2">Planting Record ID</label>
                                <input type="number" id="edit-plantingRecordId" name="plantingRecordId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={editingHarvestingRecord.plantingRecordId} />
                            </div>
                            {/* Add more fields as necessary */}
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={closeEditHarvestingModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                        <button type="button" className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700" onClick={closeEditHarvestingModal}>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.031 2.651 3.031 2.651a1.2 1.2 0 0 1 0 1.697z"/></svg>
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default PlantingHarvestingRecordsPage;