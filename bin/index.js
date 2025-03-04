#!/usr/bin/env node

const { v4: uuidv4 } = require('uuid');
const clipboardy = require('clipboardy');
const inquirer = require('inquirer');

const args = process.argv.slice(2);

const menuChoices = [
    {
        name: '输入当前时间 (time)',
        value: 'time'
    },
    {
        name: '输入UUID (uuid)',
        value: 'uuid'
    },
    {
        name: '退出',
        value: 'exit'
    }
];

async function showMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: '请选择要执行的功能：',
            choices: menuChoices
        }
    ]);

    if (action === 'exit') {
        process.exit(0);
    }

    return action;
}

function getChineseTime() {
    return new Date().toLocaleString('zh').replaceAll('/', '-');
}

function copyToClipboard(text) {
    clipboardy.writeSync(text);
    console.log(`已复制到剪贴板: ${text}`);
}

function handleTime() {
    const currentTime = getChineseTime();
    copyToClipboard(currentTime);
}

function handleUuid() {
    const uuid = uuidv4();
    copyToClipboard(uuid);
}

function showHelp() {
    console.log(`
使用方法: fast [命令]

命令:
    time         复制当前时间到剪贴板
    uuid         生成并复制UUID到剪贴板
    --help, -h   显示帮助信息

示例:
    $ fast time
    $ fast uuid
    $ fast       # 显示交互式菜单
    `);
}

async function main() {
    let command = args[0];

    if (command === '--help' || command === '-h') {
        showHelp();
        process.exit(0);
    }

    if (!command) {
        command = await showMenu();
    }

    if (command === 'time') {
        handleTime();
    } else if (command === 'uuid') {
        handleUuid();
    } else if (command === 'exit') {
        process.exit(0);
    } else {
        console.log(`错误: 未知命令 "${command}"\n`);
        showHelp();
        process.exit(1);
    }
}

main().catch(console.error);
