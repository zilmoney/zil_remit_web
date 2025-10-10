import './App.css'
import { useState, useEffect } from 'react'
import ZilRemitLogo from './assets/ZilremitSVG.svg'

function App() {
  const [sendAmount, setSendAmount] = useState('20000')
  const [receiveAmount, setReceiveAmount] = useState('1,764,930.14')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    fees: 0,
    countries: 0,
    partnerships: 0,
    support: 0
  })

  // Animated counters
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const start = 0
      const increment = target / (duration / 16)
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, 16)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(90, 'fees')
          animateCounter(180, 'countries')
          animateCounter(2000, 'partnerships')
          animateCounter(24, 'support')
        }
      })
    })

    const statsElement = document.getElementById('stats-section')
    if (statsElement) observer.observe(statsElement)

    return () => observer.disconnect()
  }, [])

  const handleSendAmountChange = (e) => {
    const amount = e.target.value.replace(/,/g, '')
    setSendAmount(amount)
    const converted = (parseFloat(amount) * 88.25).toLocaleString('en-US', { minimumFractionDigits: 2 })
    setReceiveAmount(converted)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={ZilRemitLogo} alt="ZilRemit" className="h-10 w-auto" />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">Features</a>
              <a href="#solutions" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">Solutions</a>
              <a href="#pricing" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">Pricing</a>
              <a href="#support" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">Support</a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">Sign In</button>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-4">
              <div className="space-y-2">
                <a href="#features" className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">Features</a>
                <a href="#solutions" className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">Solutions</a>
                <a href="#pricing" className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">Pricing</a>
                <a href="#support" className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">Support</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-green-50 via-white to-green-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  International Payments Made 
                  <span className="text-green-600"> Simple</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Send and receive international business payments in minutes with ZilRemit. 
                  Enjoy transparent rates, low fees, and instant payment tracking across 180+ countries.
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-3 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 hover:border-green-300"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 hover:border-green-300"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 hover:border-green-300"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Business Payments →
                </button>
                <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                  Get Live Exchange Rates →
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8">
                <p className="text-sm text-gray-500 mb-4">Trusted by thousands of global businesses</p>
                <div className="flex items-center space-x-6 opacity-60">
                  <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                  <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                  <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                  <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right Content - Calculator */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 animate-fade-in-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Transfer</h3>
              <p className="text-gray-600 mb-6">1 USD = 88.25 INR</p>
              
              {/* Send Amount */}
              <div className="space-y-4 mb-6">
                <label className="block text-sm font-medium text-gray-700">Send Amount</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={sendAmount}
                    onChange={handleSendAmountChange}
                    className="w-full px-4 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none pr-20 transition-all duration-300"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <span className="text-2xl">🇺🇸</span>
                    <span className="font-semibold text-gray-700">USD</span>
                  </div>
                </div>
              </div>

              {/* Exchange Rate Visual */}
              <div className="text-center py-4">
                <div className="text-green-600 text-lg font-medium">Exchange Rate: 88.25</div>
                <div className="text-3xl text-green-600 my-2 animate-bounce">↓</div>
              </div>

              {/* Receive Amount */}
              <div className="space-y-4 mb-8">
                <label className="block text-sm font-medium text-gray-700">Receiving Amount</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={receiveAmount}
                    readOnly
                    className="w-full px-4 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-xl bg-green-50 pr-20"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <span className="text-2xl">🇮🇳</span>
                    <span className="font-semibold text-gray-700">INR</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Sign Up for Free Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Business Payments Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Global Business Payments in Minutes</h3>
                  <div className="flex items-center justify-center space-x-8 py-8">
                    <div className="bg-white rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <span className="text-2xl">🇺🇸</span>
                      <span className="font-bold text-gray-800">USD</span>
                    </div>
                    <div className="text-green-600 text-3xl animate-pulse">→</div>
                    <div className="bg-white rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <span className="text-2xl">🇪🇺</span>
                      <span className="font-bold text-gray-800">EUR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Fast, Transparent, and Reliable Cross-Border Payments
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                ZilRemit eliminates long processing times and hidden fees that slow down global transactions. 
                Pay suppliers, vendors, and partners worldwide in just a few clicks — with real-time status 
                updates and the best available exchange rates.
              </p>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start International Payments →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Complete B2B Solutions Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
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
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">⚡</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Business Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Transfer funds to vendors, suppliers, or partners instantly using multiple payment options — 
                without the high costs of traditional banks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🔒</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Every transaction is encrypted and protected with advanced security technology, 
                ensuring your business data stays private.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">💱</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Competitive Exchange Rates</h3>
              <p className="text-gray-600 leading-relaxed">
                Get more value on every transaction. ZilRemit provides transparent, real-time exchange rates 
                with zero markup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rapid International Settlements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Move Money Globally — Faster Than Ever
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                ZilRemit connects you directly to global financial hubs like London, Frankfurt, Mumbai, and New York. 
                With a secure payment network and optimized routing, you can complete international settlements 
                in minutes — not days.
              </p>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Process International Payments →
              </button>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-pulse">🌍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Global Network</h3>
                  <p className="text-gray-600">Connected to major financial centers worldwide</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full animate-ping"></div>
                    <div className="w-3 h-3 bg-green-600 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-green-600 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-green-100">Send Global Payments in 3 Simple Steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Add Recipient Details</h3>
              <p className="text-green-100">
                Enter the recipient's name, account number, and destination country.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Select Payment Source</h3>
              <p className="text-green-100">
                Choose your funding source and specify the purpose of payment.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Confirm & Send</h3>
              <p className="text-green-100">
                Review the details, check exchange rates, and send instantly with complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Faster Than Banks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why We're Faster Than Banks</h2>
            <p className="text-xl text-gray-600">The Smarter Way to Move Money Across Borders</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Traditional Banks */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏦</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Traditional Banks</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-red-500 mr-3 text-xl">✗</span>
                  2–5 business days for processing
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3 text-xl">✗</span>
                  Multiple intermediary banks
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3 text-xl">✗</span>
                  Hidden fees at each step
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3 text-xl">✗</span>
                  Limited tracking visibility
                </li>
              </ul>
            </div>

            {/* ZilRemit */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border-2 border-green-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">ZilRemit</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  Instant bank-to-bank transfers
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  No middlemen involved
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  Transparent, upfront pricing
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  Clear payment status every step of the way
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Global Payments?
          </h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
            Join over one million businesses switching to faster, lower-cost international transactions with ZilRemit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Business Payments →
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105">
              Compare Exchange Rates →
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose ZilRemit */}
      <section id="stats-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ZilRemit</h2>
            <p className="text-xl text-gray-600">Built for Global Growth — Trusted Worldwide</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-green-600 text-2xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Exchange Rates</h3>
              <p className="text-gray-600">
                Save up to 90% compared to banks with real-time rates and no hidden fees.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-green-600 text-2xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600">
                Advanced encryption and fraud monitoring keep your funds and data safe 24/7.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-green-600 text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unified B2B Dashboard</h3>
              <p className="text-gray-600">
                Manage all international payments, track expenses, and monitor cash flow from one smart dashboard.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-2">{animatedStats.fees}%</div>
              <div className="text-gray-600">Lower Fees than Banks</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-2">{animatedStats.countries}+</div>
              <div className="text-gray-600">Countries Covered</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-2">{animatedStats.partnerships}+</div>
              <div className="text-gray-600">Bank Partnerships</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-2">{animatedStats.support}/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Send Money Anywhere — Right from Your Phone
              </h2>
              <p className="text-xl text-gray-600">
                The ZilRemit mobile app puts global payments in your pocket. Send, track, and confirm transfers 
                anytime, anywhere — all with enterprise-level security.
              </p>
              
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Quick Transfers</h4>
                    <p className="text-gray-600">Send international payments instantly.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">🔔</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Live Alerts</h4>
                    <p className="text-gray-600">Receive instant notifications when funds arrive.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">🔒</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Secure Verification</h4>
                    <p className="text-gray-600">Protect every transaction with multi-layer authentication.</p>
                  </div>
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="flex space-x-4 pt-4">
                <div className="bg-black text-white px-6 py-3 rounded-xl flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors transform hover:scale-105">
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
                <div className="bg-black text-white px-6 py-3 rounded-xl flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors transform hover:scale-105">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">Available now on the App Store and Google Play.</p>
            </div>

            {/* Right - Phone Mockup */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 aspect-[3/4] w-80 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">📱</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">ZilRemit Mobile</h3>
                  <p className="text-gray-600">Available on iOS & Android</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Businesses Around the World</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">RP</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Rajesh Patel</h4>
                  <p className="text-gray-600 text-sm">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                "Exactly what I needed for my business! Transfers are fast and cost far less than my bank."
              </p>
              <p className="text-sm text-green-600 font-medium">Sent USD 10,000 to suppliers in minutes.</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">MR</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Maria Rodriguez</h4>
                  <p className="text-green-100 text-sm">International Trader</p>
                </div>
              </div>
              <p className="text-green-100 italic mb-4">
                "The best exchange rates I've ever used. I moved all my vendor payments to ZilRemit."
              </p>
              <p className="text-sm text-green-200 font-medium">Operating in 25 international markets.</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">TS</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Thomas Schmidt</h4>
                  <p className="text-gray-600 text-sm">Supply Chain Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                "Perfect for overseas supplier payments. Super easy to use and no hidden charges."
              </p>
              <p className="text-sm text-green-600 font-medium">Used across 150+ countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">B2B International Payments FAQ</h2>
            <p className="text-xl text-gray-600">Frequently Asked Questions</p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How can I start using ZilRemit for international business payments?
              </h3>
              <p className="text-gray-600">
                Sign up for a free account, verify your business, and begin sending cross-border payments in minutes.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What payment methods are supported?
              </h3>
              <p className="text-gray-600">
                ZilRemit supports bank transfers, debit, and multiple digital payment options for maximum flexibility.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How secure are ZilRemit transactions?
              </h3>
              <p className="text-gray-600">
                All payments are protected with 256-bit encryption, two-factor authentication, and continuous fraud monitoring.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Can I cancel or modify a payment?
              </h3>
              <p className="text-gray-600">
                Yes — if the payment hasn't been processed, you can cancel or update details directly from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Want More from ZilRemit?</h3>
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>

          {/* Links Grid */}
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* ZilRemit Group */}
            <div>
              <h4 className="font-bold text-white mb-4">ZilRemit Group</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Payments */}
            <div>
              <h4 className="font-bold text-white mb-4">Payments</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">ACH</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wire/Transfer Payments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integration API</a></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-bold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">eChecks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payroll</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Invoicing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Deposit Slips</a></li>
              </ul>
            </div>

            {/* Integrations */}
            <div>
              <h4 className="font-bold text-white mb-4">Integrations</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">QuickBooks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Zoho</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Xero</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ADP</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gusto</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src={ZilRemitLogo} alt="ZilRemit" className="h-8 w-auto" />
            </div>
            
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © ZILREMIT | All Rights Reserved
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer transform hover:scale-110">
                <span className="text-sm">X</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer transform hover:scale-110">
                <span className="text-sm">in</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer transform hover:scale-110">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer transform hover:scale-110">
                <span className="text-sm">P</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
