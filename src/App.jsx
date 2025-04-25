import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="bg-white flex flex-col md:flex-row justify-between space-y-4 md:rounded-lg my-[4%] md:my-[10%] w-[60%] mx-auto shadow-2xl">
      <div className="flex space-y-4 flex-col px-4 py-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center justify-between">
          <h1 className="text-gray-700 font-semibold">Mortgage Calculator</h1>
          <a href="#" className="text-sm underline text-[hsl(200,24%,40%)]">
            Clear All
          </a>
        </div>
        <MortgageForm />
      </div>
      <Results />
    </div>
  );
}

function MortgageForm() {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  // Handle Mortgage Calculations
  const handleCalculations = () => {}
  // End of Mortagage Calculations

  // Formatting mortgage amount
  const formatNumberWithCommas = (value) => {
    const [intPart, decimalPart] = value.split(".");

    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart !== undefined
      ? `${formattedInt}.${decimalPart}`
      : formattedInt;
  };
  // End of formatting

  return (
    <>
      <div class="flex flex-col">
        <p class="text-sm text-[hsl(200,24%,40%)]">Mortgage Amount</p>
        <input
          type="text"
          className="border text-[hsl(200,24%,40%)] border-[hsl(200,24%,40%)] focus:outline-none md:w-96 px-3 py-1.5 rounded-md"
          value={mortgageAmount}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "");

            // Allow only numbers and one optional decimal
            if (!/^\d*\.?\d*$/.test(raw)) return;

            setMortgageAmount(formatNumberWithCommas(raw));
          }}
        />
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex flex-col">
          <p class="text-sm text-[hsl(200,24%,40%)]">Mortgage Term In Years</p>
          <input
            type="text"
            class="border border-[hsl(200,24%,40%)] text-[hsl(200,24%,40%)] focus:outline-none px-3 py-1.5 rounded-md"
            value={mortgageTerm}
            onChange={(e) => setMortgageTerm(Number(Math.abs(e.target.value)))}
          />
        </div>

        <div class="flex flex-col">
          <p class="text-sm text-[hsl(200,24%,40%)]">Interest Rate</p>
          <input
            type="text"
            className="border text-[hsl(200,24%,40%)] border-[hsl(200,24%,40%)] focus:outline-none px-3 py-1.5 rounded-md"
            value={interestRate}
            onChange={(e) => {
              const value = e.target.value;

              // Allow only numbers with optional decimal (e.g., 5, 5.2, .2)
              if (/^\d*\.?\d*$/.test(value)) {
                setInterestRate(value);
              }
            }}
          />
        </div>
      </div>

      <div>
        <p class="text-sm text-[hsl(200,24%,40%)]">Mortgage Type</p>

        <div class="space-y-2">
          <label
            htmlFor="repayment-only"
            className={`flex items-center gap-3 border rounded-md px-3 py-2 cursor-pointer transition ${
              paymentOption === "repayment-only"
                ? "border-[hsl(61,70%,52%)]"
                : "border-[hsl(200,24%,40%)]"
            }`}
          >
            <input
              id="repayment-only"
              type="radio"
              name="payment"
              value="repayment-only"
              checked={paymentOption === "repayment-only"}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="appearance-none h-5 w-5 border-2 border-[hsl(200,24%,40%)] rounded-full checked:bg-[hsl(61,70%,52%)] checked:border-[hsl(61,70%,52%)]"
            />
            <p className="font-semibold">Repayment</p>
          </label>

          <label
            htmlFor="interest-only"
            className={`flex items-center gap-3 border rounded-md px-3 py-2 cursor-pointer transition ${
              paymentOption === "interest-only"
                ? "border-[hsl(61,70%,52%)]"
                : "border-[hsl(200,24%,40%)]"
            }`}
          >
            <input
              id="interest-only"
              type="radio"
              name="payment"
              value="interest-only"
              checked={paymentOption === "interest-only"}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="appearance-none h-5 w-5 border-2 border-[hsl(200,24%,40%)] rounded-full checked:bg-[hsl(61,70%,52%)] checked:border-[hsl(61,70%,52%)]"
            />
            <p className="font-semibold">Interest Only</p>
          </label>
        </div>
      </div>
      <button class="flex justify-center w-full md:w-1/2 mt-2 bg-[hsl(61,70%,52%)] px-4 py-2 rounded-full items-center gap-1 cursor-pointer text-sm font-semibold">
        <span>
          <img src="./assets/images/icon-calculator.svg" alt="" srcset="" />
        </span>
        Calculate Repayments
      </button>
    </>
  );
}

function Results() {
  return (
    <>
      <div class="bg-[hsl(202,55%,16%)] flex flex-col justify-center space-y-2 items-center p-12 md:rounded-lg md:rounded-bl-[70px] md:w-[40%]">
        <img
          src="./assets/images/illustration-empty.svg"
          class="w-40 h-50 md:h-62"
          alt="illustration-empty"
          srcset=""
        />
        <p class="text-white text-lg md:text-2xl font-semibold">Results shown here</p>
        <p class="text-white text-xs font-thin text-center md:w-[290px]">
          Complete the form and click <strong>“calculate repayments”</strong> to
          see what your monthly repayments would be.
        </p>
      </div>
    </>
  );
}

export default App;
