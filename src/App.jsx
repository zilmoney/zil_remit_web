import React, { useState, useEffect } from 'react';
import ExactCalculator from './ExactCalculator';
import CallbackForm from './CallbackForm';
import './App.css';

// Animated Currency Component
const AnimatedCurrency = () => {
  const currencies = [
    { flag: 'https://flagcdn.com/w320/ee.png', code: 'EUR', country: 'Estonia' },
    { flag: 'https://flagcdn.com/w320/fr.png', code: 'EUR', country: 'France' },
    { flag: 'https://flagcdn.com/w320/de.png', code: 'EUR', country: 'Germany' },
    { flag: 'https://flagcdn.com/w320/in.png', code: 'INR', country: 'India' },
    { flag: 'https://flagcdn.com/w320/ph.png', code: 'PHP', country: 'Philippines' },
    { flag: 'https://flagcdn.com/w320/se.png', code: 'SEK', country: 'Sweden' },
    { flag: 'https://flagcdn.com/w320/gb.png', code: 'GBP', country: 'UK' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currencies.length);
    }, 1000); // Change every 1 second

    return () => clearInterval(interval);
  }, [currencies.length]);

  const currentCurrency = currencies[currentIndex];

  return (
    <div className="bg-white rounded-full px-6 py-4 flex items-center shadow-xl border-2 border-gray-100 hover:scale-105 transition-all duration-500 cursor-pointer">
      <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex items-center justify-center border border-gray-200 shadow-sm">
        <img 
          src={currentCurrency.flag} 
          alt={`${currentCurrency.country} flag`}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>
      <span className="font-bold text-gray-900 text-lg transition-all duration-300">{currentCurrency.code}</span>
    </div>
  );
};

