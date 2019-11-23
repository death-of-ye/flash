/**
 * 霸刀传奇无限版
 */
var IMAGE = require('./image.js');
var UTILS = require('./utils.js');

const 游戏包名 = "com.game456.bdcqbt";
const 游戏名称 = "霸刀无限版";
var gameId = 556226; //542018;
var auxiliaryId = 19;
var version = 102;
//指定文件路径"./sdcard/脚本/游戏ID/脚本ID/版本ID/config.json";
var filePath = "/sdcard/脚本/" + gameId + "/" + auxiliaryId + "/" + version + "/config.json";

var 是否执行新手任务 = false;
var 是否打BOSS任务 = false;
var 是否打副本任务 = false;
var 是否打竞技任务 = false;

var 通用休眠时间 = 1000;
var 战力提升时间 = new Date();
var main = function () {
    this.init = () => {
        UTILS.log("start");
        this.initEvents();
        sleep(2000);
        this.initData(filePath);
        sleep(3000)
        if (UTILS.checkCurrentPackage(游戏包名)) {
            this.开始运行();
        } else {
            UTILS.toastLog('请先运行游戏!')
            return;
        }
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
                var res = JSON.parse(res)
                是否执行新手任务 = res.checkbox[0].checked;
                是否打BOSS任务 = res.checkbox[1].checked;
                是否打副本任务 = res.checkbox[2].checked;
                是否打竞技任务 = res.checkbox[3].checked;
                log(是否执行新手任务)
                log(是否打BOSS任务)
                log(是否打副本任务)
                log(是否打竞技任务)
            }
        }
    }
    this.initEvents = () => {
        //检测无障碍模式开启情况
        auto.waitFor();
        //请求截图权限
        if (!requestScreenCapture(false)) {
            UTILS.toastLog("获取截图权限失败,中断操作");
            exit();
        }
        UTILS.setScreenMetrics();
        sleep(通用休眠时间);
    }
    this.开始运行 = () => {
        var 角色按钮 = UTILS.findImage(IMAGE.角色按钮, 0, 2, 0.8);
        if (是否执行新手任务 == false && 是否打BOSS任务 == false && 是否打副本任务 == false && 是否打竞技任务 == false) {
            UTILS.toastLog('什么都不做,你打开我干啥?')
        } else if (角色按钮) {
            this.回到主页();
            if (是否执行新手任务) {
                var 副本标识 = UTILS.findImage(IMAGE.副本任务进入按钮, 2, 2, 0.8);
                if (!副本标识) {
                    sleep(通用休眠时间);
                    副本标识 = UTILS.findImage(IMAGE.副本任务进入按钮, 2, 2, 0.8);
                }
                if (!副本标识) {
                    this.新手任务入口();
                    是否执行新手任务 = false;
                } else {
                    UTILS.click(副本标识.x, 副本标识.y);
                    sleep(通用休眠时间);
                    var 通天塔按钮 = UTILS.findImage(IMAGE.通天塔进入按钮, 1, 2, 0.7);
                    if (通天塔按钮) {
                        UTILS.click(通天塔按钮.x, 通天塔按钮.y);
                        sleep(通用休眠时间);
                        var 结束标识 = UTILS.findImage(IMAGE.通天塔界面特征, 2, 2, 0.7);
                        if (结束标识) {
                            UTILS.toastLog('你已经度过新手期了!!!')
                            是否执行新手任务 = false;
                            this.新手脚本结束 = true;
                            this.回到主页();
                        } else {
                            this.新手任务入口();
                            是否执行新手任务 = false;
                        }
                    } else {
                        UTILS.log('没找到通天塔按钮');
                    }
                }
            }
            if (是否打BOSS任务) {
                this.入口点击次数 = 0;
                this.BOSS任务入口();
                是否打BOSS任务 = false
            }
            if (是否打副本任务) {
                this.入口点击次数 = 0;
                this.副本任务入口();
                是否打副本任务 = false
            }
            if (是否打竞技任务) {
                this.入口点击次数 = 0;
                this.竞技任务入口();
                是否打竞技任务 = false
            }
            if (是否执行新手任务 == false && 是否打BOSS任务 == false && 是否打副本任务 == false && 是否打竞技任务 == false) {
                this.无限关卡入口();
            }
        } else {
            UTILS.toastLog('请进入游戏主界面');
            sleep(5000);
            this.开始运行();
        }

    }
    this.无限关卡入口 = () => {
        if (this.自动合击已开启 == false) {
            this.开启自动释放合击();
        }
        this.定时装备熔炼();
        战力提升时间 = new Date();
        UTILS.toastLog('关卡自动战斗开始');
        this.定时提升战力(true);
    }

    this.自动合击已开启 = false;
    // 任何日常任务点击三次都表示等级不足无法进入
    this.入口点击次数 = 0;
    this.竞技任务入口 = () => {
        UTILS.toastLog('3-开始竞技任务');
        if (this.自动合击已开启 == false) {
            this.开启自动释放合击();
        }
        this.回到主页();
        var 竞技任务进入按钮 = UTILS.findImage(IMAGE.竞技进入按钮, 2, 2, 0.8);
        if (竞技任务进入按钮) {
            this.王者争霸开始();
        } else {
            UTILS.toastLog('暂未开启竞技模式.任务结束!');
        }
    }
    this.王者争霸开始 = () => {
        this.背包空间熔炼();
        var 竞技任务进入按钮 = UTILS.findImage(IMAGE.竞技进入按钮, 2, 2, 0.9);
        var 王者争霸进入按钮 = UTILS.findImage(IMAGE.王者争霸进入按钮, 1, 2, 0.8);
        var 王者争霸界面特征 = UTILS.findImage(IMAGE.王者争霸界面特征, 0, 0, 0.8);
        if (竞技任务进入按钮) {
            UTILS.click(竞技任务进入按钮.x, 竞技任务进入按钮.y);
            sleep(500);
            this.王者争霸开始();
        } else if (王者争霸进入按钮 && !王者争霸界面特征) {
            UTILS.click(王者争霸进入按钮.x, 王者争霸进入按钮.y);
            this.入口点击次数++;
            if (this.入口点击次数 >= 3) {
                UTILS.toastLog('未开启王者争霸模式.任务结束!')
                return;
            } else {
                this.王者争霸开始();
            }
        } else if (王者争霸界面特征) {
            this.入口点击次数 = 0;
            var 匹配对手按钮 = UTILS.findImage(IMAGE.王者争霸匹配按钮, 1, 2, 0.8);
            var 剩余次数不足 = UTILS.findImage(IMAGE.王者争霸剩余次数不足, 0, 2, 0.8);
            if (剩余次数不足) {
                UTILS.toastLog('王者争霸次数不足,任务结束!');
                this.回到主页();
                return;
            } else if (匹配对手按钮) {
                UTILS.click(匹配对手按钮.x, 匹配对手按钮.y);
                sleep(5000);
                this.王者争霸开始();
            }
        } else {
            sleep(通用休眠时间);
            this.王者争霸开始();
        }
    }
    this.副本任务入口 = () => {
        UTILS.toastLog('2-开始副本任务');
        if (this.自动合击已开启 == false) {
            this.开启自动释放合击();
        }
        this.回到主页();
        var 副本任务进入按钮 = UTILS.findImage(IMAGE.副本任务进入按钮, 2, 2, 0.9);
        if (副本任务进入按钮) {
            this.材料副本开始();
            this.经验副本开始();
        } else {
            UTILS.toastLog('暂未开启副本模式.任务结束!');
        }
    }
    this.经验副本开始 = () => {
        this.背包空间熔炼();
        var 副本任务进入按钮 = UTILS.findImage(IMAGE.副本任务进入按钮, 2, 2, 0.9);
        var 经验副本界面特征 = UTILS.findImage(IMAGE.经验副本界面特征, 0, 1, 0.9);
        var 经验副本进入按钮 = UTILS.findImage(IMAGE.经验副本进入按钮, 0, 2, 0.8);
        if (副本任务进入按钮) {
            UTILS.click(副本任务进入按钮.x, 副本任务进入按钮.y);
            sleep(通用休眠时间);
            this.经验副本开始();
        } else if (经验副本界面特征) {
            this.入口点击次数 = 0;
            var 经验副本挑战按钮 = UTILS.findImage(IMAGE.经验副本挑战按钮, 2, 1, 0.8);
            var 经验副本领取按钮 = UTILS.findImage(IMAGE.经验副本领取按钮, 2, 0, 0.8) || UTILS.findImage(IMAGE.经验副本领取按钮, 1, 1, 0.8);
            var 经验副本结束 = UTILS.findImage(IMAGE.经验副本结束特征, 1, 2, 0.9);
            if (经验副本结束) {
                UTILS.toastLog('经验副本完成');
                sleep(通用休眠时间);
                this.回到主页();
                return;
            }
            if (经验副本挑战按钮) {
                UTILS.click(经验副本挑战按钮.x, 经验副本挑战按钮.y);
                sleep(通用休眠时间);
                this.经验副本开始();
            } else if (经验副本领取按钮) {
                UTILS.click(经验副本领取按钮.x, 经验副本领取按钮.y);
                sleep(500);
                this.经验副本开始();
            }
        } else if (经验副本进入按钮) {
            UTILS.click(经验副本进入按钮.x, 经验副本进入按钮.y);
            this.入口点击次数++;
            sleep(通用休眠时间);
            if (this.入口点击次数 >= 3) {
                UTILS.toastLog('经验副本未开启.任务结束!');
                return;
            } else {
                this.经验副本开始();
            }
        } else {
            this.经验副本开始();
        }
    }
    this.材料副本开始 = () => {
        this.背包空间熔炼();
        var 副本任务进入按钮 = UTILS.findImage(IMAGE.副本任务进入按钮, 2, 2, 0.9);
        var 副本界面特征 = UTILS.findImage(IMAGE.副本界面特征, 0, 0, 0.9);
        var 主页特征 = UTILS.findImage(IMAGE.无限福利领取按钮, 0, 1, 0.8);
        if (副本任务进入按钮) {
            UTILS.click(副本任务进入按钮.x, 副本任务进入按钮.y);
            sleep(通用休眠时间);
            this.材料副本开始();
        } else if (副本界面特征) {
            this.入口点击次数 = 0;
            var 材料副本挑战按钮 = UTILS.findImage(IMAGE.副本挑战按钮, 2, 2, 0.7);
            if (材料副本挑战按钮) {
                UTILS.click(材料副本挑战按钮.x, 材料副本挑战按钮.y);
                sleep(通用休眠时间);
                this.材料副本开始();
            } else {
                UTILS.toastLog('材料副本完成');
                sleep(通用休眠时间);
                this.回到主页();
                return;
            }
        } else if (主页特征) {
            this.入口点击次数++;
            if (入口点击次数 >= 3) {
                UTILS.toastLog('暂未开启副本.任务结束!');
                return;
            }
        } else {
            var 领取奖励按钮 = UTILS.findImage(IMAGE.野外BOSS领取奖励按钮, 2, 1, 0.9);
            if (领取奖励按钮) {
                UTILS.click(领取奖励按钮.x, 领取奖励按钮.y);
                sleep(通用休眠时间);
                this.材料副本开始();
            } else {
                this.材料副本开始();
            }
        }
    }
    this.BOSS任务入口 = () => {
        UTILS.toastLog('1-开始BOSS任务');
        if (this.自动合击已开启 == false) {
            this.开启自动释放合击();
        }
        this.回到主页();
        var BOSS进入按钮 = UTILS.findImage(IMAGE.BOSS副本按钮, 2, 2, 0.7);
        if (BOSS进入按钮) {
            this.个人BOSS开始();
            this.野外BOSS开始();
        } else {
            UTILS.toastLog('暂未开启BOSS模式.任务结束!')
        }
    }
    this.野外BOSS开始 = () => {
        this.背包空间熔炼();
        var BOSS进入按钮 = UTILS.findImage(IMAGE.BOSS副本按钮, 2, 2, 0.7);
        var 野外BOSS页面特征 = UTILS.findImage(IMAGE.野外BOSS界面特征, 0, 0, 0.8);
        var BOSS界面特征 = UTILS.findImage(IMAGE.BOSS界面特征, 0, 0, 0.9);
        if (BOSS进入按钮) {
            sleep(500);
            UTILS.click(BOSS进入按钮.x, BOSS进入按钮.y);
            this.野外BOSS开始();
        } else if (野外BOSS页面特征) {
            var 野外BOSS挑战按钮 = UTILS.findImage(IMAGE.野外BOSS挑战按钮, 2, 2, 0.8);
            if (野外BOSS挑战按钮) {
                UTILS.click(野外BOSS挑战按钮.x, 野外BOSS挑战按钮.y);
                sleep(500)
                var 次数不足 = UTILS.findImage(IMAGE.野外BOSS次数不足, 2, 1, 0.8);
                if (次数不足) {
                    UTILS.click(次数不足.x, 次数不足.y);
                    UTILS.toastLog('野外BOSS次数不足,任务结束');
                    this.回到主页();
                    return;
                } else {
                    this.野外BOSS开始();
                }
            } else {
                UTILS.toastLog('野外BOSS任务结束');
                this.回到主页();
                return;
            }
        } else if (BOSS界面特征) {
            sleep(500);
            var 野外BOSS进入按钮 = UTILS.findImage(IMAGE.野外BOSS进入按钮, 0, 2, 0.);
            if (野外BOSS进入按钮) {
                UTILS.log('2.2.1找到野外BOSS进入按钮')
                UTILS.click(野外BOSS进入按钮.x, 野外BOSS进入按钮.y);
                this.野外BOSS开始();
            } else {
                UTILS.log('2.2.2没有野外BOSS进入按钮')
                this.野外BOSS开始();
            }
        } else {
            var 野外BOSS复活 = UTILS.findImage(IMAGE.野外BOSS复活特征, 2, 1, 0.7);
            var 领取奖励按钮 = UTILS.findImage(IMAGE.野外BOSS领取奖励按钮, 2, 1, 0.7);
            if (野外BOSS复活) {
                var 返回按钮 = UTILS.findImage(IMAGE.返回按钮2, 0, 2, 0.8);
                UTILS.click(返回按钮.x, 返回按钮.y);
                sleep(通用休眠时间);
                this.野外BOSS开始();
            } else if (领取奖励按钮) {
                UTILS.click(领取奖励按钮.x, 领取奖励按钮.y);
                this.野外BOSS开始();
            } else {
                sleep(通用休眠时间);
                this.野外BOSS开始();
            }
        }
    }
    this.个人BOSS开始 = () => {
        this.背包空间熔炼();
        var BOSS进入按钮 = UTILS.findImage(IMAGE.BOSS副本按钮, 2, 2, 0.7);
        if (BOSS进入按钮) {
            UTILS.log('1.1-找到BOSS任务进入按钮')
            sleep(500);
            UTILS.click(BOSS进入按钮.x, BOSS进入按钮.y);
            this.个人BOSS开始();
        } else {
            sleep(通用休眠时间);
            var BOSS界面特征 = UTILS.findImage(IMAGE.BOSS界面特征, 0, 0, 0.9);
            if (BOSS界面特征) {
                UTILS.log('1.2-找到BOSS界面特征')
                var BOSS挑战按钮 = UTILS.findImage(IMAGE.挑战按钮, 0, 2, 0.7);
                if (BOSS挑战按钮) {
                    UTILS.log('1.3-找到挑战按钮')
                    UTILS.click(BOSS挑战按钮.x, BOSS挑战按钮.y);
                    sleep(通用休眠时间);
                    this.个人BOSS开始()
                } else {
                    UTILS.toastLog('BOSS挑战结束');
                    this.回到主页();
                    return;
                }
            } else {
                var 失败特征 = UTILS.findImage(IMAGE.挑战失败, 1, 0, 0.7);
                if (失败特征) {
                    UTILS.toastLog('战力不足,挑战失败,任务结束');
                    sleep(通用休眠时间);
                    this.回到主页();
                    return;
                } else {
                    sleep(通用休眠时间);
                    this.个人BOSS开始();
                }
            }
        }
    }
    this.新手任务入口 = () => {
        if (是否执行新手任务) {
            this.关闭开始游戏();
            this.无限福利领取();
            this.开启自动释放合击();
            this.创建角色();
            this.VIP领取();
            // this.点击复杂任务();
            // this.角色换装();
            // this.点击完成任务();
            // this.遭遇战任务();
            this.点击继续型任务();
            // this.副本挑战任务();
            // this.点击完成任务();
            // this.通天塔任务();
        }
    }
    this.回到主页次数 = 0;
    this.回到主页 = () => {
        UTILS.log('14-回到主页')
        var 返回键 = UTILS.findImage(IMAGE.返回按钮, 0, 3, 0.9) || UTILS.findImage(IMAGE.返回按钮2, 0, 3, 0.9);
        if (返回键) {
            UTILS.click(返回键.x, 返回键.y);
            sleep(通用休眠时间);
            if (this.回到主页次数 < 5) {
                this.回到主页次数++;
                this.回到主页();
            } else {
                UTILS.log('14-回到主页 退出')
                this.回到主页次数 = 0;
                if (!this.新手脚本结束) {
                    this.点击继续型任务();
                }
                return;
            }
        } else {
            this.回到主页次数 = 0;
            UTILS.log('14-回到主页 退出')
            return;
        }
    }
    this.无限福利领取 = () => {
        var 无限福利界面 = UTILS.findImage(IMAGE.无限福利界面特征, 0, 0, 0.8);
        if (无限福利界面) {
            var 无限福利领取按钮 = UTILS.findImage(IMAGE.无限福利领取按钮, 2, 2, 0.8);
            if (无限福利领取按钮) {
                UTILS.click(无限福利领取按钮.x, 无限福利领取按钮.y);
                this.无限福利领取()
            } else {
                return;
            }
        } else {
            var 无限福利进入 = UTILS.findImage(IMAGE.无限福利进入按钮, 0, 1, 0.8);
            if (无限福利进入) {
                UTILS.click(无限福利进入.x, 无限福利进入.y);
                sleep(通用休眠时间);
                this.无限福利领取();
            } else {
                return;
            }

        }
    }
    this.开启自动释放合击 = () => {
        this.回到主页();
        var VIP = UTILS.findImage(IMAGE.VIP福利进入, 0, 0, 0.9);
        if (VIP) {
            UTILS.click(VIP.x, VIP.y, 0, -100);
            sleep(通用休眠时间);
            var 勾选 = UTILS.findImage(IMAGE.自动合击勾选, 1, 1, 0.9);
            if (勾选) {
                UTILS.click(勾选.x, 勾选.y, 0, 30)
                sleep(通用休眠时间);
                UTILS.click(勾选.x, 勾选.y, 0, 300);
                this.自动合击已开启 = true;
            } else {
                UTILS.click(VIP.x, VIP.y, 150, 100);
                this.自动合击已开启 = true;
            }
            return;
        }
    }
    /**
     * @function 进入角色界面(使用之后请延迟1秒再进行其他操作)
     * @returns 成功返回坐标,失败返回false
     * @example var res = this.进入角色界面(); if(res){...}
     */
    this.进入角色界面 = () => {
        var 角色界面 = UTILS.findImage(IMAGE.角色界面特征, 0, 0, 0.8);
        if (角色界面) {
            sleep(500);
            return (角色界面)
        } else {
            this.回到主页();
            var 角色按钮 = UTILS.findImage(IMAGE.角色按钮, 0, 2, 0.8);
            if (角色按钮) {
                UTILS.click(角色按钮.x, 角色按钮.y);
                sleep(通用休眠时间);
                var 角色界面 = this.进入角色界面();
                return 角色界面;
            } else {
                return (false);
            }
        }
    }
    this.角色换装 = () => {
        var res = this.进入角色界面();
        if (res) {
            // swipe(x1, y1, x2, y2, duration)
            // 滑动查看下一个角色
            // swipe(UTILS.deviceWidth/4*3,UTILS.deviceHeight/2,UTILS.deviceWidth/4,UTILS.deviceHeight/2,通用休眠时间);
            for (var i = 0; i < 3; i++) {
                sleep(通用休眠时间);
                var 一键换装按钮 = UTILS.findImage(IMAGE.一键换装按钮, 2, 1, 0.8);
                if (一键换装按钮) {
                    UTILS.click(一键换装按钮.x, 一键换装按钮.y);
                    sleep(通用休眠时间);
                    swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间);
                } else {
                    swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间);
                }
            }
            this.回到主页();
        } else {
            this.角色换装();
        }
    }
    this.创建角色 = () => {
        var res = this.进入角色界面();
        if (res) {
            sleep(通用休眠时间);
            var 是否可以创建角色 = UTILS.findImage(IMAGE.可以创建角色特征, 1, 0, 0.8);
            if (是否可以创建角色) {
                for (var i = 0; i < 2; i++) {
                    UTILS.click(UTILS.deviceWidth / 2 + UTILS.deviceWidth / 5, res.y + UTILS.deviceHeight / 20);
                    sleep(通用休眠时间);
                    var 开启角色按钮 = UTILS.findImage(IMAGE.开启角色按钮, 1, 2, 0.8);
                    if (开启角色按钮) {
                        UTILS.click(开启角色按钮.x, 开启角色按钮.y);
                        sleep(通用休眠时间);
                        UTILS.click(开启角色按钮.x, 开启角色按钮.y);
                        sleep(通用休眠时间);
                    } else {
                        return;
                    }
                }
            } else {
                UTILS.toastLog('角色已满,无需创建');
                this.回到主页();
                return;
            }
        } else {
            this.创建角色();
        }
    }
    this.VIP领取 = () => {
        this.回到主页();
        var VIP = UTILS.findImage(IMAGE.VIP福利进入, 0, 0, 0.9);
        if (VIP) {
            UTILS.click(VIP.x, VIP.y);
            sleep(通用休眠时间);
            var 领取按钮 = UTILS.findImage(IMAGE.VIP福利领取按钮, 2, 2, 0.9);
            if (领取按钮) {
                for (var i = 0; i < 18; i++) {
                    UTILS.click(领取按钮.x, 领取按钮.y);
                    sleep(通用休眠时间 / 2);
                }
            } else {
                sleep(通用休眠时间);
                this.回到主页();
                return;
            }
            this.回到主页();
            return;
        } else {
            this.回到主页();
            return;
        }
    }
    this.关闭开始游戏 = () => {
        var 开始游戏按钮 = UTILS.findImage(IMAGE.第一屏_开始游戏按钮, 0, 3, 0.9);
        if (开始游戏按钮) {
            UTILS.log('找到开始按钮')
            UTILS.click(开始游戏按钮.x, 开始游戏按钮.y)
            this.关闭开始游戏();
        } else {
            return;
        }
    }
    this.点击完成任务 = () => {
        var 已完成 = UTILS.findImage(IMAGE.完成绿色, 1, 2, 0.6);
        if (已完成) {
            UTILS.toastLog('点击了已完成任务');
            UTILS.click(已完成.x, 已完成.y);
            sleep(通用休眠时间);
        } else {
            return;
        }
    }

    this.通天塔任务 = () => {
        var 通天塔界面 = UTILS.findImage(IMAGE.通天塔界面特征, 0, 3, 0.8);
        if (通天塔界面) {
            sleep(通用休眠时间);
            var 挑战按钮 = UTILS.findImage(IMAGE.野外BOSS挑战按钮, 0, 3, 0.7);
            if (挑战按钮) {
                UTILS.click(挑战按钮.x, 挑战按钮.y);
                sleep(通用休眠时间);
                var times = 0;
                while (true) {
                    var 退出按钮 = UTILS.findImage(IMAGE.通天塔退出按钮, 0, 2, 0.9);
                    var 失败 = UTILS.findImage(IMAGE.挑战失败, 1, 0, 0.9);
                    if (退出按钮) {
                        times++;
                        if (times > 3) {
                            sleep(通用休眠时间);
                            UTILS.click(退出按钮.x, 退出按钮.y);
                            return;
                        } else if (失败) {
                            UTILS.toastLog('战力不足,挑战失败');
                            UTILS.click(退出按钮.x, 退出按钮.y);
                            sleep(通用休眠时间)
                            return;
                        }
                    }
                    sleep(通用休眠时间);
                }
            }
        }
    }
    this.遭遇战任务 = () => {
        var 竞技界面 = UTILS.findImage(IMAGE.王者争霸进入按钮, 1, 2, 0.7);
        if (竞技界面) {
            UTILS.toastLog('遭遇战任务')
            sleep(500);
            var 遭遇战挑战 = UTILS.findImage(IMAGE.遭遇战挑战按钮, 2, 2, 0.7);
            if (遭遇战挑战) {
                UTILS.click(遭遇战挑战.x, 遭遇战挑战.y);
                sleep(通用休眠时间 * 20);
                this.回到主页();
                sleep(通用休眠时间);
                this.点击完成任务();
            }
        } else {
            return;
        }
    }
    this.副本挑战任务 = () => {
        var 副本界面 = UTILS.findImage(IMAGE.副本界面特征, 0, 0, 0.9);
        if (副本界面) {
            UTILS.toastLog('进入副本挑战任务')
            sleep(500);
            // waitViewUntilFindSpecifiedTimes(3000,1,20,baseImg,0.7,()=>{utils.log("执行找到了后的操作");},()=>{utils.log("执行未找到后的操作");},1,3) 
            if (UTILS.findImage(IMAGE.副本挑战按钮, 2, 2, 0.7)) {
                for (var i = 0; i < 4; i++) {
                    new Promise((res, rej) => {
                        UTILS.waitViewUntilFindSpecifiedTimes(3000, 1, 20, IMAGE.副本挑战按钮, 0.7, () => {
                            var 副本挑战 = UTILS.findImage(IMAGE.副本挑战按钮, 2, 2, 0.7);
                            if (副本挑战) {
                                UTILS.click(副本挑战.x, 副本挑战.y);
                                sleep(通用休眠时间);
                                res();
                            }
                        }, () => { i = 5 }, 2, 2);
                    })
                }
            } else if (UTILS.findImage(IMAGE.经验副本挑战按钮, 1, 2, 0.8)) {
                for (var i = 0; i < 3; i++) {
                    new Promise((res, rej) => {
                        UTILS.waitViewUntilFindSpecifiedTimes(3000, 1, 20, IMAGE.经验副本挑战按钮, 0.7, () => {
                            var 副本挑战 = UTILS.findImage(IMAGE.经验副本挑战按钮, 1, 2, 0.7);
                            if (副本挑战) {
                                UTILS.click(副本挑战.x, 副本挑战.y);
                                sleep(通用休眠时间);
                                res();
                            }
                        }, () => {
                            sleep(500)
                            var 经验副本领取按钮 = UTILS.findImage(IMAGE.经验副本领取按钮, 1, 1, 0.7);
                            if (经验副本领取按钮) {
                                UTILS.click(经验副本领取按钮.x, 经验副本领取按钮.y);
                                sleep(500);
                                i = 5;
                                this.回到主页();
                            } else {
                                i = 5;
                                this.回到主页();
                            }
                        }, 1, 2);
                    })
                }
            }
            sleep(通用休眠时间);
            this.回到主页();
            sleep(通用休眠时间);
            this.点击完成任务();
        } else {
            return;
        }
    }
    this.穿戴武器任务 = () => {
        var 角色界面 = UTILS.findImage(IMAGE.角色界面特征, 0, 0, 0.9);
        if (角色界面) {
            UTILS.toastLog('穿戴武器任务')
            var 武器框 = UTILS.findImage(IMAGE.武器框特征, 0, 0, 0.9);
            if (武器框) {
                UTILS.click(武器框.x, 武器框.y);
                sleep(通用休眠时间);
                var 更换推荐装备按钮 = UTILS.findImage(IMAGE.更换推荐装备按钮, 0, 1, 0.9);
                if (更换推荐装备按钮) {
                    UTILS.click(更换推荐装备按钮.x, 更换推荐装备按钮.y);
                    sleep(500)
                    this.回到主页();
                    this.点击完成任务();
                } else {
                    return;
                }
            } else {
                UTILS.log('没有找到武器框');
                return;
            }
        }
    }
    this.技能升级任务 = () => {
        var 技能界面 = UTILS.findImage(IMAGE.技能界面特征, 0, 0, 0.9);
        if (技能界面) {
            UTILS.toastLog('技能升级任务')
            sleep(通用休眠时间);
            this.技能提升();
            sleep(通用休眠时间);
            this.点击完成任务();
        } else {
            return;
        }
    }
    this.强化装备任务 = () => {
        var 铸造界面 = UTILS.findImage(IMAGE.铸造界面特征, 0, 0, 0.8);
        if (铸造界面) {
            UTILS.toastLog('强化装备任务')
            sleep(通用休眠时间);
            var 装备强化按钮 = UTILS.findImage(IMAGE.装备强化按钮, 0, 2, 0.7) || UTILS.findImage(IMAGE.装备铸造按钮, 0, 2, 0.7);
            if (装备强化按钮) {
                for (var i = 0; i < 5; i++) {
                    UTILS.click(装备强化按钮.x, 装备强化按钮.y);
                    sleep(通用休眠时间);
                }
                this.回到主页();
                sleep(通用休眠时间);
                this.点击完成任务();
            } else {
                this.回到主页();
                return;
            }
        } else {
            return;
        }
    }
    this.内功任务 = () => {
        var 内功界面 = UTILS.findImage(IMAGE.内功界面特征, 0, 0, 0.8);
        if (内功界面) {
            UTILS.toastLog('进行内功任务');
            sleep(通用休眠时间);
            for (var i = 0; i < 3; i++) {
                var 内功激活按钮 = UTILS.findImage(IMAGE.内功激活按钮, 1, 2, 0.8);
                if (内功激活按钮) {
                    UTILS.click(内功激活按钮.x, 内功激活按钮.y);
                    sleep(1500);
                    var 内功升级按钮 = UTILS.findImage(IMAGE.内功升级按钮, 1, 2, 0.8);
                    if (内功升级按钮) {
                        for (var i = 0; i < 6; i++) {
                            sleep(100);
                            UTILS.click(内功升级按钮.x, 内功升级按钮.y)
                        }
                    }
                    sleep(通用休眠时间);
                    swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间);
                }
            }
            this.回到主页();
            sleep(通用休眠时间);
            this.点击完成任务();
        } else {
            return;
        }
    }
    this.经脉任务 = () => {
        var 经脉界面 = UTILS.findImage(IMAGE.经脉界面特征, 0, 0, 0.9);
        if (经脉界面) {
            UTILS.toastLog('进行经脉任务');
            sleep(通用休眠时间);
            var 冲脉 = UTILS.findImage(IMAGE.经脉冲脉按钮, 0, 2, 0.8);
            if (冲脉) {
                UTILS.click(冲脉.x, 冲脉.y);
                sleep(通用休眠时间);
                this.回到主页();
                sleep(通用休眠时间);
                this.点击完成任务();
            }
        }
    }
    /**
     * @param 是否无限循环关卡 {boolean}
     */
    this.定时提升战力 = (是否无限循环关卡) => {
        是否无限循环关卡 = 是否无限循环关卡 || false
        var 当前时间 = new Date();
        if (当前时间 - 战力提升时间 >= 300000) {
            sleep(通用休眠时间);
            this.综合战力提升();
            sleep(通用休眠时间);
            if (是否无限循环关卡) {
                this.回到主页();
                this.定时装备熔炼();
                this.定时提升战力(true);
            }
        } else if (是否无限循环关卡) {
            var 自动战斗按钮 = UTILS.findImage(IMAGE.自动战斗按钮, 0, 3, 0.9);
            if (自动战斗按钮) {
                UTILS.click(自动战斗按钮.x, 自动战斗按钮.y);
                sleep(通用休眠时间);
                this.定时提升战力(true);
            } else {
                sleep(通用休眠时间);
                this.定时提升战力(true);
            }
        } else {
            return;
        }
    }
    this.技能提升 = () => {
        // 滑动切换技能角色
        // swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间);
        var 角色按钮 = UTILS.findImage(IMAGE.角色按钮, 1, 2, 0.8);
        if (角色按钮) {
            UTILS.click(角色按钮.x, 角色按钮.y, UTILS.deviceWidth * 0.1, 0);
            sleep(通用休眠时间);
            for (var i = 0; i < 3; i++) {
                var 升级按钮 = UTILS.findImage(IMAGE.技能升级按钮, 2, 1, 0.7);
                if (升级按钮) {
                    UTILS.click(升级按钮.x, 升级按钮.y);
                    sleep(通用休眠时间);
                    swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间);
                }
            }
            sleep(通用休眠时间);
            this.回到主页();
        }
    }
    this.特戒激活 = () => {
        this.回到主页();
        var 可否激活 = UTILS.findImage(IMAGE.可否激活特戒, 1, 0, 0.9);
        if (可否激活) {
            UTILS.toastLog('激活特戒');
            UTILS.click(可否激活.x, 可否激活.y);
            sleep(通用休眠时间);
            var 激活按钮 = null;
            for (var i = 0; i < 6; i++) {
                var 可激活 = UTILS.findImage(IMAGE.可激活特戒, 2, 2, 0.8);
                if (可激活) {
                    UTILS.click(可激活.x, 可激活.y);
                    sleep(通用休眠时间);
                    if (!激活按钮) {
                        激活按钮 = UTILS.findImage(IMAGE.特戒激活按钮, 1, 2, 0.8);
                        if (!激活按钮) {
                            激活按钮 = UTILS.findImage(IMAGE.烈焰特戒解封按钮, 1, 2, 0.7);
                        }
                    }
                    if (激活按钮) {
                        UTILS.click(激活按钮.x, 激活按钮.y);
                        sleep(通用休眠时间);
                        UTILS.click(激活按钮.x, 激活按钮.y);
                    }
                    sleep(1000);  //no need
                } else {
                    break;
                }
            }
            // var 特戒合并 = UTILS.findImage(IMAGE);
        } else {
            UTILS.toastLog('特戒未开启或无需激活');
            return;
        }


    }
    this.综合战力提升 = () => {
        战力提升时间 = new Date();
        this.角色换装();
        this.技能提升();
        this.特戒激活();
        this.羽翼激活(true);
    }
    this.龙魂任务 = () => {
        // 滑动切换角色
        // swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间);
        var 龙魂界面 = UTILS.findImage(IMAGE.龙魂界面特征, 0, 0, 0.9);
        if (龙魂界面) {
            UTILS.toastLog('龙魂任务')
            var 激活按钮 = UTILS.findImage(IMAGE.龙魂激活按钮, 1, 2, 0.8);
            for (var i = 0; i < 3; i++) {
                if (激活按钮) {
                    UTILS.click(激活按钮.x, 激活按钮.y);
                    sleep(通用休眠时间);
                    var 龙魂升级按钮 = UTILS.findImage(IMAGE.龙魂升级按钮, 0, 2, 0.7);
                    if (龙魂升级按钮) {
                        for (var i = 0; i < 3; i++) {
                            UTILS.click(龙魂升级按钮.x, 龙魂升级按钮.y);
                            sleep(300);
                        }
                    }
                    swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 500);
                } else {
                    var 龙魂升级按钮 = UTILS.findImage(IMAGE.龙魂升级按钮, 0, 2, 0.7);
                    if (龙魂升级按钮) {
                        for (var i = 0; i < 3; i++) {
                            UTILS.click(龙魂升级按钮.x, 龙魂升级按钮.y);
                            sleep(300);
                        }
                        sleep(500);
                        swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 500);
                    } else {
                        swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 500);
                        sleep(500);
                    }
                }
                sleep(通用休眠时间);
            }
        } else {
            return;
        }
    }
    this.背包空间熔炼 = () => {
        sleep(通用休眠时间);
        // utils.findImage = (base64, areaType, areaIndex, threshold)
        var point = UTILS.findImage(IMAGE.空间不足前往熔炼, 1, 1, 0.7);
        if (point) {
            UTILS.click(point.x, point.y);
            sleep(500);
            this.熔炼装备(20);
            return;
        } else {
            return;
        }
    }
    this.定时装备熔炼 = () => {
        var 背包按钮 = UTILS.findImage(IMAGE.背包按钮, 0, 3, 0.9);
        var 背包界面特征 = UTILS.findImage(IMAGE.背包界面特征, 0, 0, 0.9);
        if (背包界面特征) {
            var 背包界面熔炼按钮 = UTILS.findImage(IMAGE.背包界面熔炼按钮, 0, 3, 0.9);
            if (背包界面熔炼按钮) {
                UTILS.click(背包界面熔炼按钮.x, 背包界面熔炼按钮.y);
                sleep(通用休眠时间);
                this.熔炼装备(30);
            } else {
                return;
            }
        } else if (背包按钮) {
            UTILS.click(背包按钮.x, 背包按钮.y);
            sleep(500);
            this.定时装备熔炼();
        } else {
            this.回到主页();
            sleep(通用休眠时间);
            this.定时装备熔炼();
        }
    }
    /**
     * @param 熔炼次数 {number}
     */
    this.熔炼装备 = (熔炼次数) => {
        熔炼次数 = 熔炼次数 || 10
        var point = UTILS.findImage(IMAGE.熔炼按钮, 0, 2, 0.8);
        if (point) {
            UTILS.toastLog('熔炼装备')
            for (var i = 0; i < 熔炼次数; i++) {
                UTILS.click(point.x, point.y)
                sleep(100);
            }
            sleep(通用休眠时间);
            UTILS.click(point.x, point.y, 0, 200);
        } else {
            return;
        }
    }
    this.神器碎片任务 = () => {
        var 神器界面 = UTILS.findImage(IMAGE.神器碎片界面特征, 0, 0, 0.8);
        if (神器界面) {
            UTILS.toastLog('进行神器碎片任务');
            sleep(通用休眠时间);
            var 龙心碎片1 = UTILS.findImage(IMAGE.龙心碎片1, 1, 2, 0.7);
            var 龙心碎片2 = UTILS.findImage(IMAGE.龙心碎片2, 1, 2, 0.7);
            var 神龙碎片1 = UTILS.findImage(IMAGE.神龙碎片1特征, 1, 2, 0.7);
            var 神龙碎片2 = UTILS.findImage(IMAGE.神龙碎片2特征, 1, 2, 0.7);
            var 神龙碎片3 = UTILS.findImage(IMAGE.神龙碎片3特征, 1, 2, 0.7);
            var 神龙碎片4 = UTILS.findImage(IMAGE.神龙碎片4特征, 1, 2, 0.7);
            var 碎片列表 = []
            if (龙心碎片1) {
                碎片列表.push(龙心碎片1);
            }
            if (龙心碎片2) {
                碎片列表.push(龙心碎片2);
            }
            if (神龙碎片1) {
                碎片列表.push(神龙碎片1);
            }
            if (神龙碎片2) {
                碎片列表.push(神龙碎片2);
            }
            if (神龙碎片3) {
                碎片列表.push(神龙碎片3);
            }
            if (神龙碎片4) {
                碎片列表.push(神龙碎片4);
            }
            console.log(碎片列表)
            for (var i = 0; i < 碎片列表.length; i++) {
                UTILS.click(碎片列表[i].x, 碎片列表[i].y);
                sleep(通用休眠时间);
                var 龙心激活按钮 = UTILS.findImage(IMAGE.龙心激活按钮, 2, 1, 0.7);
                if (龙心激活按钮) {
                    UTILS.click(龙心激活按钮.x, 龙心激活按钮.y);
                    sleep(通用休眠时间)
                } else {
                    UTILS.click(碎片列表[i].x, 碎片列表[i].y);
                    sleep(通用休眠时间);
                    continue;
                }
            }
            sleep(500);
            var 神龙戒激活按钮 = UTILS.findImage(IMAGE.神龙戒激活按钮, 1, 2, 0.7);
            if (神龙戒激活按钮) {
                UTILS.click(神龙戒激活按钮.x, 神龙戒激活按钮.y);
            }
            this.回到主页();
        } else {
            return;
        }
    }
    this.进入羽翼界面 = () => {
        var 羽翼界面 = UTILS.findImage(IMAGE.羽翼界面特征, 0, 0, 0.8);
        if (羽翼界面) {
            return { x: 羽翼界面.x, y: 羽翼界面.y }
        } else {
            sleep(通用休眠时间);
            var 进入角色 = this.进入角色界面();
            if (进入角色) {
                sleep(通用休眠时间 * 0.5);
                var 羽翼界面进入按钮 = UTILS.findImage(IMAGE.羽翼界面进入按钮, 0, 3, 0.8);
                if (羽翼界面进入按钮) {
                    UTILS.click(羽翼界面进入按钮.x, 羽翼界面进入按钮.y);
                    sleep(通用休眠时间);
                    var 角色界面特征 = UTILS.findImage(IMAGE.角色界面特征, 0, 0, 0.8);
                    if (角色界面特征) {
                        return false;
                    } else {
                        return this.进入羽翼界面();
                    }
                } else {
                    return;
                }
            } else {
                return;
            }
        }
    }
    /**
     * @function 羽翼激活 适用于任务或增强
     * @param bool true为增强 不传为任务
     */
    this.羽翼激活 = (bool) => {
        bool = bool || false
        var 羽翼界面 = UTILS.findImage(IMAGE.羽翼界面特征, 0, 0, 0.7);
        if (羽翼界面) {
            UTILS.toastLog('激活羽翼');
            for (var i = 0, 羽翼次数 = 0; i < 3; i++) {
                sleep(通用休眠时间);
                var 激活按钮 = UTILS.findImage(IMAGE.羽翼激活按钮, 1, 1, 0.7);
                if (激活按钮) {
                    UTILS.click(激活按钮.x, 激活按钮.y);
                    sleep(通用休眠时间 * 3.5);
                    UTILS.click(激活按钮.x, 激活按钮.y);
                    sleep(通用休眠时间 * 2);
                    swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间);
                } else {
                    swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间);
                    羽翼次数++;
                }
            }
            sleep(通用休眠时间);
            if (羽翼次数 >= 3) {
                this.羽翼升级();
            } else {
                UTILS.toastLog('本次仅激活羽翼,下次升阶')
            }
        } else if (bool) {
            var res = this.进入羽翼界面();
            if (res) {
                this.羽翼激活(false);
            } else {
                return;
            }
        }
    }
    this.羽翼升级 = () => {
        var res = this.进入羽翼界面();
        UTILS.log('羽翼界面特征:', res);
        if (res) {
            UTILS.toastLog('羽翼升阶');
            sleep(通用休眠时间 * 0.5);
            var 升阶按钮 = UTILS.findImage(IMAGE.羽翼升级按钮, 0, 2, 0.8);
            if (升阶按钮) {
                while (true) {
                    var 角色红点 = UTILS.findImage(IMAGE.小红点特征, 1, 0, 0.9);
                    if (!角色红点) {
                        break;
                    } else {
                        UTILS.click(升阶按钮.x, 升阶按钮.y);
                        swipe(UTILS.deviceWidth / 4 * 3, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 2, 通用休眠时间 / 2);
                        sleep(通用休眠时间 / 2);
                        战力提升时间 = new Date();
                    }
                }
                this.回到主页();
                sleep(通用休眠时间 / 2);
            } else {
                return;
            }
        } else {
            return;
        }

    }
    this.羽翼任务 = () => {
        this.羽翼激活()
    }
    this.BOSS失败次数 = 0;
    this.个人BOSS任务 = () => {
        // BOSS任务第一个20级的就不好过,所以需要很多步骤
        // 1.添加新角色
        // 2.一键换装
        // 3.升级其他提升战力的因素
        var BOSS界面 = UTILS.findImage(IMAGE.BOSS界面特征, 0, 0, 0.9);
        if (BOSS界面) {
            UTILS.toastLog('进行BOSS任务');
            sleep(通用休眠时间);
            var 挑战按钮 = UTILS.findImage(IMAGE.挑战按钮, 1, 2, 0.8);
            if (挑战按钮) {
                UTILS.click(挑战按钮.x, 挑战按钮.y);
            } else {
                UTILS.toastLog('没有可以挑战的BOSS');
                return;
            }
            sleep(3000);
            while (true) {
                var 失败 = UTILS.findImage(IMAGE.挑战失败, 1, 0, 0.9);
                var 挑战按钮 = UTILS.findImage(IMAGE.挑战按钮, 1, 2, 0.8); //表示挑战成功
                if (失败) {
                    UTILS.toastLog('挑战失败,自动提升战力')
                    sleep(5000);
                    this.BOSS失败次数++;
                    this.回到主页();
                    sleep(500)
                    this.综合战力提升();
                    break;
                } else if (挑战按钮) {
                    sleep(通用休眠时间);
                    this.回到主页();
                    sleep(通用休眠时间);
                    this.点击完成任务();
                    break;
                }
                sleep(通用休眠时间);
            }
            this.回到主页();
        } else {
            return;
        }
    }
    // 根据是否出现副本任务决定是否结束
    // this.结束脚本判断 = () => {
    //     log('xx-判断脚本结束')
    //     sleep(通用休眠时间);
    //     var 副本出现 = UTILS.findImage(IMAGE.通天塔界面特征, 1, 1, 0.99);

    //     if (this.BOSS失败次数 > 3 || 副本出现) {
    //         sleep(3000);
    //         UTILS.log('已达到新手任务,脚本结束  :' + this.BOSS失败次数);
    //         engines.stopAll();
    //     } else {
    //         return;
    //     }
    // }
    this.新手脚本结束 = false;
    this.点击复杂任务 = () => {
        sleep(通用休眠时间);
        var 需要点击 = UTILS.findImage(IMAGE.需要点击, 1, 2, 0.9) || UTILS.findImage(IMAGE.需要点击, 0, 0, 0.9);
        if (需要点击) {
            UTILS.click(需要点击.x, 需要点击.y, -(UTILS.deviceWidth * 0.185), 0);
            UTILS.click(需要点击.x, 需要点击.y, +(UTILS.deviceWidth * 0.185), 0);
            sleep(通用休眠时间);
            this.点击复杂任务();
        } else {
            UTILS.toastLog('点击了复杂任务');
            UTILS.log('xx-判断脚本结束')
            var 副本出现 = UTILS.findImage(IMAGE.通天塔界面特征, 2, 2, 0.7);
            if (this.BOSS失败次数 > 3 || 副本出现) {
                this.新手脚本结束 = true;
                UTILS.toastLog('已达到新手任务,脚本结束  :' + this.BOSS失败次数);
                return
            }
            UTILS.log('1-装备强化')
            this.强化装备任务();
            UTILS.log('1-装备强化 退出')
            UTILS.log('2-穿戴武器')
            this.穿戴武器任务();
            UTILS.log('2-穿戴武器 退出')
            UTILS.log('3-技能升级')
            this.技能升级任务();
            UTILS.log('3-技能升级 退出')
            UTILS.log('4-熔炼装备')
            this.熔炼装备(10);
            UTILS.log('4-熔炼装备 退出')
            UTILS.log('5-内功')
            this.内功任务();
            UTILS.log('5-内功 退出')
            UTILS.log('6-经脉')
            this.经脉任务();
            UTILS.log('6-经脉 退出')
            UTILS.log('7-神器碎片')
            this.神器碎片任务();
            UTILS.log('7-神器碎片 退出')
            UTILS.log('8-个人BOSS')
            this.个人BOSS任务();
            UTILS.log('8-个人BOSS 退出')
            UTILS.log('9-遭遇战')
            this.遭遇战任务();
            UTILS.log('9-遭遇战 退出')
            UTILS.log('10-副本挑战')
            this.副本挑战任务();
            UTILS.log('10-副本挑战 退出')
            UTILS.log('11-龙魂')
            this.龙魂任务();
            UTILS.log('11-龙魂 退出')
            UTILS.log('12-羽翼')
            this.羽翼任务();
            UTILS.log('12-羽翼 退出')
            sleep(300);
            this.点击继续型任务();
        }
    }
    this.点击继续型任务 = () => {
        if (!this.新手脚本结束) {
            this.背包空间熔炼();
            sleep(通用休眠时间);
            this.定时提升战力();
            var 需要点击 = UTILS.findImage(IMAGE.需要点击, 1, 2, 0.9) || UTILS.findImageFullScreen(IMAGE.需要点击, 0.9);
            var 任务提示 = UTILS.findImage(IMAGE.红色右括号, 1, 2, 0.7) || UTILS.findImage(IMAGE.红色左括号, 1, 2, 0.7);
            var 已完成 = UTILS.findImage(IMAGE.完成绿色, 1, 2, 0.6);
            console.log('点击型:', 任务提示, 已完成, 需要点击);
            sleep(500)
            if (需要点击) {
                //需要点击在右
                UTILS.click(需要点击.x, 需要点击.y, -(UTILS.deviceWidth * 0.185), 0);
                UTILS.click(需要点击.x, 需要点击.y, +(UTILS.deviceWidth * 0.185), 0);
                sleep(通用休眠时间);
                if (任务提示 && !已完成) {
                    this.点击复杂任务();
                }
                sleep(2000);
                this.点击继续型任务();
            } else {
                if (任务提示 && !已完成) {
                    UTILS.click(任务提示.x, 任务提示.y);
                    sleep(300);
                    this.点击复杂任务();
                }
                UTILS.log('xx-判断脚本结束')
                var 副本出现 = UTILS.findImage(IMAGE.通天塔界面特征, 2, 2, 0.7);
                if (this.BOSS失败次数 > 3 || 副本出现) {
                    this.新手脚本结束 = true;
                    return
                }
                sleep(300);
                UTILS.log('13-点击完成')
                this.点击完成任务();
                UTILS.log('13-点击完成 退出')
                this.回到主页();
                UTILS.log('00000-继续循环')
                this.点击继续型任务();
            }
        } else {
            sleep(3000);
            UTILS.toastLog('已达到新手任务,脚本结束  :' + this.BOSS失败次数);
            return;
        }
    }
}
var game = new main();
game.init();

