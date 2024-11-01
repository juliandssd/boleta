import { Navigate, useLocation } from 'react-router-dom';
import { useStoreEncryp } from './useUserStore';

const ProtectedRoute = ({ children }) => {
  const encryptedId = useStoreEncryp((state) => state.encryptedId);
  const location = useLocation();

  if (!encryptedId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};



export default ProtectedRoute