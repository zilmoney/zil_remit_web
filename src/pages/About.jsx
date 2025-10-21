import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Business with All-In-One Modern Payments and Modern Banking Solutions.
          </h1>
        </div>
      </section>

      {/* How It All Began Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It All Began</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-4">
            <p>
              Our founder faced a real-life challenge while running Tyler Petroleum, a $60+ million annual revenue business. He relied on multiple platforms like Bill.com, Deluxe Checks, and Mint.com for payments, banking, and tracking, leading to inefficiency and frustration.
            </p>
            <p>
              Inspired by his experience managing thousands of vendors, serving as a Local ATM Processor, and operating retail and Western Union locations, he envisioned an all-in-one solution. This led to the creation of ZilRemit powered by Zil Money—a unified platform simplifying payments and banking for businesses everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl font-bold text-blue-900 mb-2">$91B+</div>
              <div className="text-gray-600 mb-4">Gross Transaction Volume</div>
              <div className="text-2xl font-semibold text-green-600 mb-2">Revolution</div>
              <p className="text-gray-700">In payments processed through ZilRemit powered by Zil Money</p>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-green-400 rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl font-bold text-blue-900 mb-2">22000+</div>
              <div className="text-gray-800 mb-4">Bank</div>
              <div className="text-2xl font-semibold text-blue-900 mb-2">Partnership</div>
              <p className="text-gray-800">Our platform works with over 22000+ banks and financial institutions.</p>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl font-bold text-blue-900 mb-2">1M+</div>
              <div className="text-gray-600 mb-4">Accounts</div>
              <div className="text-2xl font-semibold text-green-600 mb-2">Integrity</div>
              <p className="text-gray-700">Trusted by more than 60,000+ customers within 10 months of launching.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">MEET OUR TEAM</h2>
          <p className="text-lg text-gray-600 mb-12 text-center">Our team members are dedicated to supporting the growing businesses that power our economy.</p>
          
          <div className="space-y-12">
            {/* Team Member 1 - Sabeer Nelli */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-lg p-8">
              <div className="flex-shrink-0">
                <img src="/about-images/sabeer-nelli.webp" alt="Sabeer Nelli" className="w-48 h-48 rounded-full object-cover border-4 border-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Sabeer Nelli</h3>
                <p className="text-blue-900 font-semibold mb-1">Chief Executive Officer</p>
                <p className="text-gray-600 mb-4">Harvard Fin Tech.</p>
                <p className="text-gray-700">
                  Sabeer Nelli is a visionary entrepreneur whose leadership has been the driving force behind Zil Money's rapid ascent in the fintech landscape. With an extensive background in both the oil market and fintech, Sabeer's entrepreneurial journey began in 2005 with the founding of Tyler Petroleum. His expertise in managing complex financial transactions and his relentless pursuit of innovative solutions led him to create Zil Money a fintech neo-bank tailored to address the financial needs of small and medium-sized enterprises (SMEs).
                </p>
              </div>
            </div>

            {/* Team Member 2 - Justin Timlin */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-gray-50 rounded-lg p-8">
              <div className="flex-shrink-0">
                <img src="/about-images/justin-timlin.webp" alt="Justin Timlin" className="w-48 h-48 rounded-full object-cover border-4 border-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Justin Timlin</h3>
                <p className="text-blue-900 font-semibold mb-1">Chief Operating Officer</p>
                <p className="text-gray-600 mb-4">Georgetown University</p>
                <p className="text-gray-700">
                  Justin Timlin is a seasoned entrepreneur, investor, and operations executive with a proven track record in scaling high-growth businesses and leading fintech startups to success. Justin is a domain expert in digital payment and banking technologies and their ability to address customer pain points. He has accumulated a wealth of experience in leading fintech start-ups to success through his tenure as an investor at Blue Star Innovation Partners, Greenspring Associates, and TPG. Justin holds an MBA in business from Georgetown. His expertise in this field is exemplified by his receipt of the Georgetown Entrepreneurial Excellence Award and Venture Capital Competition World Championship.
                </p>
              </div>
            </div>

            {/* Team Member 3 - Sudheesh PM */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-lg p-8">
              <div className="flex-shrink-0">
                <img src="/about-images/sudheesh-pm.webp" alt="Sudheesh PM" className="w-48 h-48 rounded-full object-cover border-4 border-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Sudheesh PM</h3>
                <p className="text-blue-900 font-semibold mb-1">Chief Technology Officer</p>
                <p className="text-gray-600 mb-4">Annamalai University</p>
                <p className="text-gray-700">
                  Sudheesh has more than two decades of experience in Product development and RnD. During his long career, he was involved in High Volume Throughput Computing and integrating with different forms and sizes of data. He believes that people unknowingly made their life complex, and most of these complexities can be reduced by automating things around them. A firm believer in the metrics, he believes that what matters needs to be measured, analyzed, and monitored. An ardent believer in technology he always challenges himself with the latest happenings in this space.
                </p>
              </div>
            </div>

            {/* Team Member 4 - Afzal Modak */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-gray-50 rounded-lg p-8">
              <div className="flex-shrink-0">
                <img src="/about-images/afzal-modak.webp" alt="Afzal Modak" className="w-48 h-48 rounded-full object-cover border-4 border-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Afzal Modak</h3>
                <p className="text-blue-900 font-semibold mb-1">Chief Financial Officer</p>
                <p className="text-gray-600 mb-4">Indian Institute of Technology, Mumbai, Pace University</p>
                <p className="text-gray-700">
                  Afzal Modak is a seasoned finance executive with a distinguished career in managing large-scale financial operations and strategic investments. His experience includes serving as CFO at GE Capital, where he oversaw multi-billion-dollar financial operations, and as a partner at GSV Investment Fund, where he focused on high-growth technology companies. Afzal's deep understanding of financial strategy, capital markets, and investment management is critical to ZilMoney's growth strategy and its pursuit of securing the necessary capital to scale the business.
                </p>
              </div>
            </div>

            {/* Team Member 5 - Mohanraj Makkuni */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-lg p-8">
              <div className="flex-shrink-0">
                <img src="/about-images/mohanraj-makkuni.webp" alt="Mohanraj Makkuni" className="w-48 h-48 rounded-full object-cover border-4 border-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Mohanraj Makkuni</h3>
                <p className="text-blue-900 font-semibold mb-1">Chief Marketing Officer</p>
                <p className="text-gray-700">
                  Mohanraj Makkuni brings a remarkable combination of strategic vision, global leadership, and a profound understanding of enterprise dynamics to his role as Chief Marketing Officer at Zil Money. Tasked with cultivating and strengthening relationships with large-scale businesses, Mohan plays a pivotal role in aligning Zil Money's innovative fintech solutions with the evolving needs of enterprise clients. His mission is to position Zil Money as the leading banking and payment solutions partner for businesses worldwide.
                </p>
              </div>
            </div>

            {/* Team Member 6 - Amber Devolk */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-gray-50 rounded-lg p-8">
              <div className="flex-shrink-0">
                <img src="/about-images/amber-devolk.webp" alt="Amber Devolk" className="w-48 h-48 rounded-full object-cover border-4 border-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Amber Devolk</h3>
                <p className="text-blue-900 font-semibold mb-1">Chief Compliance Officer & BSA</p>
                <p className="text-gray-700">
                  Amber Devolk is a distinguished Chief Compliance Officer with over 18 years of experience in compliance, risk management, and corporate legal matters across a variety of sectors including fintech, banking, telecommunications, and entertainment. As Zil Money's Chief Compliance Officer (CCO) and BSA Officer, Amber plays a pivotal role in shaping the regulatory strategy and ensuring compliance across all of Zil Money's banking and financial services. Known for her strategic thinking, adept regulatory navigation, and award-winning customer service, Amber's leadership helps Zilmoney maintain its reputation as a trusted, zero-fee banking platform for small and medium-sized enterprises (SMEs).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Panel Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Advisory Panel</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Advisory 1 - James Meek */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <img src="/about-images/james-meek.webp" alt="James Meek" className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-teal-400" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">James Meek</h3>
              <p className="text-gray-600">Board member</p>
            </div>

            {/* Advisory 2 - Paul Carlucci */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <img src="/about-images/paul-carlucci.webp" alt="Paul Carlucci" className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-pink-400" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Paul Carlucci</h3>
              <p className="text-gray-600">Board member</p>
            </div>

            {/* Advisory 3 - David Tilis */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <img src="/about-images/david-tilis.webp" alt="David Tilis" className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-purple-400" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">David Tilis</h3>
              <p className="text-gray-600">Board member</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">GET IN TOUCH</h2>
          <p className="text-xl mb-8">Let's talk about how we can help your business grow and thrive.</p>
          <a href="/#support" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            Contact Us →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;

