import React, { useState } from 'react';

interface CalculatorFormProps {
  onCalculate: (wattage: string, hours: string, days: string) => void;
  onReset: () => void;
  error: string;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate, onReset, error }) => {
  const [wattage, setWattage] = useState('');
  const [hours, setHours] = useState('');
  const [days, setDays] = useState('30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(wattage, hours, days);
  };

  const handleReset = () => {
    setWattage('');
    setHours('');
    setDays('30');
    onReset();
  };

  const handleNumericChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    maxDecimals: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (maxDecimals === 0) {
      // For integer-only fields, allow only digits.
      if (!/^\d*$/.test(value)) {
        return;
      }
    } else {
      // For decimal fields, allow numbers and one dot.
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }
      // Truncate to maxDecimals
      const parts = value.split('.');
      if (parts[1] && parts[1].length > maxDecimals) {
        value = `${parts[0]}.${parts[1].slice(0, maxDecimals)}`;
      }
    }
    setter(value);
  };
  
  const InputField: React.FC<{
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    unit: string;
    inputMode: 'numeric' | 'decimal';
  }> = ({ label, value, onChange, placeholder, unit, inputMode }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          required
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 text-sm">{unit}</span>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField 
        label="Appliance Wattage"
        value={wattage}
        onChange={handleNumericChange(setWattage, 0)}
        placeholder="e.g., 100"
        unit="Watts"
        inputMode="numeric"
      />
      <InputField 
        label="Usage per Day"
        value={hours}
        onChange={handleNumericChange(setHours, 2)}
        placeholder="e.g., 8.5"
        unit="Hours"
        inputMode="decimal"
      />
      <InputField 
        label="Billing Cycle"
        value={days}
        onChange={handleNumericChange(setDays, 0)}
        placeholder="e.g., 30"
        unit="Days"
        inputMode="numeric"
      />
      
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300"
        >
          Calculate Bill
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
