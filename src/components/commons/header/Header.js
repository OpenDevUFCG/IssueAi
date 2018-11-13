// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

type HeaderLinkProps = {
    to: string,
    children: React.Node,
};

const HeaderLink = ({ to, children }: HeaderLinkProps) => (
    <Link to={to} className="link">
        <span>{children}</span>
    </Link>
);

export const HeaderNavLink = ({ to, children }: HeaderLinkProps) => (
    <h3 bp="fit" className="nav-link">
        <HeaderLink to={to}>{children}</HeaderLink>
    </h3>
);

export const HeaderBrand = ({ to, children }: HeaderLinkProps) => (
    <h1 bp="fill">
        <HeaderLink to={to}>{children}</HeaderLink>
    </h1>
);

export const Header = ({ children }: { children: React.Node }) => (
    <div bp="flex vertical-center" className="header">
        {children}
    </div>
);
