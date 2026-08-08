import { useEffect } from 'react';

// "Book A Demo" popup: offers an instant live screen-share or a Calendly
// booking. Reuses the OnlineCheckWriter instant-demo backend/API as-is
// (same endpoints, same request/response handling); only the visual styling
// (ZilRemit's green/neon palette, ZilRemit logo) and copy (rewritten for
// international transfers instead of domestic ACH/wire/payroll) are
// specific to this site. Mount this once near the app root so it's present
// on every route; it listens for clicks on any "Book A Demo" trigger
// document-wide.
const MODAL_HTML = `
<style>
  @keyframes zm-pulse { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(3.2); opacity: 0; } }
  @keyframes zm-spin { to { transform: rotate(360deg); } }
  @keyframes zm-modal-in { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @media (max-width: 640px) {
    .zm-mobile-hide { display: none !important; }
    .zm-choice-col { padding: 22px 20px !important; gap: 12px !important; }
  }
</style>

<div id="zm-demo-backdrop" style="display:none;position:fixed;inset:0;background:rgba(17,24,39,0.55);z-index:99999;align-items:center;justify-content:center;padding:24px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div id="zm-demo-card" style="position:relative;width:100%;max-width:440px;background:#FFFFFF;border-radius:18px;padding:30px;box-sizing:border-box;overflow:hidden;box-shadow:0 30px 80px rgba(17,24,39,0.35);animation:zm-modal-in 0.22s ease-out;transition:max-width 0.2s ease;">
    <button id="zm-demo-close" aria-label="Close" style="position:absolute;top:14px;right:14px;width:32px;height:32px;border:none;background:#FFFFFF;color:#111827;border-radius:999px;font-size:13px;line-height:1;cursor:pointer;font-family:inherit;box-shadow:0 1px 6px rgba(17,24,39,0.18);z-index:2;">✕</button>

    <!-- panel: choice -->
    <div id="zm-panel-choice">
      <div class="zm-choice-col" style="flex:1 1 280px;background:#F0FDF4;color:#111827;padding:32px 28px;box-sizing:border-box;display:flex;flex-direction:column;gap:18px;border-right:1px solid #BBF7D0;">
        <span style="align-self:flex-start;display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:#FFFFFF;border:1px solid #BBF7D0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#16A34A;">
          <span style="width:6px;height:6px;border-radius:50%;background:#00F889;display:inline-block;"></span>
          Free demo
        </span>
        <h2 style="font-size:23px;font-weight:700;line-height:1.3;margin:0;color:#111827;">Would you like a<br><span style="color:#16A34A;">Free demo?</span></h2>
        <ul class="zm-mobile-hide" style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;">
          <li style="display:flex;align-items:flex-start;gap:10px;">
            <span style="width:22px;height:22px;border-radius:50%;background:rgba(22,163,74,0.12);display:flex;align-items:center;justify-content:center;flex:none;margin-top:1px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            </span>
            <span style="font-size:13.5px;line-height:1.55;color:#4B5563;"><strong style="color:#111827;">We want to make your life easier.</strong></span>
          </li>
          <li style="display:flex;align-items:flex-start;gap:10px;">
            <span style="width:22px;height:22px;border-radius:50%;background:rgba(22,163,74,0.12);display:flex;align-items:center;justify-content:center;flex:none;margin-top:1px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            </span>
            <span style="font-size:13.5px;line-height:1.55;color:#4B5563;">See how <strong style="color:#111827;">ZilRemit</strong> sends money internationally, for less and faster than your bank.</span>
          </li>
          <li style="display:flex;align-items:flex-start;gap:10px;">
            <span style="width:22px;height:22px;border-radius:50%;background:rgba(22,163,74,0.12);display:flex;align-items:center;justify-content:center;flex:none;margin-top:1px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            </span>
            <span style="font-size:13.5px;line-height:1.55;color:#4B5563;">Talk to a <strong style="color:#111827;">real product expert</strong> on a live screen share.</span>
          </li>
          <li style="display:flex;align-items:flex-start;gap:10px;">
            <span style="width:22px;height:22px;border-radius:50%;background:rgba(22,163,74,0.12);display:flex;align-items:center;justify-content:center;flex:none;margin-top:1px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            </span>
            <span style="font-size:13.5px;line-height:1.55;color:#4B5563;">Watch a transfer go from <strong style="color:#111827;">quote to delivery</strong>, with live rates and no hidden fees.</span>
          </li>
          <li style="display:flex;align-items:flex-start;gap:10px;">
            <span style="width:22px;height:22px;border-radius:50%;background:rgba(22,163,74,0.12);display:flex;align-items:center;justify-content:center;flex:none;margin-top:1px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            </span>
            <span style="font-size:13.5px;line-height:1.55;color:#4B5563;">All the ways you need to <strong style="color:#111827;">send money abroad</strong>, for yourself or your business.</span>
          </li>
        </ul>
      </div>
      <div class="zm-choice-col" style="flex:1 1 280px;background:#FFFFFF;padding:32px 28px;box-sizing:border-box;display:flex;flex-direction:column;gap:16px;">
        <div class="zm-mobile-hide" style="align-self:center;width:56px;height:56px;border-radius:16px;background:#F0FDF4;box-shadow:0 4px 14px rgba(17,24,39,0.08);display:flex;align-items:center;justify-content:center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
        </div>
        <ul class="zm-mobile-hide" style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;">
          <li style="display:flex;align-items:flex-start;gap:10px;">
            <span style="width:30px;height:30px;border-radius:8px;background:#F0FDF4;border:1px solid #BBF7D0;display:flex;align-items:center;justify-content:center;flex:none;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4 20-7z"></path></svg>
            </span>
            <span style="font-size:13.5px;line-height:1.5;color:#1F2937;font-weight:500;">Send money to a <strong>bank account or mobile wallet</strong> in minutes, not days.</span>
          </li>
          <li style="display:flex;align-items:flex-start;gap:10px;">
            <span style="width:30px;height:30px;border-radius:8px;background:#F0FDF4;border:1px solid #BBF7D0;display:flex;align-items:center;justify-content:center;flex:none;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"></path><path d="M20 7H4"></path><path d="m8 21-4-4 4-4"></path><path d="M4 17h16"></path></svg>
            </span>
            <span style="font-size:13.5px;line-height:1.5;color:#1F2937;font-weight:500;"><strong>Real-time exchange rates</strong> and transparent, upfront pricing. No hidden fees.</span>
          </li>
          <li style="display:flex;align-items:flex-start;gap:10px;">
            <span style="width:30px;height:30px;border-radius:8px;background:#F0FDF4;border:1px solid #BBF7D0;display:flex;align-items:center;justify-content:center;flex:none;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </span>
            <span style="font-size:13.5px;line-height:1.5;color:#1F2937;font-weight:500;"><strong>Track every transfer</strong> from quote to delivery, wherever it's headed.</span>
          </li>
        </ul>
        <button id="zm-choose-instant" disabled style="position:relative;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 16px;font-size:14px;font-weight:700;font-family:inherit;border:1px solid transparent;border-radius:10px;cursor:not-allowed;box-sizing:border-box;margin-top:2px;background:#FFFFFF;color:#6B7280;box-shadow:0 1px 4px rgba(17,24,39,0.08);transition:background 0.2s ease,border-color 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;">
          <span id="zm-avail-online-row" style="display:none;align-items:center;justify-content:center;gap:8px;">
            <span style="position:relative;display:inline-flex;width:8px;height:8px;flex:none;">
              <span id="zm-avail-pulse" style="position:absolute;inset:0;border-radius:50%;background:#16A34A;animation:zm-pulse 1.6s ease-out infinite;"></span>
              <span id="zm-avail-dot" style="position:relative;width:8px;height:8px;border-radius:50%;background:#9CA3AF;display:inline-block;"></span>
            </span>
            <span>Talk to an expert now</span>
            <span style="font-weight:600;opacity:0.75;">· <span id="zm-avail-text">checking…</span></span>
          </span>
          <span id="zm-avail-checking-row" style="display:flex;align-items:center;justify-content:center;gap:8px;color:#6B7280;font-weight:600;">
            <span style="width:15px;height:15px;border:2px solid #E5E7EB;border-top-color:#6B7280;border-radius:50%;flex:none;animation:zm-spin 0.7s linear infinite;"></span>
            <span>Checking who's online…</span>
          </span>
        </button>
        <a href="https://calendly.com/zmn/demo" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 16px;font-size:14px;font-weight:700;font-family:inherit;color:#16A34A;background:#FFFFFF;border:1.5px solid #16A34A;border-radius:10px;text-decoration:none;box-sizing:border-box;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="m9 16 2 2 4-4"></path></svg>
          Book Demo Now
        </a>
      </div>
    </div>

    <!-- panel: form -->
    <div id="zm-panel-form" style="display:none;">
      <button id="zm-back-1" style="background:none;border:none;padding:0;font-family:inherit;font-size:13px;font-weight:600;color:#16A34A;cursor:pointer;margin:0 0 14px;">← All options</button>
      <h2 style="font-size:22px;font-weight:700;line-height:1.3;margin:0 0 6px;color:#1F2937;">Start your instant demo</h2>
      <p style="font-size:14px;line-height:1.6;color:#4B5563;margin:0 0 16px;">An expert joins you on a live screen share in seconds.</p>
      <div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;color:#4B5563;margin:0 0 16px;">
        <span id="zm-avail-dot-2" style="width:8px;height:8px;border-radius:50%;background:#9CA3AF;flex:none;display:inline-block;"></span>
        <span id="zm-avail-text-2">Checking availability…</span>
      </div>
      <div style="margin-bottom:12px;">
        <label style="display:block;font-size:13px;font-weight:500;margin-bottom:5px;" for="zm-name">Your name</label>
        <input id="zm-name" type="text" placeholder="Sarah Chen" autocomplete="name" style="width:100%;padding:11px 14px;font-size:14px;font-family:inherit;border:1px solid #E5E7EB;border-radius:10px;box-sizing:border-box;">
      </div>
      <div style="margin-bottom:12px;">
        <label style="display:block;font-size:13px;font-weight:500;margin-bottom:5px;" for="zm-business">Business name</label>
        <input id="zm-business" type="text" placeholder="Acme Logistics LLC" autocomplete="organization" style="width:100%;padding:11px 14px;font-size:14px;font-family:inherit;border:1px solid #E5E7EB;border-radius:10px;box-sizing:border-box;">
      </div>
      <div style="margin-bottom:14px;">
        <label style="display:block;font-size:13px;font-weight:500;margin-bottom:5px;" for="zm-email">Work email</label>
        <input id="zm-email" type="email" placeholder="sarah@company.com" autocomplete="email" style="width:100%;padding:11px 14px;font-size:14px;font-family:inherit;border:1px solid #E5E7EB;border-radius:10px;box-sizing:border-box;">
      </div>
      <p id="zm-form-error" style="display:none;font-size:13px;color:#DC2626;margin:0 0 12px;"></p>
      <button id="zm-start" style="display:block;width:100%;padding:15px 20px;font-size:15px;font-weight:600;font-family:inherit;color:#FFFFFF;background:#16A34A;border:none;border-radius:999px;cursor:pointer;">Request instant demo</button>
    </div>

    <!-- panel: unavailable (kept for parity; not currently linked from the choice screen) -->
    <div id="zm-panel-unavailable" style="display:none;">
      <button id="zm-back-2" style="background:none;border:none;padding:0;font-family:inherit;font-size:13px;font-weight:600;color:#16A34A;cursor:pointer;margin:0 0 14px;">← All options</button>
      <h2 style="font-size:22px;font-weight:700;line-height:1.3;margin:0 0 6px;color:#1F2937;">All experts are busy right now</h2>
      <p style="font-size:14px;line-height:1.6;color:#4B5563;margin:0 0 20px;">Everyone's with a customer. Pick a time on the calendar and we'll come to you, or hang on: this screen updates the moment someone frees up.</p>
      <a href="https://calendly.com/zmn/demo" target="_blank" rel="noopener" style="display:block;text-align:center;padding:15px 20px;font-size:15px;font-weight:600;color:#FFFFFF;background:#16A34A;border-radius:999px;text-decoration:none;">Schedule a demo</a>
      <p style="font-size:13px;color:#4B5563;line-height:1.6;margin:14px 0 0;text-align:center;">Watching for someone to free up…</p>
    </div>

    <!-- panel: connecting -->
    <div id="zm-panel-connecting" style="display:none;text-align:center;padding:18px 0;">
      <div style="width:22px;height:22px;border:2.5px solid #E5E7EB;border-top-color:#16A34A;border-radius:50%;margin:0 auto 14px;animation:zm-spin 0.8s linear infinite;"></div>
      <h2 style="font-size:18px;font-weight:700;line-height:1.3;margin:0 0 6px;color:#1F2937;">Connecting you with an expert</h2>
      <p id="zm-connecting-text" style="font-size:14px;line-height:1.6;color:#4B5563;margin:0;">Finding someone to join you…</p>
      <p style="font-size:13px;color:#4B5563;line-height:1.6;margin:14px 0 0;">Please stay on this page. We'll let you in the moment an expert accepts.</p>
    </div>

    <!-- panel: ready -->
    <div id="zm-panel-ready" style="display:none;text-align:center;padding:6px 0;">
      <p style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#16A34A;margin:0 0 8px;">You're connected</p>
      <h2 id="zm-ready-title" style="font-size:20px;font-weight:700;line-height:1.3;margin:0 0 8px;color:#1F2937;">An expert is ready for you</h2>
      <p style="font-size:14px;line-height:1.6;color:#4B5563;margin:0 0 18px;">Your room is set up. Click below to join, it opens in a new tab.</p>
      <a id="zm-join-btn" href="#" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;box-sizing:border-box;text-align:center;text-decoration:none;padding:15px 20px;font-size:15px;font-weight:600;font-family:inherit;color:#FFFFFF;background:#16A34A;border-radius:999px;cursor:pointer;"><span>Join the meeting now</span><span id="zm-ready-countdown" style="font-weight:600;opacity:0.65;">(20s)</span></a>
      <p style="font-size:13px;color:#4B5563;line-height:1.6;margin:16px 0 0;">You can keep working here while you're on the call.</p>
    </div>

    <!-- panel: timeout -->
    <div id="zm-panel-timeout" style="display:none;">
      <h2 style="font-size:20px;font-weight:700;line-height:1.3;margin:0 0 8px;color:#1F2937;">Your instant demo timed out</h2>
      <p style="font-size:14px;line-height:1.6;color:#4B5563;margin:0 0 20px;">This instant demo session expired before it could start. You can request a new instant demo now, or schedule one at a time that works for you.</p>
      <button id="zm-timeout-retry" style="display:block;width:100%;padding:15px 20px;font-size:15px;font-weight:600;font-family:inherit;color:#FFFFFF;background:#16A34A;border:none;border-radius:999px;cursor:pointer;margin-bottom:10px;">Request again</button>
      <button id="zm-timeout-dismiss" style="display:block;width:100%;padding:13px 20px;font-size:14px;font-weight:600;font-family:inherit;color:#16A34A;background:transparent;border:1.5px solid #BBF7D0;border-radius:999px;cursor:pointer;">Not now</button>
    </div>

    <!-- panel: noagents -->
    <div id="zm-panel-noagents" style="display:none;">
      <img src="/Bluelogo.svg" alt="ZilRemit" style="height:22px;width:auto;display:block;margin:0 0 12px;">
      <h2 style="font-size:22px;font-weight:700;line-height:1.3;margin:0 0 6px;color:#1F2937;">No one could join</h2>
      <p style="font-size:14px;line-height:1.6;color:#4B5563;margin:0 0 20px;">Everyone got pulled into something. Leave your details and we'll book you in.</p>
      <a href="https://calendly.com/zmn/demo" target="_blank" rel="noopener" style="display:block;text-align:center;padding:15px 20px;font-size:15px;font-weight:600;color:#FFFFFF;background:#16A34A;border-radius:999px;text-decoration:none;">Book a demo instead</a>
    </div>

    <!-- panel: error -->
    <div id="zm-panel-error" style="display:none;">
      <h2 style="font-size:18px;font-weight:700;line-height:1.3;margin:0 0 6px;color:#1F2937;">Can't reach the demo service</h2>
      <p id="zm-error-text" style="font-size:14px;line-height:1.6;color:#4B5563;margin:0 0 20px;">Check that the backend is running.</p>
      <button id="zm-retry" style="display:block;width:100%;padding:14px 20px;font-size:15px;font-weight:600;font-family:inherit;color:#16A34A;background:transparent;border:1.5px solid #BBF7D0;border-radius:999px;cursor:pointer;">Try again</button>
      <a href="https://calendly.com/zmn/demo" target="_blank" rel="noopener" style="display:block;text-align:center;margin-top:10px;padding:14px 20px;font-size:14px;font-weight:600;color:#FFFFFF;background:#16A34A;border-radius:999px;text-decoration:none;">Schedule a demo instead</a>
    </div>

  </div>
</div>
`;

