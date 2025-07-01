const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', // or true
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const url = `https://transportnsw.info/regional-travel/trip-selection?$=tripPlans@$origin$value=BNE&inputValue=Brisbane%20Roma%20Street;&destination$value=SYD&inputValue=Sydney%20Central%20Station;&tripDates$type=oneWay&departing=2025-07-02&returning=;;;&numAdults:1;;`;

  console.log("Navigating to page...");
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wait additional time for dynamic JS content
  console.log("Waiting 7 seconds for dynamic content...");
  await new Promise(resolve => setTimeout(resolve, 7000));


  console.log("Taking screenshot...");
  await page.screenshot({ path: 'transportnsw.png', fullPage: true });

  console.log("Done.");
  await browser.close();
})();
