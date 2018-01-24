export default async (browser, iframeUrl) => {
  const page = await browser.newPage();

  await page.goto(iframeUrl, {
    waitUntil: "networkidle2"
  });

  return page.evaluate("preview.getStorybook()");
};
