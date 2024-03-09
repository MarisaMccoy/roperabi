// 检测网页的资源加载时间
async function measureResourceLoadTime(url, resourceType) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('html'); // 等待页面加载完成
  const resources = await page.evaluate(() =>
      Array.from(document.querySelectorAll('link, script, img, iframe')).map(item => ({
          url: item.src || item.href,
          type: item.tagName.toLowerCase()
      }))
  );
  const resource = resources.find(res => res.type === resourceType);
  const resourceStartTime = performance.now();
  await page.goto(resource.url);
  const resourceEndTime = performance.now();
  await browser.close();
  return resourceEndTime - resourceStartTime;
}