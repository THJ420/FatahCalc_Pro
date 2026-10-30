/**
 * seo.js — canonical URLs and search metadata shared by the app and the
 * static page generator. Keep titles and descriptions in sync here so the
 * hash view and the prerendered clean URL never disagree.
 */

export const SITE_URL = 'https://calc.fatahtech.com';
export const OG_IMAGE = `${SITE_URL}/Assets/og/fatahcalc-pro-og.png`;
export const OG_IMAGE_ALT = 'FatahCalc Pro — free calculators and converters by FatahTech';

export const ROOT_SEO = {
  title: 'Free All-in-One Calculator Suite — Fast & 100% Free | FatahCalc Pro',
  description: '52 free calculators and converters across 12 categories. Instant results, zero ads, private browser-side math and PWA offline support. No signup, 100% free.',
  h1: 'Free All-in-One Online Calculator Suite'
};

export const PAGE_SEO = {
  faq: {
    slug: 'faq',
    title: 'Calculator FAQ — Free, Private & Offline | FatahCalc Pro',
    description: 'Answers about FatahCalc Pro: is it free, can it work offline, are calculations private, where currency rates come from and how accurate the results are.',
    h1: 'Frequently Asked Questions'
  },
  about: {
    slug: 'about',
    title: 'About FatahCalc Pro — Free Calculator Suite by FatahTech',
    description: 'Learn how FatahCalc Pro is built: 52 free browser-based calculators, no accounts, no ads, local processing, PWA offline support and standard formulas.',
    h1: 'About FatahCalc Pro'
  }
};

export const GROUP_SEO = {
  calculators: {
    slug: 'calculators',
    title: 'Free Online Calculators — 31 Instant Tools | FatahCalc Pro',
    description: 'Browse 31 free online calculators for math, finance, health, dates, grades, electrical work and everyday life. Instant, private and ad-free in your browser.',
    h1: 'Free Online Calculators',
    lead: 'Every calculator runs in your browser with results as you type. Pick a category to see the full set of free tools — no account, no ads, no submit button.'
  },
  converters: {
    slug: 'converters',
    title: 'Free Online Converters — 21 Instant Tools | FatahCalc Pro',
    description: 'Browse 21 free online converters for units, number systems, color, energy and 150+ currencies. Bidirectional, instant and private — no signup required.',
    h1: 'Free Online Unit & Measurement Converters',
    lead: 'One tool per quantity, with two dropdowns and a swap button instead of a page per direction. Live conversion, exact factors and offline-ready caching.'
  }
};

