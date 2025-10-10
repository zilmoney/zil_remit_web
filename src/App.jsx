import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sendAmount, setSendAmount] = useState('20000');
  const [receiveAmount, setReceiveAmount] = useState('1764930.14');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    fees: 0,
    countries: 0,
    partnerships: 0,
    support: 0
  });

  // Exchange rate calculation
  const exchangeRate = 88.15;
  
  useEffect(() => {
    const amount = parseFloat(sendAmount) || 0;
    setReceiveAmount((amount * exchangeRate).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
  }, [sendAmount]);

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
                <a href="#features" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#solutions" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                  Solutions
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                  Pricing
                </a>
                <a href="#support" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                  Support
                </a>
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors">
                Sign In
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 btn-primary">
                Get Started
              </button>
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
                  <button className="block w-full text-left text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium">
                    Sign In
                  </button>
                  <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-base font-medium btn-primary">
                    Get Started
                  </button>
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
                The Smartest Way to Send
                <span className="block gradient-text">International Payments</span>
                <span className="block text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-600 mt-2">
                  Fast, Secure & Low Fee
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Enjoy instant transfers with transparent rates and zero hidden fees. 
                Experience how effortless sending money abroad can be.
              </p>

              {/* Contact Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* CTA Buttons - Single Row, Equal Width */}
              <div className="flex gap-4 mb-6">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift shadow-lg">
                  Start Now →
                </button>
                <button className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift">
                  View Rates →
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Trusted by thousands of global businesses
              </p>
            </div>

            {/* Right Content - Calculator */}
            <div className="animate-fade-in-right">
              <div className="bg-white rounded-2xl shadow-2xl p-8 card-hover backdrop-blur-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate your transfer</h3>
                <p className="text-gray-600 font-medium mb-6">1 USD = 88.15 INR</p>
                
                {/* Send Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send Amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="w-full px-4 py-4 text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-20"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center bg-gray-100 px-3 py-2 rounded-md">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2 flex items-center justify-center bg-blue-600">
                        <span className="text-xs text-white font-bold">🇺🇸</span>
                      </div>
                      <span className="font-semibold text-gray-700 text-sm">USD</span>
                    </div>
                  </div>
                </div>

                {/* Receive Amount */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Receiving amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={receiveAmount}
                      readOnly
                      className="w-full px-4 py-4 text-2xl font-bold border border-gray-300 rounded-lg bg-gray-50 pr-20"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center">
                      <div className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-200">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2 flex items-center justify-center">
                          <span className="text-xs">🇮🇳</span>
                        </div>
                        <select className="bg-transparent border-none text-gray-700 font-semibold focus:outline-none appearance-none cursor-pointer text-sm pr-4">
                          <option value="INR">INR</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="PHP">PHP</option>
                          <option value="CAD">CAD</option>
                          <option value="AUD">AUD</option>
                        </select>
                        <svg className="w-3 h-3 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary shadow-lg hover:shadow-xl">
                  Sign Up to Send Money
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Business Payments Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual */}
            <div className="animate-fade-in-up">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="mt-12 flex items-center justify-center space-x-8">
                  <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center">
                    <span className="text-2xl mr-2">🇺🇸</span>
                    <span className="font-bold text-lg">USD</span>
                  </div>
                  
                  <svg className="w-8 h-8 text-green-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center">
                    <span className="text-2xl mr-2">🇪🇺</span>
                    <span className="font-bold text-lg">EUR</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-300 to-transparent opacity-30"></div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="animate-fade-in-right">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Global Business Payments in Minutes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                ZilRemit eliminates long processing times and hidden fees that slow down global transactions. 
                Send payments to suppliers, vendors, and partners worldwide in just a few clicks — with 
                real-time status updates and the best available exchange rates.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift">
                Start International Payments →
              </button>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Money Globally — Faster Than Ever
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                ZilRemit connects you directly to global financial hubs like London, Frankfurt, Mumbai, and New York. 
                With a secure payment network and optimized routing, you can complete international settlements 
                in minutes — not days.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift">
                Process International Payments →
              </button>
            </div>

            {/* Right - Visual */}
            <div className="animate-fade-in-right">
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 to-white rounded-2xl p-8 shadow-xl">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-green">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Global Network</h3>
                  <p className="text-gray-600 text-center">Connected to major financial centers worldwide</p>
                </div>
              </div>
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

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-green-200"></div>
            
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
      <section className="py-20 bg-gray-50">
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
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift">
                Start Business Payments →
              </button>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift">
                Compare Exchange Rates →
              </button>
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

      {/* Mobile App Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Money Anywhere — Right from Your Phone
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The ZilRemit mobile app puts global payments in your pocket. Send, track, and confirm transfers 
                anytime, anywhere — all with enterprise-level security.
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
                    <h4 className="text-lg font-semibold text-gray-900">Quick Transfers</h4>
                    <p className="text-gray-600">Send international payments instantly.</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l6.586 6.586a2 2 0 002.828 0l6.586-6.586A2 2 0 0019.414 5H4.586A2 2 0 003.172 7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Live Alerts</h4>
                    <p className="text-gray-600">Receive instant notifications when funds arrive.</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Secure Verification</h4>
                    <p className="text-gray-600">Protect every transaction with multi-layer authentication.</p>
                  </div>
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center hover:bg-gray-800 transition-colors">
                  <span className="text-2xl mr-3">📱</span>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center hover:bg-gray-800 transition-colors">
                  <span className="text-2xl mr-3">🤖</span>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Available now on the App Store and Google Play.
              </p>
            </div>

            {/* Right - Phone Mockup */}
            <div className="animate-fade-in-right">
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 to-white rounded-2xl p-8 shadow-xl">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">ZilRemit Mobile</h3>
                  <p className="text-gray-600 text-center">Available on iOS & Android</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Businesses Around the World</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  RP
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Rajesh Patel</h4>
                  <p className="text-gray-600 text-sm">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Exactly what I needed for my business! Transfers are fast and cost far less than my bank."
              </p>
              <p className="text-green-600 font-semibold text-sm">
                Sent USD 10,000 to suppliers in minutes.
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  MR
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Maria Rodriguez</h4>
                  <p className="text-gray-600 text-sm">International Trader</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "The best exchange rates I've ever used. I moved all my vendor payments to ZilRemit."
              </p>
              <p className="text-green-600 font-semibold text-sm">
                Operating in 25 international markets.
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  TS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Thomas Schmidt</h4>
                  <p className="text-gray-600 text-sm">Supply Chain Manager</p>
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
                How can I start using ZilRemit for international business payments?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up for a free account, verify your business, and begin sending cross-border payments in minutes.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What payment methods are supported?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                ZilRemit supports bank transfers, debit, and multiple digital payment options for maximum flexibility.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How secure are ZilRemit transactions?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All payments are protected with 256-bit encryption, two-factor authentication, and continuous fraud monitoring.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Can I cancel or modify a payment?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes — if the payment hasn't been processed, you can cancel or update details directly from your dashboard.
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
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift">
              Start Business Payments →
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift">
              Compare Exchange Rates →
            </button>
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
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
