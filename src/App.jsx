import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { ArrowRight, Shield, Clock, TrendingUp, Globe, Users, CheckCircle, Star, Menu, X } from 'lucide-react'
import ZilRemitLogo from './assets/ZilremitLogo.svg'
import './App.css'

function App() {
  const [sendAmount, setSendAmount] = useState('100')
  const [receiveAmount, setReceiveAmount] = useState('85.20')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [exchangeRate, setExchangeRate] = useState(0.852)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Simulate exchange rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newRate = 0.852 + (Math.random() - 0.5) * 0.01
      setExchangeRate(newRate)
      if (sendAmount) {
        setReceiveAmount((parseFloat(sendAmount) * newRate).toFixed(2))
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [sendAmount])

  const handleSendAmountChange = (value) => {
    setSendAmount(value)
    if (value) {
      setReceiveAmount((parseFloat(value) * exchangeRate).toFixed(2))
    } else {
      setReceiveAmount('')
    }
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      content: "ZilRemit has transformed how we handle international payments. The rates are excellent and transfers arrive within minutes.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "I send money to my family monthly. ZilRemit saves me hundreds in fees compared to traditional banks.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "E-commerce Director",
      content: "Perfect for our business! We pay international suppliers through ZilRemit. The dashboard makes tracking payments super easy.",
      rating: 5
    }
  ]

  const features = [
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Lightning Fast",
      description: "Process international payments in minutes, not days. Our optimized payment infrastructure delivers funds faster than traditional banks."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Bank-Level Security",
      description: "Bank-level encryption and regulatory compliance protect every international business transaction with advanced fraud prevention."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Best Exchange Rates",
      description: "Get the best currency conversion rates with real-time pricing that beats traditional banks and payment processors."
    }
  ]

  const stats = [
    { value: "90%", label: "Lower Fees than Banks" },
    { value: "91B+", label: "Transaction Value" },
    { value: "22K+", label: "Bank Partnerships" },
    { value: "24/7", label: "Customer Support" }
  ]

  const countries = [
    { name: "India", flag: "🇮🇳" },
    { name: "Philippines", flag: "🇵🇭" },
    { name: "Mexico", flag: "🇲🇽" },
    { name: "Nigeria", flag: "🇳🇬" },
    { name: "Bangladesh", flag: "🇧🇩" },
    { name: "Pakistan", flag: "🇵🇰" },
    { name: "Vietnam", flag: "🇻🇳" },
    { name: "Kenya", flag: "🇰🇪" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={ZilRemitLogo} alt="ZilRemit" className="h-10 w-auto" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#rates" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">Rates</a>
                <a href="#about" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Sign Up</Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#features" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">Features</a>
              <a href="#rates" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">Rates</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">Contact</a>
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full mt-2">Sign Up</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                International Payments
                <span className="block text-green-600">with Lowest Fees & Best Exchange Rates</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Process global business payments in minutes with industry-leading exchange rates, zero hidden fees, and lowest transaction costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  Start Sending Money
                </Button>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                  See How It Works
                </Button>
              </div>
            </div>

            {/* Exchange Rate Calculator */}
            <div className="lg:pl-8">
              <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Calculate your transfer</CardTitle>
                  <CardDescription className="text-green-600 font-semibold">
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Send Amount</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={sendAmount}
                        onChange={(e) => handleSendAmountChange(e.target.value)}
                        className="flex-1"
                        placeholder="0.00"
                      />
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-green-600" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Receiving amount</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={receiveAmount}
                        readOnly
                        className="flex-1 bg-gray-50"
                        placeholder="0.00"
                      />
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="INR">INR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                    Sign Up to Send Money
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete B2B International Payment Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced payment technology designed for businesses managing global operations and international suppliers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-green-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send Money to 200+ Countries
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by millions worldwide for fast, secure international transfers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {countries.map((country, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{country.flag}</div>
                <div className="text-sm font-medium text-gray-700">{country.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Send money globally in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recipient Details</h3>
              <p className="text-gray-600">Enter the recipient's name, account details, and the amount you want to send.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Source</h3>
              <p className="text-gray-600">Select the source of funds, then choose the purpose of the transfer.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Confirmation</h3>
              <p className="text-gray-600">Review all details, check the fees, and confirm your transfer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Stories, Real Results
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about ZilRemit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Sending Money?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join millions of users who trust ZilRemit for their international transfers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Create Free Account
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src={ZilRemitLogo} alt="ZilRemit" className="h-10 w-auto mb-4 filter brightness-0 invert" />
              <p className="text-gray-400">
                Fast, secure, and affordable international money transfers powered by Zil Money.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Send Money</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Payments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ZilRemit. All rights reserved. Powered by Zil Money.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
