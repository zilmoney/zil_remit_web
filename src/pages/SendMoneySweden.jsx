import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CallbackForm from '../CallbackForm';
import ExactCalculator from '../ExactCalculator';

function SendMoneySweden() {
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
                💸 Best USD to SEK rates for Sweden transfers
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">Send Money From USA</span>
                <span className="block gradient-text">To SWEDEN</span>
                <span className="block text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-600 mt-2">
                  Ultra-Low Fees, Zero Hassle
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                International business payments in minutes with lowest fees and best USD to SEK rates.
              </p>

              {/* Callback Form */}
              <CallbackForm />

              <p className="text-sm text-gray-500 mt-4">
                Trusted by thousands of businesses sending money to Sweden
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fast Payments to Sweden
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Easily pay Swedish suppliers with real-time USD to SEK exchange rates and instant processing to any bank, including SEB, Handelsbanken, and Swedbank.
            </p>
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
              Send money globally in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Recipient Details
              </h3>
              <p className="text-gray-600 text-center">
                Enter the recipient's name, account details, and the amount you want to send.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Source
              </h3>
              <p className="text-gray-600 text-center">
                Select the source of funds, then choose the purpose of the transfer.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Confirmation
              </h3>
              <p className="text-gray-600 text-center">
                Review all details, check the fees, and confirm your transfer.
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
                  <span className="text-gray-700">Real time transfer update</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your International Payments?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join over 2 million businesses and individuals who trust us with their global payments
          </p>
          <a 
            href="https://app.zilremit.com/signup" 
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Sign Up
          </a>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Payment Platform
            </h2>
            <p className="text-lg text-gray-600">
              Experience fast, secure, and cost-effective international transfers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Best Exchange Rates
              </h3>
              <p className="text-gray-600 mb-4">
                Save up to 80% with our real-time rates. We leverage advanced technology to offer rates up to 4% better than traditional providers.
              </p>
              <a href="#rates" className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center">
                Compare Rates →
              </a>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Enterprise Security
              </h3>
              <p className="text-gray-600 mb-4">
                Bank-level encryption, 24/7 fraud monitoring, and regulatory compliance. Your money is always protected.
              </p>
              <a href="#security" className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center">
                Security Features →
              </a>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                B2B Payment Hub
              </h3>
              <p className="text-gray-600 mb-4">
                Access a full range of B2B payment services, from ACH to credit card processing.
              </p>
              <a href="#features" className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center">
                Explore Features →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Check Our Service Locations
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <a href="/send-money-estonia" className="bg-white border-2 border-gray-200 p-4 rounded-lg text-center font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/ee.png" alt="Estonia flag" className="w-8 h-6 object-cover rounded" />
              <span>Estonia</span>
            </a>
            <a href="/send-money-france" className="bg-white border-2 border-gray-200 p-4 rounded-lg text-center font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/fr.png" alt="France flag" className="w-8 h-6 object-cover rounded" />
              <span>France</span>
            </a>
            <a href="#" className="bg-white border-2 border-gray-200 p-4 rounded-lg text-center font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/de.png" alt="Germany flag" className="w-8 h-6 object-cover rounded" />
              <span>Germany</span>
            </a>
            <a href="#" className="bg-white border-2 border-gray-200 p-4 rounded-lg text-center font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/in.png" alt="India flag" className="w-8 h-6 object-cover rounded" />
              <span>India</span>
            </a>
            <a href="#" className="bg-white border-2 border-gray-200 p-4 rounded-lg text-center font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/ph.png" alt="Philippines flag" className="w-8 h-6 object-cover rounded" />
              <span>Philippines</span>
            </a>
            <a href="/send-money-sweden" className="bg-green-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-green-700 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/se.png" alt="Sweden flag" className="w-8 h-6 object-cover rounded" />
              <span>Sweden</span>
            </a>
            <a href="#" className="bg-white border-2 border-gray-200 p-4 rounded-lg text-center font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/gb.png" alt="UK flag" className="w-8 h-6 object-cover rounded" />
              <span>UK</span>
            </a>
            <a href="#" className="bg-white border-2 border-gray-200 p-4 rounded-lg text-center font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/it.png" alt="Italy flag" className="w-8 h-6 object-cover rounded" />
              <span>Italy</span>
            </a>
            <a href="#" className="bg-white border-2 border-gray-200 p-4 rounded-lg text-center font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex flex-col items-center gap-2">
              <img src="https://flagcdn.com/w40/ie.png" alt="Ireland flag" className="w-8 h-6 object-cover rounded" />
              <span>Ireland</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Send Money Anywhere with Our Mobile App
            </h2>
            <p className="text-lg text-gray-600">
              Experience the freedom of sending money globally from your smartphone. Fast, secure, and available 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Quick Transfers
              </h3>
              <p className="text-gray-600">
                Send money in seconds with just a few taps. No complicated forms or lengthy processes.
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
                Real-time Notifications
              </h3>
              <p className="text-gray-600">
                Track your transfers with instant updates. Know exactly when your money arrives.
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
                Online business accounts
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

      {/* Payment Solutions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Secure Payment Solutions for Your Business
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Solution 1 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Real-Time Instant Payments
              </h3>
              <p className="text-gray-600 text-sm">
                Transfer your US Dollars to over 9+ countries with real-time exchange rates and secure processing.
              </p>
            </div>

            {/* Solution 2 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                ACH Bank Transfers
              </h3>
              <p className="text-gray-600 text-sm">
                Cost-effective business payments to domestic banks with same-day or next-day processing.
              </p>
            </div>

            {/* Solution 3 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Wire Transfers
              </h3>
              <p className="text-gray-600 text-sm">
                Traditional international wire transfers with bank-to-bank security. Reliable for large business payments with comprehensive tracking and documentation.
              </p>
            </div>

            {/* Solution 4 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Digital Payment Solutions
              </h3>
              <p className="text-gray-600 text-sm">
                Transfer your US Dollars to over 9+ countries with real-time exchange rates and secure processing.
              </p>
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
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept business bank transfers, corporate cards, ACH, wire transfers, and multiple other payment methods for your convenience.
              </p>
            </div>

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
                Can I cancel my subscription at any time?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel or modify your account settings at any time through your business dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SendMoneySweden;
