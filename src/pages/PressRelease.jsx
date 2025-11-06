import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function PressRelease() {
  const pressReleases = [
    {
      id: 1,
      title: 'ZilRemit Strengthens Zero Hidden Fee Policy for Transparent Global Payments',
      date: 'November 5, 2025',
      image: '/press-releases/ZilRemitStrengthensZeroHiddenFeePolicyforTransparentGlobalPaymentsZR3.jpg',
      excerpt: 'ZilRemit reaffirms its commitment to transparent global payments with zero hidden fees, making international money transfers more accessible and affordable for everyone.',
      link: 'https://markets.financialcontent.com/stocks/article/globeprwire-2025-11-5-zilremit-strengthens-zero-hidden-fee-policy-for-transparent-global-payments'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Press Releases
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay updated with the latest news and announcements from ZilRemit
          </p>
        </div>
      </section>

      {/* Press Releases Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.map((release) => (
              <div key={release.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={release.image} 
                    alt={release.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{release.date}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {release.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {release.excerpt}
                  </p>
                  <a 
                    href={release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Read Full Article →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Zero Hidden Fees?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of users who trust ZilRemit for transparent global payments.</p>
          <a 
            href="https://app.zilremit.com/signup" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Get Started Today →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PressRelease;
