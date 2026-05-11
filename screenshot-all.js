import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3001';
const SCREENSHOT_DIR = 'screenshots';

// 确保截图目录存在
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// 页面导航配置 - 按点击顺序
const pageConfigs = [
  {
    name: '01_HOME',
    description: '首页',
    clicks: [],
  },
  {
    name: '02_DASHBOARD',
    description: '续保看板',
    clicks: [{ selector: 'text=续保看板', index: 0 }],
  },
  {
    name: '03_CUSTOMER_LIST',
    description: '客户管理列表',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=客户管理', index: 0 },
    ],
  },
  {
    name: '04_CUSTOMER_TODO',
    description: '客户待办',
    clicks: [{ selector: 'text=全部', index: 0 }],
  },
  {
    name: '05_CUSTOMER_360',
    description: '客户详情',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=客户管理', index: 0 },
      { selector: 'text=菲林科技', index: 0 },
    ],
  },
  {
    name: '06_BASIC_INFO',
    description: '基本信息',
    clicks: [{ selector: 'text=基本信息', index: 0 }],
  },
  {
    name: '07_COOP_INFO',
    description: '合作信息',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=菲林科技', index: 0 },
      { selector: 'text=合作信息', index: 0 },
    ],
  },
  {
    name: '08_CLAIM_RECORD',
    description: '理赔记录',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=菲林科技', index: 0 },
      { selector: 'text=理赔记录', index: 0 },
    ],
  },
  {
    name: '09_TIMELINE_PAGE',
    description: '时间线',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=菲林科技', index: 0 },
      { selector: 'text=时间线', index: 0 },
    ],
  },
  {
    name: '10_ALL_SERVICES',
    description: '全部服务',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=菲林科技', index: 0 },
      { selector: 'text=查看全部', index: 0 },
    ],
  },
  {
    name: '11_SERVICE_APPLICATION',
    description: '服务申请',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=菲林科技', index: 0 },
      { selector: 'text=服务养客', index: 0 },
      { selector: 'text=立即申请', index: 0 },
    ],
  },
  {
    name: '12_SERVICE_APPROVAL',
    description: '服务审批',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=返回', index: 0 },
      { selector: 'text=服务审批', index: 0 },
    ],
  },
  {
    name: '13_AGENCY_CUSTOMER_DETAILS',
    description: '经代公司详情',
    clicks: [
      { selector: 'text=返回', index: 0 },
      { selector: 'text=菲林科技', index: 0 },
      { selector: 'text=合作信息', index: 0 },
      { selector: 'text=经代公司', index: 0 },
    ],
  },
];

async function navigateAndScreenshot(page, config) {
  console.log(`\n📍 正在截图: ${config.name} (${config.description})`);

  // 如果不是首页，先返回首页
  if (config.clicks.length === 0) {
    // 首页，直接截图
  } else {
    // 先回到首页
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
  }

  // 执行点击操作
  for (const click of config.clicks) {
    try {
      await page.waitForSelector(click.selector, { timeout: 5000 });
      const elements = await page.locator(click.selector).all();
      if (elements.length > click.index) {
        await elements[click.index].click();
        await page.waitForTimeout(800);
        console.log(`  ✓ 点击: ${click.selector} [${click.index}]`);
      }
    } catch (err) {
      console.log(`  ⚠ 点击失败: ${click.selector} - ${err.message}`);
    }
  }

  // 截图
  const screenshotPath = path.join(SCREENSHOT_DIR, `${config.name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`  ✓ 已保存: ${screenshotPath}`);
}

async function main() {
  console.log('🚀 启动浏览器...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 430, height: 932 }); // iPhone 14 Pro 尺寸

  console.log(`📱 目标: ${BASE_URL}`);
  console.log(`📁 截图保存到: ${SCREENSHOT_DIR}/\n`);

  // 访问首页
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 截图首页
  let screenshotPath = path.join(SCREENSHOT_DIR, '01_HOME.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('📸 已保存: 01_HOME.png (首页)');

  // 依次导航并截图
  for (const config of pageConfigs.slice(1)) {
    await navigateAndScreenshot(page, config);
  }

  await browser.close();
  console.log('\n🎉 所有页面截图完成！');
}

main().catch(console.error);
