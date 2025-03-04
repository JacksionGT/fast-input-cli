Set WshShell = CreateObject("WScript.Shell")

CurrentTime = "2025-3-4 15:38:51"   ' 这个值会被 Node.js 程序动态替换

WshShell.SendKeys "%{TAB}"  ' 切换到下一个窗口
WScript.Sleep 200           ' 等待窗口切换完成
WshShell.SendKeys CurrentTime

Set WshShell = Nothing
