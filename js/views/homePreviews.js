/**
 * homePreviews.js — isolated live previews for the home "Module Lab".
 * Deterministic local math only; FX reads previously cached rates and never
 * fetches. No globals, no imports of tool modules.
 */
import { qs, qsa, on } from '../utils/dom.js';
import { getCached } from '../utils/storage.js';
import { fmtCurrency, fmtRelative } from '../utils/format.js';
import { TOOLS, CATEGORIES } from '../tools.js';

const MAX_RATE_AGE = 1000 * 60 * 60 * 6;
const FX_CODES = ['EUR', 'GBP', 'JPY'];

const html = () => {
  const calcCount = TOOLS.filter((t) => t.group === 'calculators').length;
  const convCount = TOOLS.filter((t) => t.group === 'converters').length;
  const cached = getCached('rates:USD', MAX_RATE_AGE);
  const rates = cached?.payload?.rates;
  const hasRates = Boolean(rates) && FX_CODES.every((code) => Number.isFinite(Number(rates[code])));

  return `
  <div class="lab-head">
    <div class="lab-heading">
      <span>// Module Lab 01</span>
      <span class="lab-sep" aria-hidden="true"></span>
      <span class="lab-sub">Live micro-engines</span>
    </div>
    <span class="lab-meta">4 interactive surfaces running</span>
  </div>
  <div class="lab-grid">
    <article class="lab-card lab-card--fx">
      <header class="lab-card-head">
        <span class="lab-icon" aria-hidden="true"><i class="fa-solid fa-arrow-right-arrow-left"></i></span>
        <div><h2>Live FX Converter</h2><p>Cached-rate engine</p></div>
        <span class="lab-badge ${hasRates ? 'lab-badge--ok' : ''}" id="fx-badge">${hasRates ? 'CACHED' : 'OPEN TOOL'}</span>
      </header>
      <div class="lab-inner">
        <div class="lab-row"><label for="fx-amount">Amount (USD)</label><output class="lab-amount" id="fx-amount-label" for="fx-amount">$150.00</output></div>
        <input type="range" id="fx-amount" min="10" max="1000" step="5" value="150" ${hasRates ? '' : 'disabled'} aria-label="Preview amount in US dollars">
        <div class="lab-tiles">
          <div class="lab-tile"><span>EUR</span><strong id="fx-eur">—</strong></div>
          <div class="lab-tile"><span>GBP</span><strong id="fx-gbp">—</strong></div>
          <div class="lab-tile"><span>JPY</span><strong id="fx-jpy">—</strong></div>
        </div>
      </div>
      <footer class="lab-foot"><span id="fx-meta">Cached rates</span><a href="#/converters/currency">Full converter <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></footer>
    </article>

    <article class="lab-card lab-card--tip">
      <header class="lab-card-head">
        <span class="lab-icon lab-icon--violet" aria-hidden="true"><i class="fa-solid fa-utensils"></i></span>
        <div><h2>Smart Split &amp; Tip</h2><p>Tactile bill split</p></div>
        <span class="lab-badge">PER PERSON</span>
      </header>
      <div class="lab-inner">
        <div class="lab-row"><label for="tip-bill">Bill</label><span id="tip-bill-label">$85.00</span></div>
        <input type="range" id="tip-bill" min="10" max="500" step="5" value="85" aria-label="Bill amount in US dollars">
        <div class="lab-row">
          <span id="tip-pct-label">Tip</span>
          <div class="lab-presets" role="group" aria-labelledby="tip-pct-label">
            <button class="lab-preset" type="button" data-tip="10" aria-pressed="false">10%</button>
            <button class="lab-preset is-active" type="button" data-tip="15" aria-pressed="true">15%</button>
            <button class="lab-preset" type="button" data-tip="20" aria-pressed="false">20%</button>
          </div>
        </div>
        <div class="lab-row">
          <span id="tip-split-label">Split</span>
          <div class="lab-split" role="group" aria-labelledby="tip-split-label">
            <button class="lab-step" type="button" data-split="-1" aria-label="One fewer person">−</button>
            <span class="lab-split-value" id="tip-split-value">3 people</span>
            <button class="lab-step" type="button" data-split="1" aria-label="One more person">+</button>
          </div>
        </div>
        <div class="lab-result-row">
          <div><span>Each pays</span><div class="lab-result-main" id="tip-per" aria-live="polite">$32.58</div></div>
          <div class="lab-result-side"><span>Total with tip</span><div class="lab-result-sub" id="tip-total">$97.75</div></div>
        </div>
      </div>
      <footer class="lab-foot"><span>Rounding in tool</span><a href="#/calculators/tip">Tip calculator <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></footer>
    </article>

    <article class="lab-card lab-card--bmi">
      <header class="lab-card-head">
        <span class="lab-icon lab-icon--emerald" aria-hidden="true"><i class="fa-solid fa-weight-scale"></i></span>
        <div><h2>BMI Gauge</h2><p>WHO spectrum meter</p></div>
      </header>
      <div class="lab-inner">
        <div class="lab-row"><label for="bmi-weight">Weight</label><span id="bmi-weight-label">72 kg</span></div>
        <input type="range" id="bmi-weight" min="40" max="140" value="72" aria-label="Weight in kilograms">
        <div class="lab-row">
          <label for="bmi-height">Height</label>
          <select id="bmi-height" aria-label="Height in centimetres">
            ${Array.from({ length: 61 }, (_, i) => 150 + i)
              .map((h) => `<option value="${h}"${h === 178 ? ' selected' : ''}>${h} cm</option>`)
              .join('')}
          </select>
        </div>
        <div class="lab-gauge" aria-hidden="true"><span class="lab-gauge-marker" id="bmi-marker"></span></div>
        <div class="lab-gauge-labels" aria-hidden="true"><span>Under</span><span>Normal</span><span>Over</span><span>Obese</span></div>
        <div class="lab-score-row">
          <span class="lab-score lab-score--ok" id="bmi-score" aria-live="polite">22.7</span>
          <span class="lab-status lab-status--ok" id="bmi-status">Normal range</span>
        </div>
      </div>
      <footer class="lab-foot"><span>WHO standard</span><a href="#/calculators/bmi">BMI calculator <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></footer>
    </article>

    <article class="lab-card lab-card--base">
      <header class="lab-card-head">
        <span class="lab-icon" aria-hidden="true"><i class="fa-solid fa-code"></i></span>
        <div><h2>Live Base / Hex Transcoder</h2><p>Four-way base matrix</p></div>
        <span class="lab-badge lab-badge--ok">SYNCED</span>
      </header>
      <div class="lab-inner">
        <div class="lab-base-grid">
          ${[['dec', 'Decimal', '255'], ['hex', 'Hex', 'FF'], ['bin', 'Binary', '11111111'], ['oct', 'Octal', '377']]
            .map(([key, label, value]) => `
              <div class="lab-base-field">
                <label for="lab-base-${key}">${label}</label>
                <div class="lab-base-line">
                  <input class="lab-base-input" id="lab-base-${key}" data-base="${key}" value="${value}" spellcheck="false" autocomplete="off" aria-label="${label} value">
                  <button class="lab-copy" type="button" data-copy="${value}" data-copy-base="${key}" data-copy-message="Copied ${label.toLowerCase()}" aria-label="Copy ${label.toLowerCase()} value" title="Copy"><i class="fa-regular fa-copy" aria-hidden="true"></i></button>
                </div>
              </div>`).join('')}
        </div>
        <p class="lab-note" id="lab-base-status" role="status" aria-live="polite">255 decimal · synced</p>
      </div>
      <footer class="lab-foot"><span>Base 2–16</span><a href="#/converters/base">Base converter <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></footer>
    </article>

    <article class="lab-card lab-card--telemetry">
      <header class="lab-card-head">
        <span class="lab-icon lab-icon--violet" aria-hidden="true"><i class="fa-solid fa-microchip"></i></span>
        <div><h2>System Telemetry</h2><p>Local-first engine</p></div>
        <span class="lab-badge lab-badge--ok">SOVEREIGN</span>
      </header>
      <div class="lab-telemetry">
        <div class="lab-tile"><span>Instruments</span><strong>${TOOLS.length}</strong><small>${CATEGORIES.length} categories</small></div>
        <div class="lab-tile"><span>Calculators</span><strong>${calcCount}</strong><small>Converters: ${convCount}</small></div>
        <div class="lab-tile"><span>Telemetry sent</span><strong>0 bytes</strong><small>No analytics scripts</small></div>
        <div class="lab-tile"><span>Offline</span><strong>Ready</strong><small>After first visit</small></div>
      </div>
      <footer class="lab-foot"><span>Local by design</span><a href="#/about">About <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></footer>
    </article>
  </div>`;
};

