const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async function () {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: process.env.CHROME_EXECUTEABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto('https://spacejelly.dev');

  await page.focus('#search-query');
  await page.keyboard.type('api');

  const title = await page.title();
  const description = await page.$eval('meta[name="description"]', (element) => element.content);

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
      status: 'Ok',
      page: {
        title,
        description,
      },
    }),
  };
};
