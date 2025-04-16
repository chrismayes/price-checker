import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component ensures that the page scrolls to the top whenever the route changes.
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
