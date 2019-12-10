import * as React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const HeaderLink = ({ to, children }) => (
  <Link to={to} className="link">
    <span>{children}</span>
  </Link>
)

export const HeaderNavLink = ({ to, children }) => (
  <h3 className="nav-option">
    <HeaderLink to={to}>{children}</HeaderLink>
  </h3>
)

export const HeaderWrapperNavLinks = ({ children }) => (
  <div className="wrapper-nav-options">{children}</div>
)

export const HeaderBrand = ({ to, children }) => (
  <h1 className="nav-brand">
    <HeaderLink to={to}>{children}</HeaderLink>
  </h1>
)

export const Header = ({ children }) => {
  return (
    <div className="header sticky">
      <div className="header-content">{children}</div>
    </div>
  )
}
