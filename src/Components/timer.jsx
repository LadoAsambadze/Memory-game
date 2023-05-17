import { useState, useEffect } from "react";
import styled from "styled-components";

const CountdownTimer = ({ stop, time, setTime, format }) => {
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

  return (
    <div>
      <Count>{format(time)}</Count>
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
