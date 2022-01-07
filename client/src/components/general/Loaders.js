import React from 'react';
import '../../style/loaders.css';
import styled from 'styled-components';

const FullPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Full-page loader, with circulating dots
export const PageLoader = () => (
  <FullPageWrapper>
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </FullPageWrapper>
)

const CenteredWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: ${({ marginTop }) => marginTop}px;
`;

// Centered loader in parent width, with circulating dots
export const CenteredLoader = ({ marginTop = 100, colorful }) => (
  <CenteredWrapper marginTop={marginTop}>
    <div className={`lds-roller ${colorful ? 'colorful' : ''}`}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </CenteredWrapper>
)

// Button loader, with animated dots in a line
export const ButtonLoader = ({ style }) => (
  <div className="lds-ellipsis" style={style}>
    <div />
    <div />
    <div />
    <div />
  </div>
)
