import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<span style={{ color: 'white' }}>/</span>}
    >
      <Link component={RouterLink} underline="hover" color="white" to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = value.charAt(0).toUpperCase() + value.slice(1);
        return isLast ? (
          <Typography key={to} color="white">
            {label}
          </Typography>
        ) : (
          <Link key={to} component={RouterLink} underline="hover" color="white" to={to}>
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
