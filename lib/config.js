const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const CONFIG_DIR = path.join(os.homedir(), '.fast-cli');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');

const defaultConfig = {
    timeFormat: 'YYYY-MM-DD HH:mm:ss'
};

function ensureConfigDir() {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
}

function loadConfig() {
    ensureConfigDir();
    if (!fs.existsSync(CONFIG_PATH)) {
        saveConfig(defaultConfig);
        return defaultConfig;
    }
    try {
        return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    } catch (error) {
        console.error('配置文件损坏，将重置为默认配置');
        saveConfig(defaultConfig);
        return defaultConfig;
    }
}

function saveConfig(config) {
    ensureConfigDir();
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function showConfig() {
    const config = loadConfig();
    console.log('当前配置：');
    console.log(JSON.stringify(config, null, 2));
}

function getEditor() {
    return process.env.EDITOR || process.env.VISUAL || (process.platform === 'win32' ? 'notepad' : 'vi');
}

function editConfig() {
    ensureConfigDir();
    if (!fs.existsSync(CONFIG_PATH)) {
        saveConfig(defaultConfig);
    }
    
    const editor = getEditor();
    const child = spawn(editor, [CONFIG_PATH], {
        stdio: 'inherit',
        shell: process.platform === 'win32'
    });

    return new Promise((resolve, reject) => {
        child.on('exit', code => {
            if (code === 0) {
                console.log('配置文件已更新');
                resolve();
            } else {
                reject(new Error(`编辑器退出，代码: ${code}`));
            }
        });
    });
}

module.exports = {
    loadConfig,
    saveConfig,
    showConfig,
    editConfig,
    CONFIG_PATH
};
