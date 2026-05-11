import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3001';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 430, height: 932 });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 导航到 Customer360
  await page.getByText('客户管理').click();
  await page.waitForTimeout(500);
  await page.getByText('菲林科技').click();
  await page.waitForTimeout(1000);

  console.log('=== 页面 buttons ===');
  const buttons = await page.locator('button').allTextContents();
  console.log(buttons);

  console.log('\n=== 包含"信息"的文本 ===');
  const allText = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const texts = [];
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text.includes('信息') || text.includes('记录') || text.includes('本') || text.includes('理赔')) {
        texts.push(text);
      }
    }
    return texts;
  });
  console.log(allText);

  await browser.close();
}

main().catch(console.error);
