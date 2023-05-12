import * as React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";


function Game({ gridSize, setGridSize }) {
  const [myNumber, setNumber] = useState([]);
  const [turns, setTurns] = useState(1);

  const numbers = [];
  const gridLength = gridSize ? 6 : 18;
  for (let i = 1; i <= gridLength; i++) {
    numbers.push({ value: i });
  }

  const shuffleCards = () => {
    const shuffleCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setNumber(shuffleCards);
    setTurns(0);
  };

  return (
    <>
      <Main>
        <Heading>
          <H1>memory</H1>
          <Menu onClick={shuffleCards}>Menu</Menu>
        </Heading>
        <Playzone>
          {myNumber.map((number, id) => {
            return <Ball key={id}>{number.value}</Ball>;
          })}
        </Playzone>
        <Pointzone>
          <Player>
            <span>P1</span>
            <span>3</span>
          </Player>
          <Player>
            <span>P2</span>
            <span>0</span>
          </Player>
          <Player>
            <span>P3</span>
            <span>5</span>
          </Player>
          <Player>
            <span>P4</span>
            <span>1</span>
          </Player>
        </Pointzone>
      </Main>
    </>
  );
}

const Main = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
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
`;

const Playzone = styled.div`
  width: 100%;
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
`;

const Ball = styled.div`
  background-color: #fda214;
  border-radius: 60px;
  padding: 8px;
  text-align: center;
  color: #fcfcfc;
  font-size: 24px;
  line-height: 30px;
`;

const Pointzone = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 95px;
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
    text-align: center;
  }

  span:last-child {
    color: #304859;
    font-size: 24px;
    line-height: 30px;
  }
`;
export default Game;
