import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CallbackForm from '../CallbackForm';
import ExactCalculator from '../ExactCalculator';
import AnimatedPaymentInterface from '../components/AnimatedPaymentInterface';

function SendMoneyPhilippines() {
  const [animatedStats, setAnimatedStats] = useState({
    fees: 0,
    accounts: 0,
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
    animateValue(0, 1, 2000, (val) => setAnimatedStats(prev => ({ ...prev, accounts: val })));
    animateValue(0, 24, 2000, (val) => setAnimatedStats(prev => ({ ...prev, support: val })));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

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
                💸 Best USD to PHP rates for Philippines transfers
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">Send Money From USA</span>
                <span className="block gradient-text">To Philippines</span>
                <span className="block text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-600 mt-2">
                  Ultra-Low Fees, Zero Hassle
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                International business payments in minutes with lowest fees and best USD to PHP rates. Fast transfers to major banks.
              </p>

              {/* Callback Form */}
              <CallbackForm />

              <p className="text-sm text-gray-500 mt-4">
                Trusted by thousands of businesses sending money to Philippines
              </p>
            </div>

            {/* Right Content - Calculator */}
            <div className="animate-fade-in-right">
              <ExactCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Fast Payments Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-green-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Fast Payments to Philippines
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Send money to Philippines for business with our secure platform, featuring competitive <span className="font-semibold text-green-600">USD to PHP</span> exchange rates and fast transfers of funds to any Philippines bank. Major banks headquartered in the Philippines include <span className="font-semibold">BDO Unibank, Bank of the Philippine Islands (BPI), and Metrobank</span>, all based in Makati City.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Real-time Rates</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Instant Processing</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Secure Transfers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Send Global Payments In Minutes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Global Payments In Minutes
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Send Global Payments in 3 Simple Steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Add Recipient Details
              </h3>
              <p className="text-gray-600 text-center">
                Enter the recipient's name, account number, and destination country.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Select Payment Source
              </h3>
              <p className="text-gray-600 text-center">
                Choose your funding source and specify the purpose of payment.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Confirm & Send
              </h3>
              <p className="text-gray-600 text-center">
                Review the details, check exchange rates, and send instantly with complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Faster Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why We're Faster Than Banks
            </h2>
            <p className="text-lg text-gray-600">
              Experience lightning-fast transfers that traditional banks can't match
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Traditional Banks */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Traditional Banks
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">3-5 business days for processing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">Multiple intermediary banks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">Hidden fees at each step</span>
                </li>
              </ul>
            </div>

            {/* Our Platform */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Our Platform
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Direct wallet bank transfer</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">No Intermediate Banks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Transparent pricing, no hidden fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Locations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Check Our Service Locations
            </h2>
            <p className="text-lg text-gray-600">
              Send money to 9+ countries with the best exchange rates
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Estonia */}
            <a href="/send-money-estonia" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center">
              <img src="https://flagcdn.com/w80/ee.png" alt="Estonia Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-gray-900 font-semibold">Estonia</span>
            </a>

            {/* France */}
            <a href="/send-money-france" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center">
              <img src="https://flagcdn.com/w80/fr.png" alt="France Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-gray-900 font-semibold">France</span>
            </a>

            {/* Germany */}
            <a href="/send-money-germany" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center">
              <img src="https://flagcdn.com/w80/de.png" alt="Germany Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-gray-900 font-semibold">Germany</span>
            </a>

            {/* India */}
            <a href="/send-money-india" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center">
              <img src="https://flagcdn.com/w80/in.png" alt="India Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-gray-900 font-semibold">India</span>
            </a>

            {/* Philippines - Current Page */}
            <div className="bg-green-600 rounded-xl p-6 shadow-lg flex flex-col items-center border-2 border-green-700">
              <img src="https://flagcdn.com/w80/ph.png" alt="Philippines Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-white font-semibold">Philippines</span>
            </div>

            {/* Sweden */}
            <a href="/send-money-sweden" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center">
              <img src="https://flagcdn.com/w80/se.png" alt="Sweden Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-gray-900 font-semibold">Sweden</span>
            </a>

            {/* UK */}
            <a href="/send-money-uk" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center">
              <img src="https://flagcdn.com/w80/gb.png" alt="UK Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-gray-900 font-semibold">UK</span>
            </a>

            {/* Italy */}
            <a href="/send-money-italy" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center">
              <img src="https://flagcdn.com/w80/it.png" alt="Italy Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-gray-900 font-semibold">Italy</span>
            </a>

            {/* Ireland */}
            <a href="/send-money-ireland" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-500 flex flex-col items-center">
              <img src="https://flagcdn.com/w80/ie.png" alt="Ireland Flag" className="w-12 h-8 object-cover mb-3 rounded" />
              <span className="text-gray-900 font-semibold">Ireland</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Manage Payments On The Go
            </h2>
            <p className="text-lg text-gray-600">
              Download our mobile app for seamless international payments anytime, anywhere
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Mobile-First Design
              </h3>
              <p className="text-gray-600">
                Intuitive interface optimized for mobile devices with quick access to all features.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Real-Time Notifications
              </h3>
              <p className="text-gray-600">
                Get instant updates on your transfers and account activity with push notifications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure Authentication
              </h3>
              <p className="text-gray-600">
                Enhanced security with biometric login and two-factor authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">
                {animatedStats.fees}%
              </div>
              <div className="text-xl text-gray-700">
                Lower Fees than Banks
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">
                {animatedStats.accounts}M+
              </div>
              <div className="text-xl text-gray-700">
                Online Business Accounts
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">
                {animatedStats.support}/7
              </div>
              <div className="text-xl text-gray-700">
                Customer Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services and platform
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How do I get started with your platform?
              </h3>
              <p className="text-gray-600">
                Create your business account, verify your company details, and start processing international payments with our lowest fees and best exchange rates.
              </p>
            </div>

            {/* FAQ 2 */}


            {/* FAQ 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Is my data secure and private?
              </h3>
              <p className="text-gray-600">
                Yes, we use bank-level encryption and comply with international financial regulations to protect all your business payment data.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Are the transfer fees and exchange rates transparent with ZilRemit?
              </h3>
              <p className="text-gray-600">
                Yes, ZilRemit shows the total cost (fees + FX conversion) upfront so you know exactly what the recipient receives before confirming the payment.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Do I need to pre-fund a foreign bank account with ZilRemit?
              </h3>
              <p className="text-gray-600">
                No, pre-funding a foreign bank account is not required with ZilRemit. Payments are sent directly from the wallet to the recipient's account without the need for a prior deposit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SendMoneyPhilippines;
