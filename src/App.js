import React, { useEffect, useState } from "react";
import Servise from "./components/API/Servise";
import CurrencyInput from "./components/CurrencyInput";

function App() {
  const [data, setData] = useState([]);
  const [firstCur, setFirstCur] = useState([]);
  const [secondCur, setSecondCur] = useState([]);
  const [firstAmount, setFirstAmount] = useState("");
  const [secondAmount, setSecondAmount] = useState("");
  // Завантаження данних актуального курсу валют по відношенню до UAH
  useEffect(() => {
    const response = Servise.getData();
    response
      .then((res) => {
        setData(
          [
            ...res,
            {
              r030: 0,
              txt: "Українська гривня",
              rate: 1,
              cc: "UAH",
              exchangedate: "",
            },
          ].sort((a, b) => a.cc.localeCompare(b.cc))
        );
        setFirstCur({
          r030: 0,
          txt: "Українська гривня",
          rate: 1,
          cc: "UAH",
          exchangedate: "",
        });
        setSecondCur(res[0]);
      })
      .catch((er) => alert(er));
  }, []);
  // Функції конвертування
  const firstAmountHendler = (e) => {
    if (e.target) {
      setSecondAmount(
        ((e.target.value * firstCur.rate) / secondCur.rate).toFixed(2)
      );
      setFirstAmount(e.target.value);
    } else if (e) {
      setSecondAmount(((e * firstCur.rate) / secondCur.rate).toFixed(2));
    }
  };
  const secondAmountHendler = (e) => {
    if (e.target) {
      setFirstAmount(
        ((e.target.value * secondCur.rate) / firstCur.rate).toFixed(2)
      );
      setSecondAmount(e.target.value);
    } else if (e) {
      setFirstAmount(((e * secondCur.rate) / firstCur.rate).toFixed(2));
    }
  };
  // Перерахунок суми при змінні валюти
  useEffect(() => {
    secondAmountHendler(secondAmount);
  }, [firstCur]);
  useEffect(() => {
    firstAmountHendler(firstAmount);
  }, [secondCur]);

  return (
    <div className="App">
      <h2>Конвертер валют</h2>
      <CurrencyInput
        valueImput={firstAmount}
        onChangeInput={firstAmountHendler}
        onChangeSelect={(e) =>
          setFirstCur(data.filter((cur) => cur.cc === e.target.value)[0])
        }
        valueSelect={firstCur.cc}
        data={data}
      />
      <CurrencyInput
        valueImput={secondAmount}
        onChangeInput={secondAmountHendler}
        onChangeSelect={(e) => {
          setSecondCur(data.filter((cur) => cur.cc === e.target.value)[0]);
        }}
        valueSelect={secondCur.cc}
        data={data}
      />
    </div>
  );
}

export default App;
