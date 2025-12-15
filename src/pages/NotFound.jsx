import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the static 404.html page
    window.location.href = '/404.html';
  }, []);

  // Return null since we're redirecting
  return null;
}

export default NotFound;
