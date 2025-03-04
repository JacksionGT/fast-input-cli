# fast-cli

一个命令行工具，可以在cmd中运行。

## 安装

```sh
npm install -g .
```

## 使用

### 切换到上一个窗口并键入当前时间

```sh
fast time
```

### 切换到上一个窗口并键入一个生成的GUID

```sh
fast uuid
```

### VBS 脚本示例

在 `scripts` 目录下提供了一个 VBS 脚本示例，用于打开记事本并输入文本：

```sh
cscript scripts/typeText.vbs
```

### VBS 脚本版本的 fast time

使用 VBS 脚本实现切换到上一个窗口并输入当前时间：

```sh
cscript scripts/fastTime.vbs
```
