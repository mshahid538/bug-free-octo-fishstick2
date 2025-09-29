import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../services/authService';
import LaboratoryCard from '../components/LaboratoryCard';
import ChecklistModal from '../components/ChecklistModal';
import { Laboratory } from '../types/laboratory';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [selectedLab, setSelectedLab] = useState<Laboratory | null>(null);
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    const mockLabs: Laboratory[] = [
      {
        id: '1',
        name: 'Environmental Research Lab',
        description: 'Focus on sustainable laboratory practices and energy efficiency',
        location: 'Building A, Floor 2',
        capacity: 20,
        currentMembers: 12,
        isJoined: false,
      },
      {
        id: '2',
        name: 'Green Chemistry Lab',
        description: 'Developing eco-friendly chemical processes and waste reduction',
        location: 'Building B, Floor 1',
        capacity: 15,
        currentMembers: 8,
        isJoined: true,
      },
      {
        id: '3',
        name: 'Energy Efficiency Lab',
        description: 'Research on laboratory equipment optimization and energy consumption',
        location: 'Building C, Floor 3',
        capacity: 25,
        currentMembers: 18,
        isJoined: false,
      },
      {
        id: '4',
        name: 'Sustainable Materials Lab',
        description: 'Development of environmentally friendly materials and processes',
        location: 'Building A, Floor 4',
        capacity: 12,
        currentMembers: 10,
        isJoined: false,
      },
    ];
    setLaboratories(mockLabs);
  }, []);

  const handleJoinLab = (labId: string) => {
    const lab = laboratories.find(l => l.id === labId);
    if (lab) {
      setSelectedLab(lab);
      setShowChecklist(true);
    }
  };

  const handleLeaveLab = (labId: string) => {
    setLaboratories(prev => 
      prev.map(lab => 
        lab.id === labId 
          ? { ...lab, isJoined: false, currentMembers: lab.currentMembers - 1 }
          : lab
      )
    );
  };

  const handleChecklistComplete = (labId: string) => {
    setLaboratories(prev => 
      prev.map(lab => 
        lab.id === labId 
          ? { ...lab, isJoined: true, currentMembers: lab.currentMembers + 1 }
          : lab
      )
    );
    setShowChecklist(false);
    setSelectedLab(null);
  };

  const handleChecklistCancel = () => {
    setShowChecklist(false);
    setSelectedLab(null);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-ghost text-xl">
            Lab Dashboard
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                {user.email.charAt(0).toUpperCase()}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <div className="text-sm opacity-75">{user.email}</div>
              </li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><button onClick={onLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Welcome back, {user.email}!
          </h1>
          <p className="text-base-content/70">
            Manage your laboratory memberships and track environmental impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laboratories.map((lab) => (
            <LaboratoryCard
              key={lab.id}
              laboratory={lab}
              onJoin={() => handleJoinLab(lab.id)}
              onLeave={() => handleLeaveLab(lab.id)}
            />
          ))}
        </div>

        {laboratories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold mb-2">No laboratories available</h3>
            <p className="text-base-content/70">
              Check back later for new laboratory opportunities.
            </p>
          </div>
        )}
      </div>

      {showChecklist && selectedLab && (
        <ChecklistModal
          laboratory={selectedLab}
          onComplete={() => handleChecklistComplete(selectedLab.id)}
          onCancel={handleChecklistCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;
