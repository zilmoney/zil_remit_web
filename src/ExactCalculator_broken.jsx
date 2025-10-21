import React, { useState, useEffect, useCallback } from 'react';

const ExactCalculator = () => {
  // API configuration
  const API_BASE_URL = 'https://app.onlinecheckwriter.com/api/v4/outside/public-exchange-rate';
  
  // Country to currency code mapping
  const countryCurrencyMap = {
    'Estonia': { code: 'EE', currency: 'EUR' },
    'France': { code: 'FR', currency: 'EUR' },
    'Germany': { code: 'DE', currency: 'EUR' },
    'India': { code: 'IN', currency: 'INR' },
    'Philippines': { code: 'PH', currency: 'PHP' },
    'Sweden': { code: 'SE', currency: 'SEK' },
    'United Kingdom': { code: 'GB', currency: 'GBP' }
  };

  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedFlag, setSelectedFlag] = useState('https://zilmoney.com/wp-content/uploads/2025/09/in.png');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);
  const [isUpdatingInput, setIsUpdatingInput] = useState(false);
  const [lastEditedField, setLastEditedField] = useState('send');
  const [sendError, setSendError] = useState('');
  const [receiveError, setReceiveError] = useState('');

  // Format number with commas
  const formatNumber = (num) => {
    if (!num || isNaN(num)) return '';
    return parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Parse number from formatted string
  const parseNumber = (str) => {
    if (!str) return 0;
    return parseFloat(str.replace(/,/g, '')) || 0;
  };

  // Validate amount length (max 6 digits)
  const validateAmountLength = (value) => {
    const parts = value.split('.');
    const integerPart = parts[0].replace(/,/g, '');
    return integerPart.length <= 6;
  };

  // Fetch exchange rate from API
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
        throw new Error('Invalid API response');
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

  // Update exchange rate display
  const updateExchangeRate = async () => {
    try {
      setIsLoading(true);
      const country = countryCurrencyMap[selectedCountry];
      const result = await fetchExchangeRate(country.code, country.currency, 10, 0);
      setExchangeRate(result.rate);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      // Use fallback rate
      setExchangeRate(88.04);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate amount based on direction
  const calculateAmount = async (direction) => {
    const country = countryCurrencyMap[selectedCountry];
    
    if (direction === 'send') {
      const sendValue = parseNumber(sendAmount);
      
      if (sendValue > 0) {
        try {
          const result = await fetchExchangeRate(country.code, country.currency, sendValue, 0);
          
          if (!result.receivingAmount) {
            throw new Error('API did not return receiving_amount');
          }
          
          setExchangeRate(result.rate);
          
          // Check minimum amount
          if (sendValue < 10) {
            setSendError('Minimum sending amount must be $10.00.');
            return;
          } else {
            setSendError('');
          }
          
          setIsUpdatingInput(true);
          setReceiveAmount(formatNumber(result.receivingAmount));
          setIsUpdatingInput(false);
        } catch (error) {
          console.error('API Error in send calculation:', error);
          // Fallback calculation
          if (exchangeRate > 0) {
            const receiveValue = sendValue * exchangeRate;
            setIsUpdatingInput(true);
            setReceiveAmount(formatNumber(receiveValue));
            setIsUpdatingInput(false);
          }
        }
      } else {
        setIsUpdatingInput(true);
        setReceiveAmount('');
        setIsUpdatingInput(false);
        setSendError('');
      }
    } else if (direction === 'receive') {
      const receiveValue = parseNumber(receiveAmount);
      
      if (receiveValue > 0) {
        try {
          const result = await fetchExchangeRate(country.code, country.currency, receiveValue, 1);
          
          if (!result.sendingAmount) {
            throw new Error('API did not return sending_amount');
          }
          
          setExchangeRate(result.rate);
          
          // Check minimum amount
          if (result.sendingAmount < 10) {
            setSendError('Minimum sending amount must be $10.00.');
            setIsUpdatingInput(true);
            setSendAmount(formatNumber(result.sendingAmount));
            setIsUpdatingInput(false);
            return;
          } else {
            setSendError('');
          }
          
          setIsUpdatingInput(true);
          setSendAmount(formatNumber(result.sendingAmount));
          setIsUpdatingInput(false);
        } catch (error) {
          console.error('API Error in receive calculation:', error);
          // Fallback calculation
          if (exchangeRate > 0) {
            const sendValue = receiveValue / exchangeRate;
            setIsUpdatingInput(true);
            setSendAmount(formatNumber(sendValue));
            setIsUpdatingInput(false);
          }
        }
      } else {
        setIsUpdatingInput(true);
        setSendAmount('');
        setIsUpdatingInput(false);
        setSendError('');
      }
    }
  };

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedCalculateSend = useCallback(debounce(() => {
    const value = parseNumber(sendAmount);
    if (value > 0 && value < 10) {
      setSendError('Minimum sending amount must be $10.00.');
      return;
    } else {
      setSendError('');
    }
    if (value > 0) {
      calculateAmount('send');
    }
  }, 600), [sendAmount, selectedCountry, exchangeRate]);

  const debouncedCalculateReceive = useCallback(debounce(() => {
    const value = parseNumber(receiveAmount);
    if (value > 0) {
      setReceiveError('');
      calculateAmount('receive');
    }
  }, 600), [receiveAmount, selectedCountry, exchangeRate]);

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
      setSendError('Maximum amount is 100,000.00');
      const integerPart = parts[0].replace(/,/g, '');
      if (integerPart.length > 6) {
        const truncatedInteger = integerPart.substring(0, 6);
        value = parts.length === 2 ? truncatedInteger + '.' + parts[1] : truncatedInteger;
      }
    } else {
      setSendError('');
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
      setReceiveError('Maximum amount is 999,999.99');
      const integerPart = parts[0].replace(/,/g, '');
      if (integerPart.length > 6) {
        const truncatedInteger = integerPart.substring(0, 6);
        value = parts.length === 2 ? truncatedInteger + '.' + parts[1] : truncatedInteger;
      }
    } else {
      setReceiveError('');
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
  const selectCurrency = (country, currency, flagUrl) => {
    setSelectedCountry(country);
    setSelectedCurrency(currency);
    setSelectedFlag(flagUrl);
    setIsDropdownOpen(false);
    
    // Clear amounts and recalculate
    setSendAmount('');
    setReceiveAmount('');
    setSendError('');
    setReceiveError('');
    
    // Update exchange rate for new currency
    setTimeout(() => {
      updateExchangeRate();
    }, 100);
  };

  // Initialize calculator
  useEffect(() => {
    updateExchangeRate();
  }, [selectedCountry]);

  const countries = [
    { name: 'Estonia', currency: 'EUR', flag: 'https://zilmoney.com/wp-content/uploads/2025/09/ee.png' },
    { name: 'France', currency: 'EUR', flag: 'https://zilmoney.com/wp-content/uploads/2025/09/fr.png' },
    { name: 'Germany', currency: 'EUR', flag: 'https://zilmoney.com/wp-content/uploads/2025/09/de.png' },
    { name: 'India', currency: 'INR', flag: 'https://zilmoney.com/wp-content/uploads/2025/09/in.png' },
    { name: 'Philippines', currency: 'PHP', flag: 'https://zilmoney.com/wp-content/uploads/2025/09/ph.png' },
    { name: 'Sweden', currency: 'SEK', flag: 'https://zilmoney.com/wp-content/uploads/2025/09/se.png' },
    { name: 'United Kingdom', currency: 'GBP', flag: 'https://zilmoney.com/wp-content/uploads/2025/09/gb.png' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
      {/* Fluidic border effect */}
      
      
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Calculate your transfer</h2>
        
        <div className="mb-8">
          <span className="text-gray-600">1 USD = </span>
          {isLoading ? (
            <span className="inline-block w-16 h-4 bg-gray-200 animate-pulse rounded"></span>
          ) : (
            <span className="font-semibold">{exchangeRate.toFixed(2)}</span>
          )}
          <span className="ml-1 text-gray-600">{selectedCurrency}</span>
        

        {/* Send Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Send Amount</label>
          <div className={`flex items-center border-2 rounded-xl bg-white transition-colors ${sendError ? 'border-red-500' : 'border-gray-200 focus-within:border-blue-500'}`}>
            <input
              type="text"
              value={sendAmount}
              onChange={handleSendAmountChange}
              onFocus={() => setLastEditedField('send')}
              onBlur={(e) => {
                if (!isUpdatingInput && e.target.value) {
                  const value = parseFloat(e.target.value) || 0;
                  if (value > 0) {
                    setSendAmount(formatNumber(value));
                    if (value < 10) {
                      setSendError('Minimum sending amount must be $10.00.');
                    } else if (value > 100000) {
                      setSendError('Maximum amount is 100,000.00');
                    } else {
                      setSendError('');
                      calculateAmount('send');
                    }
                  }
                }
              }}
              placeholder="0.00"
              className="flex-1 px-4 py-5 text-2xl font-semibold outline-none bg-transparent"
            />
            <div className="flex items-center px-4 py-5 gap-2">
              <img src="https://zilmoney.com/wp-content/uploads/2025/09/us.png" alt="USD" className="w-6 h-6 rounded-full object-cover border border-gray-200" />
              <span className="font-semibold text-gray-700">USD</span>
            
          
          {sendError && <div className="text-red-500 text-sm mt-2">{sendError}</div>}
        

        {/* Receive Amount */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Receiving amount</label>
          <div className={`flex items-center border-2 rounded-xl bg-white transition-colors ${receiveError ? 'border-red-500' : 'border-gray-200 focus-within:border-blue-500'}`}>
            <input
              type="text"
              value={receiveAmount}
              onChange={handleReceiveAmountChange}
              onFocus={() => setLastEditedField('receive')}
              onBlur={(e) => {
                if (!isUpdatingInput && e.target.value) {
                  const value = parseFloat(e.target.value) || 0;
                  if (value > 0) {
                    setReceiveAmount(formatNumber(value));
                    setReceiveError('');
                    calculateAmount('receive');
                  }
                }
              }}
              placeholder="0.00"
              className="flex-1 px-4 py-5 text-2xl font-semibold outline-none bg-transparent"
            />
            <div className="relative">
              <div 
                className="flex items-center px-4 py-5 gap-2 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img src={selectedFlag} alt={selectedCountry} className="w-6 h-6 rounded-full object-cover border border-gray-200" />
                <span className="font-semibold text-gray-700">{selectedCurrency}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48 max-h-64 overflow-y-auto">
                  {countries.map((country) => (
                    <div
                      key={country.name}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer gap-3"
                      onClick={() => selectCurrency(country.name, country.currency, country.flag)}
                    >
                      <img src={country.flag} alt={country.name} className="w-6 h-6 rounded-full object-cover border border-gray-200" />
                      <span className="text-gray-700">{country.name}</span>
                    
                  ))}
                
              )}
            
          
          {receiveError && <div className="text-red-500 text-sm mt-2">{receiveError}</div>}
        

        {/* Sign Up Button */}
        <a 
          href="https://app.zilremit.com/signup" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-5 px-8 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 inline-block text-center"
        >
          Sign Up to Send Money
        </a>
      
    
  );
};

export default ExactCalculator;
