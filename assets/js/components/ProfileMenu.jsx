import React from 'react';
const ProfileMenu = () => (
  <header className="flex items-center justify-end h-16 px-6 bg-white border-b">
    <div className="flex items-center space-x-4">
      <span className="font-medium">Super Admin</span>
      <img src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff" alt="Profile" className="w-8 h-8 rounded-full" />
      {/* Dropdown for profile/settings/logout */}
    </div>
  </header>
);
export default ProfileMenu;
