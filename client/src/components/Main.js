import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import { SetParameters } from './app/SetParameters';
import { SetBoundingBox } from './app/SetBoundingBox'
import { AddPoints } from './app/AddPoints';
import { AddLines } from './app/AddLines';
import { AddPolygons } from './app/AddPolygons';
import { EditPoint } from './app/EditPoint';
import { EditLine } from './app/EditLine';
import { EditPolygon } from './app/EditPolygon';
import { Header } from './app/Header';
import { Footer } from './app/Footer';

const Wrapper = styled.div`
  background-color: white;
  position: relative;
  min-height: 100vh;
`;

const LeftMargin = styled.div`
  position: relative;
  width: 90%;
  left: 5%;
}
`

export const Main = () => {
  return (
    <Wrapper>
      <ToastContainer autoClose={3000} position="bottom-right" transition={Flip} hideProgressBar />
      <main style={{paddingBottom: `2.5rem`}}>
        <Header />
        <LeftMargin>
        <Switch>
          <Route path="/" component={SetParameters} exact={true} />
          <Route path="/set-bbox" component={SetBoundingBox} />
          <Route path="/add-points" component={AddPoints} />
          <Route path="/add-lines" component={AddLines} />
          <Route path="/add-polygons" component={AddPolygons} />
          <Route path="/edit-point" component={EditPoint} />
          <Route path="/edit-line" component={EditLine} />
          <Route path="/edit-polygon" component={EditPolygon} />
          <Redirect to="/" />
        </Switch>
        </LeftMargin>
        <Footer />
      </main>
    </Wrapper>
  )
}