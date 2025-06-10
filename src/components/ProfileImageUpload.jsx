import React from 'react';

export default function ProfileImageUpload({ onImageUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result); // Pass base64 string to parent
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="ml-2 flex items-center">
      <label htmlFor="profile-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
        Alterar
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
