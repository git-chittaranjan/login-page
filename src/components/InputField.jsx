import React from 'react';

const InputField = ({ label, type = 'text', name, value, onChange, error }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-100">{label}</label>
        <input
            className="mt-1 block w-full px-3 py-2 border rounded"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default InputField;
