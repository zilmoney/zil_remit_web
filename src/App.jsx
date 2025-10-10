import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight, 
  Globe, 
  Shield, 
  Zap, 
  CreditCard, 
  Users, 
  Building2, 
  Heart,
  CheckCircle,
  Star,
  Menu,
  X,
  Phone,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'
import ZilRemitLogo from './assets/ZilremitSVG.svg'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [amount, setAmount] = useState(20000)
  const [exchangeRate, setExchangeRate] = useState(88.25)

  // Simulate real-time exchange rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newRate = 88.25 + (Math.random() - 0.5) * 0.5
      setExchangeRate(newRate)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Global Reach",
      description: "Send money to over 150 countries with industry-leading exchange rates and zero hidden fees."
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Lightning Fast",
      description: "Process international payments in minutes, not days. Most transfers complete in under 20 seconds."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Bank-Grade Security",
      description: "Bank-level encryption, 24/7 fraud monitoring, and regulatory compliance protect every transaction."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-green-600" />,
      title: "Best Exchange Rates",
      description: "Get rates up to 4% better than traditional banks with real-time pricing and transparent fees."
    }
  ]

  const statistics = [
    {
      number: "90%",
      label: "Lower Fees than Banks",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    },
    {
      number: "$50B+",
      label: "Transaction Volume",
      icon: <Globe className="w-6 h-6 text-green-600" />
    },
    {
      number: "150+",
      label: "Countries Supported",
      icon: <Award className="w-6 h-6 text-green-600" />
    },
    {
      number: "24/7",
      label: "Customer Support",
      icon: <Clock className="w-6 h-6 text-green-600" />
    }
  ]

  const serviceLocations = [
    { country: "India", flag: "🇮🇳", code: "INR" },
    { country: "Philippines", flag: "🇵🇭", code: "PHP" },
    { country: "Mexico", flag: "🇲🇽", code: "MXN" },
    { country: "United Kingdom", flag: "🇬🇧", code: "GBP" },
    { country: "Canada", flag: "🇨🇦", code: "CAD" },
    { country: "Australia", flag: "🇦🇺", code: "AUD" },
    { country: "Germany", flag: "🇩🇪", code: "EUR" },
    { country: "France", flag: "🇫🇷", code: "EUR" },
    { country: "Japan", flag: "🇯🇵", code: "JPY" },
    { country: "South Korea", flag: "🇰🇷", code: "KRW" },
    { country: "Singapore", flag: "🇸🇬", code: "SGD" },
    { country: "Brazil", flag: "🇧🇷", code: "BRL" }
  ]

  const useCases = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "For Freelancers",
      description: "Get paid by international clients instantly. No more waiting weeks for payments to clear.",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "For Businesses",
      description: "Pay international suppliers and vendors with advanced B2B payment solutions.",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "For Families",
      description: "Send money to loved ones abroad quickly, safely, and at the lowest cost.",
      color: "bg-green-100 text-green-700"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      content: "ZilRemit saved us over $5,000 in fees this year. The rates are excellent and transfers arrive within minutes. Perfect for paying our international suppliers.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "I send money to my family monthly and ZilRemit saves me hundreds compared to traditional banks. The mobile app makes it incredibly easy.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Freelance Designer",
      content: "Getting paid by international clients has never been easier. ZilRemit is fast, reliable, and transparent with no hidden fees.",
      rating: 5
    }
  ]

  const faqs = [
    {
      question: "How much can I save compared to banks?",
      answer: "You can save up to 90% on fees compared to traditional banks. We offer rates up to 4% better than banks with transparent pricing and no hidden charges."
    },
    {
      question: "How fast are international transfers?",
      answer: "Most transfers complete in under 20 seconds to major destinations. Bank transfers may take 1-3 business days depending on the receiving country and method."
    },
    {
      question: "Is my money safe with ZilRemit?",
      answer: "Yes. We use bank-level encryption, 24/7 fraud monitoring, and regulatory compliance. Your funds are held in segregated accounts with tier-1 financial institutions."
    },
    {
      question: "Which countries do you support?",
      answer: "We support transfers to over 150 countries and territories worldwide, including all major destinations like India, Philippines, Mexico, UK, Canada, and more."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img src={ZilRemitLogo} alt="ZilRemit" className="h-10 w-auto" />
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
                <a href="#solutions" className="text-gray-700 hover:text-green-600 transition-colors">Solutions</a>
                <a href="#pricing" className="text-gray-700 hover:text-green-600 transition-colors">Pricing</a>
                <a href="#support" className="text-gray-700 hover:text-green-600 transition-colors">Support</a>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Get Started
              </Button>
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-green-600">Features</a>
              <a href="#solutions" className="block px-3 py-2 text-gray-700 hover:text-green-600">Solutions</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-green-600">Pricing</a>
              <a href="#support" className="block px-3 py-2 text-gray-700 hover:text-green-600">Support</a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" className="w-full">Sign In</Button>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
                🚀 Lowest Fees & Best Exchange Rates
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                International Payments{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  with Zero Hidden Fees
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Process global business payments in minutes with industry-leading exchange rates, 
                zero hidden fees, and lowest transaction costs. Save up to 90% compared to banks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Phone className="mr-2 w-5 h-5" />
                  Request a Callback
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  24/7 support
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Bank-grade security
                </div>
              </div>
            </div>
            
            {/* Calculator */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Calculate your transfer</h3>
              <p className="text-gray-600 mb-6">1 USD = {exchangeRate.toFixed(2)} INR</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full px-4 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="20000"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <span className="text-2xl">🇺🇸</span>
                      <span className="font-semibold text-gray-700">USD</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Receiving amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={(amount * exchangeRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      readOnly
                      className="w-full px-4 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-lg bg-gray-50"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <span className="text-2xl">🇮🇳</span>
                      <span className="font-semibold text-gray-700">INR</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full py-4 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Sign Up to Send Money
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Millions Worldwide</h2>
            <p className="text-xl text-gray-600">Leading the industry with unmatched performance and reliability</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ZilRemit?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced payment technology designed for businesses and individuals managing global operations and international transfers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow border-0 bg-white">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Check Our Service Locations</h2>
            <p className="text-xl text-gray-600">Send money to over 150 countries with the best rates and fastest delivery</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {serviceLocations.map((location, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-4xl mb-3">{location.flag}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{location.country}</div>
                <div className="text-green-600 font-medium text-sm">{location.code}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              View All Countries
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Global Business Payments Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="bg-red-500 w-3 h-3 rounded-full"></div>
                  <div className="bg-yellow-500 w-3 h-3 rounded-full"></div>
                  <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                </div>
                <div className="flex items-center justify-center space-x-8">
                  <div className="bg-white rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg">
                    <span className="text-2xl">🇺🇸</span>
                    <span className="font-bold text-gray-800">USD</span>
                  </div>
                  <ArrowRight className="w-8 h-8 text-white" />
                  <div className="bg-white rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg">
                    <span className="text-2xl">🇵🇭</span>
                    <span className="font-bold text-gray-800">PHP</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-60"></div>
                <div className="absolute bottom-8 left-8 w-3 h-3 bg-white rounded-full opacity-40"></div>
                <div className="absolute top-1/2 right-8 w-2 h-2 bg-white rounded-full opacity-50"></div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Global Business Payments in Minutes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Execute international business payments with real-time exchange rates and instant processing. 
                Our B2B payment platform delivers funds to suppliers, vendors, and partners worldwide.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Start International Payments
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Send money globally in just 3 simple steps</p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-green-200 transform -translate-y-1/2"></div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                {
                  number: "1",
                  title: "Recipient Details",
                  description: "Enter the recipient's name, account details, and the amount you want to send."
                },
                {
                  number: "2", 
                  title: "Source",
                  description: "Select the source of funds, then choose the purpose of the transfer."
                },
                {
                  number: "3",
                  title: "Confirmation", 
                  description: "Review all details, check the fees, and confirm your transfer."
                }
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect for Every Need</h2>
            <p className="text-xl text-gray-600">Whether you're a freelancer, business owner, or sending money to family, we've got you covered.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow border-0">
                <div className={`w-16 h-16 rounded-full ${useCase.color} flex items-center justify-center mx-auto mb-6`}>
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{useCase.description}</p>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Stories, Real Results</h2>
            <p className="text-xl text-gray-600">See what our customers have to say about their ZilRemit experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-0 bg-white">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-green-600">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600">No hidden fees. No surprises. Just honest, competitive rates that save you money.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 text-center border-2 border-green-200 bg-green-50">
              <div className="text-5xl font-bold text-green-600 mb-2">0.5%</div>
              <div className="text-gray-900 font-semibold mb-4">Exchange rate markup</div>
              <div className="text-gray-600">Up to 4% better than banks</div>
            </Card>
            <Card className="p-8 text-center border-2 border-green-200 bg-green-50">
              <div className="text-5xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-gray-900 font-semibold mb-4">Setup fees</div>
              <div className="text-gray-600">Start sending money immediately</div>
            </Card>
            <Card className="p-8 text-center border-2 border-green-200 bg-green-50">
              <div className="text-5xl font-bold text-green-600 mb-2">$2.99</div>
              <div className="text-gray-900 font-semibold mb-4">Transfer fee</div>
              <div className="text-gray-600">Fixed low cost per transaction</div>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              Calculate Your Savings
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about our international payment services</p>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-8 border-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Go Global?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join millions of users who trust ZilRemit for their international payments. 
            Start saving money and time today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Phone className="mr-2 w-5 h-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={ZilRemitLogo} alt="ZilRemit" className="h-8 w-auto mb-4 filter brightness-0 invert" />
              <p className="text-gray-400 mb-4">
                The future of international payments. Fast, secure, and affordable money transfers worldwide.
              </p>
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
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ZilRemit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
