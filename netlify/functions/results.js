const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const _ = require('lodash');

exports.handler = async function (event, context) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: process.env.CHROME_EXECUTEABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'Ok',
      results,
    }),
  };
};
