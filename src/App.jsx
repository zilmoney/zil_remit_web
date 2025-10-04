import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Globe, 
  Shield, 
  Clock, 
  DollarSign, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Smartphone,
  CreditCard,
  Building,
  MapPin,
  Phone,
  Mail,
  Menu,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [exchangeAmount, setExchangeAmount] = useState('1000')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [exchangeRate, setExchangeRate] = useState(0.85)

  // Simulate real-time exchange rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setExchangeRate(prev => prev + (Math.random() - 0.5) * 0.01)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const calculateExchange = () => {
    return (parseFloat(exchangeAmount) * exchangeRate).toFixed(2)
  }

  const features = [
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Lightning Fast",
      description: "Transfer money in minutes with our express service, or save with economy transfers in 3-5 days."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Transparent Pricing",
      description: "No hidden fees. See exactly what you pay upfront with competitive exchange rates."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Bank-Level Security",
      description: "Your money and data are protected with 256-bit encryption and regulatory compliance."
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: "Global Reach",
      description: "Send money to over 200 countries and territories with extensive pickup networks."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "24/7 Support",
      description: "Get help when you need it with our multilingual customer support team."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      title: "Mobile First",
      description: "Manage transfers on the go with our intuitive mobile app for iOS and Android."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Enter Details",
      description: "Provide recipient information and transfer amount"
    },
    {
      number: "02", 
      title: "Choose Method",
      description: "Select payment source and delivery option"
    },
    {
      number: "03",
      title: "Track Transfer",
      description: "Monitor your transfer with real-time updates"
    }
  ]

  const testimonials = [
    {
      name: "Maria Rodriguez",
      location: "New York, USA",
      rating: 5,
      text: "ZilRemit has made sending money to my family in Mexico so much easier. The rates are great and the transfers are always fast."
    },
    {
      name: "James Chen",
      location: "London, UK", 
      rating: 5,
      text: "I've been using ZilRemit for my business payments to suppliers in Asia. The transparency and reliability are outstanding."
    },
    {
      name: "Priya Patel",
      location: "Toronto, Canada",
      rating: 5,
      text: "The mobile app is fantastic. I can send money to India anytime, anywhere. Customer service is also very helpful."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">ZilRemit</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Send Money</a>
              <a href="#rates" className="text-gray-600 hover:text-blue-600 transition-colors">Exchange Rates</a>
              <a href="#business" className="text-gray-600 hover:text-blue-600 transition-colors">Business</a>
              <a href="#support" className="text-gray-600 hover:text-blue-600 transition-colors">Help</a>
              <Button variant="outline" className="mr-2">Sign In</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
              >
                <div className="flex flex-col space-y-4">
                  <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Send Money</a>
                  <a href="#rates" className="text-gray-600 hover:text-blue-600 transition-colors">Exchange Rates</a>
                  <a href="#business" className="text-gray-600 hover:text-blue-600 transition-colors">Business</a>
                  <a href="#support" className="text-gray-600 hover:text-blue-600 transition-colors">Help</a>
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button variant="outline">Sign In</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Send Money 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Globally</span> 
                <br />with Confidence
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transfer funds to over 200 countries with real-time exchange rates, 
                transparent fees, and bank-level security. Join millions who trust ZilRemit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                  Start Transfer <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  View Exchange Rates
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Licensed & Regulated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>5M+ Happy Customers</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Card className="p-6 shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Exchange Rate Calculator</CardTitle>
                  <CardDescription className="text-center">See how much you can send</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">You Send</label>
                      <Input 
                        type="number" 
                        value={exchangeAmount}
                        onChange={(e) => setExchangeAmount(e.target.value)}
                        className="text-lg"
                      />
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">They Receive</label>
                      <div className="text-2xl font-bold text-green-600 p-3 bg-green-50 rounded-lg">
                        {calculateExchange()}
                      </div>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                          <SelectItem value="MXN">MXN - Mexican Peso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                    <Badge variant="secondary" className="ml-2">Live</Badge>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                    Send Money Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ZilRemit?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most reliable, secure, and user-friendly international money transfer platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Send money in three simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Millions</h2>
            <p className="text-xl text-gray-600">See what our customers say about ZilRemit</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Send Money?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of satisfied customers who trust ZilRemit for their international transfers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                Start Your Transfer
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                Download App
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ZilRemit</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making international money transfers simple, secure, and affordable for everyone.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Send Money</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Receive Money</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Transfer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ZilRemit. All rights reserved. Licensed and regulated financial service provider.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
