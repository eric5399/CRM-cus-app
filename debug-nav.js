import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3001';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 430, height: 932 });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 打印页面所有按钮和可点击文本
  const buttons = await page.locator('button').allTextContents();
  console.log('=== 页面 buttons 文本 ===');
  console.log(buttons);

  console.log('\n=== 所有文本内容 ===');
  const allText = await page.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    const texts = [];
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text) texts.push(text);
    }
    return texts;
  });
  console.log(allText.slice(0, 50)); // 前50个

  await browser.close();
}

main().catch(console.error);
