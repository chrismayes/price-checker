import React, { ReactElement } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useBreadcrumb } from './BreadcrumbContext';

const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  const { overrideLabel } = useBreadcrumb();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: ReactElement[] = [
    <Link key="/" component={RouterLink} underline="hover" color="white" to="/">
      Home
    </Link>,
  ];

  pathnames.forEach((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;

    if (isLast) {
      if (overrideLabel) {
        breadcrumbs.push(
          <Typography key={to} color="white">
            {overrideLabel}
          </Typography>
        );
      } else if (/^\d+$/.test(value)) {
        // If no override is set and the segment is numeric, skip rendering it.
        return;
      } else {
        breadcrumbs.push(
          <Typography key={to} color="white">
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        );
      }
    } else {
      breadcrumbs.push(
        <Link key={to} component={RouterLink} underline="hover" color="white" to={to}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Link>
      );
    }
  });

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<span style={{ color: 'white' }}>/</span>}>
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
