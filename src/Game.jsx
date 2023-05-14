import * as React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Game() {
  const [myNumber, setNumber] = useState([]);
  const [menu, setMenu] = useState(true);
  const playerAmount = useSelector((store) => store.playerAmount.value);
  const gridSize = useSelector((store) => store.gridSize.value);
  console.log(playerAmount);
  const numbers = [];

  for (let i = 1; i <= gridSize; i++) {
    numbers.push({ value: i });
  }

  const shuffleCards = () => {
    const shuffleCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setNumber(shuffleCards);
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <Main>
        <Heading>
          <H1>memory</H1>
          <Menu
            onClick={() => {
              setMenu(false);
            }}
          >
            Menu
          </Menu>
          <TabletMenu>
            <GameButtonTablet
              onClick={() => {
                shuffleCards();
                setMenu(true);
              }}
            >
              Restart
            </GameButtonTablet>
            <Link to="/">
              <GameButtonTablet
                style={{ padding: "13px 22px 14px 22px", marginLeft: "16px" }}
              >
                New Game
              </GameButtonTablet>
            </Link>
          </TabletMenu>
          <Options menubar={menu}>
            <OptionList>
              <GameButton
                onClick={() => {
                  shuffleCards();
                  setMenu(true);
                }}
              >
                Restart
              </GameButton>
              <Link to="/">
                <GameButton menubar={menu}>New Game</GameButton>
              </Link>
              <GameButton
                onClick={() => {
                  setMenu(true);
                }}
              >
                Resume Game
              </GameButton>
            </OptionList>
          </Options>
        </Heading>
        <Playzone gridAmount={gridSize}>
          {myNumber.map((number, id) => {
            return (
              <Ball gridAmount={gridSize} key={id}>
                {number.value}
              </Ball>
            );
          })}
        </Playzone>
        <Pointzone players={playerAmount}>
          <Player
            style={{
              display: playerAmount === "1" ? "none" : "null",
            }}
          >
            <span>P1</span>
            <p>Player 1</p>
            <span>3</span>
          </Player>
          <Player
            style={{
              display: playerAmount < "2" ? "none" : "null",
            }}
          >
            <span>P2</span>
            <p>Player 2</p>
            <span>0</span>
          </Player>
          <Player style={{ display: playerAmount < "3" ? "none" : "null" }}>
            <span>P3</span>
            <p>Player 3</p>
            <span>5</span>
          </Player>
          <Player
            players={playerAmount}
            style={{ display: playerAmount < "4" ? "none" : "null" }}
          >
            <span>P4</span>
            <p>Player 4</p>
            <span>1</span>
          </Player>
          <OnlyOne
            players={playerAmount}
            style={{ display: playerAmount > "1" ? "none" : "null" }}
          >
            <Time>
              <TimeHeader>Time</TimeHeader>
              <TimeCount>1:50</TimeCount>
            </Time>
            <Moves>
              <MovesHeader>Moves</MovesHeader>
              <MovesCount>39</MovesCount>
            </Moves>
          </OnlyOne>
        </Pointzone>
      </Main>
    </>
  );
}

const Main = styled.div`
  max-width: 100%;
  padding: 24px;
  z-index: ${(props) => (props.menubar ? 30 : 5)};
  
  @media (min-width: 768px) {
    padding: 38px;
  }
  @media (min-width: 1440px) {
    padding: 68px 165px 35px 165px;
  }
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled.h1`
  color: #152938;
  font-size: 24px;
  line-height: 30px;
  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 50px;
  }
`;

const Menu = styled.button`
  padding: 10px 18px 10px 18px;
  font-size: 16px;
  line-height: 20px;
  color: #fcfcfc;
  text-align: center;
  border: none;
  cursor: pointer;
  background-color: #fda214;
  border-radius: 26px;
  @media (min-width: 768px) {
    display: none;
  }
