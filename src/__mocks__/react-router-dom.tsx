import React from 'react';

export const Link = ({ to, children, ...props }: any) => <a href={to} {...props}>{children}</a>;
export const useLocation = () => ({ pathname: '/' });
export const useNavigate = () => jest.fn();
export const Routes = ({ children }: any) => <div>{children}</div>;
export const Route = ({ children }: any) => <div>{children}</div>;
export const Navigate = ({ to }: any) => <div>{to}</div>;
export const Outlet = () => <div />;
