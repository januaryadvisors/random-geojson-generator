import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT, GREEN } from '../../constants/cssVars';

const FooterWrapper = styled.div`
    width: 100%;
    height: ${HEADER_HEIGHT}px;
    color: ${GREEN};
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0px;
    left: 0px;
    z-index: 10;
`;

const FooterContent = styled.div`
    margin: 0px 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

export const Footer = () => {
    return (
      <footer>
        <FooterWrapper>
          <FooterContent>Made by January Advisors</FooterContent>
        </FooterWrapper>
      </footer>
    )
}