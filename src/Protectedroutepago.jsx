import { Navigate, useLocation } from 'react-router-dom';
import { useidusuariodetallepago, useStoreEncryp } from './useUserStore';

const ProtectedRouteDetalle = ({ children }) => {
  const {idusuariodetallepago} = useidusuariodetallepago();
  const location = useLocation();

  if (!idusuariodetallepago) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};



export default ProtectedRouteDetalle