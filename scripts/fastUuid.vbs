Set WshShell = CreateObject("WScript.Shell")

UUID = "3a48b0e1-ef0c-45e0-987a-69a74fa0e66b"   ' 这个值会被 Node.js 程序动态替换

WshShell.SendKeys "%{TAB}"  ' 切换到下一个窗口
WScript.Sleep 200           ' 等待窗口切换完成
WshShell.SendKeys UUID

Set WshShell = Nothing
