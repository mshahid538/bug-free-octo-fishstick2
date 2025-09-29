import React, { useState } from 'react';
import { Laboratory, ChecklistAnswers, LabRecommendations } from '../types/laboratory';

interface ChecklistModalProps {
  laboratory: Laboratory;
  onComplete: () => void;
  onCancel: () => void;
}

const ChecklistModal: React.FC<ChecklistModalProps> = ({ laboratory, onComplete, onCancel }) => {
  const [answers, setAnswers] = useState<ChecklistAnswers>({
    multipleMonitors: false,
    maxMonitors: 0,
    ultFreezers: 0,
    freezerTemperature: -80,
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRecommendations(true);
  };

  const handleComplete = () => {
    onComplete();
  };

  const recommendations = {
    monitorAdvice: "We recommend you to use only 1 monitor per laptop.",
    yearlyEmissions: 500,
    yearlyEnergyUsage: 200,
  };

  if (showRecommendations) {
    return (
      <div className="modal modal-open">
        <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Lab Recommendations</h3>
        <div className="space-y-4">
            {answers.multipleMonitors && (
              <div className="alert alert-info">
                <div>
                  <h4 className="font-bold">Monitor Usage Recommendation</h4>
                  <p>{recommendations.monitorAdvice}</p>
                </div>
              </div>
            )}

            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Yearly CO₂ Emissions</div>
                <div className="stat-value text-error">{recommendations.yearlyEmissions} kgCO₂e</div>
                <div className="stat-desc">Carbon footprint</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Yearly Energy Usage</div>
                <div className="stat-value text-warning">{recommendations.yearlyEnergyUsage} kWh</div>
                <div className="stat-desc">Energy consumption</div>
              </div>
            </div>

            <div className="alert alert-success">
              <div>
                <h4 className="font-bold">Thank you for completing the assessment!</h4>
                <p>Your responses will help us provide better recommendations for sustainable laboratory practices.</p>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button onClick={handleComplete} className="btn btn-primary">
              Complete Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">
          Laboratory Assessment - {laboratory.name}
        </h3>
        
        <p className="text-base-content/70 mb-6">
          Please answer the following questions to help us provide personalized recommendations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                1. Is your lab using multiple monitors per laptop?
              </span>
            </label>
            <div className="flex space-x-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="multipleMonitors"
                  className="radio radio-primary"
                  checked={answers.multipleMonitors === true}
                  onChange={() => setAnswers(prev => ({ ...prev, multipleMonitors: true }))}
                />
                <span className="label-text ml-2">Yes</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="multipleMonitors"
                  className="radio radio-primary"
                  checked={answers.multipleMonitors === false}
                  onChange={() => setAnswers(prev => ({ ...prev, multipleMonitors: false, maxMonitors: 0 }))}
                />
                <span className="label-text ml-2">No</span>
              </label>
            </div>
          </div>

          {answers.multipleMonitors && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  2. If so, how many monitors at most for a device?
                </span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                className="input input-bordered w-full max-w-xs"
                value={answers.maxMonitors || ''}
                onChange={(e) => setAnswers(prev => ({ 
                  ...prev, 
                  maxMonitors: parseInt(e.target.value) || 0 
                }))}
                required
              />
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                3. How many ULT freezers are being used?
              </span>
            </label>
            <input
              type="number"
              min="0"
              className="input input-bordered w-full max-w-xs"
              value={answers.ultFreezers}
              onChange={(e) => setAnswers(prev => ({ 
                ...prev, 
                ultFreezers: parseInt(e.target.value) || 0 
              }))}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                4. At what temperature (°C) are they running?
              </span>
            </label>
            <input
              type="number"
              min="-200"
              max="0"
              step="1"
              className="input input-bordered w-full max-w-xs"
              value={answers.freezerTemperature}
              onChange={(e) => setAnswers(prev => ({ 
                ...prev, 
                freezerTemperature: parseInt(e.target.value) || -80 
              }))}
              required
            />
          </div>

          <div className="modal-action">
            <button type="button" onClick={onCancel} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChecklistModal;
