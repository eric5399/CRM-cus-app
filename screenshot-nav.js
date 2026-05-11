import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3001';
const SCREENSHOT_DIR = 'screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const pageConfigs = [
  { name: '01_HOME', path: async (p) => { await p.goto(BASE_URL, { waitUntil: 'networkidle' }); } },
  {
    name: '02_DASHBOARD',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('一键续保').click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '03_CUSTOMER_LIST',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '04_CUSTOMER_TODO',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.locator('button:has-text("全部")').first().click();
      await p.waitForTimeout(500);
    }
  },
  {
    name: '05_CUSTOMER_360',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.getByText('菲林科技').click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '06_BASIC_INFO',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.getByText('菲林科技').click();
      await p.waitForTimeout(800);
      await p.locator('button:has-text("基本信息")').click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '07_COOP_INFO',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.getByText('菲林科技').click();
      await p.waitForTimeout(800);
      await p.locator('button:has-text("合作记录")').click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '08_CLAIM_RECORD',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.getByText('菲林科技').click();
      await p.waitForTimeout(800);
      await p.locator('button:has-text("理赔记录")').click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '09_TIMELINE_PAGE',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.getByText('菲林科技').click();
      await p.waitForTimeout(800);
      await p.locator('button:has-text("时光轴")').click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '10_ALL_SERVICES',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.getByText('菲林科技').click();
      await p.waitForTimeout(800);
      // 点击服务养客 tab
      await p.locator('button:has-text("服务养客")').click();
      await p.waitForTimeout(800);
      // 滚动到查看全部按钮并点击
      const viewAllBtn = p.locator('text=查看全部');
      await viewAllBtn.scrollIntoViewIfNeeded();
      await viewAllBtn.click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '11_SERVICE_APPLICATION',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.getByText('菲林科技').click();
      await p.waitForTimeout(800);
      await p.locator('button:has-text("服务养客")').click();
      await p.waitForTimeout(500);
      const applyBtn = p.locator('text=立即申请');
      await applyBtn.scrollIntoViewIfNeeded();
      await applyBtn.click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '12_SERVICE_APPROVAL',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.waitForTimeout(500);
      // 首页滚动到底部找服务审批
      await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await p.waitForTimeout(300);
      await p.getByText('服务审批').click();
      await p.waitForTimeout(800);
    }
  },
  {
    name: '13_AGENCY_CUSTOMER_DETAILS',
    path: async (p) => {
      await p.goto(BASE_URL, { waitUntil: 'networkidle' });
      await p.getByText('客户管理').click();
      await p.waitForTimeout(500);
      await p.getByText('菲林科技').click();
      await p.waitForTimeout(800);
      await p.locator('button:has-text("合作记录")').click();
      await p.waitForTimeout(800);
      await p.locator('text=经代公司').first().click();
      await p.waitForTimeout(800);
    }
  },
];

async function main() {
  console.log('🚀 启动浏览器...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 430, height: 932 });

  for (const config of pageConfigs) {
    console.log(`\n📍 截图: ${config.name}`);
    try {
      await config.path(page);
      const screenshotPath = path.join(SCREENSHOT_DIR, `${config.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  ✓ 已保存: ${screenshotPath}`);
    } catch (err) {
      console.log(`  ❌ 失败: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n🎉 截图完成！');
}

main().catch(console.error);
