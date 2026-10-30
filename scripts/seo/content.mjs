/**
 * content.mjs — build-time editorial copy for the static SEO pages.
 *
 * The per-tool explanations themselves live in each tool module (`how`) and
 * are reused by the generator. This file adds the search-facing layer:
 * intros, FAQs, category hubs and suite-level copy.
 */

export const PRIVACY_FAQ = {
  q: 'Are my calculations private?',
  a: 'Yes. Every calculation runs locally in your browser. FatahCalc Pro has no analytics, no advertising and no account system, so your inputs and history stay on this device. The only network request is the live currency-rate feed, which contains no personal data.'
};

export const TOOL_CONTENT = {
  'calculators/simple-calculator': {
    lead: 'Run everyday arithmetic without reaching for a spreadsheet. The keypad, keyboard shortcuts and running expression line keep quick sums, percentages and multi-step calculations moving.',
    faqs: [
      { q: 'Can I use my keyboard with the simple calculator?', a: 'Yes. Type digits and operators directly; Enter evaluates, Backspace deletes and Escape clears. The on-screen keypad mirrors the same actions.' },
      { q: 'Does the simple calculator keep a running expression?', a: 'Yes. Each operator extends the expression line above the display, so you can see the full calculation before you press equals.' }
    ]
  },
  'calculators/scientific-calculator': {
    lead: 'A full scientific calculator for trigonometry, logarithms, powers, roots and constants. Switch between degrees and radians, and see each result instantly without installing an app.',
    faqs: [
      { q: 'How do I switch between degrees and radians?', a: 'Use the DEG/RAD toggle above the keypad. Trigonometric results update immediately in the selected mode.' },
      { q: 'Can it calculate logs, powers and roots?', a: 'Yes. It includes sin, cos, tan and their inverses, natural and base-10 logs, powers, square and cube roots, factorial, π and e.' }
    ]
  },
  'calculators/percentage': {
    lead: 'Percentages show up in discounts, tax, tips, grades and growth rates. This calculator handles the four common questions — percent of a number, one value as a percent of another, percent change, and increase or decrease — in one live tool.',
    faqs: [
      { q: 'How do I calculate what 15% of 200 is?', a: 'Choose “X% of Y”, enter 15 and 200, and the result appears as 30. The formula is Y × X ÷ 100.' },
      { q: 'What is the difference between percent change and percentage points?', a: 'Percent change compares a new value with the original, while percentage points describe the arithmetic difference between two percentages. Going from 20% to 25% is +5 percentage points but a 25% relative increase.' }
    ]
  },
  'calculators/average': {
    lead: 'Paste a list of numbers and get the mean, median, mode, range and sum together. It is useful for test scores, expenses, measurements and any dataset where a single average hides the shape of the numbers.',
    faqs: [
      { q: 'What is the difference between mean, median and mode?', a: 'The mean adds all values and divides by the count; the median is the middle value when sorted; the mode is the most frequent value.' },
      { q: 'Can I enter negative numbers or decimals?', a: 'Yes. Separate values with commas, spaces or new lines, and the calculator handles negatives and decimals.' }
    ]
  },
  'calculators/standard-deviation': {
    lead: 'Measure how spread out a dataset is with population or sample standard deviation. The tool also reports variance, the mean and the working steps so you can follow the calculation.',
    faqs: [
      { q: 'Should I use population or sample standard deviation?', a: 'Use population when your data covers the whole group. Use sample when the numbers are a subset used to estimate a wider population; the sample formula divides by n − 1.' },
      { q: 'What does a high standard deviation mean?', a: 'A higher value means the data points are more spread out from the mean; a lower value means they cluster closely around it.' }
    ]
  },
  'calculators/fraction': {
    lead: 'Add, subtract, multiply, divide and simplify fractions without hunting for a common denominator. Mixed numbers and improper fractions are supported, and every result is reduced automatically.',
    faqs: [
      { q: 'How do I add fractions with different denominators?', a: 'The calculator finds a common denominator, converts both fractions, adds the numerators and simplifies the result. You only enter the two fractions.' },
      { q: 'Does it simplify improper fractions and mixed numbers?', a: 'Yes. Results are reduced, and mixed-number inputs are converted to improper fractions before the operation.' }
    ]
  },
  'calculators/ratio': {
    lead: 'Simplify a ratio, solve a missing term in a proportion, or scale a ratio to a total. It is handy for recipes, map scales, mixing, model building and sharing costs fairly.',
    faqs: [
      { q: 'How do I simplify a ratio like 18:24?', a: 'Enter both sides; the calculator divides by the greatest common divisor and returns 3:4.' },
      { q: 'How do I solve a proportion with a missing value?', a: 'Enter the three known terms of the proportion; the calculator cross-multiplies and solves for the missing fourth term.' }
    ]
  },
  'calculators/lcm-gcf': {
    lead: 'Find the least common multiple and greatest common factor for two or more numbers. The calculator uses Euclid’s algorithm and shows the intermediate steps, which makes it useful for homework as well as quick checks.',
    faqs: [
      { q: 'What is the difference between LCM and GCF?', a: 'The LCM is the smallest number both values divide into; the GCF is the largest number that divides both values exactly.' },
      { q: 'Can I calculate LCM and GCF for more than two numbers?', a: 'Yes. Add each number and the tool reduces the set step by step using the pairwise LCM and GCF.' }
    ]
  },
  'calculators/quadratic': {
    lead: 'Solve any quadratic equation in the form ax² + bx + c = 0. Get both roots, the discriminant, the vertex and the axis of symmetry, including complex roots when the discriminant is negative.',
    faqs: [
      { q: 'What does a negative discriminant mean?', a: 'It means the equation has two complex conjugate roots rather than real roots. The solver displays them in a + bi form.' },
      { q: 'How do I find the vertex of a parabola?', a: 'The vertex x-coordinate is −b ÷ 2a; substitute it back into the equation to get the y-coordinate. The calculator does both automatically.' }
    ]
  },
  'calculators/base-calculator': {
    lead: 'Perform arithmetic directly in binary, octal, decimal or hexadecimal. Choose the base for each operand and see the result in the same base, with no manual conversion first.',
    faqs: [
      { q: 'Can I mix bases in one calculation?', a: 'Yes. Set the base for each input independently, then choose the output base.' },
      { q: 'Does it support negative numbers?', a: 'Yes, signed values are supported in each base. Use a leading minus sign as usual.' }
    ]
  },
  'calculators/random-number': {
    lead: 'Generate random integers or decimals within a range, one at a time or in batches. Use no-repeat mode for raffles and assignments, or allow repeats for simulations and games.',
    faqs: [
      { q: 'Are the numbers cryptographically secure?', a: 'No. The generator uses the browser’s standard Math.random function, which is fine for games and picks but not for passwords or security tokens.' },
      { q: 'Can I generate numbers without duplicates?', a: 'Yes. Enable no-repeat mode and the tool draws unique values until the range is exhausted.' }
    ]
  },
  'calculators/interest': {
    lead: 'Compare simple and compound interest side by side. Choose the compounding frequency, the term and the starting balance to see how much of the final amount comes from interest.',
    faqs: [
      { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is calculated only on the original principal; compound interest is calculated on the principal plus previously earned interest.' },
      { q: 'How does compounding frequency affect the result?', a: 'More frequent compounding produces a slightly higher effective return because interest starts earning interest sooner.' }
    ]
  },
  'calculators/loan-emi': {
    lead: 'Estimate the monthly payment on a mortgage, car loan or personal loan. Add an extra monthly payment to see how many months and how much interest you could save, with a full amortization table.',
    faqs: [
      { q: 'What is an EMI?', a: 'An equated monthly instalment is the fixed payment that repays both principal and interest over the loan term.' },
      { q: 'Does paying extra reduce the loan term?', a: 'Yes. Extra payments go straight to the principal, so the balance falls faster and the loan finishes sooner. The summary shows the months and interest saved.' }
    ]
  },
  'calculators/discount': {
    lead: 'Find the final sale price after a percentage discount, or work backwards from a sale price to discover the discount. It also shows the amount saved, which makes comparing offers easier.',
    faqs: [
      { q: 'How do I calculate a 25% discount?', a: 'Multiply the original price by 0.75, or subtract 25% of the price. The calculator shows the sale price and the amount saved.' },
      { q: 'Can I find the discount percentage from two prices?', a: 'Yes. Enter the original and sale prices and the tool reports the discount rate and savings.' }
    ]
  },
  'calculators/vat-tax': {
    lead: 'Add VAT or sales tax to a net price, or remove tax from a gross price. The breakdown shows the net amount, the tax and the gross total, so invoices and quotes stay consistent.',
    faqs: [
      { q: 'How do I remove VAT from a gross price?', a: 'Divide the gross amount by 1 + the tax rate as a decimal. For 20% VAT, divide by 1.20.' },
      { q: 'Can I use this for any sales tax rate?', a: 'Yes. Enter any percentage rate; the calculator does not assume a particular country’s VAT or GST rules.' }
    ]
  },
  'calculators/profit-margin': {
    lead: 'Connect cost, revenue, profit, margin and markup in one place. Enter any two known values to solve for the rest and check whether a price actually covers costs and target margin.',
    faqs: [
      { q: 'What is the difference between margin and markup?', a: 'Margin is profit divided by revenue; markup is profit divided by cost. A 50% markup is only a 33.3% margin.' },
      { q: 'How do I find the selling price for a target margin?', a: 'Enter the cost and target margin; the calculator returns the required revenue and profit.' }
    ]
  },
  'calculators/bmi': {
    lead: 'Calculate body mass index from height and weight in metric or imperial units. The result includes a colour-coded category and the healthy weight range for your height.',
    faqs: [
      { q: 'What BMI range is considered healthy?', a: 'For most adults, 18.5–24.9 is classified as healthy, 25–29.9 as overweight and 30 or above as obesity. BMI is a screening measure, not a diagnosis.' },
      { q: 'Does BMI work for athletes and children?', a: 'No. BMI does not distinguish muscle from fat, and children use age- and sex-specific percentiles. Treat the result as a general guide only.' }
    ]
  },
  'calculators/bmr': {
    lead: 'Estimate the calories your body burns at rest with the Mifflin–St Jeor equation, then multiply by an activity level to estimate daily maintenance calories (TDEE).',
    faqs: [
      { q: 'What is the difference between BMR and TDEE?', a: 'BMR is the energy used at complete rest; TDEE includes daily movement and exercise, so it is higher.' },
      { q: 'How accurate is a BMR estimate?', a: 'It is a population-level estimate based on height, weight, age and sex. Individual metabolism varies, so use it as a starting point and adjust based on real results.' }
    ]
  },
  'calculators/ideal-weight': {
    lead: 'Compare four established ideal body weight formulas — Devine, Robinson, Miller and Hamwi — in one view. Seeing the range is more useful than treating a single number as a target.',
    faqs: [
      { q: 'Why do the ideal weight formulas give different answers?', a: 'They were derived from different populations and use slightly different constants. A healthy range is more meaningful than one exact figure.' },
      { q: 'Does ideal body weight account for muscle or frame size?', a: 'No. The formulas use height and sex only; they do not measure body composition or frame size.' }
    ]
  },
  'calculators/age': {
    lead: 'Find an exact age in years, months and days from any birth date. The calculation accounts for leap years and month lengths, so it works for forms, birthdays and date-of-birth checks.',
    faqs: [
      { q: 'How is age calculated across leap years?', a: 'The tool compares calendar dates rather than dividing total days by 365, so February 29 and varying month lengths are handled correctly.' },
      { q: 'Can I calculate age on a future date?', a: 'Yes. Set the “as of” date to any future date to see the age at that point.' }
    ]
  },
  'calculators/date-difference': {
    lead: 'Count the days, weeks, months and business days between two dates. Use it for deadlines, project timelines, notice periods and timesheets where weekends should be excluded.',
    faqs: [
      { q: 'Are the start and end dates included?', a: 'The tool reports the difference between the dates; use the inclusive-days readout if you need to count both endpoints.' },
      { q: 'How are business days counted?', a: 'Weekends are excluded. Public holidays are not assumed, because they vary by country and year.' }
    ]
  },
  'calculators/countdown': {
    lead: 'Set a target date and watch a live countdown to a birthday, product launch, deadline or the new year. The timer updates every second while the page remains open.',
    faqs: [
      { q: 'Does the countdown keep running after I close the page?', a: 'No. The timer runs in your browser, so it stops when the page is closed. Reopen it to see the current time remaining.' },
      { q: 'Can I count down to a past date?', a: 'Yes, the tool will show that the date has passed and report the elapsed time.' }
    ]
  },
  'calculators/time-duration': {
    lead: 'Add or subtract hours, minutes and seconds, or measure the span between two times of day. It is built for timesheets, shift planning and project time rather than calendar dates.',
    faqs: [
      { q: 'Can I add several durations together?', a: 'Yes. Enter each duration in hours, minutes and seconds and choose add or subtract; the result is normalised automatically.' },
      { q: 'How do I handle a shift that crosses midnight?', a: 'Enter the start and end times and let the tool account for the overnight span, or add 24 hours to the end time.' }
    ]
  },
  'calculators/gpa': {
    lead: 'Calculate a weighted GPA from course credits and grades. Add or remove rows as you go; totals update live and use the Bangladesh/UGC 4.00 scale.',
    faqs: [
      { q: 'How are credits used in a weighted GPA?', a: 'Each course grade is multiplied by its credit value, the results are summed, and the total is divided by the total credits.' },
      { q: 'Which grading scale does this calculator use?', a: 'It uses the Bangladesh/UGC 4.00 scale (A+ 4.00 through F 0.00). Check your institution’s rules if it uses a different scale.' }
    ]
  },
  'calculators/grade-percentage': {
    lead: 'Turn marks into a percentage and a matching letter grade. Choose the grading scale that matches your school or course and see the result update as you type.',
    faqs: [
      { q: 'How do I calculate a test percentage?', a: 'Divide the marks earned by the total marks and multiply by 100. The calculator also maps that percentage to the selected letter scale.' },
      { q: 'Can I use a different grading scale?', a: 'Yes. The tool offers the Bangladesh/UGC scale plus US letter grades with and without plus/minus, UK honours and the US 4.0 mapping.' }
    ]
  },
  'calculators/final-grade': {
    lead: 'Find the score you need on a final exam or assignment to reach your target course grade. Enter your current grade, the weight of the final and your goal.',
    faqs: [
      { q: 'What if the required score is above 100%?', a: 'That means the target cannot be reached with the remaining weight alone. The tool flags the result so you can discuss options with your instructor.' },
      { q: 'Can I use weighted categories?', a: 'Yes. Enter the current grade and the final’s percentage weight; the calculator solves for the remaining score.' }
    ]
  },
  'calculators/ohms-law': {
    lead: 'Enter any two of voltage, current or resistance and get the third. The calculator shows the formula and the unit breakdown, making it useful for circuit checks and electronics study.',
    faqs: [
      { q: 'What is Ohm’s law?', a: 'V = I × R: voltage equals current multiplied by resistance. The other two forms are I = V ÷ R and R = V ÷ I.' },
      { q: 'Can I use it with milliamps or kilohms?', a: 'Yes, but convert to base units first for the most reliable result, or use the unit labels carefully and keep them consistent.' }
    ]
  },
  'calculators/watt-volt-amp-ohm': {
    lead: 'The full power wheel in one calculator: enter any two of watts, volts, amps or ohms and the other two are solved instantly. It combines Ohm’s law with the power equations.',
    faqs: [
      { q: 'Which formulas does the power wheel use?', a: 'It uses P = V × I, V = I × R and their rearrangements, including P = I²R and P = V²/R.' },
      { q: 'Can I solve for resistance from power and voltage?', a: 'Yes. Enter power and voltage; the calculator derives current first and then resistance.' }
    ]
  },
  'calculators/power-calculator': {
    lead: 'Calculate electrical power from voltage, current or resistance, then estimate what an appliance costs to run. Enter your electricity price and usage time for a practical running-cost estimate.',
    faqs: [
      { q: 'How do I calculate electricity cost from watts?', a: 'Convert watts to kilowatts, multiply by hours used and then by your price per kWh.' },
      { q: 'Which power formula should I use?', a: 'Use P = V × I when you know voltage and current, P = I²R when you know current and resistance, or P = V²/R when you know voltage and resistance.' }
    ]
  },
  'calculators/tip': {
    lead: 'Work out the tip, the total bill and each person’s share. Choose a tip percentage, split the bill between any number of people and round to a convenient amount.',
    faqs: [
      { q: 'Should I tip before or after tax?', a: 'Either is common. Tipping on the pre-tax amount is slightly lower; tipping on the total is simpler. The calculator lets you choose the base.' },
      { q: 'How do I split a bill evenly?', a: 'Enter the number of people and the calculator divides the total, including the tip, equally.' }
    ]
  },
  'calculators/age-in-units': {
    lead: 'See an age expressed in months, weeks, days, hours, minutes and heartbeats. It turns a date of birth into a different perspective on time, all calculated locally.',
    faqs: [
      { q: 'How are heartbeats estimated?', a: 'The tool uses an average resting heart rate assumption to estimate total beats. It is an approximation, not a medical measurement.' },
      { q: 'Does it account for leap years?', a: 'Yes. The calculation uses actual calendar dates, so leap days are included in the day count.' }
    ]
  },
  'converters/length': {
    lead: 'Convert between metric and imperial length units, from nanometres to light years. Type in either field and the other updates instantly, with exact factors where they exist.',
    faqs: [
      { q: 'How many centimetres are in an inch?', a: 'One inch is exactly 2.54 centimetres, by international agreement.' },
      { q: 'Can I convert nautical miles and light years?', a: 'Yes. The converter includes nautical miles, fathoms, astronomical units and light years alongside everyday units.' }
    ]
  },
  'converters/weight': {
    lead: 'Convert mass between metric and imperial units, including milligrams, kilograms, ounces, pounds and stone. Type in either box for an instant bidirectional conversion.',
    faqs: [
      { q: 'Is weight the same as mass?', a: 'In everyday use, yes. Strictly, mass is the amount of matter and weight is the force of gravity on it; this converter uses the common mass units.' },
      { q: 'How many pounds are in a kilogram?', a: 'One kilogram is approximately 2.20462 pounds. The converter uses the exact defined factor and rounds the display.' }
    ]
  },
  'converters/temperature': {
    lead: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, Rankine and Réaumur. The scales update in both directions as you type, including absolute-zero values.',
    faqs: [
      { q: 'How do I convert Celsius to Fahrenheit?', a: 'Multiply by 9/5 and add 32: °F = °C × 1.8 + 32.' },
      { q: 'What is absolute zero in each scale?', a: 'Absolute zero is 0 K, −273.15 °C, −459.67 °F and 0 °R.' }
    ]
  },
  'converters/volume': {
    lead: 'Convert volume and capacity between millilitres, litres, cubic metres, cups, pints, quarts and US or imperial gallons. It is useful for recipes, fuel, shipping and lab measurements.',
    faqs: [
      { q: 'Is a US gallon the same as an imperial gallon?', a: 'No. A US gallon is about 3.785 litres; an imperial gallon is about 4.546 litres.' },
      { q: 'Which cup does the converter use?', a: 'The US customary cup (236.588 mL) is used; UK metric cups differ slightly.' }
    ]
  },
  'converters/area': {
    lead: 'Convert area measurements for property, land, flooring and DIY projects. Square metres, square feet, hectares, acres and square miles are all handled in one view.',
    faqs: [
      { q: 'How many square feet are in an acre?', a: 'One acre is 43,560 square feet, or about 4,047 square metres.' },
      { q: 'How do I convert square metres to square feet?', a: 'Multiply by 10.7639, because one square metre equals 10.7639 square feet.' }
    ]
  },
  'converters/speed': {
    lead: 'Convert speed and velocity between km/h, mph, m/s, ft/s, knots and mach. Enter a value in any unit and see every common unit update at once.',
    faqs: [
      { q: 'How fast is one knot?', a: 'One knot is one nautical mile per hour, about 1.852 km/h or 1.151 mph.' },
      { q: 'What is mach 1?', a: 'Mach 1 is the speed of sound in the surrounding medium, roughly 1,235 km/h at sea level. The converter uses a standard sea-level reference.' }
    ]
  },
  'converters/data-storage': {
    lead: 'Convert file sizes and storage capacities between bits, bytes, kilobytes, megabytes, gigabytes and terabytes. Binary KiB, MiB and GiB are included so you can compare marketing and operating-system units.',
    faqs: [
      { q: 'Why does a 1 TB drive show less space in my operating system?', a: 'Drive makers use decimal units (1 TB = 10¹² bytes), while many operating systems report binary units (1 TiB = 2⁴⁰ bytes). The converter shows both.' },
      { q: 'Is a kilobyte 1,000 or 1,024 bytes?', a: 'Decimal KB is 1,000 bytes; binary KiB is 1,024 bytes. Both are included.' }
    ]
  },
  'converters/custom-unit': {
    lead: 'Define your own unit and conversion factor to convert values on a personal scale. It is useful for modelling, recipes, game rules, niche trades and any measure without a standard converter.',
    faqs: [
      { q: 'How do I set up a custom conversion?', a: 'Give each unit a name and a factor representing how many base units it equals, then convert between them like any other unit.' },
      { q: 'Can I save my custom units?', a: 'Custom definitions live in the current browser session and local storage, so they stay on this device.' }
    ]
  },
  'converters/base': {
    lead: 'Convert a number between binary, decimal, octal and hexadecimal at the same time. All four representations stay in sync, which makes it a quick reference for programming and networking.',
    faqs: [
      { q: 'How do I convert decimal 255 to binary and hex?', a: 'Enter 255 in the decimal field; the tool shows 11111111 in binary and FF in hexadecimal.' },
      { q: 'Does it support negative or fractional values?', a: 'It supports signed integers. Fractional values need a different representation and are not converted here.' }
    ]
  },
  'converters/ascii-text': {
    lead: 'Encode text as ASCII codes, binary, hexadecimal or Base64, or decode any of those formats back to readable text. It is handy for debugging, puzzles and understanding how data is represented.',
    faqs: [
      { q: 'What is the difference between ASCII and Unicode?', a: 'ASCII covers 128 basic English characters; Unicode covers most of the world’s writing systems. This tool works with the ASCII range.' },
      { q: 'Can I decode Base64 back to text?', a: 'Yes. Paste Base64 into the input and choose the decode direction; invalid input is reported instead of producing garbage.' }
    ]
  },
  'converters/roman': {
    lead: 'Convert numbers to Roman numerals and Roman numerals back to numbers, from 1 to 3,999,999. The converter validates the numeral and explains the symbols used.',
    faqs: [
      { q: 'What is the largest number this converter supports?', a: '3,999,999, using overbars for larger values. Standard Roman numerals are usually limited to 3,999.' },
      { q: 'Why is 4 written as IV and not IIII?', a: 'Subtractive notation places a smaller symbol before a larger one: IV means 5 − 1. Clock faces sometimes use IIII for visual balance, but IV is standard.' }
    ]
  },
  'converters/fraction-decimal': {
    lead: 'Convert between fractions, decimals and percentages, with any field updating the other two. It handles terminating and repeating decimals and shows the simplified fraction.',
    faqs: [
      { q: 'How do I convert 3/8 to a decimal and a percentage?', a: 'Divide 3 by 8 to get 0.375, then multiply by 100 to get 37.5%.' },
      { q: 'Can it handle repeating decimals?', a: 'Yes. Values such as 1/3 are shown with a repeating-decimal notation and the exact fraction is preserved.' }
    ]
  },
  'converters/scientific-notation': {
    lead: 'Convert numbers between standard form, E-notation and engineering notation. It is built for students, scientists and engineers who need to read or write very large and very small values.',
    faqs: [
      { q: 'What is the difference between scientific and engineering notation?', a: 'Scientific notation uses one digit before the decimal point; engineering notation uses exponents that are multiples of three.' },
      { q: 'How do I enter a number like 6.02 × 10²³?', a: 'Enter 6.02e23 or 6.02 × 10^23; the converter recognises common scientific-notation forms.' }
    ]
  },
  'converters/morse': {
    lead: 'Translate text into Morse code and Morse code back into text. Optional audio playback helps with learning rhythm, and the decoder reports characters it cannot interpret.',
    faqs: [
      { q: 'Does Morse code distinguish uppercase and lowercase?', a: 'No. Morse has no case distinction, so decoded text is conventionally shown in uppercase.' },
      { q: 'What is SOS in Morse code?', a: 'SOS is ... --- ... (three dots, three dashes, three dots). It is a distress signal, not an abbreviation with a literal meaning.' }
    ]
  },
  'converters/cipher': {
    lead: 'Encode, decode and crack classical ciphers including Caesar, ROT13, Atbash, Vigenère and A1Z26. These are learning and puzzle tools, not modern encryption.',
    faqs: [
      { q: 'Can I use these ciphers to protect sensitive data?', a: 'No. Classical ciphers are easy to break and offer no real security. Use modern encryption for anything confidential.' },
      { q: 'How does the Caesar cipher cracker work?', a: 'It tries all 26 shifts and ranks the results against English letter frequencies, then shows the most likely plaintext.' }
    ]
  },
  'converters/color': {
    lead: 'Convert a colour between HEX, RGB, HSL, HSV and CMYK while keeping a live swatch in view. Adjust any model and the others update, which makes palette work and accessibility checks faster.',
    faqs: [
      { q: 'Why do CMYK values look different on screen than in print?', a: 'Screens use emitted RGB light; printing uses reflected CMYK ink. The conversion is a useful approximation, but print profiles vary.' },
      { q: 'How do I convert HEX to RGB?', a: 'Split the six-digit hex code into three pairs and convert each pair from hexadecimal to decimal. The converter does it automatically.' }
    ]
  },
  'converters/power': {
    lead: 'Convert power measurements across electrical, mechanical and thermal units. Watts, kilowatts, megawatts, horsepower, BTU per hour, dBm and kilocalories per hour are all supported.',
    faqs: [
      { q: 'How many watts are in one horsepower?', a: 'Mechanically, one horsepower is about 745.7 watts (550 foot-pounds per second).' },
      { q: 'What is dBm?', a: 'dBm expresses power relative to one milliwatt on a logarithmic scale, commonly used in radio and networking.' }
    ]
  },
  'converters/voltage': {
    lead: 'Convert voltage between microvolts, millivolts, volts, kilovolts and megavolts. The converter uses SI prefixes, so the relationship between each step stays clear.',
    faqs: [
      { q: 'How many millivolts are in one volt?', a: 'One volt equals 1,000 millivolts, or 1,000,000 microvolts.' },
      { q: 'Can I convert negative voltages?', a: 'Yes. Enter a negative value for potentials below the reference point.' }
    ]
  },
  'converters/frequency': {
    lead: 'Convert frequency between hertz, kilohertz, megahertz, gigahertz and terahertz, plus RPM and period. It covers audio, radio, electronics and rotating machinery.',
    faqs: [
      { q: 'How do I convert frequency to period?', a: 'Period is the reciprocal of frequency: T = 1 ÷ f. A 50 Hz signal has a period of 0.02 seconds.' },
      { q: 'How do I convert RPM to hertz?', a: 'Divide revolutions per minute by 60 to get revolutions per second, which equals hertz.' }
    ]
  },
  'converters/energy': {
    lead: 'Convert energy between joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, BTU and electronvolts. It spans physics, nutrition and household utility use.',
    faqs: [
      { q: 'Is a food Calorie the same as a calorie?', a: 'A dietary Calorie (capital C) is a kilocalorie, or 1,000 small calories.' },
      { q: 'How many joules are in one kilowatt-hour?', a: 'One kWh equals 3.6 million joules (3.6 MJ).' }
    ]
  },
  'converters/currency': {
    lead: 'Convert between more than 150 currencies using live exchange rates. Rates are cached locally so the tool keeps working offline, and the amount you enter never leaves your browser.',
    faqs: [
      { q: 'Are these exchange rates the ones my bank will use?', a: 'No. They are reference mid-market rates. Banks and card issuers add spreads and fees, so the final amount will differ.' },
      { q: 'Can I use the currency converter offline?', a: 'Yes, with the most recently cached rates. The tool marks offline rates as cached and needs a connection to refresh them.' }
    ]
  }
};

export const CATEGORY_CONTENT = {
  math: {
    lead: 'From quick arithmetic to statistics and algebra, these 11 free math calculators update as you type. Each one states the formula it uses, so the answer is easy to check and learn from.',
    intro: [
      'Math calculators are only useful when you can trust the working. Every tool in this category uses standard formulas, shows its result immediately and keeps the full precision internally while rounding only the display.',
      'Use the calculators for homework checks, data summaries, percentages, fractions, ratios and quadratic equations. Nothing is uploaded, so you can experiment with real numbers without an account.'
    ],
    faqs: [
      { q: 'Are these math calculators free to use?', a: 'Yes. All 11 calculators are free, with no ads, paywall or sign-up. They run entirely in your browser.' },
      { q: 'Do the math calculators show their working?', a: 'The standard deviation, LCM/GCF and quadratic tools show intermediate steps, and every tool includes a “How this tool works” explanation with the relevant formulas.' }
    ]
  },
  financial: {
    lead: 'Plan loans, savings, discounts and prices with five free financial calculators. Each one shows the formula and a clear breakdown so you can compare scenarios instead of guessing.',
    intro: [
      'Financial calculations are easier to trust when the assumptions are visible. These tools separate principal, rate, term and fees, and they show the total cost rather than only the monthly figure.',
      'Use them to compare loan offers, estimate compound growth, work out sale prices, add or remove VAT, and check margin before setting a price. They are estimating tools, not a substitute for a lender’s quote or professional advice.'
    ],
    faqs: [
      { q: 'Can I use these calculators for a real loan or mortgage?', a: 'They use standard amortization and interest formulas, so they are a good estimate. Lenders add fees, insurance and their own rounding rules, so confirm the final schedule with the lender.' },
      { q: 'Do the financial tools include tax and fees?', a: 'The VAT/sales tax tool handles tax explicitly. The loan and interest calculators do not assume fees or tax, so add those separately if they apply.' }
    ]
  },
  health: {
    lead: 'Check body mass index, resting energy needs and ideal weight ranges with three free health calculators. Results are clearly labelled as estimates, with the formulas and limits explained.',
    intro: [
      'Health numbers are useful context, not a diagnosis. These calculators use established formulas — BMI categories, Mifflin–St Jeor for BMR and four common ideal-weight equations — and present a range where a single number would be misleading.',
      'Everything runs locally. Enter height, weight, age and activity level to explore how the estimates change; nothing is sent to a server.'
    ],
    faqs: [
      { q: 'Are these health calculators medical advice?', a: 'No. They are arithmetic tools based on population-level formulas. They do not account for body composition, medical conditions or clinical context. Speak to a qualified professional for health decisions.' },
      { q: 'Do the health calculators support metric and imperial units?', a: 'The BMI calculator supports both metric and imperial input. The BMR and ideal-weight tools state their unit options on the page; check before entering values.' }
    ]
  },
  datetime: {
    lead: 'Calculate exact ages, differences between dates, countdowns and time durations. Four free date and time tools that handle leap years, month lengths and business days correctly.',
    intro: [
      'Date arithmetic is deceptively error-prone: months have different lengths, leap years add a day and “one month” is not a fixed number of days. These tools compare calendar dates properly instead of dividing a day count by 30 or 365.',
      'Use them for age checks, project deadlines, notice periods, timesheets and live countdowns. Each result is calculated in your timezone and never uploaded.'
    ],
    faqs: [
      { q: 'Do the date calculators account for leap years?', a: 'Yes. Age and date-difference calculations compare actual calendar dates, so February 29 and month-length differences are handled correctly.' },
      { q: 'How are business days calculated?', a: 'Weekends are excluded from the business-day count. Public holidays are not assumed because they vary by country and year.' }
    ]
  },
  grade: {
    lead: 'Work out weighted GPA, convert marks to a percentage and letter grade, or find the final exam score you need. Three free grade calculators built for students and teachers.',
    intro: [
      'Grade calculations depend on the scale and weighting your institution uses. These tools make the scale explicit, support weighted course credits and update totals as you edit rows.',
      'The GPA tool uses the Bangladesh/UGC 4.00 scale. The grade calculator also supports US letter grades with and without plus/minus, UK honours and the US 4.0 mapping. Always check your own syllabus for the authoritative scale.'
    ],
    faqs: [
      { q: 'Which GPA scale do these calculators use?', a: 'The GPA calculator uses the Bangladesh/UGC 4.00 scale. The grade calculator offers several letter-grade scales and states which one is selected.' },
      { q: 'Can I calculate a weighted GPA with different course credits?', a: 'Yes. Enter each course’s credits and grade; the calculator multiplies each grade by its credits and divides by the total credits.' }
    ]
  },
  electrical: {
    lead: 'Solve Ohm’s law, the power wheel and appliance running costs with three free electrical calculators. Enter any two known values and see the rest with clear units and formulas.',
    intro: [
      'Electrical calculations become much easier when voltage, current, resistance and power are treated as one connected system. These tools solve the standard relationships in both directions and show the formula used.',
      'They are intended for study, prototyping and quick checks. For mains wiring or anything safety-critical, follow local electrical codes and consult a licensed electrician.'
    ],
    faqs: [
      { q: 'Which formulas do the electrical calculators use?', a: 'Ohm’s law (V = I × R), the power equations (P = V × I, P = I²R and P = V²/R) and their rearrangements. The power-cost tool also converts watts and hours into kilowatt-hours.' },
      { q: 'Are these electrical calculators safe for mains wiring?', a: 'They are calculation aids, not a substitute for electrical codes, testing or a licensed electrician. Do not rely on them for safety-critical installation decisions.' }
    ]
  },
  everyday: {
    lead: 'Split a restaurant bill or see an age in days, hours and heartbeats. Two free everyday calculators for the small questions that come up outside a spreadsheet.',
    intro: [
      'Some calculations are too small for a spreadsheet but still worth getting right. These tools keep the interface short: enter the bill or birth date, adjust the options and read the result.',
      'Both run entirely in your browser, so the numbers you enter stay on your device.'
    ],
    faqs: [
      { q: 'Can I split a bill between more than two people?', a: 'Yes. Enter any number of people and the tip calculator divides the total, including gratuity, evenly.' },
      { q: 'How accurate is the age-in-days calculator?', a: 'It uses actual calendar dates, so days, weeks, months and hours are accurate. The heartbeat figure is an estimate based on an average resting heart rate.' }
    ]
  },
  units: {
    lead: 'Convert length, weight, temperature, volume, area, speed and data storage with eight free unit converters. Exact factors, live bidirectional results and one page per quantity.',
    intro: [
      'A converter should not make you choose a direction before you start. Each tool here has two unit menus, a swap button, and live conversion in either field — so cm to inches and inches to cm use the same page.',
      'Factors are stored once and applied consistently, with exact definitions used where they exist (one inch is exactly 25.4 mm). Results are displayed to a sensible precision and cached for offline use after the first visit.'
    ],
    faqs: [
      { q: 'Are the unit conversion factors exact?', a: 'Where an exact definition exists, yes — for example, one inch is defined as exactly 25.4 mm. Other factors are standard physical constants or conventional values and are stated in the tool.' },
      { q: 'Why is there one converter per quantity instead of one page per direction?', a: 'One page with two dropdowns replaces dozens of one-way pages. It keeps the interface short, avoids broken bookmarks and makes swapping direction instant.' }
    ]
  },
  'number-system': {
    lead: 'Convert bases, ASCII text, binary, hex, Roman numerals, fractions and Morse code. Seven free converters for programming, study and puzzle solving.',
    intro: [
      'Number and encoding conversions are easy to get wrong when a leading zero, case or separator changes the meaning. These tools validate input and show several representations side by side so you can compare them.',
      'They are aimed at programmers, students, radio hobbyists and puzzle fans. Classical ciphers are included for learning and games — they are not security tools.'
    ],
    faqs: [
      { q: 'What is the difference between ASCII and Unicode?', a: 'ASCII defines 128 basic English characters and control codes. Unicode covers most of the world’s writing systems; these tools focus on the ASCII range and common encodings.' },
      { q: 'Can I use the cipher converter for private data?', a: 'No. Caesar, ROT13, Atbash, Vigenère and A1Z26 are classical ciphers and are easy to break. Use modern encryption for anything confidential.' }
    ]
  },
  color: {
    lead: 'Convert colors between HEX, RGB, HSL, HSV and CMYK with a live swatch. A free browser-based color converter for designers, developers and digital art.',
    intro: [
      'Color values are representations of the same idea in different models. This converter keeps all five models in sync, so you can start from a hex code, an RGB triplet or an HSL value and copy the format your tool expects.',
      'Screen and print colors are not identical: RGB is emitted light and CMYK is reflected ink. Treat the CMYK values as a starting point and check a physical proof for critical print work.'
    ],
    faqs: [
      { q: 'Can I convert a color for print?', a: 'The CMYK output is a useful approximation, but professional printing depends on the press, paper and ICC profile. Always request a proof for brand-critical print work.' },
      { q: 'Does the color converter show contrast?', a: 'The tool includes a live swatch and color-model outputs. Use a dedicated contrast checker when validating WCAG text accessibility.' }
    ]
  },
  'electrical-conv': {
    lead: 'Convert power, voltage, frequency and energy units with four free electrical converters. Watts, volts, hertz, joules, BTU and more — instant, exact and private.',
    intro: [
      'Electrical work spans many orders of magnitude, from microvolts to megavolts and from hertz to terahertz. These converters use SI prefixes and standard factors so a value can move between scales without manual arithmetic.',
      'Each tool lists every supported unit and updates the others as you type. Use them for electronics, radio, testing and energy comparisons.'
    ],
    faqs: [
      { q: 'Do these converters use SI prefixes correctly?', a: 'Yes. The voltage, frequency, power and energy tools use the standard SI relationships, including the distinction between decimal and binary units where relevant.' },
      { q: 'What is dBm used for?', a: 'dBm expresses power relative to one milliwatt on a logarithmic scale. It is common in radio, Wi-Fi and other communication systems.' }
    ]
  },
  currency: {
    lead: 'Convert 150+ currencies with live exchange rates and offline caching. A free currency converter that keeps your amounts private in the browser.',
    intro: [
      'Exchange rates change constantly, so a converter is only useful if it is clear about freshness. This tool fetches reference mid-market rates, caches them locally and labels offline results as cached.',
      'Rates are for estimates, not settlement. Banks, card issuers and payment services apply their own spread and fees, so the amount you actually receive will differ.'
    ],
    faqs: [
      { q: 'Where do the currency rates come from?', a: 'They come from a free public exchange-rate feed and are reference mid-market rates, not transaction rates. The tool stores the latest table locally for offline use.' },
      { q: 'Why is the converted amount different from my bank?', a: 'Banks and card issuers add a spread and may charge fixed fees. The reference rate on this page does not include those costs.' }
    ]
  }
};

export const GROUP_CONTENT = {
  calculators: {
    intro: [
      'FatahCalc Pro gathers 31 free calculators into one browser-based suite. Math, money, health, dates, grades, electrical work and everyday questions are all covered without separate apps, accounts or pop-up ads.',
      'Every calculator updates as you type and explains the formula behind the result. Use the category links below to browse the full set, or search the suite from the header. Nothing is uploaded; your inputs remain on your device.'
    ],
    faqs: [
      { q: 'How many free calculators are included?', a: 'There are 31 calculators across seven categories: math, financial, health and fitness, date and time, grades and education, electrical and physics, and everyday utility.' },
      { q: 'Do I need to install anything to use the calculators?', a: 'No. They run directly in your browser. You can optionally install FatahCalc Pro as a PWA for offline access and a home-screen icon.' }
    ]
  },
  converters: {
    intro: [
      'FatahCalc Pro includes 21 free converters for units, number systems, encoding, color, electrical values and currency. Each one is bidirectional: pick two units, type in either field and the other updates immediately.',
      'Exact factors are used where definitions exist, and results are rounded only for display. Converters you open are cached by the service worker, so common conversions keep working offline.'
    ],
    faqs: [
      { q: 'How many free converters are included?', a: 'There are 21 converters across five categories: everyday units, number systems and encoding, color, electrical and energy, and currency.' },
      { q: 'Do the converters work offline?', a: 'Yes after the first visit. The app shell and opened tools are cached locally. Currency rates use the most recently cached table until a connection is available.' }
    ]
  }
};

export const HOME_INTRO = {
  title: 'The free all-in-one calculator suite for everyday math',
  paragraphs: [
    'FatahCalc Pro is a free online calculator suite with 52 tools across 12 categories — 31 calculators and 21 converters. It covers percentages and fractions, loans and compound interest, BMI and calories, dates and countdowns, grades, Ohm’s law, unit conversions, number systems, color and live currency rates.',
    'Every calculation runs in your browser. There is no account, no advertising, no analytics and no submit button: results appear as you type, and the full precision is kept while the display is rounded for readability. Use the directory above or open a category below.',
    'Install FatahCalc Pro as a PWA and the app shell, plus the tools you have opened, are cached for offline use. Currency rates are the one exception — they need a connection to refresh, and cached rates are clearly labelled.'
  ],
  categoryHeading: 'Explore calculators and converters by category'
};

export const HOME_FAQ = [
  {
    q: 'Is FatahCalc Pro completely free to use?',
    a: 'Yes. All 52 calculators and converters are free, with no paywall, trial, account or advertising. There is nothing to unlock and no usage limit.'
  },
  {
    q: 'Can I install FatahCalc Pro as an offline PWA app?',
    a: 'Yes. Use your browser’s Install or Add to Home Screen option. A service worker caches the app shell and the tools you have opened, so they keep working offline. Fresh currency rates require a connection.'
  },
  {
    q: 'Are my calculations private?',
    a: 'Yes. The math runs locally in your browser. FatahCalc Pro has no analytics, no ads and no account system, so your inputs, favorites and history stay on your device. The only network request is the currency-rate feed, which contains no personal data.'
  },
  {
    q: 'How many calculators and converters are included?',
    a: 'There are 52 tools across 12 categories: 31 calculators for math, finance, health, dates, grades, electrical work and everyday use, plus 21 converters for units, number systems, color, electrical values and currency.'
  },
  {
    q: 'Do I need an account or sign-up?',
    a: 'No. Open a tool and start typing. Favorites and history are stored in this browser only, so they are private to the device and do not require a login.'
  },
  {
    q: 'How accurate are the results?',
    a: 'The tools use standard formulas and keep full precision internally while rounding the displayed value. They are calculation aids, not professional financial, medical or electrical advice; confirm consequential decisions with a qualified professional.'
  }
];

export const FAQ_PAGE = {
  title: 'Frequently Asked Questions',
  lead: 'Answers about pricing, offline use, privacy, accuracy and how FatahCalc Pro is built.',
  sections: [
    {
      title: 'Getting started',
      items: [
        {
          q: 'What is FatahCalc Pro?',
          a: 'FatahCalc Pro is a free online calculator and converter suite by FatahTech. It includes 52 tools across 12 categories, all running in your browser with live results and no account.'
        },
        {
          q: 'Is FatahCalc Pro completely free to use?',
          a: 'Yes. Every calculator and converter is free, with no paywall, trial, account or advertising. There are no usage limits and nothing to unlock.'
        },
        {
          q: 'Do I need to create an account?',
          a: 'No. There is no sign-up or login. Open a tool and start typing. Favorites and history are stored locally in your browser.'
        },
        {
          q: 'How do I find a specific calculator?',
          a: 'Use the search box in the header, or press / or Ctrl/Cmd + K. Search matches tool names, descriptions and keywords. You can also browse the calculators and converters hubs by category.'
        }
      ]
    },
    {
      title: 'Offline and installation',
      items: [
        {
          q: 'Can I install FatahCalc Pro as an offline PWA app?',
          a: 'Yes. Most browsers offer Install or Add to Home Screen. A service worker caches the app shell and tools you have opened, so they keep working without a connection. Currency rates require a network connection to refresh.'
        },
        {
          q: 'Which tools work offline?',
          a: 'The app shell and any tool you have opened are cached. Tools you have never visited need a connection the first time. Previously fetched currency rates can be used offline and are marked as cached.'
        },
        {
          q: 'Does it work on phones and tablets?',
          a: 'Yes. The layout is mobile-first, with a collapsible navigation drawer and converter fields that stack vertically on narrow screens. Every tool is usable with touch and a keyboard.'
        }
      ]
    },
    {
      title: 'Privacy and data',
      items: [
        {
          q: 'Are my calculations private?',
          a: 'Yes. Every calculation runs in your browser. There is no analytics, advertising or account system, so inputs, favorites and history stay on your device. The only network request is the currency-rate feed, which contains no personal data.'
        },
        {
          q: 'What data is stored on my device?',
          a: 'Your theme choice, favorites, recent tools, calculation history and any custom units. These use browser local storage and can be removed by clearing site data. Nothing is uploaded.'
        },
        {
          q: 'Are there ads or trackers?',
          a: 'No. FatahCalc Pro has no advertising, analytics or third-party tracking. The external resources are limited to web fonts and an icon font loaded from public CDNs.'
        }
      ]
    },
    {
      title: 'Accuracy and methods',
      items: [
        {
          q: 'How accurate are the results?',
          a: 'The tools use standard formulas and keep full precision internally while rounding the displayed value. Conversions use exact factors where an exact definition exists, such as 1 inch = 25.4 mm.'
        },
        {
          q: 'Where do currency exchange rates come from?',
          a: 'From a free public exchange-rate feed, cached locally. They are reference mid-market rates, not transaction rates. Banks and card issuers add spreads and fees, so the final amount will differ.'
        },
        {
          q: 'Which grading scale is used?',
          a: 'The GPA calculator uses the Bangladesh/UGC 4.00 scale. The grade calculator also offers US letter grades with and without plus/minus, UK honours and the US 4.0 mapping. Always check your institution’s official scale.'
        },
        {
          q: 'Can I rely on these tools for financial or health decisions?',
          a: 'Treat them as well-implemented arithmetic, not professional advice. Loan figures will not match a lender’s schedule once fees and day-count rules apply, and health formulas are population-level estimates. Confirm consequential decisions with a qualified professional.'
        },
        {
          q: 'Can I use the cipher tool to protect sensitive information?',
          a: 'No. The cipher tool implements classical ciphers such as Caesar, ROT13, Atbash, Vigenère and A1Z26. They are for puzzles and learning, not security. Use modern encryption for anything confidential.'
        }
      ]
    },
    {
      title: 'Technical',
      items: [
        {
          q: 'What is FatahCalc Pro built with?',
          a: 'Semantic HTML5, CSS custom properties, and vanilla ES6+ JavaScript with ES modules. There is no framework and no bundler. Routing is a small custom router, and each tool loads on demand.'
        },
        {
          q: 'I found a bug or want a new tool. Where do I report it?',
          a: 'Contact FatahTech through the main website. Include the tool name, the values you entered and what you expected instead; that makes the report much easier to reproduce.'
        }
      ]
    }
  ]
};

export const ABOUT_CONTENT = {
  title: 'About FatahCalc Pro',
  lead: 'A free, private, browser-based calculator suite built by FatahTech — 52 tools across 12 categories, with no accounts and no ads.',
  sections: [
    {
      h2: 'Why FatahCalc Pro exists',
      paragraphs: [
        'Most calculator searches land on a page that shows one formula, several ads and a request to accept cookies. FatahCalc Pro takes the opposite approach: put every common calculator and converter in one fast, quiet interface, explain how each result is produced, and let people move between tools without loading a new page for every direction of a conversion.',
        'The suite began as a way to replace dozens of one-way conversion pages with a single bidirectional tool per quantity. That idea grew into 52 tools covering math, finance, health, dates, grades, electrical work, everyday questions, units, number systems, color and currency.'
      ]
    },
    {
      h2: 'How it is built',
      paragraphs: [
        'The app is written in semantic HTML, CSS custom properties and vanilla ES6+ JavaScript. There is no framework, no bundler and no server-side calculation. Each tool is an ES module loaded on demand, and the small router keeps navigation instant after the shell has loaded.',
        'A service worker caches the app shell and the tools you open, so the suite works offline after a first visit. Favorites, history and preferences live in local storage on your device.'
      ]
    },
    {
      h2: 'Privacy by design',
      paragraphs: [
        'There is no account system, analytics, advertising or tracker. Calculations happen in your browser, and inputs are not sent anywhere. The single network request in the suite is the currency-rate feed, which contains no personal data.',
        'Because data stays local, clearing your browser storage or switching devices will remove favorites and history. That is the trade-off for not requiring a login.'
      ]
    },
    {
      h2: 'Accuracy and limits',
      paragraphs: [
        'The tools use standard formulas and exact conversion factors where definitions exist. Displayed values are rounded for readability while full precision is kept internally. Financial, health and electrical results are estimates and calculation aids, not professional advice.',
        'If a result matters, check it against a second source and consult a qualified professional where appropriate.'
      ]
    }
  ]
};
