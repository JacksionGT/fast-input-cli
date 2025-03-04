#!/usr/bin/env node

const { v4: uuidv4 } = require('uuid');
const robot = require('robotjs');
const { exec } = require('child_process');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

// 定义菜单选项
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

function runScript(scriptName, replacements) {
    const scriptPath = path.join(__dirname, '..', 'scripts', scriptName);
    
    // 读取并更新 VBS 文件内容
    let content = fs.readFileSync(scriptPath, 'utf8');
    for (const [key, value] of Object.entries(replacements)) {
        content = content.replace(new RegExp(`${key} = ".*"`, 'g'), `${key} = "${value}"`);
    }
    fs.writeFileSync(scriptPath, content, 'utf8');

    // 执行 VBS 脚本
    exec(`cscript //nologo "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行出错: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`脚本错误: ${stderr}`);
        }
    });
}

function runTimeScript() {
    const currentTime = getChineseTime();
    runScript('fastTime.vbs', { CurrentTime: currentTime });
}

function runUuidScript() {
    const uuid = uuidv4();
    runScript('fastUuid.vbs', { UUID: uuid });
}

async function main() {
    let command = args[0];

    if (!command) {
        command = await showMenu();
    }

    if (command === 'time') {
        runTimeScript();
    } else if (command === 'uuid') {
        runUuidScript();
    } else if (command !== 'exit') {
        console.log(`Unknown command: ${command}`);
        process.exit(1);
    }
}

main().catch(console.error);
