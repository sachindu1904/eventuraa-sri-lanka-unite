
import React from 'react';

export interface DoctorSettingsProps {
  doctor: {
    name: string;
  };
}

const DoctorSettings = ({ doctor }: DoctorSettingsProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
      <p className="mt-4">Manage your account settings, Dr. {doctor.name.split(' ')[0]}.</p>
      {/* Settings functionality would be implemented here */}
    </div>
  );
};

export default DoctorSettings;
