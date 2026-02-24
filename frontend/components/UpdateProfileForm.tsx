'use client';

import { useState } from 'react';
import { updateUserProfile } from '@/services/profile';

export default function UpdateProfileForm() {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(bio, website, avatar);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar URL"
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}
