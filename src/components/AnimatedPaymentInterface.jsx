import { useState, useEffect } from 'react';

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
    ireland: { flag: '🇮🇪', currency: 'EUR', rate: 0.92, flagUrl: 'https://flagcdn.com/w40/ie.png' },
    italy: { flag: '🇮🇹', currency: 'EUR', rate: 0.92, flagUrl: 'https://flagcdn.com/w40/it.png' },
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
      const countries_list = ['india', 'uk', 'germany', 'philippines', 'ireland', 'italy'];
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

export default AnimatedPaymentInterface;