// Enhanced Animated Payment Interface Component
const AnimatedPaymentInterface = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [sendAmount, setSendAmount] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('india');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedField, setHighlightedField] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [showSuccessParticles, setShowSuccessParticles] = useState(false);

  const countries = {
    estonia: { flag: '🇪🇪', currency: 'EUR', rate: 0.92, flagUrl: 'https://flagcdn.com/w40/ee.png' },
    france: { flag: '🇫🇷', currency: 'EUR', rate: 0.92, flagUrl: 'https://flagcdn.com/w40/fr.png' },
    germany: { flag: '🇩🇪', currency: 'EUR', rate: 0.92, flagUrl: 'https://flagcdn.com/w40/de.png' },
    india: { flag: '🇮🇳', currency: 'INR', rate: 83.043, flagUrl: 'https://flagcdn.com/w40/in.png' },
    philippines: { flag: '🇵🇭', currency: 'PHP', rate: 56.25, flagUrl: 'https://flagcdn.com/w40/ph.png' },
    sweden: { flag: '🇸🇪', currency: 'SEK', rate: 10.85, flagUrl: 'https://flagcdn.com/w40/se.png' },
    uk: { flag: '🇬🇧', currency: 'GBP', rate: 0.79, flagUrl: 'https://flagcdn.com/w40/gb.png' }
  };

  const recipients = [
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'alex-johnson', label: 'Alex Johnson' }
  ];

  const banks = [
    { value: 'hdfc', label: 'HDFC Bank' },
    { value: 'icici', label: 'ICICI Bank' },
    { value: 'sbi', label: 'State Bank of India' }
  ];

  const wallets = [
    { value: 'main-wallet', label: 'Main Wallet ($1,250.00)' },
    { value: 'business-wallet', label: 'Business Wallet ($3,500.00)' }
  ];

  const purposes = [
    { value: 'family-support', label: 'Family Support' },
    { value: 'business-payment', label: 'Business Payment' },
    { value: 'education', label: 'Education' }
  ];

  // Animated cursor movement
  const moveCursorTo = (elementId, offset = { x: 0, y: 0 }) => {
    const element = document.getElementById(elementId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const containerRect = element.closest('.zil-payment-container')?.getBoundingClientRect();
      if (containerRect) {
        setCursorPosition({
          x: rect.left - containerRect.left + rect.width / 2 + offset.x,
          y: rect.top - containerRect.top + rect.height / 2 + offset.y
        });
        setShowCursor(true);
      }
    }
  };

  const highlightField = (fieldId) => {
    setHighlightedField(fieldId);
    setTimeout(() => setHighlightedField(''), 600);
  };

  useEffect(() => {
    const startAnimation = async () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentStage(1);
      setSendAmount('');
      setSelectedCountry('india');
      setSelectedRecipient('');
      setSelectedBank('');
      setSelectedWallet('');
      setSelectedPurpose('');
      setIsButtonLoading(false);
      setShowSuccessParticles(false);
      
      // Stage 1 Animation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Animate country selection
      moveCursorTo('country-select');
      await new Promise(resolve => setTimeout(resolve, 500));
      highlightField('country-field');
      const countries_list = ['india', 'uk', 'germany', 'philippines'];
      const randomCountry = countries_list[Math.floor(Math.random() * countries_list.length)];
      setSelectedCountry(randomCountry);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Animate send amount
      moveCursorTo('send-amount');
      await new Promise(resolve => setTimeout(resolve, 300));
      highlightField('send-amount-field');
      setSendAmount('1000');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Animate recipient selection
      moveCursorTo('recipient-select');
      await new Promise(resolve => setTimeout(resolve, 300));
      highlightField('recipient-field');
      setSelectedRecipient('john-doe');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Animate bank selection
      moveCursorTo('bank-select');
      await new Promise(resolve => setTimeout(resolve, 300));
      highlightField('bank-field');
      setSelectedBank('hdfc');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Click continue button
      moveCursorTo('continue-btn-1');
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStage(2);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Stage 2 Animation
      moveCursorTo('wallet-select');
      await new Promise(resolve => setTimeout(resolve, 400));
      highlightField('wallet-field');
      setSelectedWallet('main-wallet');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      moveCursorTo('purpose-select');
      await new Promise(resolve => setTimeout(resolve, 400));
      highlightField('purpose-field');
      setSelectedPurpose('family-support');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Click continue button with loading
      moveCursorTo('continue-btn-2');
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsButtonLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Stage 3 - Success
      setCurrentStage(3);
      setShowCursor(false);
      setShowSuccessParticles(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Reset animation
      setIsAnimating(false);
    };

    const interval = setInterval(startAnimation, 12000);
    startAnimation(); // Start immediately
    
    return () => clearInterval(interval);
  }, []);

  const calculateReceiveAmount = (amount) => {
    if (!amount) return '0.00';
    const rate = countries[selectedCountry]?.rate || 1;
    return (parseFloat(amount) * rate).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <div className="relative max-w-md mx-auto zil-payment-container">
      {/* Animated Cursor */}
      {showCursor && (
        <div 
          className="absolute w-5 h-5 pointer-events-none z-50 transition-all duration-300"
          style={{ 
            left: cursorPosition.x, 
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-0 h-0 border-l-[10px] border-l-gray-800 border-r-[5px] border-r-transparent border-b-[14px] border-b-transparent border-t-[6px] border-t-transparent"></div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative h-[600px]">
        {/* Stage 1: Recipient Setup */}
        {currentStage === 1 && (
          <div className="p-6 space-y-6 transition-all duration-500">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Send Money Globally</h3>
              <p className="text-sm text-gray-600">Fast, secure international transfers</p>
            </div>
            
            <div className="space-y-4">
              {/* Country Selection */}
              <div className={`transition-all duration-300 ${highlightedField === 'country-field' ? 'scale-105 ring-2 ring-green-500 ring-opacity-50 rounded-lg' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Country</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 w-6 h-6 rounded-full overflow-hidden">
                    <img 
                      src={countries[selectedCountry]?.flagUrl} 
                      alt={`${selectedCountry} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <select
                    id="country-select"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  >
                    {Object.entries(countries).map(([key, country]) => (
                      <option key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)} ({country.currency})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Send Amount */}
              <div className={`transition-all duration-300 ${highlightedField === 'send-amount-field' ? 'scale-105 ring-2 ring-green-500 ring-opacity-50 rounded-lg' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Send Amount</label>
                <div className="relative">
                  <input
                    id="send-amount"
                    type="text"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                    placeholder="0.00"
                  />
                  <div className="absolute right-3 top-3 text-gray-500 font-medium">USD</div>
                </div>
              </div>

              {/* Recipient Selection */}
              <div className={`transition-all duration-300 ${highlightedField === 'recipient-field' ? 'scale-105 ring-2 ring-green-500 ring-opacity-50 rounded-lg' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                <select
                  id="recipient-select"
                  value={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Recipient</option>
                  {recipients.map((recipient) => (
                    <option key={recipient.value} value={recipient.value}>
                      {recipient.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-11 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Bank Selection */}
              <div className={`transition-all duration-300 ${highlightedField === 'bank-field' ? 'scale-105 ring-2 ring-green-500 ring-opacity-50 rounded-lg' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Bank</label>
                <select
                  id="bank-select"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Bank</option>
                  {banks.map((bank) => (
                    <option key={bank.value} value={bank.value}>
                      {bank.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-11 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Receive Amount Display */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-sm text-gray-600 mb-1">Recipient receives</div>
                <div className="text-2xl font-bold text-green-600">
                  {calculateReceiveAmount(sendAmount)} {countries[selectedCountry]?.currency}
                </div>
              </div>
            </div>
            
            <button 
              id="continue-btn-1"
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                sendAmount && selectedRecipient && selectedBank 
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-200 text-gray-500'
              }`}
              disabled={!sendAmount || !selectedRecipient || !selectedBank}
            >
              Continue Transfer
            </button>
          </div>
        )}
        
        {/* Stage 2: Wallet & Purpose */}
        {currentStage === 2 && (
          <div className="p-6 space-y-6 transition-all duration-500">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transfer Details</h3>
              <p className="text-sm text-gray-600">Complete your transfer setup</p>
            </div>
            
            <div className="space-y-4">
              {/* Wallet Selection */}
              <div className={`transition-all duration-300 ${highlightedField === 'wallet-field' ? 'scale-105 ring-2 ring-green-500 ring-opacity-50 rounded-lg' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source Wallet</label>
                <select
                  id="wallet-select"
                  value={selectedWallet}
                  onChange={(e) => setSelectedWallet(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Wallet</option>
                  {wallets.map((wallet) => (
                    <option key={wallet.value} value={wallet.value}>
                      {wallet.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-11 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Purpose Selection */}
              <div className={`transition-all duration-300 ${highlightedField === 'purpose-field' ? 'scale-105 ring-2 ring-green-500 ring-opacity-50 rounded-lg' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Purpose</label>
                <select
                  id="purpose-select"
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Purpose</option>
                  {purposes.map((purpose) => (
                    <option key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-11 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Transfer Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-3">
                  <span className="text-lg mr-2">💰</span>
                  <span className="text-sm font-semibold text-gray-700">Transfer Summary</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ${sendAmount} USD → {calculateReceiveAmount(sendAmount)} {countries[selectedCountry]?.currency}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                onClick={() => setCurrentStage(1)}
              >
                Back
              </button>
              <button 
                id="continue-btn-2"
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 relative ${
                  selectedWallet && selectedPurpose
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl' 
                    : 'bg-gray-200 text-gray-500'
                }`}
                disabled={!selectedWallet || !selectedPurpose}
              >
                {isButtonLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Complete Transfer'
                )}
              </button>
            </div>
          </div>
        )}
        
        {/* Stage 3: Success */}
        {currentStage === 3 && (
          <div className="p-6 text-center space-y-6 transition-all duration-500">
            {/* Success Icon with Animation */}
            <div className="relative">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Particles */}
              {showSuccessParticles && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping"
                      style={{
                        left: `${50 + Math.cos(i * Math.PI / 4) * 40}%`,
                        top: `${50 + Math.sin(i * Math.PI / 4) * 40}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transfer Successful!</h3>
              <p className="text-gray-600">Your money is on its way to {recipients.find(r => r.value === selectedRecipient)?.label || 'recipient'}</p>
            </div>
            
            {/* Transaction Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Date & Time</span>
                <span className="text-sm font-semibold text-gray-900">{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm font-semibold text-yellow-600">Processing</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">From</span>
                <span className="text-sm font-semibold text-gray-900">Your Wallet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">To</span>
                <span className="text-sm font-semibold text-gray-900">{recipients.find(r => r.value === selectedRecipient)?.label || 'Recipient'}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Amount Sent</span>
                  <span className="text-sm font-bold text-gray-900">${sendAmount} USD</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Amount Received</span>
                  <span className="text-sm font-bold text-green-600">
                    {calculateReceiveAmount(sendAmount)} {countries[selectedCountry]?.currency}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                className="flex-1 bg-white border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300"
                onClick={() => {
                  setCurrentStage(1);
                  setSendAmount('');
                  setSelectedRecipient('');
                  setSelectedBank('');
                  setSelectedWallet('');
                  setSelectedPurpose('');
                }}
              >
                Send Another
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300">
                View Transfer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    fees: 0,
    countries: 0,
    partnerships: 0,
    support: 0
  });

  // Animated counter effect
  useEffect(() => {
    const animateValue = (start, end, duration, callback) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        callback(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Animate stats on component mount
    animateValue(0, 90, 2000, (val) => setAnimatedStats(prev => ({ ...prev, fees: val })));
    animateValue(0, 7, 2000, (val) => setAnimatedStats(prev => ({ ...prev, countries: val })));
    animateValue(0, 50, 2000, (val) => setAnimatedStats(prev => ({ ...prev, partnerships: val })));
    animateValue(0, 24, 2000, (val) => setAnimatedStats(prev => ({ ...prev, support: val })));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img src="/Bluelogo.svg" alt="ZilRemit" className="h-12 w-auto" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#solutions" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors">
                  Solutions
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors">
                  Pricing
                </a>
                <a href="#support" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors">
                  Support
                </a>
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="https://app.zilremit.com/login" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors">
                Sign In
              </a>
              <a href="https://app.zilremit.com/signup" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 btn-primary">
                Get Started
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
                <a href="#features" className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                  Features
                </a>
                <a href="#solutions" className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                  Solutions
                </a>
                <a href="#pricing" className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                  Pricing
                </a>
                <a href="#support" className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                  Support
                </a>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <a href="https://app.zilremit.com/login" className="block w-full text-left text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                    Sign In
                  </a>
                  <a href="https://app.zilremit.com/signup" className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-base font-medium btn-primary">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50/30 min-h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-green-200 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              {/* Highlight Bar */}
              <div className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium mb-8 shadow-lg">
                💸 No one beats ZilRemit's ultra-low transfer fees
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Send Money
                <span className="block gradient-text">Globally, Instantly</span>
                <span className="block text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-600 mt-2">
                  Ultra-Low Fees, Zero Hassle
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Enjoy instant transfers with transparent rates and zero hidden fees. 
                Experience how effortless sending money abroad can be.
              </p>

              {/* Callback Form */}
              <CallbackForm />

              <p className="text-sm text-gray-500">
                Trusted by thousands of global businesses
              </p>
            </div>

            {/* Right Content - Calculator */}
            <div className="animate-fade-in-right">
              <ExactCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Global Business Payments Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual with City Background */}
            <div className="animate-fade-in-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* City Skyline Background with Green Overlay */}
                <div 
                  className="relative h-80 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.75), rgba(22, 163, 74, 0.85)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%2387CEEB;stop-opacity:1" /><stop offset="100%" style="stop-color:%23E0F6FF;stop-opacity:1" /></linearGradient></defs><rect width="800" height="400" fill="url(%23sky)"/><rect x="50" y="200" width="40" height="200" fill="%23666"/><rect x="100" y="150" width="50" height="250" fill="%23777"/><rect x="160" y="180" width="35" height="220" fill="%23555"/><rect x="200" y="120" width="60" height="280" fill="%23888"/><rect x="270" y="160" width="45" height="240" fill="%23666"/><rect x="320" y="100" width="55" height="300" fill="%23999"/><rect x="380" y="140" width="40" height="260" fill="%23777"/><rect x="430" y="90" width="65" height="310" fill="%23AAA"/><rect x="500" y="130" width="50" height="270" fill="%23888"/><rect x="560" y="110" width="45" height="290" fill="%23999"/><rect x="610" y="170" width="35" height="230" fill="%23666"/><rect x="650" y="140" width="55" height="260" fill="%23777"/><rect x="710" y="190" width="40" height="210" fill="%23555"/></svg>')`
                  }}
                >
                  {/* Browser Window Controls */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  
                  {/* Currency Exchange Visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center space-x-8">
                      {/* USD Flag (Fixed) */}
                      <div className="bg-white rounded-full px-6 py-4 flex items-center shadow-xl border-2 border-gray-100 hover:scale-105 transition-transform duration-300">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex items-center justify-center border border-gray-200 shadow-sm">
                          <img 
                            src="https://flagcdn.com/w40/us.png" 
                            alt="USA flag"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-gray-900 text-lg">USD</span>
                      </div>
                      
                      {/* Arrow */}
                      <div className="text-white">
                        <svg className="w-10 h-10 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      {/* Dynamic Currency Flag (Animated) */}
                      <AnimatedCurrency />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="animate-fade-in-right flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Money for Personal or Business Purposes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Execute international business payments with real-time exchange rates and instant processing. 
                Our B2B payment platform delivers funds to suppliers, vendors, and partners.
              </p>
              <div>
                <a href="https://app.zilremit.com/signup" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift shadow-lg inline-block text-center">
                  Start International Payments →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete B2B Solutions */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete B2B International Payment Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All-in-one platform for seamless cross-border business payments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Business Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Send funds to vendors, suppliers, or partners instantly using multiple payment options — 
                without the high costs of traditional banks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Every transaction is encrypted and protected with advanced security technology, 
                ensuring your business data stays private.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Competitive Exchange Rates</h3>
              <p className="text-gray-600 leading-relaxed">
                Get more value on every transaction. ZilRemit provides transparent, 
                real-time exchange rates with zero markup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rapid International Settlements */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Money for Personal or Business Purposes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                ZilRemit makes sending money abroad simple and reliable. Whether for personal or business purposes, 
                you can send funds from USD to other countries within minutes in just 3–4 easy steps. 
                Enjoy a fast, secure, and transparent experience every time you transfer money internationally.
              </p>
              <a href="https://app.zilremit.com/signup" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift inline-block text-center">
                Process International Payments →
              </a>
            </div>

            {/* Right - Animated Payment Interface */}
            <div className="animate-fade-in-right">
              <div className="h-[600px]">
                <AnimatedPaymentInterface />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Send Global Payments in 3 Simple Steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Recipient Details</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter the recipient's name, account number, and destination country.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Payment Source</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose your funding source and specify the purpose of payment.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm & Send</h3>
              <p className="text-gray-600 leading-relaxed">
                Review the details, check exchange rates, and send instantly with complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Faster */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why We're Faster Than Banks</h2>
            <p className="text-xl text-gray-600">The Smarter Way to Send Money Across Borders</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Traditional Banks */}
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Traditional Banks</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  2–5 business days for processing
                </li>
                <li className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Multiple intermediary banks
                </li>
                <li className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Hidden fees at each step
                </li>
                <li className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limited tracking visibility
                </li>
              </ul>
            </div>

            {/* ZilRemit */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg card-hover border-2 border-green-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">ZilRemit</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant bank-to-bank transfers
                </li>
                <li className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No middlemen involved
                </li>
                <li className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Transparent, upfront pricing
                </li>
                <li className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Clear payment status every step of the way
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <a href="https://app.zilremit.com/signup" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift inline-block text-center">
                Start Business Payments →
              </a>
              <a href="https://calendly.com/zmn/demo" target="_blank" rel="noopener noreferrer" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift inline-block text-center">
                Book A Demo →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ZilRemit */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ZilRemit</h2>
            <p className="text-xl text-gray-600">Built for Global Growth — Trusted Worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Exchange Rates</h3>
              <p className="text-gray-600 leading-relaxed">
                Save up to 90% compared to banks with real-time rates and no hidden fees.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced encryption and fraud monitoring keep your funds and data safe 24/7.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unified B2B Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage all international payments, track expenses, and monitor cash flow from one smart dashboard.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-gray-50 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{animatedStats.fees}%</div>
              <div className="text-gray-600">Lower Fees than Banks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{animatedStats.countries}+</div>
              <div className="text-gray-600">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{animatedStats.partnerships}+</div>
              <div className="text-gray-600">Bank Partnerships</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{animatedStats.support}/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Business Payments in Minutes */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Global Payments In Minuts
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the future of international payments with our intuitive platform. 
                Send money to family, pay suppliers, or transfer funds globally in just a few clicks.
              </p>

              {/* Features */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Lightning Fast</h4>
                    <p className="text-gray-600">Complete transfers in minutes, not days.</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Simple Process</h4>
                    <p className="text-gray-600">Just 3 steps to send money anywhere in the world.</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Bank-Level Security</h4>
                    <p className="text-gray-600">Your money and data are protected with enterprise-grade security.</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://app.zilremit.com/signup" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block text-center">
                  Start Business Payments →
                </a>
                <a href="https://calendly.com/zmn/demo" target="_blank" rel="noopener noreferrer" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block text-center">
                  Book A Demo
                </a>
              </div>
            </div>

            {/* Right - Animated Payment Interface */}
            <div className="animate-fade-in-right">
              <div className="h-[600px]">
                <AnimatedPaymentInterface />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">B2B International Payments FAQ</h2>
            <p className="text-xl text-gray-600">Frequently Asked Questions</p>
          </div>

          <div className="space-y-8">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How fast are international payments with ZilRemit?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Most payments are processed in minutes (sometimes even around 90 seconds, depending on country and method). You can send right from the mobile app and see status updates as it moves.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How are fees and exchange rates handled?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Pricing is shown upfront with no hidden charges, and FX rates are competitive. You'll see the live rate and total cost before you confirm.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Do I need to pre-fund an account before sending money overseas?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No. You don't have to lock money in advance; you can pay directly from the platform's wallet. This helps cash stay usable for your daily needs.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How does ZilRemit handle currency conversion for international transfers?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The platform automatically converts funds into the recipient's currency at the shown exchange rate, helping businesses manage multi-currency payments confidently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Global Payments?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join over one million businesses switching to faster, lower-cost international transactions with ZilRemit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.zilremit.com/signup" target="_blank" rel="noopener noreferrer" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift inline-block text-center">
              Start Business Payments →
            </a>
            <a href="https://calendly.com/zmn/demo" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift inline-block text-center">
              Book A Demo →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <img src="/Bluelogo.svg" alt="ZilRemit" className="h-12 w-auto mr-3 brightness-0 invert" />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                ZilRemit makes international business payments simple, fast, and affordable. 
                Send money globally with the lowest fees and best exchange rates.
              </p>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a href="https://www.facebook.com/people/Zil-Remit/61581676174489/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* Twitter/X */}
                <a href="https://x.com/ZRemit71430" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a href="https://www.instagram.com/zilremit/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/zil-remit/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* Pinterest */}
                <a href="https://www.pinterest.com/zilremit/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="/about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Press</a></li>
                <li><a href="/blogs.html" className="text-gray-300 hover:text-green-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                <li><a href="/disclaimer.html" className="text-gray-300 hover:text-green-400 transition-colors">Disclaimer</a></li>
                <li><a href="/privacy-policy.html" className="text-gray-300 hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-and-condition.html" className="text-gray-300 hover:text-green-400 transition-colors">Terms and condition</a></li>
                <li><a href="/cookie-policy.html" className="text-gray-300 hover:text-green-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ZilRemit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
