import React from "react";
import "../styles/CurrencyInput.css";

const CurrencyInput = ({
  data,
  valueSelect,
  valueImput,
  onChangeSelect,
  onChangeInput,
}) => {
  return (
    <div className="containerInput">
      <input
        value={valueImput}
        onChange={(e) => {
          onChangeInput(e);
        }}
        type="number"
      />
      <select value={valueSelect} onChange={onChangeSelect}>
        {data.map((option) => (
          <option key={option.cc} title={option.txt}>
            {option.cc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;
