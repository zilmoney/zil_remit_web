import React, { useState, useEffect } from 'react';
import ExactCalculator from './ExactCalculator';
import CallbackForm from './CallbackForm';
import './App.css';

// Animated Currency Component
const AnimatedCurrency = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currencies = [
    { code: 'EUR', flag: '🇪🇺', amount: '920.00' },
    { code: 'GBP', flag: '🇬🇧', amount: '790.00' },
    { code: 'INR', flag: '🇮🇳', amount: '83,250' },
    { code: 'PHP', flag: '🇵🇭', amount: '56,250' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currencies.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-2xl">{currencies[currentIndex].flag}</span>
      <span className="font-bold text-lg">{currencies[currentIndex].amount} {currencies[currentIndex].code}</span>
    </div>
  );
};

// Animated Payment Interface Component
const AnimatedPaymentInterface = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

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
              <h3 className="text-lg font-semibold text-gray-800">Send Money to Your Team</h3>
              <div className="text-sm text-gray-500">Step 1 of 3</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img src="https://flagcdn.com/w32/ph.png" alt="Philippines" className="w-6 h-6 rounded" />
                <select className="flex-1 p-3 border border-gray-300 rounded-lg bg-white">
                  <option>Philippines</option>
                </select>
              </div>
              
              <input 
                type="text" 
                placeholder="Amount to send" 
                value="$1000" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                readOnly
              />
              
              <input 
                type="text" 
                placeholder="Recipient name" 
                value="John Doe (Developer)" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                readOnly
              />
              
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                <option>BDO Bank</option>
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
              <div className="text-sm text-gray-500">Step 2 of 3</div>
            </div>
            
            <div className="space-y-3">
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                <option>Business Account</option>
              </select>
              
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                <option>Salary Payment</option>
              </select>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600">💰</span>
                  <span className="font-semibold text-gray-800">Payment Summary</span>
                </div>
                <div className="text-2xl font-bold text-green-600">$1000 USD → 56,250 PHP</div>
                <div className="text-sm text-gray-600 mt-1">Fee: $5 • Rate: 56.25</div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800">Payment Sent Successfully!</h3>
            <p className="text-gray-600">John will receive 56,250 PHP in 90 seconds</p>
            
            <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">Processing</span>
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
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                View Receipt
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium">
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
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Support</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-green-600 font-medium">Sign In</button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              {/* Highlight Bar */}
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-8 shadow-lg">
                💸 Stop losing money on expensive bank fees
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Stop Losing Money on
                <span className="block gradient-text">International Business Payments</span>
                <span className="block text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-600 mt-2">
                  Pay Your Overseas Team in 90 Seconds
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Tired of expensive bank fees eating into your profits? ZilRemit helps US businesses pay suppliers, freelancers, and remote workers worldwide - fast, cheap, and simple.
              </p>

              {/* Callback Form */}
              <CallbackForm />

              <p className="text-sm text-gray-500">
                Trusted by 50,000+ US businesses
              </p>
            </div>

            {/* Right Content - Calculator */}
            <div className="animate-fade-in-right">
              <ExactCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Are Bank Fees Killing Your Business Profits?</h2>
            <p className="text-xl text-gray-600">See how much money you're losing on international payments</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pain Point 1 */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💸</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expensive Bank Fees</h3>
              <p className="text-gray-600">Banks charge 3-5% plus hidden fees on every transfer. A $10,000 payment costs you $300-500 in fees alone.</p>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Slow Payments</h3>
              <p className="text-gray-600">Your suppliers wait 3-5 days while banks slowly process payments. This delays projects and hurts relationships.</p>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cash Flow Problems</h3>
              <p className="text-gray-600">Banks make you lock up money in advance, tying up your working capital when you need it most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How ZilRemit Saves Your Business Money</h2>
            <p className="text-xl text-gray-600">Stop overpaying banks and start keeping more of your profits</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pay 90% Less in Fees</h3>
              <p className="text-gray-600">Save thousands per year. That same $10,000 payment costs only $25-50 with ZilRemit instead of $300-500 with banks.</p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">90-Second Transfers</h3>
              <p className="text-gray-600">Your team gets paid instantly, not in 3-5 days. Keep projects moving and suppliers happy with instant payments.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No Money Locked Up</h3>
              <p className="text-gray-600">Pay directly from your account. Keep your cash flowing for daily business needs instead of pre-funding accounts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pay Your Global Team in 90 Seconds
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Watch how easy it is to send money to your overseas team, suppliers, and freelancers. No complicated forms, no waiting days for processing.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <span className="text-gray-700">Enter who you're paying and how much</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <span className="text-gray-700">Choose your payment method</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <span className="text-gray-700">Hit send - money arrives in 90 seconds</span>
                </div>
              </div>

              <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg">
                Start Saving Money Today →
              </button>
            </div>

            {/* Right Content - Animated Interface */}
            <div>
              <AnimatedPaymentInterface />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect for Every Business Payment</h2>
            <p className="text-xl text-gray-600">Whatever your business needs, ZilRemit makes it simple</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Use Case 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Pay Remote Workers</h3>
              <p className="text-gray-600">Send salaries to your global team instantly. No more waiting for payday.</p>
            </div>

            {/* Use Case 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏭</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Pay Suppliers</h3>
              <p className="text-gray-600">Keep your supply chain moving with fast payments to overseas suppliers.</p>
            </div>

            {/* Use Case 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Pay Freelancers</h3>
              <p className="text-gray-600">Contractors get paid the same day they finish work. Build better relationships.</p>
            </div>

            {/* Use Case 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Emergency Payments</h3>
              <p className="text-gray-600">Send urgent payments 24/7, even weekends. Never miss a deadline again.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">ZilRemit vs Your Bank</h2>
            <p className="text-xl text-gray-300">See the difference for yourself</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Banks */}
            <div className="bg-red-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Traditional Banks</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span>3-5% fees + hidden charges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span>3-5 business days processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span>Poor exchange rates (2-4% markup)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span>Must pre-fund account</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span>No weekend processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span>Limited tracking</span>
                </div>
              </div>
            </div>

            {/* ZilRemit */}
            <div className="bg-green-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">ZilRemit</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>0.1-0.5% transparent fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>90-second processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>Real-time exchange rates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>Pay directly from account</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>24/7 processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">✅</span>
                  <span>Real-time tracking</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg">
              Calculate Your Savings →
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join 50,000+ US Businesses Saving Money</h2>
            <p className="text-xl text-gray-600">Real stories from real business owners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Sarah Chen</div>
                  <div className="text-gray-600 text-sm">Tech Startup CEO</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Saved $15,000 in fees last year paying our India development team. ZilRemit is a game-changer for any business with overseas workers."
              </p>
              <p className="text-green-600 font-semibold text-sm">
                Pays 12 developers in India monthly
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Mike Rodriguez</div>
                  <div className="text-gray-600 text-sm">Import Business Owner</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Our suppliers love getting paid instantly instead of waiting a week. It's improved our relationships and we get better deals now."
              </p>
              <p className="text-green-600 font-semibold text-sm">
                Imports from 8 countries
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Lisa Thompson</div>
                  <div className="text-gray-600 text-sm">E-commerce Manager</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Finally, a payment app that doesn't hide fees from us. We know exactly what we're paying before we send money."
              </p>
              <p className="text-green-600 font-semibold text-sm">
                Manages payments to 25+ suppliers
              </p>
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
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-green-100">US Businesses Trust Us</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-green-100">Countries We Send To</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions from Business Owners</h2>
            <p className="text-xl text-gray-600">Everything you need to know about saving money on international payments</p>
          </div>

          <div className="space-y-8">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How fast are payments really?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Most payments arrive in 90 seconds. Some countries may take up to 10 minutes depending on local banking hours. You can send right from our mobile app and see status updates as your money moves.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What fees do you charge?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We charge 0.1-0.5% with no hidden fees. You see the exact cost before sending. Banks typically charge 3-5% plus hidden fees. Our pricing is shown upfront with no surprises.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Do I need to keep money in your account?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No. You don't have to lock money in advance - you can pay directly from your bank account or business credit card. This helps your cash stay available for your daily business needs.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How do you handle currency conversion?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We automatically convert your dollars into the recipient's currency at the live exchange rate you see on Google. No markup, no hidden conversion fees - helping you manage international payments with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Stop Overpaying for International Payments?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of US businesses saving money on international payments. Set up your free account in 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift">
              Get Your Free Account →
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift">
              Calculate Your Savings →
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
                <img src="/Bluelogo.svg" alt="ZilRemit" className="h-8 w-auto" />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                ZilRemit helps US businesses save money on international payments. 
                Send money to your overseas team, suppliers, and freelancers with the lowest fees and fastest processing.
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