export function mountPreviewLab(root) {
  const controller = new AbortController();
  const opts = { signal: controller.signal };
  root.innerHTML = html();
  const el = (sel) => qs(sel, root);

  /* ---------- FX (cached rates only) ---------- */
  const cached = getCached('rates:USD', MAX_RATE_AGE);
  const rates = cached?.payload?.rates;
  const hasRates = Boolean(rates) && FX_CODES.every((code) => Number.isFinite(Number(rates[code])));
  const amountInput = el('#fx-amount');
  const amountLabel = el('#fx-amount-label');
  const fxOutputs = { EUR: el('#fx-eur'), GBP: el('#fx-gbp'), JPY: el('#fx-jpy') };

  const renderFx = () => {
    const amount = Number(amountInput.value);
    amountLabel.textContent = fmtCurrency(amount, 'USD');
    FX_CODES.forEach((code) => {
      fxOutputs[code].textContent = hasRates
        ? fmtCurrency((amount / (Number(rates.USD) || 1)) * Number(rates[code]), code)
        : '—';
    });
  };
  if (hasRates) {
    el('#fx-meta').textContent = `${cached.stale ? 'Cached (stale)' : 'Cached'} · ${fmtRelative(cached.at)}`;
  } else {
    el('#fx-meta').textContent = 'No cached rates';
  }
  on(amountInput, 'input', renderFx, undefined, opts);
  renderFx();

  /* ---------- Tip & split ---------- */
  let tipPct = 15;
  let split = 3;
  const billInput = el('#tip-bill');
  const billLabel = el('#tip-bill-label');
  const perEl = el('#tip-per');
  const totalEl = el('#tip-total');
  const splitEl = el('#tip-split-value');

  const renderTip = () => {
    const bill = Number(billInput.value);
    const total = bill * (1 + tipPct / 100);
    billLabel.textContent = fmtCurrency(bill, 'USD');
    perEl.textContent = fmtCurrency(total / split, 'USD');
    totalEl.textContent = fmtCurrency(total, 'USD');
    splitEl.textContent = `${split} ${split === 1 ? 'person' : 'people'}`;
  };
  on(billInput, 'input', renderTip, undefined, opts);
  on(root, 'click', '.lab-preset', (event, button) => {
    tipPct = Number(button.dataset.tip);
    qsa('.lab-preset', root).forEach((b) => {
      const active = b === button;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    renderTip();
  }, opts);
  on(root, 'click', '.lab-step', (event, button) => {
    split = Math.min(10, Math.max(1, split + Number(button.dataset.split)));
    renderTip();
  }, opts);
  renderTip();

  /* ---------- BMI ---------- */
  const weightInput = el('#bmi-weight');
  const heightSelect = el('#bmi-height');
  const weightLabel = el('#bmi-weight-label');
  const scoreEl = el('#bmi-score');
  const statusEl = el('#bmi-status');
  const marker = el('#bmi-marker');

  const renderBmi = () => {
    const weight = Number(weightInput.value);
    const metres = Number(heightSelect.value) / 100;
    const bmi = weight / (metres * metres);
    weightLabel.textContent = `${weight} kg`;
    scoreEl.textContent = bmi.toFixed(1);
    marker.style.left = `${Math.max(6, Math.min(94, ((bmi - 16) / (35 - 16)) * 100))}%`;

    let tone = 'ok';
    let label = 'Normal range';
    if (bmi < 18.5) { tone = 'warn'; label = 'Underweight'; }
    else if (bmi >= 30) { tone = 'danger'; label = 'Obesity range'; }
    else if (bmi >= 25) { tone = 'warn'; label = 'Overweight'; }
    scoreEl.className = `lab-score lab-score--${tone}`;
    statusEl.className = `lab-status lab-status--${tone}`;
    statusEl.textContent = label;
  };
  on(weightInput, 'input', renderBmi, undefined, opts);
  on(heightSelect, 'change', renderBmi, undefined, opts);
  renderBmi();

  /* ---------- Base transcoder ---------- */
  const baseFields = {
    dec: el('#lab-base-dec'),
    hex: el('#lab-base-hex'),
    bin: el('#lab-base-bin'),
    oct: el('#lab-base-oct')
  };
  const baseRadix = { dec: 10, hex: 16, bin: 2, oct: 8 };
  const baseLabel = { dec: 'decimal', hex: 'hex', bin: 'binary', oct: 'octal' };
  const baseStatus = el('#lab-base-status');

  const syncBase = (origin) => {
    const field = baseFields[origin];
    const raw = field.value.trim();
    if (!raw) {
      baseStatus.textContent = 'Enter a value to synchronize all bases.';
      field.removeAttribute('aria-invalid');
      return;
    }
    const valid = origin === 'bin' ? /^[01]+$/.test(raw)
      : origin === 'oct' ? /^[0-7]+$/.test(raw)
        : origin === 'hex' ? /^[0-9a-f]+$/i.test(raw)
          : /^\d+$/.test(raw);
    const value = valid ? parseInt(raw, baseRadix[origin]) : NaN;
    if (!valid || !Number.isFinite(value)) {
      field.setAttribute('aria-invalid', 'true');
      baseStatus.textContent = `Enter a valid ${baseLabel[origin]} value.`;
      return;
    }
    field.removeAttribute('aria-invalid');
    Object.entries(baseFields).forEach(([key, input]) => {
      if (key !== origin) input.value = value.toString(baseRadix[key]).toUpperCase();
    });
    qsa('[data-copy-base]', root).forEach((button) => {
      button.dataset.copy = baseFields[button.dataset.copyBase].value;
    });
    baseStatus.textContent = `${value.toLocaleString()} decimal · synced`;
  };
  on(root, 'input', '.lab-base-input', (event, input) => syncBase(input.dataset.base), opts);

  return { destroy: () => controller.abort() };
}
