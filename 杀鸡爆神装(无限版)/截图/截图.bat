@echo off&setlocal EnableDelayedExpansion
adb shell /system/bin/screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png %cd%/

