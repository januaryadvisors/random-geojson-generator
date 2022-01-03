import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import { SetParameters } from './app/SetParameters';
import { SetBoundingBox } from './app/SetBoundingBox'
import { AddPoints } from './app/AddPoints';
import { AddLines } from './app/AddLines';
import { AddPolygons } from './app/AddPolygons';

const Wrapper = styled.div`
  width: 100%;
`;

export const Main = () => {
  return (
    <Wrapper>
      <ToastContainer autoClose={3000} position="bottom-right" transition={Flip} hideProgressBar />
      <main style={{height: `100vh`,}}>
        <Switch>
          <Route path="/" component={SetParameters} exact={true} />
          <Route path="/set-bbox" component={SetBoundingBox} />
          <Route path="/add-points" component={AddPoints} />
          <Route path="/add-lines" component={AddLines} />
          <Route path="/add-polygons" component={AddPolygons} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Wrapper>
  )
}