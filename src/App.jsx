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
  X
} from 'lucide-react'
import ZilRemitLogo from './assets/ZilremitSVG.svg'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [amount, setAmount] = useState(1000)
  const [exchangeRate, setExchangeRate] = useState(0.852)

  // Simulate real-time exchange rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newRate = 0.852 + (Math.random() - 0.5) * 0.01
      setExchangeRate(newRate)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const exchangeRates = {
    USD: { EUR: exchangeRate, GBP: 0.73, INR: 83.2 },
    EUR: { USD: 1.18, GBP: 0.86, INR: 97.8 },
    GBP: { USD: 1.37, EUR: 1.16, INR: 113.5 }
  }

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Global Reach",
      description: "Send money to over 150 countries with competitive exchange rates and transparent fees."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Most transfers complete in under 20 seconds. Real-time notifications keep you informed."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Bank-Grade Security",
      description: "Your money is protected with 256-bit encryption and multi-factor authentication."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      title: "Multi-Currency Wallet",
      description: "Hold and manage funds in 50+ currencies. Convert instantly when you need to."
    }
  ]

  const useCases = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "For Freelancers",
      description: "Get paid by international clients with ease. No more waiting weeks for payments.",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "For Businesses",
      description: "Expand globally by accepting payments from customers worldwide.",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "For Families",
      description: "Send money to loved ones abroad quickly, safely, and affordably.",
      color: "bg-pink-100 text-pink-700"
    }
  ]

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
      name: "Priya Patel",
      role: "Freelance Designer",
      content: "Getting paid by international clients has never been easier. ZilRemit is fast, reliable, and transparent.",
      rating: 5
    }
  ]

  const faqs = [
    {
      question: "How long do transfers take?",
      answer: "Most transfers complete in under 20 seconds. Bank transfers may take 1-3 business days depending on the destination."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees, ever. We show you exactly what you'll pay upfront, including our transparent exchange rate markup."
    },
    {
      question: "Is my money safe?",
      answer: "Yes. We use bank-grade security, 256-bit encryption, and your funds are held in segregated accounts with tier-1 banks."
    },
    {
      question: "Which countries do you support?",
      answer: "We support transfers to over 150 countries and territories worldwide, with more being added regularly."
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
                <img src={ZilRemitLogo} alt="ZilRemit" className="h-8 w-auto" />
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
                🚀 Now supporting 150+ countries
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                The Future of{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  International Payments
                </span>{' '}
                is Here
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Send, receive, and manage money internationally with transparent pricing, 
                lightning-fast transfers, and bank-grade security. Join millions who trust ZilRemit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-3">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  24/7 support
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Bank-grade security
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate your transfer</h3>
                    <p className="text-gray-600">1 USD = 88.25 INR</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Send Amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full px-4 py-4 text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-20"
                          placeholder="20000"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                          <span className="text-lg font-medium">🇺🇸</span>
                          <span className="text-lg font-medium text-gray-700">USD</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Receiving amount</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={(amount * 88.25).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          readOnly
                          className="w-full px-4 py-4 text-2xl font-bold border border-gray-300 rounded-lg bg-gray-50 pr-20"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                          <span className="text-lg font-medium">🇮🇳</span>
                          <span className="text-lg font-medium text-gray-700">INR</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 text-lg rounded-lg">
                      Sign Up to Send Money
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ZilRemit?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most advanced international payment platform to make your global transactions simple, fast, and secure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-white to-gray-50">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="solutions" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a freelancer, business owner, or sending money to family, we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
                <div className={`inline-flex p-3 rounded-full ${useCase.color} mb-6`}>
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about their ZilRemit experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 bg-gradient-to-br from-white to-gray-50">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No hidden fees. No surprises. Just honest, competitive rates.
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto p-8 border-0 bg-white/80 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">0.5%</div>
                <div className="text-gray-600">Exchange rate markup</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
                <div className="text-gray-600">Setup fees</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">$2.99</div>
                <div className="text-gray-600">Transfer fee</div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Calculate Your Savings
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 border-0 bg-gradient-to-br from-white to-gray-50">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Go Global?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join millions of users who trust ZilRemit for their international payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
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
                Making international payments simple, fast, and secure for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
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
