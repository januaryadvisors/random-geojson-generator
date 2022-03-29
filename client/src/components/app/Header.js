import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT, GREEN } from '../../constants/cssVars';

const HeaderWrapper = styled.div`
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

const HeaderContent = styled.div`
    margin: 0px 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
`;

export const Header = () => {
    return (
      <header>
        <HeaderWrapper>
          <HeaderContent>Random GeoJSON Generator</HeaderContent>
        </HeaderWrapper>
      </header>
    )
}