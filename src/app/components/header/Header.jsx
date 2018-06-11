import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const BBCNewsLink = styled.a`
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  font-size: 2.4em;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
`;

const BBCNewsNavigation = styled.div`
  width: 100%;
`;

const BBCNewsBrandingLogo = styled.div`
  margin: 0 62px;
  padding: 10px 16px;
`;

const BBCNewsBranding = styled.div`
  background-color: #bb1919;
  height: 58px;
  width: 100%;
`;

class Header extends Component {
  state = {
    title: 'BBC News',
  };

  render() {
    const { title } = this.state;

    return (
      <Fragment>
        <BBCNewsBranding>
          <BBCNewsBrandingLogo>
            <BBCNewsNavigation>
              <BBCNewsLink href="/news" id="brand">
                {title}
              </BBCNewsLink>
            </BBCNewsNavigation>
          </BBCNewsBrandingLogo>
        </BBCNewsBranding>
      </Fragment>
    );
  }
}

export default Header;
