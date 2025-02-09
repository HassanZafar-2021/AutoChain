import React, { useState } from 'react';

type ClusterNetwork = 'Devnet' | 'Testnet' | 'Mainnet';

interface Cluster {
  name: string;
  network?: ClusterNetwork;
  endpoint: string;
  active?: boolean;
}

interface ClusterSelectorProps {
  clusters: Cluster[];
  onSelect: (cluster: Cluster) => void;
}

export function ClusterSelector({ clusters, onSelect }: ClusterSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCluster = clusters.find((c) => c.active);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
      >
        <span>{activeCluster?.name || 'Select Cluster'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {clusters.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
                className={`${
                  item.active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                } group flex w-full items-center px-4 py-2 text-sm transition-colors duration-200`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClusterSelector;
