import React, { useState, useRef } from 'react';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const fileInput = useRef();
  const [profilePic, setProfilePic] = useState('https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff');

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setProfilePic(ev.target.result);
      reader.readAsDataURL(file);
      // TODO: Upload to server via API
    }
  };

  const handleLogout = () => {
    window.location.href = '/wp-login.php?action=logout';
  };

  return (
    <header className="flex items-center justify-end h-16 px-6 bg-white dark:bg-gray-900 border-b dark:border-gray-800 relative">
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <span className="font-medium">Super Admin</span>
        <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700" />
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
          <div className="px-4 py-3 border-b dark:border-gray-700">
            <div className="font-semibold mb-1">Profile</div>
            <div className="flex items-center gap-2">
              <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full border" />
              <button className="text-xs text-primary underline" onClick={() => fileInput.current.click()}>Change Photo</button>
              <input type="file" accept="image/*" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
          </div>
          <div className="px-4 py-3 border-b dark:border-gray-700">
            <div className="font-semibold mb-1">Change Password</div>
            <form onSubmit={e => { e.preventDefault(); /* TODO: API call */ }} className="space-y-2">
              <input type="password" placeholder="Current Password" className="w-full border px-2 py-1 rounded" required />
              <input type="password" placeholder="New Password" className="w-full border px-2 py-1 rounded" required />
              <button type="submit" className="w-full bg-primary text-white rounded py-1">Update Password</button>
            </form>
          </div>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default ProfileMenu;
