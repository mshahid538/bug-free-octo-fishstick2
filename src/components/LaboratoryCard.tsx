import React from 'react';
import { Laboratory } from '../types/laboratory';

interface LaboratoryCardProps {
  laboratory: Laboratory;
  onJoin: () => void;
  onLeave: () => void;
}

const LaboratoryCard: React.FC<LaboratoryCardProps> = ({ laboratory, onJoin, onLeave }) => {
  const { name, description, location, capacity, currentMembers, isJoined } = laboratory;
  const availableSpots = capacity - currentMembers;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <h2 className="card-title text-lg">{name}</h2>
          <div className={`badge ${isJoined ? 'badge-success' : 'badge-outline'}`}>
            {isJoined ? 'Joined' : 'Available'}
          </div>
        </div>
        
        <p className="text-base-content/70 text-sm mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <span className="font-medium">Location:</span>
            <span className="ml-2">{location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="font-medium">Capacity:</span>
            <span className="ml-2">{currentMembers}/{capacity} members</span>
          </div>
          
          {availableSpots > 0 && !isJoined && (
            <div className="flex items-center text-sm text-success">
              <span className="font-medium">Available spots:</span>
              <span className="ml-2">{availableSpots}</span>
            </div>
          )}
        </div>

        <div className="card-actions justify-end">
          {isJoined ? (
            <button 
              onClick={onLeave}
              className="btn btn-outline btn-error btn-sm"
            >
              Leave Lab
            </button>
          ) : (
            <button 
              onClick={onJoin}
              className="btn btn-primary btn-sm"
              disabled={availableSpots === 0}
            >
              {availableSpots === 0 ? 'Full' : 'Join Lab'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaboratoryCard;
