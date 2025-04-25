import { useState } from "react";
import "./App.css";

function App() {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [monthlyPayment, setmonthlyPayment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = () => {
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setPaymentOption("");
    setIsSubmitted(false)
  };

  // Handle Mortgage Calculations
  const handleCalculations = () => {
    const principal = parseFloat(mortgageAmount.replace(/,/g, ""));
    const term = parseFloat(mortgageTerm);
    const rate = parseFloat(interestRate);

    if (isNaN(principal) || isNaN(term) || isNaN(rate)) {
      alert("Please fill in all fields with valid numbers");
      return;
    }

    const r = rate / 100 / 12;
    const n = term * 12;

    const payment =
      paymentOption === "interest-only"
        ? (principal * r).toFixed(2)
        : (
            (principal * r * Math.pow(1 + r, n)) /
            (Math.pow(1 + r, n) - 1)
          ).toFixed(2);

    setmonthlyPayment(payment);
    setIsSubmitted(true);
  };

  // End of Mortagage Calculations

  return (
    <div className="bg-white flex flex-col md:flex-row justify-between space-y-4 md:rounded-lg my-[4%] md:my-[10%] w-[90%] md:w-[60%] mx-auto shadow-2xl">
      <div className="flex space-y-4 flex-col px-4 py-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center justify-between">
          <h1 className="text-gray-700 font-semibold">Mortgage Calculator</h1>
          <a
            href="#"
            className="text-sm underline text-[hsl(200,24%,40%)]"
            onClick={handleReset}
          >
            Clear All
          </a>
        </div>
        <MortgageForm
          mortgageAmount={mortgageAmount}
          setMortgageAmount={setMortgageAmount}
          mortgageTerm={mortgageTerm}
          setMortgageTerm={setMortgageTerm}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          paymentOption={paymentOption}
          setPaymentOption={setPaymentOption}
          handleCalculations={handleCalculations}
        />
      </div>
      <Results
        monthlyPayment={monthlyPayment}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
    </div>
  );
}

function MortgageForm({
  mortgageAmount,
  setMortgageAmount,
  mortgageTerm,
  setMortgageTerm,
  interestRate,
  setInterestRate,
  paymentOption,
  setPaymentOption,
  handleCalculations,
}) {
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
      <div className="flex flex-col">
        <p className="text-sm text-[hsl(200,24%,40%)]">Mortgage Amount</p>
        <input
          type="text"
          className="border text-[hsl(200,24%,40%)] border-[hsl(200,24%,40%)] focus:outline-none md:w-96 px-3 py-1.5 rounded-md"
          value={mortgageAmount}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "");

            if (!/^\d*\.?\d*$/.test(raw)) return;

            setMortgageAmount(formatNumberWithCommas(raw));
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col">
          <p className="text-sm text-[hsl(200,24%,40%)]">
            Mortgage Term In Years
          </p>
          <input
            type="text"
            inputMode="numeric"
            className="border border-[hsl(200,24%,40%)] text-[hsl(200,24%,40%)] focus:outline-none px-3 py-1.5 rounded-md"
            value={mortgageTerm}
            onChange={(e) => {
              const input = e.target.value;

              if (/^\d*$/.test(input)) {
                setMortgageTerm(input);
              }
            }}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-[hsl(200,24%,40%)]">Interest Rate</p>
          <input
            type="text"
            className="border text-[hsl(200,24%,40%)] border-[hsl(200,24%,40%)] focus:outline-none px-3 py-1.5 rounded-md"
            value={interestRate}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d*\.?\d*$/.test(value)) {
                setInterestRate(value);
              }
            }}
          />
        </div>
      </div>

      <div>
        <p className="text-sm text-[hsl(200,24%,40%)]">Mortgage Type</p>

        <div className="space-y-2">
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
      <button
        className="flex justify-center w-full md:w-1/2 mt-2 bg-[hsl(61,70%,52%)] px-4 py-2 rounded-full items-center gap-1 cursor-pointer text-sm font-semibold"
        onClick={handleCalculations}
      >
        <span>
          <img src="./assets/images/icon-calculator.svg" alt="" srcset="" />
        </span>
        Calculate Repayments
      </button>
    </>
  );
}

function Results({ monthlyPayment, isSubmitted }) {
  return (
    <>
      {/* Results Container */}
      <div
        className={`bg-[hsl(202,55%,16%)] justify-center space-y-2 items-center p-12 md:rounded-lg md:rounded-bl-[70px] md:w-[40%] ${
          !isSubmitted ? "flex flex-col" : "hidden"
        }`}
      >
        <img
          src="./assets/images/illustration-empty.svg"
          className="w-40 h-50 md:h-62"
          alt="illustration-empty"
          srcset=""
        />
        <p className="text-white text-lg md:text-2xl font-semibold">
          Results shown here
        </p>
        <p className="text-white text-xs font-thin text-center md:w-[290px]">
          Complete the form and click <strong>“calculate repayments”</strong> to
          see what your monthly repayments would be.
        </p>
      </div>

      {/* Results Card */}
      <div
        className={`bg-[hsl(202,55%,16%)] justify-start space-y-4 items-start p-4 md:rounded-lg md:rounded-bl-[70px] md:w-[40%] ${
          isSubmitted ? "flex flex-col" : "hidden"
        }`}
      >
        <p className="text-slate-100 text-xl font-semibold">Your results</p>
        <p className="text-slate-300 text-xs">
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click “calculate repayments”
          again.
        </p>
        <div className="border w-full bg-[hsl(201,56%,8%)] border-[hsl(202,55%,16%)] border-t-[hsl(61,70%,52%)] space-y-2 border-t-2 flex flex-col px-4 py-3 items-start rounded-2xl shadow-xl">
          <p className="text-xs text-slate-300">Your monthly repayments</p>
          <p className="text-[hsl(61,70%,52%)] text-4xl font-medium">
            ${monthlyPayment}
          </p>
          <div className="h-[1px] w-full bg-slate-100 opacity-40"></div>
          <div className="flex flex-col space-y-1 items-start mt-3">
            <p className="text-slate-300 text-xs">
              Total you'll repay over the term
            </p>
            <p className="text-slate-100 text-xl">$539,322.94</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
