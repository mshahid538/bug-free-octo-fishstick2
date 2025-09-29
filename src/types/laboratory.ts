export interface Laboratory {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  currentMembers: number;
  isJoined: boolean;
}

export interface ChecklistAnswers {
  multipleMonitors: boolean;
  maxMonitors?: number;
  ultFreezers: number;
  freezerTemperature: number;
}

export interface LabRecommendations {
  monitorAdvice: string;
  yearlyEmissions: number; // kgCO2e
  yearlyEnergyUsage: number; // kWh
}
