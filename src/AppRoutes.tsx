import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BrowseGroceries from './pages/BrowseGroceries';
import CheckGrocery from './pages/CheckGrocery';
import BreadcrumbsNav from './components/BreadcrumbsNav';

const AppRoutes: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs will update automatically based on the current URL */}
      <BreadcrumbsNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseGroceries />} />
        <Route path="/check" element={<CheckGrocery />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
