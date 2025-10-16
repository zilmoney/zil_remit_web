import React, { useState } from 'react';

const CallbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const isValidUSPhone = (phone) => {
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 3 && cleaned.length <= 6) {
      return cleaned.replace(/(\d{3})(\d+)/, '$1-$2');
    } else if (cleaned.length > 6) {
      return cleaned.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    }
    return cleaned;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (error) setError('');
  };

  const handleSubmit = async () => {
    const { name, email, phone } = formData;

    if (!name.trim() || !isValidUSPhone(phone)) {
      setError('Please enter a valid Full Name and U.S. Phone Number.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const currentPage = window.location.href;
    const apiUrl = `https://app.onlinecheckwriter.com/outside/talk-to-sales?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&page=${encodeURIComponent(currentPage)}${email ? '&email=' + encodeURIComponent(email) : ''}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Accept': '*/*' }
      });

      if (response.ok) {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = '';
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <>
      {/* Form Container */}
      <div className="max-w-2xl">
        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            maxLength="12"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 btn-primary hover-lift shadow-lg"
          >
            {isSubmitting ? 'Sending...' : 'Request a Callback →'}
          </button>
          <a
            href="https://www.youtube.com/watch?v=e7n_5X-U66Q"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift text-center flex items-center justify-center"
          >
            See How It Works
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-200 animate-fade-in-up">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              You are a privileged customer. One of our payments expert will call you shortly.
            </p>
            
            <button
              onClick={closeModal}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CallbackForm;
