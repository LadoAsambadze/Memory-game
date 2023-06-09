import styled from "styled-components";
import "../Components/singleCard.css";
import { useSelector } from "react-redux";

export default function SingleCard({
  newnum,
  newhandleChoice,
  flipped,
  gridAmount,
  disable,
}) {
  const handleClick = () => {
    if (!disable) {
      newhandleChoice(newnum);
    }
  };
  const mode = useSelector((store) => store.mode.Boolean);
  return (
    <Card>
      <div className={flipped ? "flipped" : ""}>
        <Front
          flipped={flipped}
          new={newnum.matched}
          gridAmount={gridAmount}
          className="front"
        >
          {mode ? newnum.value : <img src={newnum.src} alt="Image" />}
        </Front>
        <Back
          gridAmount={gridAmount}
          className="back"
          onClick={handleClick}
        ></Back>
      </div>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  margin: auto;
  cursor: pointer;
`;

const Front = styled.div`
  background-color: #fda214;
  color: white;
  text-align: center;
  margin: auto;
  width: 100%;
  display: block;
  transform: ${(props) => (props.flipped ? "rotateY(0deg)" : "rotateY(90deg)")};
  transition: all ease-in 0.2s;
  position: absolute;
  width: ${(props) => (props.gridAmount === 8 ? "72px" : "46px")};
  height: ${(props) => (props.gridAmount === 8 ? "72px" : "46px")};
  background-color: ${(props) => (props.new ? "#BCCED9" : "#fda214")};
  font-size: ${(props) => (props.gridAmount === 8 ? "40px" : "24px")};
  line-height: ${(props) => (props.gridAmount === 8 ? "50px" : "30px")};
  border-radius: ${(props) => (props.gridAmount === 8 ? "60px" : "40px")};
  padding-top: 8px;
  @media (min-width: 768px) {
    width: ${(props) => (props.gridAmount === 8 ? "118px" : "82px")};
    height: ${(props) => (props.gridAmount === 8 ? "118px" : "82px")};
    font-size: ${(props) => (props.gridAmount === 8 ? "56px" : "44px")};
    line-height: ${(props) => (props.gridAmount === 8 ? "70px" : "55px")};
    padding-top: ${(props) => (props.gridAmount === 8 ? "22px" : "15px")};
  }
`;

const Back = styled.div`
  background-color: #304859;
  color: #304859;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  display: block;
  transition: all ease-in 0.2s;
  transition-delay: 0.2s;
  transform: ${(props) => (props.flipped ? "rotateY(90deg)" : "rotateY(0deg)")};
  width: ${(props) => (props.gridAmount === 8 ? "72px" : "46px")};
  height: ${(props) => (props.gridAmount === 8 ? "72px" : "46px")};
  font-size: ${(props) => (props.gridAmount === 8 ? "40px" : "24px")};
  line-height: ${(props) => (props.gridAmount === 8 ? "50px" : "30px")};
  border-radius: ${(props) => (props.gridAmount === 8 ? "60px" : "40px")};
  @media (min-width: 768px) {
    width: ${(props) => (props.gridAmount === 8 ? "118px" : "82px")};
    height: ${(props) => (props.gridAmount === 8 ? "118px" : "82px")};
    font-size: ${(props) => (props.gridAmount === 8 ? "56px" : "44px")};
    line-height: ${(props) => (props.gridAmount === 8 ? "70px" : "55px")};
  }
`;