`;
const TabletMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Playzone = styled.div`
  width: 100%;
  margin-top: 80px;
  display: grid;
  grid-template-rows: ${(props) =>
    props.gridAmount === 8 ? "repeat(4, 1fr)" : "repeat(6, 1fr)"};
  grid-template-columns: ${(props) =>
    props.gridAmount === 8 ? "repeat(4, 1fr)" : "repeat(6, 1fr)"};
  gap: 16px;
  @media (min-width: 768px) {
    margin-top: 121px;
    gap: 20px;
    padding-left: ${(props) => (props.gridAmount === 8 ? "80px" : "70px")};
    padding-right: ${(props) => (props.gridAmount === 8 ? "80px" : "70px")};
  }
  @media (min-width: 1440px) {
    margin-top: 86px;
    padding-left: ${(props) => (props.gridAmount === 8 ? "290px" : "270px")};
    padding-right: ${(props) => (props.gridAmount === 8 ? "290px" : "270px")};
  }
`;

const Ball = styled.div`
  background-color: #fda214;
  text-align: center;
  color: #fcfcfc;
  line-height: 30px;
  padding: ${(props) => (props.gridAmount === 8 ? "7px 5px " : "7px 5px")};
  font-size: ${(props) => (props.gridAmount === 8 ? "40px" : "24px")};
  border-radius: ${(props) => (props.gridAmount === 8 ? "59px" : "41px")};
  line-height: ${(props) => (props.gridAmount === 8 ? "50px" : "30px")};
  @media (min-width: 768px) {
    padding: ${(props) => (props.gridAmount === 8 ? "12px " : "5px")};
    font-size: ${(props) => (props.gridAmount === 8 ? "56px" : "44px")};
    line-height: ${(props) => (props.gridAmount === 8 ? "56px" : "69px")};
  }
`;

const Pointzone = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  gap: 30px;
  margin-top: 95px;
  grid-template-columns: ${(props) =>
    props.players === "2"
      ? "repeat(2, 1fr)"
      : props.players === "3"
      ? "repeat(3, 1fr)"
      : props.players === "4"
      ? "repeat(4, 1fr)"
      : null};
`;

const Player = styled.div`
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: #dfe7ec;
  border-radius: 5px;
  span:first-child {
    color: #7191a5;
    font-size: 15px;
    line-height: 19px;
    text-align: left;
  }

  span:last-child {
    color: #304859;
    font-size: 24px;
    line-height: 30px;
  }
  p {
    color: #7191a5;
    font-size: 18px;
    line-height: 22px;
    display: none;
    margin-right: 119px;
  }
  @media (min-width: 768px) {
    padding: 16px 92px 16px 16px;
    p {
      display: none;
    }
  }
  @media (min-width: 1440px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    span:first-child {
      display: none;
    }
    p {
      display: block;
    }
  }
`;

const Options = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 222px 24px 222px 24px;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.menubar ? "none" : "flex")};
`;
const OptionList = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  justify-content: space-between;
  border-radius: 10px;
`;
const GameButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px 0 14px 0px;
  background-color: #dfe7ec;
  border-radius: 26px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
`;
const GameButtonTablet = styled.button`
  border: none;
  padding: 14px 29px 14px 29px;
  background-color: #dfe7ec;
  border-radius: 26px;
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  line-height: 25px;
  margin-left: 16px;
`;

const OnlyOne = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  @media (min-width: 1440px) {
    padding-left: 285px;
    padding-right: 285px;
  }
`;
const Time = styled.div`
  width: 45%;
  padding: 10px 47px;
  background-color: #dfe7ec;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 16px 25px;
    justify-content: space-between;
  }
`;

const TimeHeader = styled.p`
  color: #7191a5;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 22px;
  }
`;

const TimeCount = styled.p`
  color: #304859;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;
const Moves = styled.div`
  width: 45%;
  padding: 10px 47px;
  background-color: #dfe7ec;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 16px 25px;
    justify-content: space-between;
  }
`;

const MovesHeader = styled.p`
  color: #7191a5;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 22px;
  }
`;

const MovesCount = styled.p`
  color: #304859;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;
export default Game;
