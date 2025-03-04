# fast-input-cli

一个简单的命令行工具，用于快速复制常用文本到剪贴板。

## 功能特点

- 生成并复制当前时间
- 生成并复制UUID
- 交互式菜单
- 命令行参数支持

## 安装

```bash
# 全局安装
npm install -g @jacksion/fast-input-cli

# 或本地安装
npm install @jacksion/fast-input-cli
```

## 使用方法

### 命令行方式

```bash
# 复制当前时间
fast time

# 生成并复制UUID
fast uuid

# 显示帮助信息
fast --help
```

### 交互式菜单

直接运行 `fast` 命令，将显示交互式菜单：

```bash
fast
```

然后使用上下键选择需要的功能，按回车确认。

## 命令说明

- `time`: 复制当前时间到剪贴板，格式为 "YYYY-MM-DD HH:mm:ss"
- `uuid`: 生成一个新的UUID并复制到剪贴板
- `--help`, `-h`: 显示帮助信息

## 开发相关

### 本地测试

```bash
# 克隆代码后安装依赖
npm install

# 运行开发测试
npm run dev
```

## 许可证

ISC
