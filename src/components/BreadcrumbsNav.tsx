import React, { ReactElement } from 'react';
import { Breadcrumbs, Link, Typography, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useBreadcrumb } from './BreadcrumbContext';

const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const { overrideLabel } = useBreadcrumb();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: ReactElement[] = [
    <Link key="/" component={RouterLink} underline="hover" to="/" style={{ color: theme.palette.text.secondary }}>
      Home
    </Link>,
  ];

  pathnames.forEach((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;

    if (isLast) {
      // If it's the last breadcrumb, display the override label or capitalize the value.
      if (overrideLabel) {
        breadcrumbs.push(
          <Typography key={to} style={{ color: theme.palette.text.secondary }}>
            {overrideLabel}
          </Typography>
        );
      } else if (/^\d+$/.test(value)) {
        return; // Skip numeric segments if no override is set.
      } else {
        breadcrumbs.push(
          <Typography key={to} style={{ color: theme.palette.text.secondary }}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        );
      }
    } else {
      // Add intermediate breadcrumbs as links.
      breadcrumbs.push(
        <Link key={to} component={RouterLink} underline="hover" to={to} style={{ color: theme.palette.text.secondary }}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Link>
      );
    }
  });

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<span style={{ color: theme.palette.text.secondary }}>/</span>}>
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
