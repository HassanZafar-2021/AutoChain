import React, { useState } from 'react';

type ClusterNetwork = 'Devnet' | 'Testnet' | 'Mainnet';

interface Cluster {
  name: string;
  network?: ClusterNetwork;
  endpoint: string;
}

interface AddClusterModalProps {
  onClose: () => void;
  onAdd: (cluster: Omit<Cluster, 'active'>) => void;
}

export function AddClusterModal({ onClose, onAdd }: AddClusterModalProps) {
  const [name, setName] = useState('');
  const [network, setNetwork] = useState<ClusterNetwork | ''>('');
  const [endpoint, setEndpoint] = useState('');

  const handleAdd = () => {
    if (name && endpoint) {
      onAdd({ name, network: network || undefined, endpoint });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add Cluster</h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Endpoint"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />

          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={network}
            onChange={(e) => setNetwork(e.target.value as ClusterNetwork)}
          >
            <option value="">Select a network</option>
            <option value="Devnet">Devnet</option>
            <option value="Testnet">Testnet</option>
            <option value="Mainnet">Mainnet</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddClusterModal;
