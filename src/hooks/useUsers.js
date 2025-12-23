import { useState, useEffect, useMemo } from 'react';
import { getUsers } from '../services/api';
import { generateStatus } from '../utils/helpers';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users once on initial mount
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Small artificial delay so the loader is actually visible to the user
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const data = await getUsers();
        // Enrich raw API data with extra fields that the UI expects
        const enrichedData = data.map(user => ({
          ...user,
          status: generateStatus(), // status is generated once per session to feel consistent
          role: 'Member' // simple mock role for now
        }));
        setUsers(enrichedData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Simple add user function (purely client-side, nothing is persisted on the API)
  const addUser = (newUser) => {
    const userWithId = {
        ...newUser,
        id: Date.now(),    // quick unique-ish id for this session
        status: 'Active',  // new clients start as Active
        role: 'Member'     // keep role aligned with fetched users
    };
    // Prepend new user so it shows up at the top of the list
    setUsers(prev => [userWithId, ...prev]);
  };

  return { users, loading, error, addUser };
};
