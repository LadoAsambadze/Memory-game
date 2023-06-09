import * as React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleCard from "../Components/singleCard";
import CountdownTimer from "../Components/timer";

function Game() {
  const [menu, setMenu] = useState(true);
  const mode = useSelector((store) => store.mode.Boolean);
  const playerAmount = useSelector((store) => store.playerAmount.value);
  const gridSize = useSelector((store) => store.gridSize.value);
  const pairs = useSelector((store) => store.pairs.array);
  const [numArray, setNumArray] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [stop, setStop] = useState(false);
  const [time, setTime] = useState(120);
  const [finish, setFinish] = useState(false);
  const [double, setDouble] = useState(pairs);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [disable, setDisable] = useState(false);

  // Arrays with objects for Balls
  const numbers = [];
  const icon = [];
  const icons = [
    { src: "/anchor.png" },
    { src: "/flask.png" },
    { src: "/futbol.png" },
    { src: "/hand-spock.png" },
    { src: "/lira-sign.png" },
    { src: "/moon.png" },
    { src: "/sun.png" },
    { src: "/car.png" },
    { src: "/snowflake.png" },
    { src: "/house.png" },
    { src: "/umbrella.png" },
    { src: "/tool.png" },
    { src: "/notes.png" },
    { src: "/microwawe.png" },
    { src: "/dinner.png" },
    { src: "/coffe.png" },
    { src: "/chicken.png" },
    { src: "/pizza.png" },
  ];

  // Function to push  numbers
  if (mode) {
    for (let i = 0; i < gridSize; i++) {
      numbers.push({ value: i + 1, matched: false });
    }
  }
  // Get random icons from array for push
  function getRandomElements(arr, numElements) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  }
  const randomArray = getRandomElements(icons, gridSize);
  // Function to push  icons
  if (!mode) {
    for (let i = 0; i < 2; i++) {
      randomArray.forEach((item) => {
        icon.push({ ...item, matched: false });
      });
    }
  }

  // Shuffle values/src randomly to balls
  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    if (mode) {
      const shuffledCards = [...numbers, ...numbers]
        .sort(() => Math.random() - 0.5)
        .map((number) => ({ ...number, id: Math.random() }));
      setNumArray(shuffledCards);
      setTurns(0);
    } else {
      const shuffledCards = [...icon]
        .sort(() => Math.random() - 0.5)
        .map((icn) => ({ ...icn, id: Math.random() }));
      setNumArray(shuffledCards);
      setTurns(0);
    }
  };

  // Comparing two balls values/src and get turn for next player
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (mode) {
        if (choiceOne.value === choiceTwo.value) {
          setDouble((prevPairs) => {
            const newPairs = [...prevPairs];
            newPairs[currentPlayer] += 1;
            return newPairs;
          });
        } else {
          setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % playerAmount);
        }
      } else {
        if (choiceOne.src === choiceTwo.src) {
          setDouble((prevPairs) => {
            const newPairs = [...prevPairs];
            newPairs[currentPlayer] += 1;

            return newPairs;
          });
        } else {
          setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % playerAmount);
        }
      }
    }
  }, [choiceOne, choiceTwo]);

  // Comparing balls src/values and count
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (mode) {
        if (choiceOne.value === choiceTwo.value) {
          setNumArray((prevNums) => {
            return prevNums.map((num) => {
              if (num.value === choiceOne.value) {
                return { ...num, matched: true };
              }
              return num;
            });
          });

          resetTurns();
        } else {
          setTimeout(() => resetTurns(), 700);
        }
      } else {
        if (choiceOne.src === choiceTwo.src) {
          setNumArray((prevNums) => {
            return prevNums.map((num) => {
              if (num.src === choiceOne.src) {
                return { ...num, matched: true };
              }
              return num;
            });
          });

          resetTurns();
        } else {
          setTimeout(() => resetTurns(), 700);
        }
      }
    }
  }, [choiceOne, choiceTwo]);

  // Function for resetturns and balls
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisable(false);
  };

  // Finish game if all done / pause
  const matchedItems = numArray.filter((num) => num.matched === true);
  useEffect(() => {
    if (matchedItems.length / 2 === gridSize) {
      setFinish(true);
      setStop(true);
    }
  }, [matchedItems, gridSize]);

  // Handels to pause game or choose card

  const handleStop = () => {
    setStop(!stop);
  };
  const handleChoice = (num) => {
    choiceOne ? setChoiceTwo(num) : setChoiceOne(num);
  };
  // Comparing results to get winner  player number
  const highestPairsIndex = double.indexOf(Math.max(...double));
  const highesPlayer = highestPairsIndex + 1;
  const hasEqualPairs = double.some(
    (double, index) =>
      double === double[highestPairsIndex] && index !== highestPairsIndex
  );

  // Time Countdown for signle player
  let timeShow = 120 - time;
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secondsRemaining
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <Main>
        <Heading>
          <H1>memory</H1>

          <Menu
            onClick={() => {
              setMenu(false);
              setStop(!stop);
            }}
          >
            Menu
          </Menu>
          <TabletMenu>
            <GameButtonTablet
              onClick={() => {
                shuffleCards();
                setMenu(true);
                setFinish(false);
                setTime(121);
                setDouble(Array(+playerAmount).fill(0));
              }}
            >
              Restart
            </GameButtonTablet>
            <Link to="/">
              <GameButtonTablet>New Game</GameButtonTablet>
            </Link>
          </TabletMenu>
          <Options menubar={menu}>
            <OptionList>
              <GameButton
                onClick={() => {
                  shuffleCards();
                  setMenu(true);
                  setFinish(false);
                  setTime(121);
                  setStop(!stop);
                  setDouble(Array(+playerAmount).fill(0));
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
                  handleStop(!stop);
                }}
              >
                Resume Game
              </GameButton>
            </OptionList>
          </Options>
        </Heading>
        <Playzone gridAmount={gridSize}>
          {mode ? (
            <Ball gridAmount={gridSize}>
              {numArray.map((num) => {
                return (
                  <SingleCard
                    disable={disable}
                    key={num.id}
                    newnum={num}
                    newhandleChoice={handleChoice}
                    flipped={
                      num === choiceOne || num === choiceTwo || num.matched
                    }
                    gridAmount={gridSize}
                  />
                );
              })}
            </Ball>
          ) : (
            <Ball gridAmount={gridSize}>
              {numArray.map((num) => {
                return (
                  <SingleCard
                    disable={disable}
                    key={num.id}
                    newnum={num}
                    newhandleChoice={handleChoice}
                    flipped={
                      num === choiceOne || num === choiceTwo || num.matched
                    }
                    gridAmount={gridSize}
                  />
                );
              })}
            </Ball>
          )}
        </Playzone>
        <Pointzone players={playerAmount}>
          <Player
            style={{
              display: playerAmount === "1" ? "none" : null,
            }}
          >
            <span>P1</span>
            <p>Player 1</p>
            <span>{double[0]}</span>
          </Player>
          <Player
            style={{
              display: playerAmount < "2" ? "none" : null,
            }}
          >
            <span>P2</span>
            <p>Player 2</p>
            <span>{double[1]}</span>
          </Player>
          <Player style={{ display: playerAmount < "3" ? "none" : null }}>
            <span>P3</span>
            <p>Player 3</p>
            <span>{double[2]}</span>
          </Player>
          <Player
            players={playerAmount}
            style={{ display: playerAmount < "4" ? "none" : null }}
          >
            <span>P4</span>
            <p>Player 4</p>
            <span>{double[3]}</span>
          </Player>
          <OnlyOne
            players={playerAmount}
            style={{ display: playerAmount > "1" ? "none" : "null" }}
          >
            <Time>
              <TimeHeader>Time</TimeHeader>
              <TimeCount>
                <CountdownTimer
                  stop={stop}
                  time={time}
                  setTime={setTime}
                  format={formatTime}
                />
              </TimeCount>
            </Time>
            <Moves>
              <MovesHeader>Moves </MovesHeader>
              <MovesCount>{turns}</MovesCount>
            </Moves>
          </OnlyOne>
        </Pointzone>
        <SingleScore finished={finish} playerAmount={playerAmount}>
          <GetScore>
            <Congrats>You did it!</Congrats>
            <Comment>Game over! Here’s how you got on…</Comment>
            <Elapse>
              <ElapseText>Time Elapsed</ElapseText>
              <ElapseTime>{formatTime(timeShow)}</ElapseTime>
            </Elapse>
            <Elapse style={{ marginTop: "10px" }}>
              <ElapseText>Moves Taken</ElapseText>
              <ElapseTime>{turns} moves</ElapseTime>
            </Elapse>
            <DivDirection>
              <Duplicate
                onClick={() => {
                  shuffleCards();
                  setFinish(false);
                  setTime(121);
                  setStop(!stop);
                  setDouble(Array(+playerAmount).fill(0));
                }}
              >
                Restart
              </Duplicate>
              <Link to="/" style={{ width: "100%" }}>
                <Duplicate2>Setup New Game</Duplicate2>
              </Link>
            </DivDirection>
          </GetScore>
        </SingleScore>
        <PlayersScore finished={finish} playerAmount={playerAmount}>
          <GetScore>
            <Congrats style={{ order: "-100" }}>
              {hasEqualPairs
                ? `It’s a tie!`
                : ` Player ${highesPlayer} Wins!!!`}
            </Congrats>
            <Comment style={{ order: "-99" }}>
              Game over! Here are the results…
            </Comment>
            {Array.from({ length: playerAmount }, (_, index) => (
              <div key={index} style={{ width: "100%", order: -double[index] }}>
                <Elapse
                  style={{
                    background:
                      index === highestPairsIndex && !hasEqualPairs
                        ? "#152938"
                        : null,
                  }}
                >
                  <ElapseText
                    style={{
                      color:
                        index === highestPairsIndex && !hasEqualPairs
                          ? "#FCFCFC"
                          : null,
                    }}
                  >
                    Player {index + 1}
                  </ElapseText>
                  <ElapseTime
                    style={{
                      color:
                        index === highestPairsIndex && !hasEqualPairs
                          ? "#FCFCFC"
                          : null,
                    }}
                  >
                    {double[index]} Pairs
                  </ElapseTime>
                </Elapse>
              </div>
            ))}
            <DivDirection>
              <Duplicate
                onClick={() => {
                  shuffleCards();
                  setFinish(false);
                  setTime(121);
                  setStop(!stop);
                  setDouble(Array(+playerAmount).fill(0));
                }}
              >
                Restart
              </Duplicate>
              <Link to="/" style={{ width: "100%" }}>
                <Duplicate2>Setup New Game</Duplicate2>
              </Link>
            </DivDirection>
          </GetScore>
        </PlayersScore>
      </Main>
    </>
  );
}
const Main = styled.div`
  max-width: 100%;
  min-height: 100vh;
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
  @media (min-width: 768px) {
    margin-top: ${(props) => (props.gridAmount === 8 ? "157px" : "121px")};
  }
  @media (min-width: 1440px) {
    margin-top: ${(props) => (props.gridAmount === 8 ? "106px" : "85px")};
  }
`;
const Ball = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gridAmount === 8 ? "repeat(4, 1fr)" : "repeat(6, 1fr)"};
  grid-template-rows: ${(props) =>
    props.gridAmount === 8 ? "repeat(4, 1fr)" : "repeat(6, 1fr)"};
  gap: 10px;
  @media (min-width: 768px) {
    gap: ${(props) => (props.gridAmount === 8 ? "20px" : "16px")};
    padding-left: ${(props) => (props.gridAmount === 8 ? "80px" : "60px")};
    padding-right: ${(props) => (props.gridAmount === 8 ? "80px" : "60px")};
  }
  @media (min-width: 1440px) {
    gap: ${(props) => (props.gridAmount === 8 ? "20px" : "16px")};
    padding-left: ${(props) => (props.gridAmount === 8 ? "290px" : "270px")};
    padding-right: ${(props) => (props.gridAmount === 8 ? "290px" : "270px")};
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
  z-index: 5;
`;
const OptionList = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f2f2f2;
  border-radius: 10px;
`;
const GameButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px 0 14px 0px;
  background-color: #dfe7ec;
  margin-top: 16px;
  border-radius: 26px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  &:hover {
    background-color: #fda214;
    color: #fcfcfc;
  }
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
  &:hover {
    background-color: #fda214;
    color: #fcfcfc;
  }
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
const TimeCount = styled.div`
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
const SingleScore = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 146px 24px;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  top: 0;
  left: 0;
  display: ${(props) =>
    props.finished && props.playerAmount === "1" ? "block" : "none"};
  @media (min-width: 768px) {
    padding: 257px 57px;
  }
  @media (min-width: 1440px) {
    padding: 257px 393px;
  }
`;
const PlayersScore = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 146px 24px;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  top: 0;
  left: 0;
  display: ${(props) =>
    props.finished && props.playerAmount !== "1" ? "block" : "none"};
  @media (min-width: 768px) {
    padding: 257px 57px;
  }
  @media (min-width: 1440px) {
    padding: 257px 393px;
  }
`;
const GetScore = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    padding: 51px 57px 70px 57px;
  }
`;
const Congrats = styled.span`
  color: #152938;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  @media (min-width: 1440px) {
    font-size: 48px;
    line-height: 60px;
  }
`;
const Comment = styled.span`
  font-size: 14px;
  line-height: 17px;
  color: #7191a5;
  margin-top: 9px;
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 22px;
    margin-top: 16px;
  }
`;
const Elapse = styled.div`
  border-radius: 5px;
  background-color: #dfe7ec;
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  @media (min-width: 768px) {
    padding: 15px 32px;
    border-radius: 10px;
    margin-top: 40px;
  }
`;
const ElapseText = styled.span`
  color: #7191a5;
  font-size: 13px;
  line-height: 16px;
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 22px;
  }
`;
const ElapseTime = styled.span`
  font-size: 20px;
  line-height: 25px;
  color: #304859;
  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;
const DivDirection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }
`;
const Duplicate = styled.button`
  width: 100%;
  border: none;
  padding: 12px 0 14px 0px;
  background-color: #dfe7ec;
  border-radius: 26px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  &:hover {
    background-color: #fda214;
    color: #fcfcfc;
  }
  @media (min-width: 768px) {
    width: 100%;
    margin-right: 16px;
  }
`;
const Duplicate2 = styled.button`
  width: 100%;
  border: none;
  margin-top: 16px;
  padding: 12px 0 14px 0px;
  background-color: #dfe7ec;
  border-radius: 26px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  &:hover {
    background-color: #fda214;
    color: #fcfcfc;
  }
  @media (min-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

export default Game;
