import React, { useEffect } from 'react';

const ExactCalculator = () => {
  useEffect(() => {
    // Add the CSS styles
    const style = document.createElement('style');
    style.textContent = `
      .calculator-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }

      .calculator-container {
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        padding: 40px;
        width: 100%;
        max-width: 450px;
        position: relative;
        overflow: visible;
      }

      /* Fluidic border effect */
      .calculator-container::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff);
        background-size: 400% 400%;
        border-radius: 23px;
        z-index: -1;
        animation: fluidBorder 6s ease-in-out infinite;
        filter: blur(1px);
      }

      @keyframes fluidBorder {
        0%, 100% {
          background-position: 0% 50%;
        }
        25% {
          background-position: 100% 50%;
        }
        50% {
          background-position: 100% 100%;
        }
        75% {
          background-position: 0% 100%;
        }
      }

      .calculator-container h2 {
        font-size: 32px;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 8px;
      }

      .subtitle {
        color: #6b7280;
        font-size: 16px;
        margin-bottom: 32px;
      }

      .exchange-rate {
        color: #1a1a1a;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 32px;
      }

      .input-group {
        margin-bottom: 24px;
      }

      .input-group label {
        display: block;
        font-size: 14px;
        color: #374151;
        margin-bottom: 8px;
        font-weight: 500;
      }

      .currency-input {
        display: flex;
        align-items: center;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        background: white;
        transition: border-color 0.2s ease;
        position: relative;
        overflow: visible;
      }

      .currency-input:focus-within {
        border-color: #3b82f6;
      }

      .currency-input.error {
        border-color: #dc2626;
      }

      .currency-input input {
        flex: 1;
        border: none;
        padding: 20px 16px;
        font-size: 24px;
        font-weight: 600;
        outline: none;
        background: transparent;
        color: #1a1a1a;
        width: 100%;
      }

      .currency-input input::placeholder {
        color: #9ca3af;
      }

      .currency-selector {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 8px;
        cursor: pointer;
      }
      
      .currency-display {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 8px;
        padding-right: 30px;
      }

      .flag-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid #e5e7eb;
      }

      .currency-code {
        font-size: 16px;
        font-weight: 600;
        color: #374151;
      }

      .dropdown-arrow {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #9ca3af;
        margin-left: 4px;
      }

      .info-section {
        margin: 32px 0;
      }

      .save-info {
        color: #059669;
        font-size: 14px;
        margin-bottom: 8px;
      }

      .arrival-info {
        color: #6b7280;
        font-size: 14px;
      }

      .send-button {
        background: #3BF493;
        color: #163300;
        border: none;
        border-radius: 50px;
        padding: 20px 32px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 100%;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        display: inline-block;
        text-decoration: none;
        text-align: center;
      }

      .send-button:hover {
        background: linear-gradient(135deg, #059669, #047857);
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        color: white;
      }

      .send-button:active {
        transform: translateY(0);
      }

      .send-button:disabled {
        background: #9ca3af;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
        color: white;
      }

      .send-button:disabled:hover {
        background: #9ca3af;
        transform: none;
        box-shadow: none;
      }

      /* Currency dropdown styles */
      .currency-dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        min-width: 200px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        z-index: 1000;
        top: 100%;
        right: 0;
        border: 1px solid #e5e7eb;
        margin-top: 4px;
        max-height: 300px;
        overflow-y: auto;
      }

      .dropdown-content.show {
        display: block;
      }

      .dropdown-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        gap: 8px;
        transition: background-color 0.2s;
      }

      .dropdown-item:hover {
        background-color: #f3f4f6;
      }

      .dropdown-item:first-child {
        border-radius: 8px 8px 0 0;
      }

      .dropdown-item:last-child {
        border-radius: 0 0 8px 8px;
      }

      .loading {
        opacity: 0.6;
      }

      .error {
        color: #dc2626;
        font-size: 14px;
        margin-top: 8px;
      }

      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
        border-radius: 4px;
      }

      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      .disabled {
        opacity: 0.6;
        pointer-events: none;
      }

      .skeleton-text {
        height: 1em;
        width: 60px;
        margin: 0;
        display: inline-block;
      }

      .skeleton-input {
        height: 24px;
        width: 100%;
      }
    `;
    document.head.appendChild(style);

    // Add the JavaScript functionality
    const script = document.createElement('script');
    script.textContent = `
      // API configuration
      const API_BASE_URL = 'https://OCW-14616-SALMAN.api.ocw.sebipay.com/api/v4/outside/public-exchange-rate';
      
      // Country to currency code mapping
      const countryCurrencyMap = {
        'Estonia': { code: 'EE', currency: 'EUR' },
        'France': { code: 'FR', currency: 'EUR' },
        'Germany': { code: 'DE', currency: 'EUR' },
        'India': { code: 'IN', currency: 'INR' },
        'Philippines': { code: 'PH', currency: 'PHP' },
        'Sweden': { code: 'SE', currency: 'SEK' },
        'United Kingdom': { code: 'GB', currency: 'GBP' }
      };

      let currentSendCurrency = 'USD';
      let currentReceiveCurrency = 'India';
      let currentExchangeRate = 0.0116;
      let isApiCallInProgress = false;
      let isUpdatingInput = false;
      let lastEditedField = 'send';

      // Amount validation functions
      function showAmountError(message, inputType = 'send') {
        const errorDiv = document.getElementById(\`\${inputType}-amount-error\`);
        const inputContainer = document.getElementById(\`\${inputType}-amount-container\`);
        if (errorDiv && inputContainer) {
          errorDiv.textContent = message;
          errorDiv.style.display = 'block';
          inputContainer.classList.add('error');
        }
      }

      function hideAmountError(inputType = 'send') {
        const errorDiv = document.getElementById(\`\${inputType}-amount-error\`);
        const inputContainer = document.getElementById(\`\${inputType}-amount-container\`);
        if (errorDiv && inputContainer) {
          errorDiv.textContent = '';
          errorDiv.style.display = 'none';
          inputContainer.classList.remove('error');
        }
      }

      function validateAmountLength(value) {
        const parts = value.split('.');
        const integerPart = parts[0].replace(/,/g, '');
        return integerPart.length <= 6;
      }

      // Function to fetch exchange rate from API
      async function fetchExchangeRate(countryCode, payoutCurrencyCode, amount = 10, isReceivingAmount = 0) {
        isApiCallInProgress = true;
        updateLoadingState();
        
        try {
          const url = \`\${API_BASE_URL}?countryCode=\${countryCode}&payoutCurrencyCode=\${payoutCurrencyCode}&amount=\${amount}&isReceivingAmount=\${isReceivingAmount}\`;
          console.log('API Request:', url);
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
          }

          const data = await response.json();
          console.log('API Response:', data);
          
          if (!data.success || !data.data) {
            throw new Error('Invalid API response structure');
          }
          
          const rate = data.data.customer_exchange_rate;
          const receivingAmount = data.data.receiving_amount;
          const sendingAmount = data.data.sending_amount;
          
          return {
            rate: parseFloat(rate),
            receivingAmount: receivingAmount ? parseFloat(receivingAmount) : null,
            sendingAmount: sendingAmount ? parseFloat(sendingAmount) : null
          };
        } catch (error) {
          console.error('API Error:', error);
          throw error;
        } finally {
          isApiCallInProgress = false;
          updateLoadingState();
        }
      }

      function updateLoadingState() {
        const sendAmountInput = document.getElementById('send-amount');
        const receiveAmountInput = document.getElementById('receive-amount');
        const exchangeRateElement = document.getElementById('exchange-rate');
        const exchangeRateCurrencyElement = document.getElementById('exchange-rate-currency');
        const signupLink = document.querySelector('#signup-link');
        
        if (isApiCallInProgress) {
          if (sendAmountInput) sendAmountInput.disabled = true;
          if (receiveAmountInput) receiveAmountInput.disabled = true;
          if (signupLink) signupLink.style.pointerEvents = 'none';
          
          if (exchangeRateElement) exchangeRateElement.innerHTML = '<div class="skeleton skeleton-text"></div>';
          if (exchangeRateCurrencyElement) exchangeRateCurrencyElement.innerHTML = '<div class="skeleton skeleton-text"></div>';
        } else {
          if (sendAmountInput) sendAmountInput.disabled = false;
          if (receiveAmountInput) receiveAmountInput.disabled = false;
          if (signupLink) signupLink.style.pointerEvents = 'auto';
        }
      }

      async function updateExchangeRate() {
        const receiveCountry = countryCurrencyMap[currentReceiveCurrency];
        if (!receiveCountry) return;

        try {
          const result = await fetchExchangeRate(receiveCountry.code, receiveCountry.currency, 10, 0);
          currentExchangeRate = result.rate;
          updateExchangeRateDisplay(result.rate, receiveCountry.currency);
        } catch (error) {
          console.error('Failed to update exchange rate:', error);
        }
      }

      function updateExchangeRateDisplay(rate, receiveCurrency) {
        const exchangeRateElement = document.getElementById('exchange-rate');
        const exchangeRateCurrencyElement = document.getElementById('exchange-rate-currency');
        const exchangeRateLabelElement = document.getElementById('exchange-rate-label');
        
        if (exchangeRateElement && exchangeRateCurrencyElement && exchangeRateLabelElement) {
          if (lastEditedField === 'receive') {
            const inverseRate = 1 / rate;
            exchangeRateElement.textContent = inverseRate.toFixed(4);
            exchangeRateCurrencyElement.textContent = 'USD';
            exchangeRateLabelElement.textContent = \`1 \${receiveCurrency} = \`;
          } else {
            exchangeRateElement.textContent = rate.toFixed(2);
            exchangeRateCurrencyElement.textContent = receiveCurrency;
            exchangeRateLabelElement.textContent = '1 USD = ';
          }
        }
      }

      function toggleDropdown(type) {
        if (type === 'receive') {
          const dropdown = document.getElementById(type + '-dropdown');
          if (dropdown) {
            const isShown = dropdown.classList.contains('show');
            
            // Close all dropdowns first
            document.querySelectorAll('.dropdown-content').forEach(d => d.classList.remove('show'));
            
            // Toggle current dropdown
            if (!isShown) {
              dropdown.classList.add('show');
            }
          }
        }
      }

      function selectCurrency(type, currency, flagUrl) {
        if (type === 'receive') {
          // Find country name by currency
          let countryName = '';
          for (const [country, data] of Object.entries(countryCurrencyMap)) {
            if (data.currency === currency) {
              countryName = country;
              break;
            }
          }
          
          if (countryName) {
            currentReceiveCurrency = countryName;
            
            const flagElement = document.getElementById('receive-flag');
            const currencyElement = document.getElementById('receive-currency');
            
            if (flagElement) flagElement.src = flagUrl;
            if (currencyElement) currencyElement.textContent = currency;
            
            // Close dropdown
            const dropdown = document.getElementById('receive-dropdown');
            if (dropdown) dropdown.classList.remove('show');
            
            // Update exchange rate
            updateExchangeRate();
          }
        }
      }

      function formatNumber(num) {
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(num);
      }

      function parseNumber(str) {
        return parseFloat(str.replace(/,/g, '')) || 0;
      }

      async function calculateAmount(direction = 'send') {
        if (isUpdatingInput) return;
        
        lastEditedField = direction;
        const receiveCountry = countryCurrencyMap[currentReceiveCurrency];
        if (!receiveCountry) return;

        const sendAmountInput = document.getElementById('send-amount');
        const receiveAmountInput = document.getElementById('receive-amount');
        
        if (!sendAmountInput || !receiveAmountInput) return;

        if (direction === 'send') {
          const sendAmount = parseNumber(sendAmountInput.value);
          
          if (sendAmount >= 10) {
            try {
              const result = await fetchExchangeRate(receiveCountry.code, receiveCountry.currency, sendAmount, 0);
              currentExchangeRate = result.rate;
              
              if (result.receivingAmount) {
                isUpdatingInput = true;
                receiveAmountInput.value = formatNumber(result.receivingAmount);
                isUpdatingInput = false;
              }
              hideAmountError('send');
            } catch (error) {
              console.error('API Error in send calculation:', error);
              if (currentExchangeRate > 0) {
                const receiveAmount = sendAmount * currentExchangeRate;
                isUpdatingInput = true;
                receiveAmountInput.value = formatNumber(receiveAmount);
                isUpdatingInput = false;
              }
            }
          } else if (sendAmount > 0 && sendAmount < 10) {
            showAmountError('Minimum sending amount must be $10.00.', 'send');
          } else {
            isUpdatingInput = true;
            receiveAmountInput.value = '';
            isUpdatingInput = false;
            hideAmountError('send');
          }
        } else if (direction === 'receive') {
          const receiveAmount = parseNumber(receiveAmountInput.value);
          
          if (receiveAmount > 0) {
            try {
              const result = await fetchExchangeRate(receiveCountry.code, receiveCountry.currency, receiveAmount, 1);
              currentExchangeRate = result.rate;
              
              if (result.sendingAmount) {
                if (result.sendingAmount < 10) {
                  showAmountError('Minimum sending amount must be $10.00.', 'send');
                } else {
                  hideAmountError('send');
                }
                
                isUpdatingInput = true;
                sendAmountInput.value = formatNumber(result.sendingAmount);
                isUpdatingInput = false;
              }
            } catch (error) {
              console.error('API Error in receive calculation:', error);
              if (currentExchangeRate > 0) {
                const sendAmount = receiveAmount / currentExchangeRate;
                if (sendAmount < 10) {
                  showAmountError('Minimum sending amount must be $10.00.', 'send');
                } else {
                  hideAmountError('send');
                }
                isUpdatingInput = true;
                sendAmountInput.value = formatNumber(sendAmount);
                isUpdatingInput = false;
              }
            }
          } else {
            isUpdatingInput = true;
            sendAmountInput.value = '';
            isUpdatingInput = false;
            hideAmountError('send');
          }
        }
      }

      function debounce(fn, delay) {
        let timeoutId;
        return function(...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
      }

      // Initialize when DOM is ready
      function initializeCalculator() {
        const sendAmountInput = document.getElementById('send-amount');
        const receiveAmountInput = document.getElementById('receive-amount');
        
        if (sendAmountInput && receiveAmountInput) {
          const debouncedCalculateSend = debounce(() => {
            const value = parseNumber(sendAmountInput.value);
            if (value > 0 && value < 10) {
              showAmountError('Minimum sending amount must be $10.00.', 'send');
              return;
            } else {
              hideAmountError('send');
            }
            if (value > 0) {
              calculateAmount('send').catch(console.error);
            }
          }, 600);

          const debouncedCalculateReceive = debounce(() => {
            const value = parseNumber(receiveAmountInput.value);
            if (value > 0) {
              hideAmountError('receive');
              calculateAmount('receive').catch(console.error);
            }
          }, 600);

          sendAmountInput.addEventListener('input', function(e) {
            if (isUpdatingInput) return;
            
            lastEditedField = 'send';
            let value = e.target.value.replace(/[^\\d.]/g, '');
            
            const parts = value.split('.');
            if (parts.length > 2) {
              value = parts[0] + '.' + parts.slice(1).join('');
            }
            
            if (parts.length === 2 && parts[1].length > 2) {
              value = parts[0] + '.' + parts[1].substring(0, 2);
            }
            
            if (!validateAmountLength(value)) {
              showAmountError('Maximum amount is 100,000.00', 'send');
              const integerPart = parts[0].replace(/,/g, '');
              if (integerPart.length > 6) {
                const truncatedInteger = integerPart.substring(0, 6);
                value = parts.length === 2 ? truncatedInteger + '.' + parts[1] : truncatedInteger;
              }
            } else {
              hideAmountError('send');
            }
            
            e.target.value = value;
            
            if (!value || parseNumber(value) === 0) {
              isUpdatingInput = true;
              receiveAmountInput.value = '';
              isUpdatingInput = false;
            }
            
            debouncedCalculateSend();
          });

          receiveAmountInput.addEventListener('input', function(e) {
            if (isUpdatingInput) return;
            
            lastEditedField = 'receive';
            let value = e.target.value.replace(/[^\\d.]/g, '');
            
            const parts = value.split('.');
            if (parts.length > 2) {
              value = parts[0] + '.' + parts.slice(1).join('');
            }
            
            if (parts.length === 2 && parts[1].length > 2) {
              value = parts[0] + '.' + parts[1].substring(0, 2);
            }
            
            if (!validateAmountLength(value)) {
              showAmountError('Maximum amount is 999,999.99', 'receive');
              const integerPart = parts[0].replace(/,/g, '');
              if (integerPart.length > 6) {
                const truncatedInteger = integerPart.substring(0, 6);
                value = parts.length === 2 ? truncatedInteger + '.' + parts[1] : truncatedInteger;
              }
            } else {
              hideAmountError('receive');
            }
            
            e.target.value = value;
            
            if (!value || parseNumber(value) === 0) {
              isUpdatingInput = true;
              sendAmountInput.value = '';
              isUpdatingInput = false;
            }
            
            debouncedCalculateReceive();
          });

          // Close dropdowns when clicking outside
          document.addEventListener('click', function(event) {
            if (!event.target.closest('.currency-dropdown')) {
              document.querySelectorAll('.dropdown-content').forEach(d => d.classList.remove('show'));
            }
          });

          // Initialize exchange rate
          updateExchangeRate();
        }
      }

      // Make functions global
      window.toggleDropdown = toggleDropdown;
      window.selectCurrency = selectCurrency;

      // Initialize when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCalculator);
      } else {
        initializeCalculator();
      }
    `;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(style);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="calculator-wrapper">
      <div className="calculator-container">
        <h2>Calculate your transfer</h2>
        
        <div className="exchange-rate">
          <span id="exchange-rate-label">1 USD = </span>
          <span id="exchange-rate"><div className="skeleton skeleton-text"></div></span> 
          <span id="exchange-rate-currency"><div className="skeleton skeleton-text"></div></span>
        </div>

        <div className="input-group">
          <label htmlFor="send-amount">Send Amount</label>
          <div className="currency-input" id="send-amount-container">
            <input type="text" id="send-amount" placeholder="0.00" />
            <div className="currency-display">
              <img src="https://zilmoney.com/wp-content/uploads/2025/09/us.png" alt="USD" className="flag-icon" id="send-flag" />
              <span className="currency-code" id="send-currency">USD</span>
            </div>
          </div>
          <div id="send-amount-error" className="error" style={{display:'none'}}></div>
        </div>

        <div className="input-group">
          <label htmlFor="receive-amount">Receiving amount</label>
          <div className="currency-input" id="receive-amount-container">
            <input type="text" id="receive-amount" placeholder="0.00" />
            <div className="currency-dropdown">
              <div className="currency-selector" onClick={() => window.toggleDropdown && window.toggleDropdown('receive')}>
                <img src="https://zilmoney.com/wp-content/uploads/2025/09/in.png" alt="India" className="flag-icon" id="receive-flag" />
                <span className="currency-code" id="receive-currency">INR</span>
                <div className="dropdown-arrow"></div>
              </div>
              <div className="dropdown-content" id="receive-dropdown">
                <div className="dropdown-item" onClick={() => window.selectCurrency && window.selectCurrency('receive', 'EUR', 'https://zilmoney.com/wp-content/uploads/2025/09/ee.png')}>
                  <img src="https://zilmoney.com/wp-content/uploads/2025/09/ee.png" alt="Estonia" className="flag-icon" />
                  <span>Estonia</span>
                </div>
                <div className="dropdown-item" onClick={() => window.selectCurrency && window.selectCurrency('receive', 'EUR', 'https://zilmoney.com/wp-content/uploads/2025/09/fr.png')}>
                  <img src="https://zilmoney.com/wp-content/uploads/2025/09/fr.png" alt="France" className="flag-icon" />
                  <span>France</span>
                </div>
                <div className="dropdown-item" onClick={() => window.selectCurrency && window.selectCurrency('receive', 'EUR', 'https://zilmoney.com/wp-content/uploads/2025/09/de.png')}>
                  <img src="https://zilmoney.com/wp-content/uploads/2025/09/de.png" alt="Germany" className="flag-icon" />
                  <span>Germany</span>
                </div>
                <div className="dropdown-item" onClick={() => window.selectCurrency && window.selectCurrency('receive', 'INR', 'https://zilmoney.com/wp-content/uploads/2025/09/in.png')}>
                  <img src="https://zilmoney.com/wp-content/uploads/2025/09/in.png" alt="India" className="flag-icon" />
                  <span>India</span>
                </div>
                <div className="dropdown-item" onClick={() => window.selectCurrency && window.selectCurrency('receive', 'PHP', 'https://zilmoney.com/wp-content/uploads/2025/09/ph.png')}>
                  <img src="https://zilmoney.com/wp-content/uploads/2025/09/ph.png" alt="Philippines" className="flag-icon" />
                  <span>Philippines</span>
                </div>
                <div className="dropdown-item" onClick={() => window.selectCurrency && window.selectCurrency('receive', 'SEK', 'https://zilmoney.com/wp-content/uploads/2025/09/se.png')}>
                  <img src="https://zilmoney.com/wp-content/uploads/2025/09/se.png" alt="Sweden" className="flag-icon" />
                  <span>Sweden</span>
                </div>
                <div className="dropdown-item" onClick={() => window.selectCurrency && window.selectCurrency('receive', 'GBP', 'https://zilmoney.com/wp-content/uploads/2025/09/gb.png')}>
                  <img src="https://zilmoney.com/wp-content/uploads/2025/09/gb.png" alt="United Kingdom" className="flag-icon" />
                  <span>United Kingdom</span>
                </div>
              </div>
            </div>
          </div>
          <div id="receive-amount-error" className="error" style={{display:'none'}}></div>
        </div>

        <a href="https://zilmoney.com/preregister/" className="send-button" id="signup-link" target="_blank" rel="noopener noreferrer">
          Sign Up to Send Money
        </a>
      </div>
    </div>
  );
};

export default ExactCalculator;
