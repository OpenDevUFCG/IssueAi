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
    <h3 className="nav-option">
        <HeaderLink to={to}>{children}</HeaderLink>
    </h3>
);

export const HeaderBrand = ({ to, children }: HeaderLinkProps) => (
    <h1 className="nav-brand">
        <HeaderLink to={to}>{children}</HeaderLink>
    </h1>
);

export const Header = ({ children }: { children: React.Node }) => (
    <div className="header sticky">
        <div className="header-content">{children}</div>
    </div>
);
