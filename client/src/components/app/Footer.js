import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT, GREEN } from '../../constants/cssVars';

// const FooterWrapper = styled.div`
//     width: 100%;
//     height: ${HEADER_HEIGHT}px;
//     display: flex;
//     top: 0;
// `;

const FooterWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;  
`;

const FooterContent = styled.div`
    font-size: 18px;
    color: ${GREEN};
    width: 100%;
    display: flex;
    justify-content: center;
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