export default function BookDemoModal() {
  useEffect(() => {
    var cfg = {
      apiUrl: 'https://app.onlinecheckwriter.com',
      pollMs: 5000
    };

    var $ = function (id) { return document.getElementById(id); };

    // Reports which site the widget is running on.
    function getDomain() {
      return 'website-zilremit';
    }

    var panels = ['zm-panel-choice', 'zm-panel-form', 'zm-panel-unavailable', 'zm-panel-connecting', 'zm-panel-ready', 'zm-panel-timeout', 'zm-panel-noagents', 'zm-panel-error'];
    var pollTimer = null, readyTimer = null, connectTimer = null, statusPollTimer = null;
    var currentRequestId = null, currentJoinUrl = null;
    var inReadyState = false, joinClicked = false;
    var READY_SECONDS = 20;
    var CONNECT_TIMEOUT_MS = 25000;
    var STATUS_POLL_MS = 3000;
    var destroyed = false;

    function showPanel(which) {
      panels.forEach(function (p) {
        var el = $(p);
        if (!el) return;
        el.style.display = (p !== which) ? 'none' : (p === 'zm-panel-choice' ? 'flex' : 'block');
      });
      var choice = $('zm-panel-choice');
      if (choice) choice.style.flexWrap = 'wrap';
      var card = $('zm-demo-card');
      var isChoice = which === 'zm-panel-choice';
      if (card) {
        card.style.maxWidth = isChoice ? '720px' : '440px';
        card.style.padding = isChoice ? '0' : '30px';
      }
    }

    function openModal() {
      document.body.style.overflow = 'hidden';
      $('zm-demo-backdrop').style.display = 'flex';
      $('zm-form-error').style.display = 'none';
      showPanel('zm-panel-choice');
    }
    function closeModal() {
      document.body.style.overflow = '';
      $('zm-demo-backdrop').style.display = 'none';
      resetDemoState();
    }

    function resetDemoState() {
      if (inReadyState && !joinClicked && currentRequestId) { pingCancel(currentRequestId); }
      inReadyState = false;
      joinClicked = false;
      clearInterval(readyTimer);
      readyTimer = null;
      clearTimeout(connectTimer);
      connectTimer = null;
      stopStatusPoll();
      currentRequestId = null;
      currentJoinUrl = null;
      var joinBtn = $('zm-join-btn');
      if (joinBtn) {
        joinBtn.href = '#';
        joinBtn.innerHTML = '<span>Join the meeting now</span><span id="zm-ready-countdown" style="font-weight:600;opacity:0.65;">(' + READY_SECONDS + 's)</span>';
      }
      startPolling();
    }

    function setAvail(state, text) {
      var dotColor = { checking: '#9CA3AF', online: '#16A34A', busy: '#F59E0B', offline: '#9CA3AF' }[state];
      ['zm-avail-dot', 'zm-avail-dot-2', 'zm-avail-pulse'].forEach(function (id) { var el = $(id); if (el) el.style.background = dotColor; });
      ['zm-avail-text', 'zm-avail-text-2'].forEach(function (id) { var el = $(id); if (el) el.textContent = text; });

      var isOnline = state === 'online';
      var btn = $('zm-choose-instant');
      if (!btn) return;
      $('zm-avail-online-row').style.display = isOnline ? 'flex' : 'none';
      $('zm-avail-checking-row').style.display = isOnline ? 'none' : 'flex';
      btn.style.background = isOnline ? '#16A34A' : '#FFFFFF';
      btn.style.color = isOnline ? '#FFFFFF' : '#6B7280';
      btn.style.borderColor = isOnline ? 'transparent' : '#E5E7EB';
      btn.style.boxShadow = isOnline ? 'none' : '0 1px 4px rgba(17,24,39,0.08)';
      btn.disabled = !isOnline;
      btn.style.cursor = isOnline ? 'pointer' : 'not-allowed';
    }

    function applyAvailability(available, count) {
      var n = count || 1;
      setAvail(
        available ? 'online' : 'busy',
        available ? (n > 1 ? n + ' experts online' : 'online now') : 'busy right now'
      );
    }

    function checkAvailability() {
      fetch(cfg.apiUrl + '/outside/instant-demo/availability', { cache: 'no-store' })
        .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
        .then(function (data) { if (!destroyed) applyAvailability(data.available, data.agent_count); })
        .catch(function () { if (!destroyed) setAvail('offline', 'status unavailable'); });
    }

    function startPolling() {
      checkAvailability();
      stopPolling();
      pollTimer = setInterval(checkAvailability, cfg.pollMs);
    }
    function stopPolling() {
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = null;
    }

    function fail(msg) {
      $('zm-error-text').textContent = msg;
      showPanel('zm-panel-error');
      stopPolling();
    }

    function formError(msg, focusEl) {
      var el = $('zm-form-error');
      el.textContent = msg;
      el.style.display = 'block';
      if (focusEl) focusEl.focus();
    }

    function pingJoined(requestId) {
      fetch(cfg.apiUrl + '/outside/instant-demo/joined', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ requestId: requestId })
      }).catch(function () {});
    }

    function pingCancel(requestId) {
      fetch(cfg.apiUrl + '/outside/instant-demo/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ requestId: requestId })
      }).catch(function () {});
    }

    function startDemo() {
      var name = ($('zm-name').value || '').trim();
      var business = ($('zm-business').value || '').trim();
      var email = ($('zm-email').value || '').trim();
      if (!name) { formError('Please enter your name.', $('zm-name')); return; }
      if (!business) { formError('Please enter your business name.', $('zm-business')); return; }
      if (!email || email.indexOf('@') < 1) { formError('Please enter your work email.', $('zm-email')); return; }
      $('zm-form-error').style.display = 'none';

      $('zm-connecting-text').textContent = 'Finding someone to join you…';
      showPanel('zm-panel-connecting');
      stopPolling();

      fetch(cfg.apiUrl + '/outside/instant-demo/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ customerName: name, businessName: business, customerEmail: email, domain: getDomain() })
      })
        .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
        .then(function (data) {
          currentRequestId = data.requestId;
          currentJoinUrl = data.joinUrl;
          listen(data.requestId);
        })
        .catch(function (e) { fail('Could not start the demo. ' + e.message); });
    }

    function listen(requestId) {
      clearTimeout(connectTimer);
      connectTimer = setTimeout(showTimeout, CONNECT_TIMEOUT_MS);

      clearInterval(statusPollTimer);
      statusPollTimer = setInterval(function () { pollStatus(requestId); }, STATUS_POLL_MS);
      pollStatus(requestId);
    }

    function pollStatus(requestId) {
      fetch(cfg.apiUrl + '/outside/instant-demo/status/' + requestId, { cache: 'no-store' })
        .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
        .then(function (data) {
          if (data.status === 'CONNECTED') {
            clearTimeout(connectTimer);
            connectTimer = null;
            stopStatusPoll();
            if (data.joinUrl) currentJoinUrl = data.joinUrl;
            showReady(data.agentName || null);
          } else if (data.status === 'NO_AGENTS' || data.status === 'FAILED' || data.status === 'ENDED') {
            clearTimeout(connectTimer);
            connectTimer = null;
            stopStatusPoll();
            showPanel('zm-panel-noagents');
          }
        })
        .catch(function () {});
    }

    function stopStatusPoll() {
      clearInterval(statusPollTimer);
      statusPollTimer = null;
    }

    function showReady(agentName) {
      inReadyState = true;
      joinClicked = false;
      $('zm-ready-title').textContent = (agentName || 'An expert') + ' is ready for you';
      $('zm-join-btn').href = currentJoinUrl || '#';
      showPanel('zm-panel-ready');
      var secs = READY_SECONDS;
      $('zm-ready-countdown').textContent = '(' + secs + 's)';
      clearInterval(readyTimer);
      readyTimer = setInterval(function () {
        secs -= 1;
        if (secs <= 0) { showTimeout(); return; }
        $('zm-ready-countdown').textContent = '(' + secs + 's)';
      }, 1000);
    }

    function showTimeout() {
      if (inReadyState && !joinClicked && currentRequestId) { pingCancel(currentRequestId); }
      inReadyState = false;
      joinClicked = false;
      clearInterval(readyTimer);
      readyTimer = null;
      clearTimeout(connectTimer);
      connectTimer = null;
      stopStatusPoll();
      currentRequestId = null;
      currentJoinUrl = null;
      showPanel('zm-panel-timeout');
    }

    function joinMeeting() {
      joinClicked = true;
      if (currentRequestId) pingJoined(currentRequestId);
      closeModal();
    }

    function onBackdropClick(e) { if (e.target === $('zm-demo-backdrop')) closeModal(); }
    function onCardClick(e) { e.stopPropagation(); }
    function onKeydown(e) { if (e.key === 'Escape' && $('zm-demo-backdrop').style.display === 'flex') closeModal(); }
    function onChooseInstant() { if (this.disabled) return; showPanel('zm-panel-form'); }
    function onBackToChoice() { showPanel('zm-panel-choice'); }
    function onRetryChoice() { showPanel('zm-panel-choice'); startPolling(); }
    function onFieldKeydown(e) { if (e.key === 'Enter') startDemo(); }

    // Document-wide click delegation so it works no matter which route's
    // markup rendered the trigger (nav CTA, hero, footer, country pages).
    // Matches class="book-a-demo-btn"/[data-zm-open-demo], or link/button
    // text starting with "Book A/a Demo" (tolerant of a trailing arrow/icon,
    // since some CTAs render "Book A Demo →").
    function onDocumentClick(e) {
      if (e.target.closest('#zm-demo-backdrop')) return;
      var trigger = e.target.closest('.book-a-demo-btn, [data-zm-open-demo]');
      if (!trigger) {
        var el = e.target.closest('a, button');
        var label = el && (el.textContent || '').trim();
        if (el && /^book\s+a\s+demo\b/i.test(label || '')) trigger = el;
      }
      if (trigger) { e.preventDefault(); openModal(); }
    }

    // Track every (element, type, handler) triple so cleanup can remove
    // exactly what was added, no matter how many. Needed because React 18
    // StrictMode's dev-only double-invoke of effects runs this setup twice
    // against the same (persisted) DOM without an intervening real unmount,
    // so an incomplete cleanup would leave duplicate listeners bound and
    // every click/keypress would double-fire. Production builds only ever
    // run the effect once, so this only matters for local `npm run dev`.
    var bound = [];
    function on(el, type, handler) {
      if (!el) return;
      el.addEventListener(type, handler);
      bound.push([el, type, handler]);
    }

    on($('zm-demo-backdrop'), 'click', onBackdropClick);
    on($('zm-demo-card'), 'click', onCardClick);
    on($('zm-demo-close'), 'click', closeModal);
    on(document, 'keydown', onKeydown);
    on($('zm-choose-instant'), 'click', onChooseInstant);
    on($('zm-back-1'), 'click', onBackToChoice);
    on($('zm-back-2'), 'click', onBackToChoice);
    on($('zm-start'), 'click', startDemo);
    on($('zm-join-btn'), 'click', joinMeeting);
    on($('zm-timeout-retry'), 'click', startDemo);
    on($('zm-timeout-dismiss'), 'click', closeModal);
    on($('zm-retry'), 'click', onRetryChoice);
    ['zm-name', 'zm-business', 'zm-email'].forEach(function (id) {
      on($(id), 'keydown', onFieldKeydown);
    });
    on(document, 'click', onDocumentClick);

    startPolling();

    return function cleanup() {
      destroyed = true;
      stopPolling();
      stopStatusPoll();
      clearInterval(readyTimer);
      clearTimeout(connectTimer);
      bound.forEach(function (t) { t[0].removeEventListener(t[1], t[2]); });
      document.body.style.overflow = '';
    };
  }, []);

  return <div id="zm-demo-modal-root" dangerouslySetInnerHTML={{ __html: MODAL_HTML }} />;
}
