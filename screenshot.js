import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

// 配置
const BASE_URL = 'http://localhost:3000';
const SAVE_FOLDER = 'screenshots';
if (!fs.existsSync(SAVE_FOLDER)) fs.mkdirSync(SAVE_FOLDER);

// 全局记录（防止重复截图）
const visited = new Set();
let index = 1;

// 统一截图方法
async function screenshot(page, name) {
  name = name.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').slice(0, 10);
  if (!name || visited.has(name)) return;
  visited.add(name);
  const filePath = path.join(SAVE_FOLDER, `${index++}_${name}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`✅ 已截图：${filePath}`);
}

// 🔥 核心：递归深度点击（支持1/2/3/4/5级菜单，不返回、不刷新、绝不白屏）
async function scanDeep(page, element) {
  try {
    // 获取当前元素下所有可点击的子元素（菜单全适配）
    const items = await element.$$(`
      a, button, [role="menuitem"], [role="button"],
      .menu-item, .nav-item, .sidebar-item,
      .ant-menu-item, .el-menu-item, [class*="item"]
    `);

    for (const item of items) {
      try {
        // 获取菜单文字
        const text = await item.textContent().then(t => t?.trim() || '');
        if (!text || text.length < 2) continue;

        // 点击菜单（展开下级/跳转页面）
        await item.click({ force: true });
        // 等待页面内容渲染（解决白屏！）
        await page.waitForTimeout(2000);

        // 截图当前页面
        await screenshot(page, text);

        // 🔥 递归：继续点击下级菜单（无限级支持）
        await scanDeep(page, item);

      } catch (e) {}
    }
  } catch (e) {}
}

// 主程序
async function start() {
  // 可视化浏览器
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 打开项目
  console.log('🚀 打开项目...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // 截图首页
  await screenshot(page, '首页');

  // 🔥 自动找到侧边栏/菜单容器，开始深度遍历所有页面
  const menuContainers = await Promise.all([
    page.$('.sidebar'), page.$('.menu'), page.$('.nav'), page.$('.sider'),
    page.$('.ant-menu'), page.$('.el-menu'), page.$('[class*="sidebar"]')
  ]);

  for (const container of menuContainers) {
    if (container) {
      console.log('🎯 开始遍历所有多级页面...');
      await scanDeep(page, container);
      break;
    }
  }

  await browser.close();
  console.log(`\n🎉 全部完成！共截取 ${visited.size} 个页面（全层级）`);
}

start();