export const CATEGORY_SEO = {
  math: {
    slug: 'math-calculators',
    title: 'Free Math Calculators — 11 Online Tools | FatahCalc Pro',
    description: 'Solve arithmetic, percentages, averages, fractions, ratios and quadratic equations with 11 free math calculators. Instant results, private and ad-free.'
  },
  financial: {
    slug: 'financial-calculators',
    title: 'Free Financial Calculators — Loans, Interest & Tax | FatahCalc Pro',
    description: 'Calculate loan payments, compound interest, discounts, VAT and profit margins with 5 free financial calculators. Instant, private and easy to compare.'
  },
  health: {
    slug: 'health-fitness-calculators',
    title: 'Free Health & Fitness Calculators — BMI & BMR | FatahCalc Pro',
    description: 'Check BMI, basal metabolic rate, daily calorie needs and ideal body weight with 3 free health calculators. Metric or imperial, instant, private and ad-free.'
  },
  datetime: {
    slug: 'date-time-calculators',
    title: 'Free Date & Time Calculators — Age & Countdown | FatahCalc Pro',
    description: 'Calculate exact age, date differences, countdowns and time durations with 4 free date and time tools. Leap-year safe, instant and private in your browser.'
  },
  grade: {
    slug: 'grade-calculators',
    title: 'Free GPA & Grade Calculators for Students | FatahCalc Pro',
    description: 'Work out weighted GPA, marks to percentage and the final exam score you need with 3 free grade calculators. Instant results for students and teachers.'
  },
  electrical: {
    slug: 'electrical-calculators',
    title: "Free Electrical Calculators — Ohm's Law & Power | FatahCalc Pro",
    description: 'Solve Ohm\'s law, the power wheel and appliance running costs with 3 free electrical calculators. Instant formulas, clear units and private results, no signup.'
  },
  everyday: {
    slug: 'everyday-calculators',
    title: 'Free Everyday Calculators — Tips & Age in Days | FatahCalc Pro',
    description: 'Split a restaurant bill and see your age in days, hours and heartbeats with 2 free everyday calculators. Quick, private and completely ad-free online.'
  },
  units: {
    slug: 'unit-converters',
    title: 'Free Unit Converters — Length, Weight & Volume | FatahCalc Pro',
    description: 'Convert length, weight, temperature, volume, area, speed and data storage with 8 free unit converters. Exact factors, live results and offline support.'
  },
  'number-system': {
    slug: 'number-system-converters',
    title: 'Free Number & Text Converters — Binary, ASCII, Morse | FatahCalc Pro',
    description: 'Convert bases, ASCII, binary, hex, Roman numerals, fractions and Morse code with 7 free converters. Built for students, developers and puzzle fans online.'
  },
  color: {
    slug: 'color-tools',
    title: 'Free Color Converter — HEX, RGB, HSL & CMYK | FatahCalc Pro',
    description: 'Convert colors between HEX, RGB, HSL, HSV and CMYK with a live swatch. A free browser-based color converter for designers, developers and digital art.'
  },
  'electrical-conv': {
    slug: 'electrical-energy-converters',
    title: 'Free Electrical Converters — Power, Voltage & Energy | FatahCalc Pro',
    description: 'Convert power, voltage, frequency and energy units with 4 free electrical converters. Watts, volts, hertz, joules, BTU and more — instant and private.'
  },
  currency: {
    slug: 'currency-tools',
    title: 'Free Currency Converter — Live Exchange Rates | FatahCalc Pro',
    description: 'Convert 150+ currencies with live exchange rates and offline caching. A free currency converter that keeps your amounts private in the browser. No signup.'
  }
};

/**
 * One entry per tool. `slug` is the clean public URL; `title` and
 * `description` are used by the app's canonical metadata and the generator.
 */
