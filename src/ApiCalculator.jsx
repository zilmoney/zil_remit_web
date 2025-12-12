import React, { useState, useEffect, useCallback } from 'react';

const ApiCalculator = () => {
  // API configuration
  const API_BASE_URL = 'https://OCW-14616-SALMAN.api.ocw.sebipay.com/api/v4/outside/public-exchange-rate';
  
  // Country to currency code mapping
  const countryCurrencyMap = {
    'Estonia': { code: 'EE', currency: 'EUR', flag: 'https://flagcdn.com/w320/ee.png' },
    'France': { code: 'FR', currency: 'EUR', flag: 'https://flagcdn.com/w320/fr.png' },
    'Germany': { code: 'DE', currency: 'EUR', flag: 'https://flagcdn.com/w320/de.png' },
    'India': { code: 'IN', currency: 'INR', flag: 'https://flagcdn.com/w320/in.png' },
    'Ireland': { code: 'IE', currency: 'EUR', flag: 'https://flagcdn.com/w320/ie.png' },
    'Italy': { code: 'IT', currency: 'EUR', flag: 'https://flagcdn.com/w320/it.png' },
    'Philippines': { code: 'PH', currency: 'PHP', flag: 'https://flagcdn.com/w320/ph.png' },
    'Sweden': { code: 'SE', currency: 'SEK', flag: 'https://flagcdn.com/w320/se.png' },
    'United Kingdom': { code: 'GB', currency: 'GBP', flag: 'https://flagcdn.com/w320/gb.png' }
  };

  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [currentReceiveCurrency, setCurrentReceiveCurrency] = useState('India');
  const [currentExchangeRate, setCurrentExchangeRate] = useState(0);
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);
  const [isUpdatingInput, setIsUpdatingInput] = useState(false);
  const [lastEditedField, setLastEditedField] = useState('send');
  const [showDropdown, setShowDropdown] = useState(false);
  const [sendAmountError, setSendAmountError] = useState('');
  const [receiveAmountError, setReceiveAmountError] = useState('');

  // Function to fetch exchange rate from API
  const fetchExchangeRate = async (countryCode, payoutCurrencyCode, amount = 10, isReceivingAmount = 0) => {
    setIsApiCallInProgress(true);
    
    try {
      const url = `${API_BASE_URL}?countryCode=${countryCode}&payoutCurrencyCode=${payoutCurrencyCode}&amount=${amount}&isReceivingAmount=${isReceivingAmount}`;
      console.log('API Request:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.success || !data.data) {
        throw new Error('Invalid API response structure');
      }
      
      const rate = data.data.customer_exchange_rate;
      const receivingAmount = data.data.receiving_amount;
      const sendingAmount = data.data.sending_amount;
      
      return {
        rate: parseFloat(rate),
        receivingAmount: receivingAmount ? parseFloat(receivingAmount) : null,
        sendingAmount: sendingAmount ? parseFloat(sendingAmount) : null
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    } finally {
      setIsApiCallInProgress(false);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const parseNumber = (str) => {
    return parseFloat(str.replace(/,/g, '')) || 0;
  };

  const validateAmountLength = (value) => {
    const parts = value.split('.');
    const integerPart = parts[0].replace(/,/g, '');
    return integerPart.length <= 6;
  };

  // Update exchange rate display
  const updateExchangeRate = async () => {
    const receiveCountry = countryCurrencyMap[currentReceiveCurrency];
    if (!receiveCountry) return;

    try {
      const result = await fetchExchangeRate(receiveCountry.code, receiveCountry.currency, 10, 0);
      setCurrentExchangeRate(result.rate);
    } catch (error) {
      console.error('Failed to update exchange rate:', error);
    }
  };

  // Calculate amount based on direction
  const calculateAmount = async (direction = 'send') => {
    if (isUpdatingInput) return;
    
    setLastEditedField(direction);
    const receiveCountry = countryCurrencyMap[currentReceiveCurrency];
    if (!receiveCountry) return;

    if (direction === 'send') {
      const sendAmountValue = parseNumber(sendAmount);
      
      if (sendAmountValue >= 10) {
        try {
          const result = await fetchExchangeRate(receiveCountry.code, receiveCountry.currency, sendAmountValue, 0);
          setCurrentExchangeRate(result.rate);
          
          if (result.receivingAmount) {
            setIsUpdatingInput(true);
            setReceiveAmount(formatNumber(result.receivingAmount));
            setIsUpdatingInput(false);
          }
          setSendAmountError('');
        } catch (error) {
          console.error('API Error in send calculation:', error);
          // Fallback to local calculation
          if (currentExchangeRate > 0) {
            const receiveAmountValue = sendAmountValue * currentExchangeRate;
            setIsUpdatingInput(true);
            setReceiveAmount(formatNumber(receiveAmountValue));
            setIsUpdatingInput(false);
          }
        }
      } else if (sendAmountValue > 0 && sendAmountValue < 10) {
        setSendAmountError('Minimum sending amount must be $10.00.');
      } else {
        setIsUpdatingInput(true);
        setReceiveAmount('');
        setIsUpdatingInput(false);
        setSendAmountError('');
      }
    } else if (direction === 'receive') {
      const receiveAmountValue = parseNumber(receiveAmount);
      
      if (receiveAmountValue > 0) {
        try {
          const result = await fetchExchangeRate(receiveCountry.code, receiveCountry.currency, receiveAmountValue, 1);
          setCurrentExchangeRate(result.rate);
          
          if (result.sendingAmount) {
            if (result.sendingAmount < 10) {
              setSendAmountError('Minimum sending amount must be $10.00.');
            } else {
              setSendAmountError('');
            }
            
            setIsUpdatingInput(true);
            setSendAmount(formatNumber(result.sendingAmount));
            setIsUpdatingInput(false);
          }
        } catch (error) {
          console.error('API Error in receive calculation:', error);
          // Fallback to local calculation
          if (currentExchangeRate > 0) {
            const sendAmountValue = receiveAmountValue / currentExchangeRate;
            if (sendAmountValue < 10) {
              setSendAmountError('Minimum sending amount must be $10.00.');
            } else {
              setSendAmountError('');
            }
            setIsUpdatingInput(true);
            setSendAmount(formatNumber(sendAmountValue));
            setIsUpdatingInput(false);
          }
        }
      } else {
        setIsUpdatingInput(true);
        setSendAmount('');
        setIsUpdatingInput(false);
        setSendAmountError('');
      }
    }
  };

  // Debounce utility
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedCalculateSend = useCallback(debounce(() => {
    calculateAmount('send');
  }, 600), [sendAmount, currentReceiveCurrency, currentExchangeRate]);

  const debouncedCalculateReceive = useCallback(debounce(() => {
    calculateAmount('receive');
  }, 600), [receiveAmount, currentReceiveCurrency, currentExchangeRate]);

  // Handle send amount input
  const handleSendAmountChange = (e) => {
    if (isUpdatingInput) return;
    
    setLastEditedField('send');
    let value = e.target.value.replace(/[^\d.]/g, '');
    
    // Prevent multiple decimal points
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit decimal places to 2
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    // Check 6-digit limit
    if (!validateAmountLength(value)) {
      setSendAmountError('Maximum amount is 100,000.00');
      const integerPart = parts[0].replace(/,/g, '');
      if (integerPart.length > 6) {
        const truncatedInteger = integerPart.substring(0, 6);
        value = parts.length === 2 ? truncatedInteger + '.' + parts[1] : truncatedInteger;
      }
    } else {
      setSendAmountError('');
    }
    
    setSendAmount(value);
    
    if (!value || parseNumber(value) === 0) {
      setIsUpdatingInput(true);
      setReceiveAmount('');
      setIsUpdatingInput(false);
    }
    
    debouncedCalculateSend();
  };

  // Handle receive amount input
  const handleReceiveAmountChange = (e) => {
    if (isUpdatingInput) return;
    
    setLastEditedField('receive');
    let value = e.target.value.replace(/[^\d.]/g, '');
    
    // Prevent multiple decimal points
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit decimal places to 2
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    // Check 6-digit limit
    if (!validateAmountLength(value)) {
      setReceiveAmountError('Maximum amount is 999,999.99');
      const integerPart = parts[0].replace(/,/g, '');
      if (integerPart.length > 6) {
        const truncatedInteger = integerPart.substring(0, 6);
        value = parts.length === 2 ? truncatedInteger + '.' + parts[1] : truncatedInteger;
      }
    } else {
      setReceiveAmountError('');
    }
    
    setReceiveAmount(value);
    
    if (!value || parseNumber(value) === 0) {
      setIsUpdatingInput(true);
      setSendAmount('');
      setIsUpdatingInput(false);
    }
    
    debouncedCalculateReceive();
  };

  // Handle currency selection
  const selectCurrency = (countryName) => {
    setCurrentReceiveCurrency(countryName);
    setShowDropdown(false);
    
    // Recalculate if there's input
    if (sendAmount && parseNumber(sendAmount) >= 10) {
      calculateAmount('send');
    } else if (receiveAmount && parseNumber(receiveAmount) > 0) {
      calculateAmount('receive');
    } else {
      updateExchangeRate();
    }
  };

  // Initialize calculator
  useEffect(() => {
    updateExchangeRate();
  }, []);

  // Get current receive country data
  const receiveCountry = countryCurrencyMap[currentReceiveCurrency];
  
  // Format exchange rate display
  const getExchangeRateDisplay = () => {
    if (isApiCallInProgress) {
      return <div className="inline-block w-16 h-4 bg-gray-200 animate-pulse rounded"></div>;
    }
    
    if (currentExchangeRate > 0) {
      if (lastEditedField === 'receive') {
        const inverseRate = 1 / currentExchangeRate;
        return `1 ${receiveCountry?.currency} = ${inverseRate.toFixed(4)} USD`;
      } else {
        return `1 USD = ${currentExchangeRate.toFixed(2)} ${receiveCountry?.currency}`;
      }
    }
    
    return `1 USD = -- ${receiveCountry?.currency}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 card-hover backdrop-blur-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate your transfer</h3>
      <p className="text-gray-600 font-medium mb-6">{getExchangeRateDisplay()}</p>
      
      {/* Send Amount */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Send Amount</label>
        <div className="relative">
          <input
            type="text"
            value={sendAmount}
            onChange={handleSendAmountChange}
            disabled={isApiCallInProgress}
            className={`w-full px-4 py-4 text-2xl font-bold border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-20 ${
              sendAmountError ? 'border-red-500' : 'border-gray-300'
            } ${isApiCallInProgress ? 'opacity-60 cursor-not-allowed' : ''}`}
            placeholder="0.00"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2 flex items-center justify-center bg-blue-600">
              <img src="https://flagcdn.com/w320/us.png" alt="USD" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-gray-700 text-sm">USD</span>
          </div>
        </div>
        {sendAmountError && <div className="text-red-500 text-sm mt-1">{sendAmountError}</div>}
      </div>

      {/* Receive Amount */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Receiving amount</label>
        <div className="relative">
          <input
            type="text"
            value={receiveAmount}
            onChange={handleReceiveAmountChange}
            disabled={isApiCallInProgress}
            className={`w-full px-4 py-4 text-2xl font-bold border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-20 ${
              receiveAmountError ? 'border-red-500' : 'border-gray-300'
            } ${isApiCallInProgress ? 'opacity-60 cursor-not-allowed' : ''}`}
            placeholder="0.00"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="relative">
              <div 
                className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-200 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden mr-2 flex items-center justify-center">
                  <img src={receiveCountry?.flag} alt={currentReceiveCurrency} className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-gray-700 text-sm pr-2">{receiveCountry?.currency}</span>
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                  {Object.entries(countryCurrencyMap).map(([countryName, countryData]) => (
                    <div
                      key={countryName}
                      className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => selectCurrency(countryName)}
                    >
                      <img src={countryData.flag} alt={countryName} className="w-5 h-5 rounded-full mr-2" />
                      <span className="text-sm">{countryName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {receiveAmountError && <div className="text-red-500 text-sm mt-1">{receiveAmountError}</div>}
      </div>

      <a 
        href="https://app.zilremit.com/signup" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`block w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary shadow-lg hover:shadow-xl text-center ${
          isApiCallInProgress ? 'opacity-60 pointer-events-none' : ''
        }`}
      >
        Sign Up to Send Money
      </a>
    </div>
  );
};

export default ApiCalculator;
