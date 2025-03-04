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

async function main() {
    let command = args[0];

    if (!command) {
        command = await showMenu();
    }

    if (command === 'time') {
        handleTime();
    } else if (command === 'uuid') {
        handleUuid();
    } else if (command !== 'exit') {
        console.log(`未知命令: ${command}`);
        process.exit(1);
    }
}

main().catch(console.error);
