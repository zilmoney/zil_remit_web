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
  const [sourceWallet, setSourceWallet] = useState('');
  const [transferPurpose, setTransferPurpose] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const countries = {
    india: { name: 'India', flag: 'https://flagcdn.com/w32/in.png', currency: 'INR', rate: 83.25 },
    philippines: { name: 'Philippines', flag: 'https://flagcdn.com/w32/ph.png', currency: 'PHP', rate: 56.25 },
    uk: { name: 'United Kingdom', flag: 'https://flagcdn.com/w32/gb.png', currency: 'GBP', rate: 0.79 }
  };

  const recipients = ['John Doe', 'Maria Santos', 'David Smith'];
  const banks = ['HDFC Bank', 'ICICI Bank', 'State Bank of India'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStage(prev => prev === 3 ? 1 : prev + 1);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderStage = () => {
    switch(currentStage) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Send Money Globally</h3>
              <div className="text-sm text-gray-500">Fast, secure international transfers</div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Country</label>
                <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg bg-white">
                  <img src={countries[selectedCountry].flag} alt={countries[selectedCountry].name} className="w-6 h-6 rounded" />
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none"
                  >
                    <option value="india">India (INR)</option>
                    <option value="philippines">Philippines (PHP)</option>
                    <option value="uk">United Kingdom (GBP)</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Send Amount</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="1000" 
                    value="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg pr-16"
                    readOnly
                  />
                  <span className="absolute right-3 top-3 text-gray-500 font-medium">USD</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                  <option>Select Recipient</option>
                  {recipients.map(recipient => (
                    <option key={recipient} value={recipient}>{recipient}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Bank</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                  <option>Select Bank</option>
                  {banks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600">Recipient receives</div>
                <div className="text-2xl font-bold text-green-600">
                  {(1000 * countries[selectedCountry].rate).toLocaleString()} {countries[selectedCountry].currency}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Transfer Details</h3>
              <div className="text-sm text-gray-500">Complete your transfer setup</div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Wallet</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                  <option>Select Wallet</option>
                  <option>Business Account</option>
                  <option>Personal Account</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Purpose</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                  <option>Select Purpose</option>
                  <option>Business Payment</option>
                  <option>Family Support</option>
                  <option>Investment</option>
                </select>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600">💰</span>
                  <span className="font-semibold text-gray-800">Transfer Summary</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  $1000 USD → {(1000 * countries[selectedCountry].rate).toLocaleString()} {countries[selectedCountry].currency}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Fee: $5 • Rate: {countries[selectedCountry].rate}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Back
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Complete Transfer
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800">Transfer Successful!</h3>
            <p className="text-gray-600">Your money is on its way</p>
            
            <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="text-orange-600 font-semibold">Pending</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">From:</span>
                <span className="font-medium">Your Business Account</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">To:</span>
                <span className="font-medium">John Doe</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold">$1000 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Recipient gets:</span>
                <span className="font-bold text-green-600">
                  {(1000 * countries[selectedCountry].rate).toLocaleString()} {countries[selectedCountry].currency}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                View Receipt
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Send Another
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 h-[600px] transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
      {renderStage()}
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/Bluelogo.svg" alt="ZilRemit" className="h-8 w-auto" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Features</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Solutions</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Support</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="https://app.zilremit.com/login" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors">
                Sign In
              </a>
              <a href="https://app.zilremit.com/signup" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 btn-primary">
                Get Started
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#" className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">Features</a>
                <a href="#" className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">Solutions</a>
                <a href="#" className="block text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">Support</a>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <a href="https://app.zilremit.com/login" className="block w-full text-left text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                    Sign In
                  </a>
                  <a href="https://app.zilremit.com/signup" className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-base font-medium btn-primary block text-center">
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

      {/* Business Payments Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                🏢 Business Payments Made Simple
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Global Business Payments in Minutes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Execute international business payments with real-time exchange rates and instant processing. 
                Our B2B payment platform delivers funds to suppliers, vendors, and partners.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Instant international business transfers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Real-time exchange rates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Enterprise-grade security</span>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="animate-fade-in-right">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">$10,000 USD</h3>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <span className="text-gray-600">converts to</span>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <img src="https://flagcdn.com/w32/in.png" alt="India" className="w-8 h-8 rounded" />
                    <span className="text-3xl font-bold text-green-600">₹8,32,500</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Live rate: 1 USD = 83.25 INR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete B2B Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete B2B International Payment Solutions</h2>
            <p className="text-xl text-gray-600">Advanced payment technology designed for businesses managing global operations and international suppliers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Process international payments in minutes, not days. Our optimized payment infrastructure 
                delivers funds faster than traditional banks.
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
      <section className="py-20 bg-gray-50">
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
              <a href="https://app.zilremit.com/signup" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift inline-block">
                Process International Payments →
              </a>
            </div>

            {/* Right - Animated Payment Interface */}
            <div className="animate-fade-in-right">
              <AnimatedPaymentInterface />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Send Global Payments in 3 Simple Steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recipient Details</h3>
              <p className="text-gray-600">Enter the recipient's name, account details, and the amount you want to send.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Source</h3>
              <p className="text-gray-600">Select the source of funds, then choose the purpose of the transfer.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmation</h3>
              <p className="text-gray-600">Review all details, check the fees, and confirm your transfer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Faster Than Banks */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Why We're Faster Than Banks</h2>
          <p className="text-xl text-green-100 mb-12">Experience lightning-fast transfers that traditional banks can't match</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-green-100">Lower Fees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2 Min</div>
              <div className="text-green-100">Average Transfer Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-green-100">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Customer Support</div>
            </div>
          </div>
          
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a href="https://app.zilremit.com/signup" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift inline-block">
              Start Business Payments →
            </a>
            <a href="https://calendly.com/zmn/demo" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift inline-block">
              Book A Demo →
            </a>
          </div>
        </div>
      </section>

      {/* Complete B2B International Payment Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete B2B International Payment Solutions</h2>
            <p className="text-xl text-gray-600">Advanced payment technology designed for businesses managing global operations and international suppliers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Process international payments in minutes, not days. Our optimized payment infrastructure 
                delivers funds faster than traditional banks.
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

      {/* Why Choose Our Payment Platform */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Payment Platform</h2>
            <p className="text-xl text-gray-600">Experience fast, secure, and cost-effective international transfers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Best Exchange Rates</h3>
              <p className="text-gray-600 mb-6">
                Save up to 80% with our real-time rates. We leverage advanced technology to offer rates up to 4% better than traditional providers.
              </p>
              <a href="https://calendly.com/zmn/demo" className="text-green-600 hover:text-green-700 font-semibold">
                Compare Rates →
              </a>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bank-Level Security</h3>
              <p className="text-gray-600 mb-6">
                Bank-level encryption, 24/7 fraud monitoring, and regulatory compliance. Your money is always protected.
              </p>
              <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
                Security Features →
              </a>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Payment Suite</h3>
              <p className="text-gray-600 mb-6">
                Access a full range of B2B payment services, from ACH to credit card processing.
              </p>
              <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
                Explore Features →
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.zilremit.com/signup" className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block">
                Start Business Payments
              </a>
              <a href="https://calendly.com/zmn/demo" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block">
                Book A Demo →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-green-100">Lower Fees than Banks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">91B+</div>
              <div className="text-green-100">transaction value</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">22K+</div>
              <div className="text-green-100">Total Bank Partnerships</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Money Anywhere with Our Mobile App
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the freedom of sending money globally from your smartphone. Fast, secure, and available 24/7.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                    <p className="text-gray-600">Send money in seconds with just a few taps. No complicated forms or lengthy processes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
                    <p className="text-gray-600">Track your transfers with instant updates. Know exactly when your money arrives.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Protected</h3>
                    <p className="text-gray-600">Enhanced security with biometric login and two-factor authentication.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-xl">
                <div className="w-64 h-96 bg-gray-900 rounded-3xl mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700 p-6 text-white">
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-4">ZilRemit Mobile</h3>
                      <div className="bg-white/20 rounded-2xl p-4 mb-4">
                        <div className="text-2xl font-bold">$1,000</div>
                        <div className="text-sm opacity-80">to India</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="bg-white/10 rounded-lg p-2">Exchange Rate: 83.25</div>
                        <div className="bg-white/10 rounded-lg p-2">Fee: $5.00</div>
                        <div className="bg-white/10 rounded-lg p-2">Total: ₹83,250</div>
                      </div>
                      <button className="w-full bg-white text-green-600 rounded-lg py-3 font-semibold mt-4">
                        Send Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Stories, Real Results</h2>
            <p className="text-xl text-gray-600">Why Choose Our Payment Platform</p>
            <p className="text-lg text-gray-500 mt-2">Experience fast, secure, and cost-effective international transfers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  B
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Business Owner</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Incredibly fast service! Sent money to my family in India and it arrived within minutes. The rates were much better than my bank."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Software Engineer</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "The best exchange rates I've found! I use it monthly to send money to my parents in Mexico. Saved over $200 in fees this year."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  E
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">E-commerce Director</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Perfect for overseas supplier payments. Super easy to use and no hidden charges."
              </p>
              <p className="text-green-600 font-semibold text-sm">
                Used across 150+ countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
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
            <a href="https://app.zilremit.com/signup" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift inline-block">
              Start Business Payments →
            </a>
            <a href="https://calendly.com/zmn/demo" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift inline-block">
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
                <img src="/Bluelogo.svg" alt="ZilRemit" className="h-8 w-auto" />
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
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ZilRemit. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
