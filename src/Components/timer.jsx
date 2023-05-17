import { useState, useEffect } from "react";
import styled from "styled-components";

const CountdownTimer = ({ stop, time, setTime }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1 || stop) {
          clearInterval(interval);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [stop]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secondsRemaining
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <Count>{formatTime(time)}</Count>
    </div>
  );
};

const Count = styled.span`
  font-size: 24px;
  line-height: 30px;
  @media (min-wdith: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

export default CountdownTimer;