export const TOOL_SEO = {
  'calculators/simple-calculator': {
    slug: 'simple-calculator',
    title: 'Free Simple Calculator — Instant Basic Arithmetic | FatahCalc Pro',
    description: 'Do quick arithmetic with a keyboard-friendly keypad, running expression history and instant results. Free, ad-free and private — with no sign-up needed.'
  },
  'calculators/scientific-calculator': {
    slug: 'scientific-calculator',
    title: 'Free Scientific Calculator — Trig, Logs & Powers | FatahCalc Pro',
    description: 'Solve trigonometry, logs, powers and roots with a full scientific calculator. Switch degrees or radians and get instant results, free and completely private.'
  },
  'calculators/percentage': {
    slug: 'percentage-calculator',
    title: 'Free Percentage Calculator — Instant Financial Math | FatahCalc Pro',
    description: 'Work out percentages, percentage change and increases or decreases instantly. A free percentage calculator for shopping, finance and everyday math needs.'
  },
  'calculators/average': {
    slug: 'average-calculator',
    title: 'Free Average Calculator — Mean, Median & Mode | FatahCalc Pro',
    description: 'Find the mean, median, mode, range and sum of any number list instantly. A free average calculator for students, analysts and everyday data work — online.'
  },
  'calculators/standard-deviation': {
    slug: 'standard-deviation-calculator',
    title: 'Free Standard Deviation Calculator — σ & Variance | FatahCalc Pro',
    description: 'Calculate population or sample standard deviation, variance and sums with clear working steps. Free, instant and private — no spreadsheet or signup required.'
  },
  'calculators/fraction': {
    slug: 'fraction-calculator',
    title: 'Free Fraction Calculator — Add, Simplify & Convert | FatahCalc Pro',
    description: 'Add, subtract, multiply, divide and simplify fractions with instant results. A free fraction calculator that also handles mixed numbers and improper fractions.'
  },
  'calculators/ratio': {
    slug: 'ratio-calculator',
    title: 'Free Ratio Calculator — Simplify & Solve Proportions | FatahCalc Pro',
    description: 'Simplify ratios, solve proportions and scale values to any total instantly. A free ratio calculator for recipes, models, maps and everyday math problems.'
  },
  'calculators/lcm-gcf': {
    slug: 'lcm-gcf-calculator',
    title: 'Free LCM & GCF Calculator — Instant Number Theory | FatahCalc Pro',
    description: 'Find the least common multiple and greatest common factor of any numbers instantly. A free LCM and GCF calculator with clear, Euclid-style working steps.'
  },
  'calculators/quadratic': {
    slug: 'quadratic-equation-solver',
    title: 'Free Quadratic Equation Solver — Roots & Vertex | FatahCalc Pro',
    description: 'Solve quadratic equations for real or complex roots, discriminant and vertex. A free quadratic equation solver with instant, step-friendly answers online.'
  },
  'calculators/base-calculator': {
    slug: 'base-calculator',
    title: 'Free Base Calculator — Binary, Octal & Hex Math | FatahCalc Pro',
    description: 'Add, subtract, multiply and divide in binary, octal, decimal or hex. A free base calculator for programmers, students and digital logic work — instantly.'
  },
  'calculators/random-number': {
    slug: 'random-number-generator',
    title: 'Free Random Number Generator — Ranges & Batches | FatahCalc Pro',
    description: 'Generate random integers or decimals in any range, in batches and without repeats. A free random number generator for picks, games and quick testing. No signup.'
  },
  'calculators/interest': {
    slug: 'interest-calculator',
    title: 'Free Interest Calculator — Simple & Compound Growth | FatahCalc Pro',
    description: 'Compare simple and compound interest at any compounding frequency and see the growth. Free, instant and private — with no spreadsheet or sign-up needed.'
  },
  'calculators/loan-emi': {
    slug: 'loan-emi-calculator',
    title: 'Free Loan & EMI Calculator — Payment & Amortization | FatahCalc Pro',
    description: 'Calculate monthly loan payments, total interest and a full amortization schedule. A free EMI calculator for mortgages, car loans and personal loans online.'
  },
  'calculators/discount': {
    slug: 'discount-calculator',
    title: 'Free Discount Calculator — Sale Price & Savings | FatahCalc Pro',
    description: 'Find the sale price from a discount, or the discount from a sale price, instantly. A free discount calculator for shopping, coupons and retail pricing.'
  },
  'calculators/vat-tax': {
    slug: 'vat-sales-tax-calculator',
    title: 'Free VAT & Sales Tax Calculator — Net to Gross | FatahCalc Pro',
    description: 'Add VAT or sales tax to a net price or remove it from a gross price instantly. A free tax calculator with clear net, tax and gross breakdowns shown instantly.'
  },
  'calculators/profit-margin': {
    slug: 'profit-margin-calculator',
    title: 'Free Profit Margin Calculator — Margin & Markup | FatahCalc Pro',
    description: 'Work out cost, revenue, profit, margin and markup, solving for any value. A free profit margin calculator for pricing, retail and business planning online.'
  },
  'calculators/bmi': {
    slug: 'bmi-calculator',
    title: 'Free BMI Calculator — Metric & Imperial Body Mass Index | FatahCalc Pro',
    description: 'Check body mass index in metric or imperial units with a clear category range. A free BMI calculator that runs privately in your browser — no signup needed.'
  },
  'calculators/bmr': {
    slug: 'bmr-calorie-calculator',
    title: 'Free BMR & Calorie Calculator — Daily TDEE Needs | FatahCalc Pro',
    description: 'Estimate basal metabolic rate with Mifflin–St Jeor and daily calorie needs (TDEE). A free BMR calculator for five activity levels, instant and private.'
  },
  'calculators/ideal-weight': {
    slug: 'ideal-body-weight-calculator',
    title: 'Free Ideal Body Weight Calculator — 4 Formulas | FatahCalc Pro',
    description: 'Compare ideal body weight using Devine, Robinson, Miller and Hamwi formulas. A free IBW calculator with instant results and healthy weight ranges for adults.'
  },
  'calculators/age': {
    slug: 'age-calculator',
    title: 'Free Age Calculator — Exact Years, Months & Days | FatahCalc Pro',
    description: 'Find exact age in years, months and days from any birth date, leap-year safe. A free age calculator for birthdays, forms and official date checks online.'
  },
  'calculators/date-difference': {
    slug: 'date-difference-calculator',
    title: 'Free Date Difference Calculator — Days & Workdays | FatahCalc Pro',
    description: 'Count days, weeks, months and business days between two dates instantly. A free date difference calculator for deadlines, planning and timesheets — all online.'
  },
  'calculators/countdown': {
    slug: 'countdown-timer',
    title: 'Free Countdown Timer — Live Countdown to Any Date | FatahCalc Pro',
    description: 'Create a live countdown to a birthday, launch, deadline or the new year. A free countdown timer that keeps ticking while the page stays open in your browser.'
  },
  'calculators/time-duration': {
    slug: 'time-duration-calculator',
    title: 'Free Time Duration Calculator — Add & Subtract Hours | FatahCalc Pro',
    description: 'Add or subtract hours, minutes and seconds, and measure time-of-day spans. A free time duration calculator for timesheets, shifts and project hours — online.'
  },
  'calculators/gpa': {
    slug: 'gpa-calculator',
    title: 'Free GPA Calculator — Weighted Grade Point Average | FatahCalc Pro',
    description: 'Calculate weighted GPA from course credits and grades with live totals. A free GPA calculator using the Bangladesh/UGC 4.00 scale, with no signup needed.'
  },
  'calculators/grade-percentage': {
    slug: 'grade-calculator',
    title: 'Free Grade Calculator — Marks to Percentage & Letter | FatahCalc Pro',
    description: 'Turn test marks into a percentage and matching letter grade instantly. A free grade calculator with multiple grading scales and clear, printable results.'
  },
  'calculators/final-grade': {
    slug: 'final-grade-calculator',
    title: 'Free Final Grade Calculator — Score Needed to Pass | FatahCalc Pro',
    description: 'Find the exam score you need to reach your target course grade. A free final grade calculator with weighted categories and instant, clear answers online.'
  },
  'calculators/ohms-law': {
    slug: 'ohms-law-calculator',
    title: "Free Ohm's Law Calculator — V, I & R Instantly | FatahCalc Pro",
    description: 'Enter any two of voltage, current or resistance and get the third instantly. A free Ohm\'s law calculator with the formula and full unit breakdown shown.'
  },
  'calculators/watt-volt-amp-ohm': {
    slug: 'watt-volt-amp-ohm-calculator',
    title: 'Free Watt, Volt, Amp & Ohm Calculator — Power Wheel | FatahCalc Pro',
    description: 'Solve the full power wheel: enter any two of watts, volts, amps or ohms. A free electrical calculator with instant results, formulas and unit checks online.'
  },
  'calculators/power-calculator': {
    slug: 'power-energy-cost-calculator',
    title: 'Free Power & Energy Cost Calculator — Watts to kWh | FatahCalc Pro',
    description: 'Calculate electrical power with P=VI, P=I²R or P=V²/R and estimate running costs. A free power and energy cost calculator for home appliances — instantly.'
  },
  'calculators/tip': {
    slug: 'tip-calculator',
    title: 'Free Tip Calculator — Gratuity & Bill Split Instantly | FatahCalc Pro',
    description: 'Work out the tip, total bill and per-person split with rounding options. A free tip calculator for restaurants, groups and service charges — instantly.'
  },
  'calculators/age-in-units': {
    slug: 'age-in-days-calculator',
    title: 'Free Age in Days Calculator — Days, Hours & Weeks | FatahCalc Pro',
    description: 'See your age in months, weeks, days, hours, minutes and even heartbeats. A free age-in-days calculator with instant, private results and no signup needed.'
  },
  'converters/length': {
    slug: 'length-converter',
    title: 'Free Length Converter — cm, Inches, Feet & Miles | FatahCalc Pro',
    description: 'Convert millimetres, centimetres, metres, kilometres, inches, feet, yards and miles. A free length converter with exact factors and live results — online.'
  },
  'converters/weight': {
    slug: 'weight-converter',
    title: 'Free Weight Converter — kg, lb, oz, Stone & Tonnes | FatahCalc Pro',
    description: 'Convert milligrams, grams, kilograms, tonnes, ounces, pounds and stone instantly. A free weight and mass converter with exact factors and live results.'
  },
  'converters/temperature': {
    slug: 'temperature-converter',
    title: 'Free Temperature Converter — Celsius to Fahrenheit | FatahCalc Pro',
    description: 'Convert Celsius, Fahrenheit, Kelvin, Rankine and Réaumur in any direction. A free temperature converter with instant, accurate results and no signup needed.'
  },
  'converters/volume': {
    slug: 'volume-converter',
    title: 'Free Volume Converter — Litres, Gallons, Cups & Pints | FatahCalc Pro',
    description: 'Convert millilitres, litres, cubic metres, cups, pints, quarts and gallons. A free online volume converter for recipes, fuel and everyday measurements.'
  },
  'converters/area': {
    slug: 'area-converter',
    title: 'Free Area Converter — m², Acres, Hectares & Sq Ft | FatahCalc Pro',
    description: 'Convert square millimetres, metres, kilometres, hectares, acres and square feet. A free area converter for property, land and DIY projects — instantly.'
  },
  'converters/speed': {
    slug: 'speed-converter',
    title: 'Free Speed Converter — km/h, mph, m/s & Knots | FatahCalc Pro',
    description: 'Convert km/h, mph, m/s, ft/s, knots and mach in either direction instantly. A free speed converter for travel, sports and engineering calculations — online.'
  },
  'converters/data-storage': {
    slug: 'data-storage-converter',
    title: 'Free Data Storage Converter — KB, MB, GB & TB | FatahCalc Pro',
    description: 'Convert bits, bytes, KB, MB, GB and TB, including binary KiB, MiB and GiB. A free data storage converter for files, drives and bandwidth planning — instantly.'
  },
  'converters/custom-unit': {
    slug: 'custom-unit-converter',
    title: 'Free Custom Unit Converter — Define Your Own Factor | FatahCalc Pro',
    description: 'Define your own conversion factor and convert any custom unit instantly. A free custom unit converter for niche measures, hobbies and personal scales.'
  },
  'converters/base': {
    slug: 'base-converter',
    title: 'Free Base Converter — Binary, Decimal, Octal & Hex | FatahCalc Pro',
    description: 'Convert binary, decimal, octal and hexadecimal at the same time. A free online base converter for programming, networking and digital electronics work.'
  },
  'converters/ascii-text': {
    slug: 'ascii-text-converter',
    title: 'Free Text to ASCII Converter — Binary, Hex & Base64 | FatahCalc Pro',
    description: 'Encode or decode text as ASCII codes, binary, hexadecimal or Base64 instantly. A free text converter for programmers, puzzles and data work — no signup.'
  },
  'converters/roman': {
    slug: 'roman-numeral-converter',
    title: 'Free Roman Numeral Converter — Numbers & Letters | FatahCalc Pro',
    description: 'Convert numbers to Roman numerals and back, from 1 to 3,999,999. A free Roman numeral converter with instant, accurate results and clear examples — online.'
  },
  'converters/fraction-decimal': {
    slug: 'fraction-decimal-converter',
    title: 'Free Fraction to Decimal Converter — With Percent | FatahCalc Pro',
    description: 'Convert between fractions, decimals and percentages, with any value updating the others. A free converter with instant results and repeating decimals.'
  },
  'converters/scientific-notation': {
    slug: 'scientific-notation-converter',
    title: 'Free Scientific Notation Converter — Standard & E | FatahCalc Pro',
    description: 'Convert to and from standard form, E-notation and engineering notation. A free scientific notation converter for students, scientists and engineers online.'
  },
  'converters/morse': {
    slug: 'morse-code-converter',
    title: 'Free Morse Code Converter — Text to Morse & Back | FatahCalc Pro',
    description: 'Encode text to Morse code and decode it back, with optional audio playback. A free Morse code converter for learning, radio hobbyists and puzzles — online.'
  },
  'converters/cipher': {
    slug: 'cipher-converter',
    title: 'Free Cipher Converter — Caesar, ROT13 & Vigenère | FatahCalc Pro',
    description: 'Encode and decode Caesar, ROT13, Atbash, Vigenère and A1Z26 ciphers. A free cipher converter for puzzles, escape rooms and CTF practice sessions — online.'
  },
  'converters/color': {
    slug: 'color-converter',
    title: 'Free Color Converter — HEX, RGB, HSL, HSV & CMYK | FatahCalc Pro',
    description: 'Convert colors between HEX, RGB, HSL, HSV and CMYK with a live swatch. A free color converter for designers, developers and digital art projects — online.'
  },
  'converters/power': {
    slug: 'power-converter',
    title: 'Free Power Converter — Watts, kW, HP & BTU/h | FatahCalc Pro',
    description: 'Convert watts, kilowatts, megawatts, horsepower, BTU/h, dBm and kcal/h. A free power converter for electrical, mechanical and thermal calculations — online.'
  },
  'converters/voltage': {
    slug: 'voltage-converter',
    title: 'Free Voltage Converter — µV, mV, V, kV & MV | FatahCalc Pro',
    description: 'Convert microvolts, millivolts, volts, kilovolts and megavolts instantly. A free voltage converter for electronics, testing and engineering work — online.'
  },
  'converters/frequency': {
    slug: 'frequency-converter',
    title: 'Free Frequency Converter — Hz, kHz, MHz, GHz & RPM | FatahCalc Pro',
    description: 'Convert hertz, kilohertz, megahertz, gigahertz, terahertz, RPM and period. A free frequency converter for radio, audio and electronics projects — online.'
  },
  'converters/energy': {
    slug: 'energy-converter',
    title: 'Free Energy Converter — Joules, Calories, kWh & BTU | FatahCalc Pro',
    description: 'Convert joules, kilojoules, calories, kilocalories, watt-hours, kWh, BTU and eV. A free energy converter for physics, food and utility calculations — online.'
  },
  'converters/currency': {
    slug: 'currency-converter',
    title: 'Free Currency Converter — 150+ Live Exchange Rates | FatahCalc Pro',
    description: 'Convert 150+ currencies with live exchange rates, cached for offline use. A free currency converter that keeps your amounts private and needs no signup.'
  }
};

export const toolKey = (group, id) => `${group}/${id}`;

export function toolSeo(group, id) {
  return TOOL_SEO[toolKey(group, id)] || null;
}

export function cleanUrl(path = '') {
  return `${SITE_URL}/${String(path).replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
}

export function toolUrl(group, id) {
  const seo = toolSeo(group, id);
  return seo ? `${SITE_URL}/${seo.slug}` : `${SITE_URL}/`;
}

export function categoryUrl(categoryId) {
  const seo = CATEGORY_SEO[categoryId];
  return seo ? `${SITE_URL}/${seo.slug}` : `${SITE_URL}/`;
}
