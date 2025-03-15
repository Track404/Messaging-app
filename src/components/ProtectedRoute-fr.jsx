import { useNavigate } from 'react-router-dom';
import useEffect from '@mui/material/utils/useEnhancedEffect';
import { useQuery } from '@tanstack/react-query';
import { SecureRoute } from '../api/authentification';

// eslint-disable-next-line react/prop-types
const ProtectedPageFr = ({ children }) => {
  const navigate = useNavigate();

  const { error } = useQuery({
    queryKey: ['secureRoute'],
    queryFn: SecureRoute,
    retry: false,
  });

  // If authentication fails, redirect to login page
  useEffect(() => {
    if (error) {
      navigate('/connexion');
    }
  }, [error, navigate]);

  return <>{children}</>;
};

export default ProtectedPageFr;
