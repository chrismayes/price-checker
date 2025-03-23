import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  // Split the current pathname into parts, ignoring any empty parts.
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {/* Always show Home as the first breadcrumb */}
      <Link component={RouterLink} underline="hover" color="inherit" to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        // Build the URL for the breadcrumb by joining the path segments
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        // Capitalize the first letter of the breadcrumb text
        const label = value.charAt(0).toUpperCase() + value.slice(1);
        return isLast ? (
          <Typography key={to} color="text.primary">
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={to}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
