import { useState, useEffect } from "react";

interface Profile {
  name: string;
  pronouns: string;
  email: string;
  phone: string;
  photoUrl?: string;
}

const PROFILE_KEY = "clandestina_profile";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      setProfile(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const saveProfile = (data: Profile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    setProfile(data);
  };

  const clearProfile = () => {
    localStorage.removeItem(PROFILE_KEY);
    setProfile(null);
  };

  const needsOnboarding = !loading && !profile;

  return { profile, loading, needsOnboarding, saveProfile, clearProfile };
};
