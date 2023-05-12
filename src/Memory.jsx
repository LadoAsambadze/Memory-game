import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

export default function Memory({ gridSize, setGridSize }) {
  const [mode, setMode] = useState(true);

  const [playerAmount, setPlayerAmount] = useState(1);

  return (
    <>
      <Main>
        <Header>memory</Header>
        <Selector>
          <H1>Select Theme</H1>
          <Choose>
            <NumberButton
              chooseMode={mode}
              onClick={() => {
                setMode(true);
              }}
            >
              Numbers
            </NumberButton>
            <IconButton
              chooseMode={mode}
              onClick={() => {
                setMode(false);
              }}
            >
              Icons
            </IconButton>
          </Choose>
          <H2>Numbers of Players</H2>
          <Players>
            <Player
              isSelected={playerAmount === 1}
              onClick={() => {
                setPlayerAmount(1);
              }}
            >
              1
            </Player>
            <Player
              isSelected={playerAmount === 2}
              onClick={() => {
                setPlayerAmount(2);
              }}
            >
              2
            </Player>
            <Player
              isSelected={playerAmount === 3}
              onClick={() => {
                setPlayerAmount(3);
              }}
            >
              3
            </Player>
            <Player
              isSelected={playerAmount === 4}
              onClick={() => {
                setPlayerAmount(4);
              }}
            >
              4
            </Player>
          </Players>
          <H3>Grid Size</H3>
          <Choose1>
            <Number4
              gridsize={gridSize}
              onClick={() => {
                setGridSize(true);
              }}
            >
              4X4
            </Number4>
            <Number6
              gridsize={gridSize}
              onClick={() => {
                setGridSize(false);
              }}
            >
              6X6
            </Number6>
          </Choose1>
          <Link to="/Game">
            <Start>Start Game</Start>
          </Link>
        </Selector>
      </Main>
    </>
  );
}

const Main = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #152938;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px 116px 24px;
`;

const Header = styled.h1`
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  color: #fcfcfc;
`;

const Selector = styled.div`
  width: 100%;
  border-radius: 10px;
  margin-top: 45px;
  background-color: #fcfcfc;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;
const H1 = styled.h1`
  font-size: 15px;
  line-height: 19px;
  color: #7191a5;
`;

const Choose = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 11px;
`;

const NumberButton = styled.button`
  color: #fcfcfc;

  border-radius: 26px;
  padding: 10px 33px 10px 33px;
  font-size: 16px;
  line-height: 20px;
  text-transform: none;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.chooseMode ? "#304859" : "#BCCED9")};
`;
const IconButton = styled.button`
  color: #fcfcfc;

  border-radius: 26px;
  padding: 10px 45px 10px 45px;
  font-size: 16px;
  line-height: 20px;
  text-transform: none;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.chooseMode ? "#BCCED9" : "#304859")};
`;

const H2 = styled.h1`
  font-size: 15px;
  line-height: 19px;
  color: #7191a5;
  margin-top: 24px;
`;

const Players = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 11px;
`;

const Player = styled.div`
  padding: 10px 26px 10px 26px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  background-color: #304859;
  color: #fcfcfc;
  border-radius: 26px;
  background-color: ${(props) => (props.isSelected ? "#304859" : "#BCCED9")};
`;

const H3 = styled.h1`
  font-size: 15px;
  line-height: 19px;
  color: #7191a5;
  margin-top: 24px;
`;

const Choose1 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 11px;
  margin-bottom: 44px;
`;

const Number4 = styled.button`
  color: #fcfcfc;
  border-radius: 26px;
  padding: 10px 52px 10px 52px;
  font-size: 16px;
  line-height: 20px;
  text-transform: none;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.gridsize ? "#304859" : "#BCCED9")};
`;
const Number6 = styled.button`
  color: #fcfcfc;
  border-radius: 26px;
  padding: 10px 52px 10px 52px;
  font-size: 16px;
  line-height: 20px;
  text-transform: none;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.gridsize ? "#bcced9" : "#304859")};
`;

const Start = styled.button`
  padding: 12px 91px 14px 91px;

  font-size: 18px;
  line-height: 22px;
  background: #fda214;
  border-radius: 26px;
  color: #fcfcfc;
  cursor: pointer;
  width: 100%;
  border: none;
`;
1;
