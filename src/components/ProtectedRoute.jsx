import { getLocalData } from '../utils/storage';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const currentUser = getLocalData('currentUser');

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
