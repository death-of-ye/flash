/**
 * 武圣3D
 */
var IMAGE = require('./image.js');
var UTILS = require('./utils.js');

const 游戏包名 = "com.game456.wushen3dmvb";
const 游戏名称 = "武圣3D";
var gameId = 561600; //542018;
var auxiliaryId = 24;
var version = 106;
//指定文件路径"./sdcard/脚本/游戏ID/脚本ID/版本ID/config.json";
var filePath = "/sdcard/脚本/" + gameId + "/" + auxiliaryId + "/" + version + "/config.json";

var 是否执行新手任务 = false;
var 是否进行每日祈祷 = false;
var 是否进行经验日常 = false;
var 是否进行材料副本 = false;
var 是否进行打BOSS = false;
var 通用休眠时间 = 1000;

var main = function () {
    //程序初始化数据
    this.init = () => {
        UTILS.log("start");
        this.initEvents();
        sleep(1000);
        this.initData(filePath);
        sleep(1000);
        this.开始运行();
        // this.关闭所有窗口();
    }


    //读取指定位置文件内容配置初始化数据
    this.initData = (path) => {
        if (!files.isFile(path)) {
            UTILS.log("指定配置文件不存在");
        } else {
            var res = files.read(path);
            if (!res) {
                UTILS.log("指定配置文件内容为空");
            } else {
                var res = JSON.parse(res);
                是否执行新手任务 = res.checkbox[0].checked;
                是否进行每日祈祷 = res.checkbox[1].checked;
                是否进行经验日常 = res.checkbox[2].checked;
                是否进行材料副本 = res.checkbox[3].checked;
                是否进行打BOSS = res.checkbox[4].checked;
            }
        }
    }

    //程序初始化
    this.initEvents = () => {
        //检测无障碍模式开启情况
        auto.waitFor();
        //请求截图权限
        if (!requestScreenCapture()) {
            UTILS.log("获取截图权限失败,中断操作");
            exit();
        }
        UTILS.setScreenMetrics();
        sleep(1000);
    }
    //脚本开始运行
    this.开始运行 = () => {
        UTILS.log('脚本开始运行');
        if (是否执行新手任务) {
            this.新手任务入口();
            sleep(通用休眠时间 * 2)
        }
        if (是否进行每日祈祷) {
            this.停止自动攻击();
            this.每日祈祷();
            sleep(通用休眠时间 * 2)
        }
        if (是否进行经验日常) {
            this.经验副本();
            sleep(通用休眠时间 * 2)
        }
        if (是否进行材料副本) {
            this.副本任务入口();
            sleep(通用休眠时间 * 2)
        }
        if (是否进行打BOSS) {
            this.BOSS任务入口();
            sleep(通用休眠时间 * 2)
        }
    }
    // 打BOSS=======================================================================================
    this.BOSS任务入口 = () => {
        UTILS.toastLog('\n   个人BOSS开始!!!!   \n');

        this.个人BOSS开始();
    }
    this.个人BOSS开始 = () => {
        var BOSS副本进入按钮, 挑战界面特征
        if (挑战界面特征 = UTILS.findImage(IMAGE.BOSS界面特征, 0, 0, 0.7)) {
            var 领取按钮
            if (领取按钮 = UTILS.findImage(IMAGE.BOSS领取按钮, 0, 0, 0.7)) {
                UTILS.click(领取按钮.x, 领取按钮.y);
                this.个人BOSS开始();
            }
            sleep(1000);
            this.个人BOSS开始();
        }
        else if (BOSS副本进入按钮 = UTILS.findImage(IMAGE.BOSS副本进入按钮, 0, 1, 0.7)) {
            UTILS.click(BOSS副本进入按钮.x, BOSS副本进入按钮.y, UTILS.deviceHeight * 0.037, -UTILS.deviceHeight * 0.037)
            sleep(通用休眠时间);
            this.个人BOSS开始();
        } else if (UTILS.findImage(IMAGE.BOSS窗口特征, 2, 1, 0.7)) {
            var 个人BOSS界面, 个人BOSS进入, 个人BOSS挑战
            if (个人BOSS界面 = UTILS.findImage(IMAGE.个人BOSS界面特征, 0, 2, 0.7)) {
                if (个人BOSS挑战 = UTILS.findImage(IMAGE.个人BOSS挑战按钮, 0, 3, 0.7)) {
                    UTILS.click(个人BOSS挑战.x, 个人BOSS挑战.y);
                    sleep(700)
                    if (UTILS.findImage(IMAGE.个人BOSS次数不足, 2, 1, 0.7)) {
                        UTILS.toastLog('\n   挑战次数不足,结束!!!   \n');
                        this.关闭所有窗口(true);
                        return
                    } else if (UTILS.findImage(IMAGE.个人BOSS冷却中, 2, 1, 0.7)) {
                        UTILS.toastLog('\n   BOSS挑战完成!!!   \n');
                        this.关闭所有窗口(true);
                        return
                    }
                    sleep(2000);
                }
                this.个人BOSS开始();
            } else if (个人BOSS进入 = UTILS.findImage(IMAGE.个人BOSS进入按钮, 2, 0, 0.7)) {
                UTILS.click(个人BOSS进入.x, 个人BOSS进入.y);
                this.个人BOSS开始();
            } else {
                this.个人BOSS开始();
            }
        }
    }
    // 副本任务=======================================================================================
    this.副本任务入口 = () => {
        UTILS.toastLog('\n   副本任务开始!!!!!!!   \n');
        this.副本任务开始();
    }
    this.副本任务开始 = () => {
        var 副本内特征

        if (副本内特征 = UTILS.findImage(IMAGE.BOSS界面特征, 0, 0, 0.7)) {
            var 领取奖励按钮
            while (true) {
                if (领取奖励按钮 = UTILS.findImage(IMAGE.BOSS领取按钮, 0, 0, 0.7)) {
                    UTILS.click(领取奖励按钮.x, 领取奖励按钮.y);
                    break;
                } else if (UTILS.findImage(IMAGE.主线任务特征, 0, 0, 0.7)) {
                    break;
                }
                sleep(2000)
            }
            this.副本任务开始();
        } else {
            this.进入副本小窗();
            if (UTILS.findImage(IMAGE.材料副本界面特征, 1, 0, 0.7)) {
                var 副本进入按钮, 剩余次数特征
                if ((剩余次数特征 = UTILS.findImage(IMAGE.副本可挑战特征, 2, 1, 0.7)) && !UTILS.findImage(IMAGE.进入副本按钮, 0, 3, 0.7)) {
                    UTILS.click(剩余次数特征.x, 剩余次数特征.y, UTILS.deviceHeight * 0.148);
                    this.副本任务开始();
                } else if (副本进入按钮 = UTILS.findImage(IMAGE.进入副本按钮, 0, 3, 0.7)) {
                    UTILS.click(副本进入按钮.x, 副本进入按钮.y);
                    sleep(1000)
                    if (UTILS.findImage(IMAGE.邮箱按钮, 0, 1, 0.7)) {
                        if (UTILS.findImage(IMAGE.副本道具不足, 1, 2, 0.7)) {
                            UTILS.toastLog('\n   副本道具不足!!!!!!!   \n');
                            return
                        }
                    }
                    sleep(4000);
                    this.副本任务开始()
                } else {
                    UTILS.toastLog('\n   副本任务完成!!!!!!!   \n');
                    return;
                }
            } else {
                this.副本任务开始()
            }
        }
    }
    this.进入副本小窗 = () => {
        var 变强按钮, 我要材料按钮, 材料副本特征
        if (UTILS.findImage(IMAGE.材料副本界面特征, 1, 0, 0.7)) {
            UTILS.log('====材料副本====')
            return;
        } else if (变强按钮 = UTILS.findImage(IMAGE.变强按钮, 0, 0, 0.7)) {
            UTILS.click(变强按钮.x, 变强按钮.y)
            sleep(通用休眠时间);
        } else if (UTILS.findImage(IMAGE.修炼秘典界面特征, 1, 0, 0.7)) {
            if (材料副本特征 = UTILS.findImage(IMAGE.材料副本特征, 0, 0, 0.7)) {
                UTILS.click(材料副本特征.x, 材料副本特征.y, UTILS.deviceHeight * 0.787, UTILS.deviceHeight * 0.055);
                sleep(2000);
                if (UTILS.findImage(IMAGE.材料副本界面特征, 2, 1, 0.7)) {
                    UTILS.log('====材料副本====')
                    return;
                } else {
                    this.进入副本小窗();
                }
            } else if (我要材料按钮 = UTILS.findImage(IMAGE.我要材料按钮, 0, 2, 0.7)) {
                UTILS.click(我要材料按钮.x, 我要材料按钮.y);
                this.进入副本小窗();
            } else {
                this.进入副本小窗();
            }
            sleep(500);
        } else {
            this.关闭所有窗口(true);
            sleep(通用休眠时间);
            this.进入副本小窗();
        }
    }
    this.每日祈祷 = () => {
        var 每日祈祷入口, 免费祈祷按钮
        if (每日祈祷入口 = UTILS.findImage(IMAGE.每日祈祷入口按钮, 0, 1, 0.7)) {
            UTILS.click(每日祈祷入口.x, 每日祈祷入口.y);
            this.每日祈祷();
        } else if (免费祈祷按钮 = UTILS.findImage(IMAGE.免费祈祷按钮, 1, 2, 0.7) || UTILS.findImage(IMAGE.免费祈祷按钮2, 1, 2, 0.7)) {
            UTILS.click(免费祈祷按钮.x, 免费祈祷按钮.y);
            sleep(通用休眠时间)
            if (免费祈祷按钮 = UTILS.findImage(IMAGE.免费祈祷按钮, 1, 2, 0.7))
                UTILS.click(免费祈祷按钮.x, 免费祈祷按钮.y);
            this.关闭所有窗口(true);
            sleep(通用休眠时间)
            UTILS.toastLog('\n   每日祈祷完成   \n');
        } else if (!免费祈祷按钮 && UTILS.findImage(IMAGE.祈祷界面特征, 1, 2, 0.7)) {
            UTILS.toastLog('\n   每日祈祷完成   \n');
            return;
        } else {
            this.关闭所有窗口(true);
            this.每日祈祷();
        }
    }


    // 以下为新手任务=============================================================================================
    this.VIP已领取 = false;
    this.离线挂机已领取 = false;
    this.可以传送 = true;
    this.精英试炼完成 = false;
    this.新手任务入口 = () => {
        if (UTILS.findImage(IMAGE.邮箱按钮, 0, 1, 0.7) || UTILS.findImage(IMAGE.指引箭头左, 2, 1, 0.7)) {
            sleep(5000)
            UTILS.toastLog('\n   新手脚本开始!!!!!!!   \n');
            this.指引箭头点击();
            this.关闭所有窗口();
            sleep(通用休眠时间);
            this.关闭所有窗口();
            this.新手任务开始();
        } else {
            this.关闭所有窗口();
            UTILS.toastLog('  --========--  \n请先进入主页\n  --========--  ')
            sleep(5000);
            this.新手任务入口();
        }
    }
    this.新手任务开始 = () => {

        if (!this.离线挂机已领取) {
            this.离线挂机领取();
        }
        if (!this.VIP已领取) {
            var VIP按钮坐标 = this.领取VIP();
            sleep(通用休眠时间);
            if (VIP按钮坐标) {
                console.log('VIP按钮坐标:', VIP按钮坐标);
                this.领取V15奖励(VIP按钮坐标);
            }
        }
        // this.点击主线任务();
        this.一键传送点击();
        this.BOSS挑战任务();
        this.综合检测();
        if (this.连接已断开) {
            alert('游戏断开连接\n请用户自行处理后,重新运行脚本');
            exit();
        }
        this.精英试炼开始();
        this.关闭所有窗口();
        var 移动结果 = this.是否移动();
        if (移动结果 != '没有结果') {
            if (移动结果 == false && UTILS.findImage(IMAGE.自动攻击按钮, 2, 2, 0.7)) {
                var 退出新手任务 = this.点击主线任务();
                if (退出新手任务) {
                    UTILS.toastLog('\n   等级80 新手任务结束!   \n');

                    return;
                }
            }
        }

        this.新手任务开始();
    }
    this.连接已断开 = false;
    this.上次检测时间 = new Date();
    this.综合检测 = () => {
        // 每10秒检测一次
        if (new Date() - this.上次检测时间 > 10000) {
            var res = this.指引箭头点击();
            if (res) {
                sleep(通用休眠时间);
                this.综合检测();
                return;
            }
            // if ()
            // this.可以传送 = false;
            this.可以传送 = true;
            // 
            if (UTILS.findImage(IMAGE.连接已断开, 2, 1, 0.7)) {
                this.连接已断开 = true;
            } else {
                this.连接已断开 = false;
            }
            this.上次检测时间 = new Date();
        }
    }
    this.精英试炼开始 = () => {
        UTILS.log('====一次性--精英试炼开始====')
        if (!this.精英试炼完成) {
            var 精英试炼按钮;
            if (精英试炼按钮 = UTILS.findImage(IMAGE.精英试炼挑战按钮, 2, 1, 0.7)) {
                UTILS.click(精英试炼按钮.x, 精英试炼按钮.y);
                this.精英试炼完成 = true
            }
        }
        UTILS.log('====一次性--精英试炼结束====')
    }

    this.BOSS挑战任务 = () => {
        var BOSS挑战界面, 领取按钮;
        if (BOSS挑战界面 = UTILS.findImage(IMAGE.BOSS界面特征, 0, 0, 0.7)) {
            if (领取按钮 = UTILS.findImage(IMAGE.BOSS领取按钮, 0, 0, 0.7)) {
                UTILS.toastLog('BOSS挑战完成');
                UTILS.click(领取按钮.x, 领取按钮.y);
                sleep(通用休眠时间)
            } else {
                this.BOSS挑战任务();
            }
        }
    }
    this.领取V15奖励 = (VIP按钮) => {
        // 给VIP按钮坐标，无需查图
        UTILS.log('====0-1-领取特权奖励开始====')
        var VIP界面特征, 特权可领取特征, 领取按钮
        if (VIP按钮 = UTILS.findImage(IMAGE.VIP按钮, 0, 0, 0.7), VIP按钮) {
            UTILS.log('  ╚找到了VIP进入按钮')
            UTILS.click(VIP按钮.x, VIP按钮.y);
            this.领取V15奖励();
        } else if (VIP界面特征 = UTILS.findImage(IMAGE.VIP界面特征, 0, 1, 0.7)) {
            UTILS.log('  ╚当前在VIP界面内')
            if (特权可领取特征 = UTILS.findImage(IMAGE.特权奖励可领取特征, 1, 1, 0.7)) {
                UTILS.toastLog('    ╚特权可以领取,开始领取');
                领取按钮 = { x: VIP界面特征.x, y: VIP界面特征.y + UTILS.deviceHeight * 0.574 }
                for (var i = 0; i < 16; i++) {
                    UTILS.click(领取按钮.x, 领取按钮.y)
                    sleep(600);
                }
            } else {
                UTILS.log('    ╚没有奖励可领取,退出');
                this.关闭所有窗口();
                return;
            }
        } else {
            this.关闭所有窗口();
            this.领取V15奖励();
        }
        UTILS.log('====0-1-领取特权奖励结束====')
    }
    this.装备分解 = (是主线任务) => {
        是主线任务 = 是主线任务 || false
        var 背包按钮, 背包界面特征, VIP按钮
        if (!是主线任务) {
            var 主页判断 = UTILS.findImage(IMAGE.邮箱按钮, 0, 1, 0.7);
        }
        if (!是主线任务 && 主页判断 && (背包按钮 = UTILS.findImage(IMAGE.背包按钮, 1, 2, 0.7))) {
            this.停止自动攻击();
            this.关闭所有窗口(true);
            UTILS.click(背包按钮.x, 背包按钮.y);
            this.装备分解(true);
        } else if (!是主线任务 && 主页判断 && !背包按钮) {
            if (VIP按钮 = this.VIP按钮 || UTILS.findImage(IMAGE.VIP按钮, 0, 0, 0.7)) {
                this.VIP按钮 = this.VIP按钮 || VIP按钮;
                UTILS.click(VIP按钮.x, VIP按钮.y, UTILS.deviceHeight * 0.0648, -UTILS.deviceHeight * 0.074);
                this.装备分解();
            }
        } else if (背包界面特征 = UTILS.findImage(IMAGE.背包界面特征, 2, 1, 0.7)) {
            var 分解按钮;
            if (分解按钮 = UTILS.findImage(IMAGE.装备分解按钮, 0, 2, 0.7)) {
                UTILS.click(分解按钮.x, 分解按钮.y);
            }
            sleep(通用休眠时间);
            if (分解按钮 = UTILS.findImage(IMAGE.装备分解按钮, 0, 3, 0.7)) {
                press(分解按钮.x + 5, 分解按钮.y + 5, 50);
                sleep(通用休眠时间);
                press(分解按钮.x + 5, 分解按钮.y + 5, 50);
            }
            this.关闭所有窗口(true);

        }
    }
    this.停止自动攻击 = () => {
        sleep(500);
        // 点击两次停止自动攻击
        this.关闭所有窗口(true);

        UTILS.click(UTILS.deviceWidth / 2, UTILS.deviceHeight / 2, 0, UTILS.deviceHeight * 0.1);
        UTILS.click(UTILS.deviceWidth / 2, UTILS.deviceHeight / 2, 0, UTILS.deviceHeight * 0.1);
        UTILS.click(UTILS.deviceWidth / 2, UTILS.deviceHeight / 2, 0, UTILS.deviceHeight * 0.1);
        sleep(通用休眠时间)
    }
    this.VIP按钮 = null;
    this.邮箱按钮 = null;
    this.领取VIP = () => {
        UTILS.toastLog('====0-领取VIP开始====')
        var 一键领取按钮, VIP15特征;
        this.关闭所有窗口(true);
        this.停止自动攻击();
        if (VIP按钮 = (this.VIP按钮 || UTILS.findImage(IMAGE.VIP按钮, 0, 0, 0.7))) {
            this.VIP按钮 = VIP按钮;
            if (VIP15特征 = UTILS.customAreaFindImageNoClick(IMAGE.VIP15特征, VIP按钮.x, VIP按钮.y - UTILS.deviceHeight * 0.009, UTILS.deviceWidth * 0.11, UTILS.deviceHeight * 0.03, 0, 0, 0.7)) {
                UTILS.toastLog('  ╚已是VIP15')
                console.log('特征:', VIP15特征)
                this.VIP已领取 = true;
                return VIP按钮;
            } else if (邮箱按钮 = UTILS.findImage(IMAGE.邮箱按钮, 0, 1, 0.7)) {
                this.邮箱按钮 = this.邮箱按钮 || 邮箱按钮
                UTILS.click(this.邮箱按钮.x, this.邮箱按钮.y);
                sleep(通用休眠时间);
                if (UTILS.findImage(IMAGE.邮箱界面特征, 2, 1, 0.7)) {
                    if (一键领取按钮 = UTILS.findImage(IMAGE.一键领取按钮, 1, 2, 0.7)) {
                        UTILS.click(一键领取按钮.x, 一键领取按钮.y);
                        this.VIP已领取 = true;
                    }
                    sleep(通用休眠时间);
                    this.关闭所有窗口();
                    return VIP按钮;
                }
            }
        }
        UTILS.log('====0-领取VIP结束====')
    }
    this.离线挂机领取 = () => {
        UTILS.log('====4-离线挂机领取开始====')
        var 离线挂机界面, 离线挂机领取按钮, 提示框, 提示框确定按钮;
        if (离线挂机界面 = UTILS.findImage(IMAGE.离线挂机界面特征, 2, 1, 0.7)) {
            if (提示框 = UTILS.findImage(IMAGE.提示框特征, 2, 1, 0.7)) {
                if (提示框确定按钮 = UTILS.findImage(IMAGE.提示框确定按钮, 0, 3, 0.7)) {
                    UTILS.click(提示框确定按钮.x, 提示框确定按钮.y)
                    this.离线挂机已领取 = true;
                    this.关闭所有窗口(true);
                }
            } else if (离线挂机领取按钮 = UTILS.findImage(IMAGE.离线挂机领取按钮, 0, 3, 0.7)) {
                UTILS.click(离线挂机领取按钮.x, 离线挂机领取按钮.y);
                this.离线挂机领取();
            }
        } else if (UTILS.findImage(IMAGE.邮箱按钮, 0, 1, 0.7)) {
            // 在主页且没有离线挂机界面
            this.离线挂机已领取 = true;
        }
        UTILS.log('====4-离线挂机领取结束====')

    }
    this.点击主线任务 = () => {
        UTILS.log('====3-主线任务开始====')
        var 主线任务, 未完成任务特征;
        if (主线任务 = UTILS.findImage(IMAGE.主线任务特征, 0, 0, 0.7)) {
            if (未完成任务特征 = UTILS.customAreaFindImageNoClick(IMAGE.无尽炼狱任务, 主线任务.x, 主线任务.y - UTILS.deviceHeight * 0.009, UTILS.deviceHeight * 0.277, UTILS.deviceHeight * 0.037, 0.7)) {
                UTILS.log('无尽炼狱任务(85级)');
                return true
            }
            if (未完成任务特征 = UTILS.customAreaFindImageNoClick(IMAGE.未完成任务特征, 主线任务.x + UTILS.deviceHeight * 0.27, 主线任务.y - UTILS.deviceHeight * 0.009, UTILS.deviceHeight * 0.12, UTILS.deviceHeight * 0.037, 0.7)) {
                UTILS.toastLog('  ╚点击了未完成任务')
                UTILS.click(未完成任务特征.x, 未完成任务特征.y);
                sleep(500)
                this.一键传送点击();
            } else {
                UTILS.toastLog('  ╚点击了已完成任务')
                UTILS.click(主线任务.x + UTILS.deviceHeight * 0.27, 主线任务.y);
                this.一键传送点击();
            }
            return false
        }
        UTILS.log('====3-主线任务结束====')
    }
    /**
     * 传送要求20级 传送特戒后开启
     */
    this.一键传送点击 = () => {
        var 一键传送按钮;
        if (this.可以传送) {
            if (一键传送按钮 = UTILS.findImage(IMAGE.传送鞋子按钮, 1, 2, 0.6)) {
                UTILS.log('  ╚点击了传送')
                UTILS.click(一键传送按钮.x, 一键传送按钮.y, UTILS.deviceHeight * 0.0092, UTILS.deviceHeight * 0.01);
            }
        }
    }
    this.经验副本 = (是经验任务) => {
        是经验任务 = 是经验任务 || false
        var 经验副本界面特征, 任务栏除魔特征;
        // var 变强按钮, 我要经验按钮
        // 修炼秘典界面
        this.指引箭头点击();
        this.一键传送点击()
        if (任务栏除魔特征 = UTILS.findImage(IMAGE.任务栏除魔任务, 0, 0, 0.7)) {
            UTILS.click(任务栏除魔特征.x, 任务栏除魔特征.y)
            sleep(2000);
            this.经验副本(是经验任务)
            // } else if (!任务栏除魔特征 && UTILS.findImage(IMAGE.邮箱按钮, 0, 1, 0.7)) {
            //     UTILS.toastLog('===经验副本完成===');
            //     return;
        } else if (UTILS.findImage(IMAGE.修炼秘典界面特征, 1, 0, 0.7)) {
            UTILS.log('====经验副本-1====')
            var 日常任务位置特征
            if (日常任务位置特征 = UTILS.findImage(IMAGE.日常任务位置, 0, 0, 0.7)) {
                UTILS.log('====经验副本-进入====')
                UTILS.click(日常任务位置特征.x, 日常任务位置特征.y, UTILS.deviceHeight * 0.787, UTILS.deviceHeight * 0.055);
                sleep(通用休眠时间);
            }
            this.经验副本();
            // 经验副本弹窗
        } else if (经验副本界面特征 = UTILS.findImage(IMAGE.经验副本界面特征, 0, 0, 0.7)) {
            UTILS.log('====经验副本-2====')
            var 经验副本满星
            if (UTILS.findImage(IMAGE.经验副本收费特征, 0, 3, 0.7)) {
                UTILS.toastLog('===经验副本完成===');
                this.关闭所有窗口(true);
                return;
            } else if (经验副本满星 = UTILS.findImage(IMAGE.经验副本满星特征, 1, 1, 0.7)) {
                UTILS.click(经验副本满星.x, 经验副本满星.y, 0, UTILS.deviceHeight * 0.2);
                this.经验副本(是经验任务);
            } else {
                UTILS.click(经验副本界面特征.x, 经验副本界面特征.y, UTILS.deviceHeight * 0.714, UTILS.deviceHeight * 0.21);
                sleep(500);
                this.经验副本(是经验任务);
            }
        } else if (是经验任务 && !任务栏除魔特征 && UTILS.findImage(IMAGE.邮箱按钮, 0, 1, 0.7)) {
            UTILS.toastLog('===经验副本完成===');
            this.关闭所有窗口(true);
            return;
        } else if ((变强按钮 = UTILS.findImage(IMAGE.变强按钮, 0, 0, 0.7)) && !UTILS.findImage(IMAGE.经验副本内特征3, 2, 1, 0.7) && !UTILS.findImage(IMAGE.经验副本内特征, 2, 1, 0.7) && !UTILS.findImageAndClickFullScreen(IMAGE.经验副本内特征2, 2, 1, 0.7)) {
            UTILS.log('====经验副本-3====')
            UTILS.click(变强按钮.x, 变强按钮.y)
            sleep(通用休眠时间);
            if (UTILS.findImage(IMAGE.修炼秘典界面特征, 1, 0, 0.7)) {
                if (我要经验按钮 = UTILS.findImage(IMAGE.我要经验按钮, 0, 0, 0.7)) {
                    UTILS.click(我要经验按钮.x, 我要经验按钮.y);
                    this.经验副本(是经验任务);
                }
            } else {
                this.经验副本(是经验任务);
            }
            sleep(500);
        } else {
            this.关闭所有窗口();
            this.经验副本(是经验任务);
        }
    }
    this.关闭所有窗口 = (不判断界面) => {
        不判断界面 = 不判断界面 || false
        UTILS.log('  ╠基础 - 关闭所有窗口开始')
        var 关闭按钮, 立即装备按钮;
        var 关闭按钮小, 称号使用按钮, i = 0, 提示框确定按钮;
        while (true) {
            i++;
            if (i > 4) {
                this.指引箭头点击();
            }
            if (UTILS.findImage(IMAGE.提示框特征, 2, 1, 0.6)) {
                if (提示框确定按钮 = UTILS.findImage(IMAGE.提示框确定按钮, 0, 3, 0.6)) {
                    UTILS.click(提示框确定按钮.x, 提示框确定按钮.y);
                }
            } else if (关闭按钮 = (UTILS.findImage(IMAGE.关闭按钮2, 0, 1, 0.5) || UTILS.findImage(IMAGE.关闭按钮, 0, 1, 0.6))) {
                if (!不判断界面) {
                    sleep(600);
                    if (立即装备按钮 = UTILS.customAreaFindImageNoClick(IMAGE.立即装备按钮, 关闭按钮.x - UTILS.deviceHeight * 0.24, 关闭按钮.y, UTILS.deviceHeight * 0.4, UTILS.deviceHeight * 0.6, 0, 0, 0.6)) {
                        UTILS.log('    ╚立即装备')
                        UTILS.click(立即装备按钮.x, 立即装备按钮.y, UTILS.deviceHeight * 0.009, UTILS.deviceHeight * 0.009)
                        sleep(600);
                        continue
                    } else if (!UTILS.findImage(IMAGE.邮箱按钮, 0, 1, 0.7) && (UTILS.findColorNoClick('#4DCB1C', [], [关闭按钮.x - UTILS.deviceHeight * 1, 关闭按钮.y, UTILS.deviceHeight * 0.18, UTILS.deviceHeight * 0.07], 6) || UTILS.findColorNoClick('#E8CD00', [], [关闭按钮.x - UTILS.deviceHeight * 1, 关闭按钮.y, UTILS.deviceHeight * 0.18, UTILS.deviceHeight * 0.07], 8))) {
                        UTILS.log('    ╚任务弹窗')
                        press(关闭按钮.x - UTILS.deviceHeight * 0.074, 关闭按钮.y + UTILS.deviceHeight * 0.416, 10)
                        press(关闭按钮.x - UTILS.deviceHeight * 0.277, 关闭按钮.y + UTILS.deviceHeight * 0.287, 10)
                        press(关闭按钮.x - UTILS.deviceHeight * 0.074, 关闭按钮.y + UTILS.deviceHeight * 0.37, 10)
                        sleep(600);
                        continue
                    } else if (UTILS.findImage(IMAGE.背包界面特征, 2, 1, 0.7)) {
                        UTILS.toastLog('    ╚装备分解任务')
                        this.装备分解(true);
                        sleep(600);
                        continue
                    } else if (UTILS.findImage(IMAGE.修炼秘典界面特征, 2, 1, 0.7)) {
                        UTILS.toastLog('    ╚经验副本任务')
                        this.经验副本(true);
                        UTILS.log('====经验副本-结束====')
                        sleep(600);
                        continue

                    } else {
                        if (称号使用按钮 = UTILS.findImage(IMAGE.称号使用按钮, 2, 1, 0.7)) {
                            UTILS.log('    ╚使用称号')
                            UTILS.click(称号使用按钮.x, 称号使用按钮.y);
                            sleep(600);
                        } else {
                            UTILS.log('    ╚关闭未知窗--大关闭按钮')
                            if (关闭按钮 = (UTILS.findImage(IMAGE.关闭按钮2, 0, 1, 0.6) || UTILS.findImage(IMAGE.关闭按钮, 0, 1, 0.6))) {
                                UTILS.click(关闭按钮.x, 关闭按钮.y, UTILS.deviceHeight * 0.009);
                            }
                            continue
                        }
                    }
                } else {

                    UTILS.log('    ╚关闭未知窗--大关闭按钮(不判断界面)')
                    UTILS.click(关闭按钮.x, 关闭按钮.y, UTILS.deviceHeight * 0.009);
                }
                sleep(500);
            } else if (关闭按钮小 = UTILS.findImage(IMAGE.关闭按钮小, 0, 1, 0.65)) {
                if (称号使用按钮 = UTILS.findImage(IMAGE.称号使用按钮, 2, 1, 0.7)) {
                    UTILS.log('    ╚使用称号')
                    UTILS.click(称号使用按钮.x, 称号使用按钮.y);
                } else {
                    UTILS.click(关闭按钮小.x, 关闭按钮小.y);
                    UTILS.log('    ╚关闭未知窗--小关闭按钮')
                }
                sleep(500);
            } else {
                break;
            }

        }
        UTILS.log('  ╚基础 - 关闭所有窗口结束')
    }

    this.指引箭头点击 = () => {
        var 指引箭头
        UTILS.log('====2-指引箭头查找====')
        if (指引箭头 = UTILS.findImageFullScreen(IMAGE.指引箭头左, 0.7)) {
            UTILS.log('左指引点击')
            UTILS.click(指引箭头.x, 指引箭头.y, UTILS.deviceHeight * 0.138, 0);
            return true
        } else if (指引箭头 = UTILS.findImageFullScreen(IMAGE.指引箭头右, 0.7)) {
            UTILS.log('右指引点击' + (指引箭头.x - UTILS.deviceHeight * 0.138) + ":" + 指引箭头.y)
            UTILS.click(指引箭头.x, 指引箭头.y, -UTILS.deviceHeight * 0.1, 0);
            return true
        }
        UTILS.log('====2-指引箭头结束====')
        return false;
    }
    this.移动颜色列表 = [];
    this.是否移动 = () => {
        var 截屏 = captureScreen();
        if (this.移动颜色列表.length == 0) {
            var 颜色检测列表 = [
                { x: UTILS.deviceHeight * 0.55, y: UTILS.deviceHeight * 0.37 },
                { x: UTILS.deviceHeight * 1, y: UTILS.deviceHeight * 0.51 },
                { x: UTILS.deviceWidth - UTILS.deviceHeight * 0.185, y: UTILS.deviceHeight * 0.22 },
                { x: UTILS.deviceHeight * 0.55, y: UTILS.deviceHeight - UTILS.deviceHeight * 0.26 },
                { x: UTILS.deviceWidth - UTILS.deviceHeight * 0.620, y: UTILS.deviceHeight - UTILS.deviceHeight * 0.213 }
            ];
            for (var i = 0; i < 颜色检测列表.length; i++) {
                var color = this.取坐标颜色值(截屏, 颜色检测列表[i]);
                this.移动颜色列表.push({ p: 颜色检测列表[i], c: color });
            }
            UTILS.log('-=-=移动检测一次,第二次执行返回=-=-')
            return '没有结果';
        } else {
            var 颜色比较结果 = []
            console.log(this.移动颜色列表)
            for (var i = 0; i < this.移动颜色列表.length; i++) {
                // console.log(this.移动颜色列表[i].p, this.移动颜色列表[i].c)
                var 返回值 = colors.equals(this.取坐标颜色值(截屏, this.移动颜色列表[i].p), this.移动颜色列表[i].c)
                this.移动颜色列表[i] = { p: this.移动颜色列表[i].p, c: this.取坐标颜色值(截屏, this.移动颜色列表[i].p) };
                颜色比较结果.push(返回值);
            }
            var 颜色比较结果2 = 颜色比较结果.reduce((prev, elem) => {
                if (!prev[elem]) {
                    prev[elem] = 1
                } else {
                    prev[elem]++;
                }
                return prev;
            }, {})
            颜色比较结果2.false = 颜色比较结果2.false || 0
            颜色比较结果2.true = 颜色比较结果2.true || 0
            console.log(this.移动颜色列表)
            console.log(颜色比较结果2)
            if (颜色比较结果2['true'] >= 颜色比较结果2['false']) {
                UTILS.log('-=-=移动检测:没有移动=-=-')
                return false
            } else {
                UTILS.log('-=-=移动检测:正在移动=-=-')
                return true
            }

        }


    }
    this.取坐标颜色值 = (图片, 坐标) => {
        图片 = 图片 || captureScreen()
        if (坐标) {
            return colors.toString(images.pixel(图片, 坐标.x, 坐标.y));
        } else {
            return '#00000000'
        }
    }



}
var game = new main();
game.init();