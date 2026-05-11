# 好帮手 CRM 设计规范

## 概述

本项目使用 **好帮手设计规范 v3.2** 作为 UI 设计标准。

## 设计系统文件

- [好帮手设计规范.md](./好帮手设计规范.md) - 完整设计规范文档
- [src/styles/hbs-design-system.css](./src/styles/hbs-design-system.css) - CSS 变量和工具类
- [src/components/ui/](./src/components/ui/) - React 组件库

## 色彩系统

### 品牌色
| 色值 | 用途 |
|------|------|
| `#FF6611` | 好帮手橙 - 品牌主色 |
| `#993A06` | 最深 (Active) |
| `#CC4E0A` | 深色 (Hover) |
| `#FFA370` | 中等 |
| `#FFC2A0` | 浅色 |
| `#FFE0CF` | 极浅 |
| `#FFEFE7` | 最浅 |

### 中性色
| 色值 | 用途 |
|------|------|
| `#FFFFFF` | 纯白 - 页面/卡片底色 |
| `#222222` | 主文本 |
| `#737587` | 辅助文本 |
| `#AFB3C2` | 说明性文本/占位符 |
| `#D8DAE3` | 分隔线(灰底) |
| `#E8ECF2` | 分隔线(白底) |
| `#F4F6F9` | 页面背景 |
| `#FEF6E7` | 通知栏背景 |
| `#FFEAE9` | 警示栏背景 |

### 功能色
| 色值 | 用途 |
|------|------|
| `#508CEE` | 信息提示 |
| `#56C468` | 成功状态 |
| `#F7B44C` | 强调/待处理 |
| `#E85757` | 错误/警告 |

## 字体系统

| 字号 | 行高 | 用途 |
|------|------|------|
| 40px | 56px | T0 - 瀑布流分类标签选中 |
| 36px | 50px | T1 - 弹窗标题 |
| 34px | 48px | T2 - 资讯标题、大按钮文字、顶部导航 |
| 32px | 44px | T3 - 信息列表标题、主要文本 |
| 28px | 40px | T4 - 小按钮文本、次要文本 |
| 26px | 36px | T5 - 个人主页功能入口 |
| 24px | 34px | T6 - 说明、提示等辅助性文字 |
| 22px | 30px | T7 - 运营提醒气泡、标签文字 |
| 20px | 28px | T8 - 标签文字、底部tab |

## 布局规范

| 项目 | 数值 |
|------|------|
| 设计稿尺寸 | 750px × 1624px |
| 页面最大宽度 | 430px |
| 左右边距 | 24px |
| 模块间距 | 16px / 20px |
| 栅格基数 | 4px |

## 圆角规范

| 应用场景 | 圆角 |
|---------|------|
| 大卡片 | 24px |
| 内部卡片/按钮/输入框 | 12px |
| Checkbox | 4px |

## 组件清单

### UI 组件库 (src/components/ui/)

```typescript
import {
  HbsButton,   // 按钮 - 状态: Default/Hover/Active/Disabled/Loading
  HbsInput,    // 输入框 - 状态: Default/Focus/Error/Disabled
  HbsCheckbox, // 多选框 - 状态: Default/Selected/Disabled
  HbsRadio,    // 单选框 - 状态: Default/Selected/Disabled
  HbsToggle,   // 开关 - 状态: Off/On/Disabled
  HbsTag,      // 标签 - 类型: default/primary/success/warning/error/info
  HbsCard,     // 卡片 - variant: large/inner
} from '@/components/ui';
```

### 按钮状态

| 状态 | 背景色 | 文字色 |
|------|--------|--------|
| Default | `#FF6611` | `#FFFFFF` |
| Hover | `#CC4E0A` | `#FFFFFF` |
| Active | `#993A06` | `#FFFFFF` |
| Disabled | `#D8DAE3` | `#AFB3C2` |

### 标签类型

| 类型 | 背景色 | 文字色 | 用途 |
|------|--------|--------|------|
| default | `#F4F6F9` | `#222222` | 分类、属性标记 |
| primary | `#FF6611` | `#FFFFFF` | 重要标记 |
| success | `#56C468` | `#FFFFFF` | 成功状态 |
| warning | `#F7B44C` | `#FFFFFF` | 警告、待处理 |
| error | `#E85757` | `#FFFFFF` | 错误、失败 |

## 开发指南

### 使用设计系统 CSS

在入口文件中引入:
```tsx
import '@/styles/hbs-design-system.css';
```

### 使用 React 组件

```tsx
import { HbsButton, HbsTag } from '@/components/ui';

// 按钮示例
<HbsButton variant="primary" size="md" loading={false}>
  提交
</HbsButton>

// 标签示例
<HbsTag type="success">已完成</HbsTag>
```

### Tailwind 颜色扩展

在 Tailwind 配置中使用设计系统颜色:
```js
// tailwind.config.js
colors: {
  hbs: {
    orange: '#FF6611',
    'orange-deep': '#993A06',
    'orange-dark': '#CC4E0A',
    // ...
  }
}
```

## 状态覆盖矩阵

所有交互组件应包含以下状态:

| 状态 | 说明 | 应用场景 |
|------|------|---------|
| Default | 默认/初始状态 | 页面加载 |
| Hover | 鼠标悬浮 | 桌面端 |
| Active/Pressed | 按下/点击 | 触发操作 |
| Focus | 焦点/聚焦 | 键盘/输入 |
| Disabled | 禁用 | 不可操作 |
| Loading | 加载中 | 异步操作 |
| Error | 错误 | 校验失败 |
| Success | 成功 | 操作成功 |

---

**版本:** 3.2
**更新日期:** 2026年4月24日
