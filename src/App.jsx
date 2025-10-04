import React, { useState } from "react";
import "./App.css";

function Display({ value }) {
  return (
    <input
      className="display"
      type="text"
      value={value}
      disabled
    />
  );
}

function Button({ label, className = "", onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [operand, setOperand] = useState("");
  const [Operation, setOperation] = useState("");
  const [InitialOp, setInitialOp] = useState("");
  const [Computed, setComputed] = useState(false);

  const fullName = "Aaron Laxamana";
  const section = "IT3A";

  const handleNumberClick = (label) => {
    let newOperand = operand;

    if (Computed) {
      newOperand = label;
      setComputed(false);
    } else if (operand === "0" && label !== "0") {
      newOperand = label;
    } else {
      newOperand = operand + label;
    }

    setOperand(newOperand);
    setDisplay(newOperand);
  };

  const handleOperatorClick = (op) => {
    if (operand !== "") {
      setInitialOp(operand);
      setOperation(op);
      setOperand("");
      setDisplay(op);
      setComputed(false);
    }
  };

  const handleClearClick = () => {
    setOperand("");
    setOperation("");
    setInitialOp("");
    setDisplay("0");
    setComputed(false);
  };

  const handleEqualsClick = () => {
    if (InitialOp !== "" && Operation !== "" && operand !== "") {
      let result = 0;
      const a = parseFloat(InitialOp);
      const b = parseFloat(operand);
      if (Operation === "+") {
        result = a + b;
      } else if (Operation === "-") {
        result = a - b;
      } else if (Operation === "*") {
        result = a * b;
      } else if (Operation === "÷") {
        if (b === 0) {
          setDisplay("Error");
          setOperand("");
          setOperation("");
          setInitialOp("");
          setComputed(false);
          return;
        }
        result = a / b;
      }
      setDisplay(result.toString());
      setOperand(result.toString());
      setOperation("");
      setInitialOp("");
      setComputed(true);
    }
  };

  const handleSurnameClick = () => {
    setDisplay(fullName);
    setComputed(false);
  };

  return (
    <div className="container">
      <h1 className="header">Calculator of {fullName} - {section}</h1>

      <div className="calculator">
        <Display value={display} />
        <div className="buttons">
          <Button label="7" className="number" onClick={() => handleNumberClick("7")} />
          <Button label="8" className="number" onClick={() => handleNumberClick("8")} />
          <Button label="9" className="number" onClick={() => handleNumberClick("9")} />
          <Button label="÷" className="operator" onClick={() => handleOperatorClick("÷")} />

          <Button label="4" className="number" onClick={() => handleNumberClick("4")} />
          <Button label="5" className="number" onClick={() => handleNumberClick("5")} />
          <Button label="6" className="number" onClick={() => handleNumberClick("6")} />
          <Button label="*" className="operator" onClick={() => handleOperatorClick("*")} />

          <Button label="1" className="number" onClick={() => handleNumberClick("1")} />
          <Button label="2" className="number" onClick={() => handleNumberClick("2")} />
          <Button label="3" className="number" onClick={() => handleNumberClick("3")} />
          <Button label="-" className="operator" onClick={() => handleOperatorClick("-")} />

          <Button label="C" className="clear" onClick={handleClearClick} />
          <Button label="0" className="number" onClick={() => handleNumberClick("0")} />
          <Button label="=" className="equal" onClick={handleEqualsClick} />
          <Button label="+" className="operator" onClick={() => handleOperatorClick("+")} />

          <Button label="Laxamana" className="surname" onClick={handleSurnameClick} />
        </div>
      </div>
    </div>
  );
}
