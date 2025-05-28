import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Export the mockInputRecords constant
export const mockInputRecords = [
    { id: 1, date: '2025-04-01', field: 'Field A', inputType: 'Nitrogen Fertilizer', quantity: '50', quantityUnit: 'kg', unitCost: '1.2', supplier: 'AgriChem Ltd.', applicationMethod: 'Broadcast', applicationTime: '08:00' },
    { id: 2, date: '2025-04-15', field: 'Field A', inputType: 'Pesticide X', quantity: '2', quantityUnit: 'liters', unitCost: '15', supplier: 'CropGuard Inc.', applicationMethod: 'Foliar Spray', applicationTime: '16:30' },
];

function InputManagementPage() {
    const [isAddInputModalOpen, setIsAddInputModalOpen] = useState(false);
    const [selectedInputRecord, setSelectedInputRecord] = useState(null);
    const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
    const addInputFormRef = useRef(null);
    const [errors, setErrors] = useState({});

    const openAddInputModal = () => {
        setIsAddInputModalOpen(true);
    };

    const closeAddInputModal = () => {
        setIsAddInputModalOpen(false);
        setErrors({});
        if (addInputFormRef.current) {
            addInputFormRef.current.reset();
        }
    };

    const openViewDetailsModal = (record) => {
        setSelectedInputRecord(record);
        setIsViewDetailsModalOpen(true);
    };

    const closeViewDetailsModal = () => {
        setIsViewDetailsModalOpen(false);
        setSelectedInputRecord(null);
    };

    const validateForm = (formData) => {
        const newErrors = {};
        if (!formData.get('date')) {
            newErrors.date = 'Date is required';
        }
        if (!formData.get('field')) {
            newErrors.field = 'Field is required';
        }
        if (!formData.get('inputType')) {
            newErrors.inputType = 'Input Type is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveInputRecord = (newRecord) => {
        console.log('New Input Record:', newRecord);
        setMockInputRecords([...mockInputRecords, { ...newRecord, id: Date.now() }]);
        closeAddInputModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (validateForm(formData)) {
            const newRecord = {
                date: formData.get('date'),
                field: formData.get('field'),
                inputType: formData.get('inputType'),
                quantity: formData.get('quantity'),
                quantityUnit: formData.get('quantityUnit'),
                unitCost: formData.get('unitCost'),
                supplier: formData.get('supplier'),
                applicationMethod: formData.get('applicationMethod'),
                applicationTime: formData.get('applicationTime'),
            };
            handleSaveInputRecord(newRecord);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Link to="/dashboard" className="text-green-600 hover:underline mb-4 block">
                ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Input Management</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Input Application Records</h2>
                {mockInputRecords.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-left">Date</th>
                                <th className="py-2 text-left">Field</th>
                                <th className="py-2 text-left">Input Type</th>
                                <th className="py-2 text-left">Quantity</th>
                                <th className="py-2 text-left">Unit Cost</th>
                                <th className="py-2 text-left">Supplier</th>
                                <th className="py-2 text-left">Application Method</th>
                                <th className="py-2 text-left">Time</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInputRecords.map(record => (
                                <tr key={record.id} className="border-b last:border-b-0">
                                    <td className="py-2">{record.date}</td>
                                    <td className="py-2">{record.field}</td>
                                    <td className="py-2">{record.inputType}</td>
                                    <td className="py-2">{record.quantity} {record.quantityUnit}</td>
                                    <td className="py-2">{record.unitCost} $/unit</td>
                                    <td className="py-2">{record.supplier}</td>
                                    <td className="py-2">{record.applicationMethod}</td>
                                    <td className="py-2">{record.applicationTime}</td>
                                    <td className="py-2 text-green-600 hover:underline cursor-pointer" onClick={() => openViewDetailsModal(record)}>View Details</td> {/* Open modal on click */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No input records found.</p>
                )}
                <button onClick={openAddInputModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Add New Input Record
                </button>
            </div>

            {/* Add New Input Record Modal (remains the same) */}
            {isAddInputModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="addInputModal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Input Record</h3>
                        <form ref={addInputFormRef} onSubmit={handleSubmit}>
                            {/* ... (form fields remain the same) ... */}
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={closeAddInputModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Save Input
                                </button>
                            </div>
                        </form>
                        <button type="button" className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700" onClick={closeAddInputModal}>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.031 2.651 3.031 2.651a1.2 1.2 0 0 1 0 1.697z"/></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* View Details Modal */}
            {isViewDetailsModalOpen && selectedInputRecord && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="viewDetailsModal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Input Record Details</h3>
                        {selectedInputRecord && (
                            <div>
                                <p><span className="font-semibold">Date:</span> {selectedInputRecord.date}</p>
                                <p><span className="font-semibold">Field:</span> {selectedInputRecord.field}</p>
                                <p><span className="font-semibold">Input Type:</span> {selectedInputRecord.inputType}</p>
                                <p><span className="font-semibold">Quantity:</span> {selectedInputRecord.quantity} {selectedInputRecord.quantityUnit}</p>
                                <p><span className="font-semibold">Unit Cost:</span> {selectedInputRecord.unitCost} $/unit</p>
                                <p><span className="font-semibold">Supplier:</span> {selectedInputRecord.supplier}</p>
                                <p><span className="font-semibold">Application Method:</span> {selectedInputRecord.applicationMethod}</p>
                                <p><span className="font-semibold">Application Time:</span> {selectedInputRecord.applicationTime}</p>
                                {/* Add more details here if needed */}
                            </div>
                        )}
                        <div className="flex justify-end mt-4">
                            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeViewDetailsModal}>
                                Close
                            </button>
                        </div>
                        <button type="button" className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700" onClick={closeViewDetailsModal}>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.031 2.651 3.031 2.651a1.2 1.2 0 0 1 0 1.697z"/></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InputManagementPage;