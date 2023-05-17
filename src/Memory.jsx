import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setGridSize } from "./store/nameSlice";
import { setMode } from "./store/modeSlice";
import { setPlayerAmount } from "./store/playerSlice";

export default function Memory() {
  const gridSize = useSelector((store) => store.gridSize.value);
  const mode = useSelector((store) => store.mode.Boolean);
  const playerAmount = useSelector((store) => store.playerAmount.value);

  const dispatch = useDispatch();

  const gridHandler = () => {
    dispatch(setGridSize(8));
  };
  const gridHandlerFalse = () => {
    dispatch(setGridSize(18));
  };

  const modeHandler = () => {
    dispatch(setMode(true));
  };
  const modeHandlerFalse = () => {
    dispatch(setMode(false));
  };
  const playerHandler = (event) => {
    dispatch(setPlayerAmount(event.target.textContent));
  };

  const getPlayerColor = (player) => {
    if (player === playerAmount) {
      return "#304859";
    } else {
      return "#BCCED9";
    }
  };

  useEffect(() => {
    getPlayerColor("1");
  }, []);

  return (
    <>
      <Main>
        <Header>memory</Header>
        <Selector>
          <H1>Select Theme</H1>
          <Choose>
            <NumberButton modeTrue={mode} onClick={modeHandler}>
              Numbers
            </NumberButton>
            <IconButton modeFalse={mode} onClick={modeHandlerFalse}>
              Icons
            </IconButton>
          </Choose>
          <H2>Numbers of Players</H2>
          <Players>
            <Player
              style={{
                backgroundColor: getPlayerColor("1"),
                marginLeft: "0px ",
              }}
              onClick={playerHandler}
            >
              1
            </Player>
            <Player
              style={{ backgroundColor: getPlayerColor("2") }}
              onClick={playerHandler}
            >
              2
            </Player>
            <Player
              style={{ backgroundColor: getPlayerColor("3") }}
              onClick={playerHandler}
            >
              3
            </Player>
            <Player
              style={{ backgroundColor: getPlayerColor("4") }}
              onClick={playerHandler}
            >
              4
            </Player>
          </Players>
          <H3>Grid Size</H3>
          <Choose1>
            <Number4 gridNum={gridSize} onClick={gridHandler}>
              4X4
            </Number4>
            <Number6 gridNum={gridSize} onClick={gridHandlerFalse}>
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
  max-width: 100%;
  min-height: 100%;
  background-color: #152938;
  padding: 80px 24px 116px 24px;
  @media (min-width: 768px) {
    padding: 169px 57px 169px 57px;
  }

  @media (min-width: 1440px) {
    padding: 153px 393px 183px 393px;
  }
`;

const Header = styled.h1`
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  color: #fcfcfc;
  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 50px;
  }
`;

const Selector = styled.div`
  width: 100%;
  border-radius: 10px;
  margin-top: 45px;
  background-color: #fcfcfc;
  padding: 24px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    border-radius: 20px;
    margin-top: 78px;
    padding: 56px;
  }
`;
const H1 = styled.h1`
  font-size: 15px;
  line-height: 19px;
  color: #7191a5;
  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 25px;
  }
`;

const Choose = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 11px;
  @media (min-width: 768px) {
    margin-top: 16px;
  }
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
  background-color: ${(props) => (props.modeTrue ? "#304859" : "#BCCED9")};
  @media (min-width: 768px) {
    padding: 11px 73px 9px 73px;
    font-size: 26px;
    line-height: 32px;
  }
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
  background-color: ${(props) => (props.modeFalse ? "#BCCED9" : "#304859")};
  @media (min-width: 768px) {
    padding: 11px 93px 9px 93px;
    font-size: 26px;
    line-height: 32px;
  }
`;

const H2 = styled.h1`
  font-size: 15px;
  line-height: 19px;
  color: #7191a5;
  margin-top: 24px;
  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 25px;
    margin-top: 32px;
  }
`;

const Players = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 11px;
  @media (min-width: 768px) {
    margin-top: 16px;
  }
`;

const Player = styled.div`
  padding: 10px 26px 10px 26px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #fcfcfc;
  border-radius: 26px;
  background-color: #304859;
  margin-left: 10px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 26px;
    line-height: 32px;
    padding: 11px 42px 9px 42px;
    margin-left: 21px;
  }
`;

const H3 = styled.h1`
  font-size: 100%;
  line-height: 19px;
  color: #7191a5;
  margin-top: 24px;
  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 25px;
    margin-top: 32px;
  }
`;

const Choose1 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 11px;
  margin-bottom: 44px;
  @media (min-width: 768px) {
    margin-top: 16px;
    margin-bottom: 33px;
  }
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
  background-color: ${(props) => (props.gridNum === 8 ? "#304859" : "#BCCED9")};
  @media (min-width: 768px) {
    font-size: 26px;
    line-height: 32px;
    padding: 11px 104px 9px 104px;
  }
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
  background-color: ${(props) => (props.gridNum === 8 ? "#BCCED9" : "#304859")};
  @media (min-width: 768px) {
    font-size: 26px;
    line-height: 32px;
    padding: 11px 104px 9px 104px;
  }
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
  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
    padding: 16px 184px 14px 184px;
    border-radius: 35px;
  }
`;
