
import TablloRoutes from "./TablloRoutes"
import styled from "styled-components";
import Header from "./components/Header/Header";
import { useState } from "react";

const SMainWrapper = styled.div` 
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
  grid-template-areas: 'header' 'main';
  min-height: 100vh;
  overflow: hidden;
`;

const SHeaderWrapper = styled.header`
  grid-area: header;

`;
const H1Wrapper = styled.h1`
  background-color: red;
`;
const SContentWrapper = styled.main`
  grid-area: main;
`;


function App() {
  const [headerColor, setHeaderColor] = useState('#2E7EAF');

  return (
    <SMainWrapper>
      <SHeaderWrapper>
      <Header bgColor={headerColor}/>
      </SHeaderWrapper>
      <SContentWrapper>
        <TablloRoutes/>
      </SContentWrapper>
    </SMainWrapper>


  );
}

export default App;
