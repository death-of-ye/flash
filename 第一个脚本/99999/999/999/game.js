/**
 * 霸刀传奇无限版
 */
let IMAGE = require('./image.js');
let UTILS = require('./utils.js');

const 游戏包名 = "com.game456.bdcqbt";
const 游戏名称 = "霸刀无限版";
let gameId = 99999; //542018;
let auxiliaryId = 999;
let version = 999;
//指定文件路径"./sdcard/                                    脚本/游戏ID/脚本ID/版本ID/config.json";
let filePath = "/storage/emulated/0/sdcard/脚本/" + gameId + "/" + auxiliaryId + "/" + version + "/config.json";
let 是否执行新手任务 = true;
let 是否打BOSS任务 = true;
let 是否打副本任务 = true;
let 是否打竞技任务 = true;

let 通用休眠时间 = 1000;
let 战力提升时间 = new Date();
let 是不是一天 = false;
let 当天时间 = '';
let main = function () {
    this.init = () => {
        UTILS.log("start");
        sleep(1000);
        this.initEvents();
        sleep(1000);
        if (UTILS.checkCurrentPackage(游戏包名)) {
            this.开始运行();
        } else {
            UTILS.toastLog('请先运行游戏!')
            return;
        }
        // this.initData(filePath);
        // sleep(1000)
    }
    //读取指定位置文件内容配置初始化数据
    this.initData = (path) => {
        if (!files.isFile(path)) {
            UTILS.log("指定配置文件不存在");
        } else {
            let res = files.read(path);
            if (!res) {
                UTILS.log("指定配置文件内容为空");
            } else {
                let res = JSON.parse(res)
                是否执行新手任务 = res.checkbox[0].checked;
                是否打BOSS任务 = res.checkbsox[1].checked;
                是否打副本任务 = res.checkbox[2].checked;
                是否打竞技任务 = res.checkbox[3].checked;
            }
        }
    }
    this.initEvents = () => {
        //检测无障碍模式开启情况
        auto.waitFor();
        //请求截图权限
        if (!requestScreenCapture()) {
            UTILS.toastLog("获取截图权限失败,中断操作");
            exit();
        }
        UTILS.setScreenMetrics();
        sleep(通用休眠时间);
    }

    this.开始运行 = () => {

        UTILS.toastLog('开始运行');
        sleep(3000);
        // this.回到主页();
        // this.点击背包S();
        // this.点击副本挑战s();
        // this.boss挑战s();
        // this.开始领取无限福利();
        // this.开始行会任务();
        // this.BOSS挑战();
        // this.角色操作();
        this.通天塔挑战();
    }


    this.点击副本 = () => {
        let 副本 = UTILS.findImage(IMAGE.霸刀无限版, 2, 2);
        UTILS.log(副本 + '副本');
        sleep(3000);
        UTILS.click(副本.x, 副本.y);
    }

    this.点击副本挑战 = () => {
        let 挑战 = IMAGE.副本挑战;
        let arr = [];
        for (let i = 0; i < 4; i++) {
            arr.push(UTILS.findImage(挑战, 2, 2, 0.7))
        }
        UTILS.toastLog(arr);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == null) {
                //  UTILS.toastLog('没有了');
            } else {
                UTILS.click(arr[i].x, arr[i].y);
                arr[i] = null
            }
        }

    } 

    this.通天塔挑战失败 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.通天塔挑战失败, 1, 0, 0.7))
        }

        if (arr[1] != null) {
            setTimeout(() => {
                this.退出通天塔();
            }, 2000)
        }
    }


    this.点击玩法 = () => {
        //  // 点击玩法
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.经验副本, 1, 2, 0.7))
        }
        // console.log(arr);
        UTILS.click(arr[1].x * 3, arr[1].y);
    }


    this.进入玩法 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.进入玩法, 2, 2, 0.7))
        }
        console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.自动掷骰子 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.自动掷骰子, 0, 3, 0.7))
        }
        console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }


    this.点击返回按钮 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.挑战关闭, 1, 2, 0.7))
        }
        console.log(arr[1].x, arr[1].y);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.点击角色 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.角色, 1, 2, 0.7))
        }
        console.log(arr[1].x, arr[1].y);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.点击一键换装 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.一键换装, 2, 1, 0.7))
        }
        console.log(arr + '点击一键换装');
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.判断有没有一键换装 = () => {
        return UTILS.findImage(IMAGE.一键换装, 2, 1, 0.7);
    }

    this.点击特戒 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.特戒, 1, 2, 0.7))
        }
        console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.点击特戒_item = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.特戒副本, 1, 2, 0.7))
        }
        console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.点击神装 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.神装, 1, 2, 0.7))
        }
        console.log(arr, 1111);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.获取神装碎片 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.神装, 2, 2, 0.7))
        }
        console.log(arr);
        // UTILS.click(arr[1].x, arr[1].y); 
    }

    this.神装合成 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.合成神装, 2, 0, 0.7))
        }
        console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.合成按钮 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.合成按钮, 2, 1, 0.7))
        }
        // console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.战士角色 = () => {
        sleep(3000);
        let 战士角色 = UTILS.findImage(IMAGE.战士角色, 1, 0, 0.7);
        sleep(3000);
        UTILS.click(战士角色.x, 战士角色.y);
        sleep(3000);
    }

    this.法师角色 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.法师角色, 1, 0, 0.7))
        }
        console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.道士角色 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.道士角色, 1, 0, 0.7))
        }
        console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.宝物 = () => {
        let 宝物 = UTILS.findImage(IMAGE.宝物, 1, 2);
        console.log(宝物);
        UTILS.click(宝物.x, 宝物.y);
    }

    this.宝物提升 = () => {
        let 宝物提升 = UTILS.findImage(IMAGE.宝物提升, 1, 2);
        // console.log(宝物提升);
        UTILS.click(宝物提升.x, 宝物提升.y);
    }

    this.玉佩 = () => {
        let 玉佩 = UTILS.findImage(IMAGE.宝物分支, 1, 2);
        console.log(玉佩);
        UTILS.click(玉佩.x, 玉佩.y);
    }


    this.心法 = () => {
        let 玉佩 = UTILS.findImage(IMAGE.宝物分支, 1, 2);
        console.log(玉佩);
        UTILS.click(玉佩.x + 200, 玉佩.y);
    }

    this.兽神守护 = () => {
        let 玉佩 = UTILS.findImage(IMAGE.宝物分支, 1, 2);
        console.log(玉佩);
        UTILS.click(玉佩.x + 400, 玉佩.y);
    }

    this.魂骨 = () => {
        let 玉佩 = UTILS.findImage(IMAGE.宝物分支, 1, 2);
        console.log(玉佩);
        UTILS.click(玉佩.x + 600, 玉佩.y);
    }


    this.战纹 = () => {
        let 战纹 = UTILS.findImage(IMAGE.战纹, 1, 2);
        console.log(战纹);
        UTILS.click(战纹.x, 战纹.y);
    }

    this.战纹选择 = () => {
        let 战纹选择 = UTILS.findImageFullScreen(IMAGE.战纹选择, 0.7);
        console.log(战纹选择);
        UTILS.click(战纹选择.x, 战纹选择.y);
        let 战纹装备 = UTILS.findImage(IMAGE.战纹装备, 2, 2, 0.7);
        console.log(战纹装备);
        UTILS.click(战纹装备.x, 战纹装备.y);
    }

    this.锻造 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.锻造, 1, 2, 0.7))
        }
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.一键强化 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.一键强化, 1, 2, 0.7))
        }
        // console.log(arr);
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.强化失败 = () => {
        return UTILS.findImageFullScreen(IMAGE.強化失败, 0.7);
    }

    this.锻造_精炼 = () => {
        let 强化分支 = UTILS.findImage(IMAGE.强化分支, 1, 2, 0.7);
        // console.log(arr);
        UTILS.click(强化分支.x, 强化分支.y);
    }

    this.精炼按钮 = () => {
        let 精炼按钮 = UTILS.findImage(IMAGE.精炼按钮, 2, 1, 0.7);
        // console.log(arr);
        UTILS.click(精炼按钮.x, 精炼按钮.y);
    }

    this.精炼失败 = () => {
        return UTILS.findImageFullScreen(IMAGE.精炼失败, 0.7);
    }

    this.锻造_锻造 = () => {
        let 强化分支 = UTILS.findImage(IMAGE.强化分支, 1, 2, 0.7);
        // console.log(arr);
        UTILS.click(强化分支.x + 200, 强化分支.y);
    }

    this.锻造_锻造按钮 = () => {
        let 锻造按钮 = UTILS.findImage(IMAGE.锻造按钮, 1, 2, 0.7);
        // console.log(arr);
        UTILS.click(锻造按钮.x, 锻造按钮.y);
    }

    this.锻造_锻造失败 = () => {
        return UTILS.findImageFullScreen(IMAGE.锻造失败, 0.7);
    }


    this.点击boss = () => {
        let boss = UTILS.findImage(IMAGE.boss, 2, 2, 0.7);
        UTILS.click(boss.x, boss.y);
    }

    this.boss挑战 = () => {
        let boss挑战 = UTILS.findImage(IMAGE.boss挑战, 1, 2, 0.7);
        UTILS.click(boss挑战.x, boss挑战.y);
    }

    this.暂无挑战 = () => {
        let boss挑战 = UTILS.findImage(IMAGE.boss挑战, 1, 2, 0.7);
        return boss挑战;
    }

    this.boss挑战失败 = () => {
        return UTILS.findImage(IMAGE.boss失败, 1, 2, 0.7);
    }

    this.野外BOSS = () => {
        let 野外BOSS = UTILS.findImage(IMAGE.野外boss, 1, 2, 0.7);
        UTILS.click(野外BOSS.x, 野外BOSS.y);
        console.log(野外BOSS, '野外BOSS');
    }

    this.野外BOSS挑战 = () => {
        let 野外BOSS挑战 = UTILS.findImage(IMAGE.野外boss挑战, 2, 2, 0.7);
        console.log(野外BOSS挑战, '野外BOSS挑战');
        UTILS.click(野外BOSS挑战.x, 野外BOSS挑战.y);
    }

    this.boss之家 = () => {
        let 野外BOSS = UTILS.findImage(IMAGE.野外boss, 1, 2, 0.7);
        UTILS.click(野外BOSS.x + 2000, 野外BOSS.y);
    }

    this.boss之家挑战 = () => {
        let boss之家挑战 = UTILS.findImage(IMAGE.boss之家挑战, 2, 2, 0.7);

        console.log(boss之家挑战 + 'boss之家挑战');
        if (boss之家挑战 == null) {
            return boss之家挑战;
        } else {
            UTILS.click(boss之家挑战.x, boss之家挑战.y);
        }

    }

    this.boss之家挑战_item = () => {
        let boss之家挑战分支 = UTILS.findImage(IMAGE.boss之家挑战分支, 2, 2, 0.7)
        console.log(boss之家挑战分支 + 'boss之家挑战_item');
        if (boss之家挑战分支 == null) {
            return;
        } else {
            UTILS.click(boss之家挑战分支.x, boss之家挑战分支.y);
        }
    }

    this.boss之家分支挑战 = () => {
        let arr = [];
        for (let i = 0; i < 2; i++) {
            arr.push(UTILS.findImage(IMAGE.boss之家分支挑战, 2, 2, 0.7));
        }
        console.log(arr + 'boss之家分支挑战');
        UTILS.click(arr[1].x, arr[1].y);
    }

    this.守护神剑 = () => {
        // 点击守护神剑
        let 经验副本 = UTILS.findImage(IMAGE.经验副本, 1, 2);
        UTILS.click(经验副本.x * 4, 经验副本.y);
    }

    this.小角色 = () => {
        let 小角色 = UTILS.findImage(IMAGE.小角色, 1, 2);
        console.log(小角色);
        // UTILS.click(小角色.x, 小角色.y);
    }

    this.技能 = () => {
        let 技能 = UTILS.findImage(IMAGE.技能, 1, 2);
        console.log(技能);
        // UTILS.click(技能.x,技能.y);

    }

    this.关卡 = () => {
        let 关卡 = UTILS.findImage(IMAGE.关卡, 2, 2);
        UTILS.click(关卡.x, 关卡.y);

    }

    this.历练 = () => {
        let 历练 = UTILS.findImage(IMAGE.历练, 1, 2);
        console.log(历练);
    }


    this.竞技 = () => {
        let 竞技 = UTILS.findImage(IMAGE.竞技, 2, 2);
        UTILS.click(竞技.x, 竞技.y);
    }

    this.回城 = () => {
        let 回城 = UTILS.findImage(IMAGE.回城, 2, 0);
        UTILS.click(回城.x, 回城.y);
        // console.log(回城);
    }

    this.怪物攻城 = () => {
        let 怪物攻城 = UTILS.findImage(IMAGE.怪物攻城, 2, 2);
        console.log(怪物攻城);
    }

    this.判断是否在首页 = () => {
        let 副本 = UTILS.findImage(IMAGE.霸刀无限版, 2, 2);
        return 副本;
    }

    this.开始副本挑战 = () => {
        let 屏幕宽 = UTILS.deviceWidth;
        let 屏幕高 = UTILS.deviceHeight;
        UTILS.toastLog('开始副本挑战');
        sleep(2000);
        this.点击副本();
        sleep(2000);
        UTILS.toastLog('副本挑战开始，请等待');
        sleep(2000);
        let 副本挑战时间 = setInterval(() => {
            this.点击副本挑战();
            let 副本挑战 = UTILS.findImage(IMAGE.副本挑战s, 2, 2, 0.7);
            UTILS.log(副本挑战 + '副本挑战');
            let 副本 = UTILS.findImage(IMAGE.霸刀无限版, 2, 2);
            if (副本挑战 == null && 副本 == null) {
                clearInterval(副本挑战时间);
                sleep(2000);
                UTILS.toastLog('副本挑战完毕,等待扫荡');
                sleep(3000);
                UTILS.toastLog('副本扫荡开始，请等待');
                sleep(2000);
                let 副本扫荡时间 = setInterval(() => {
                    let 副本扫荡 = UTILS.findImage(IMAGE.副本扫荡s, 2, 2, 0.7);
                    UTILS.log(副本扫荡 + '副本扫荡');
                    sleep(2000);
                    if (副本扫荡 == null) {
                        clearInterval(副本扫荡时间);
                        sleep(2000);
                        UTILS.toastLog('副本扫荡完毕,请等待');
                        sleep(2000);
                        let 点击经验副本 = UTILS.findImage(IMAGE.经验副本, 1, 2, 0.7);
                        UTILS.log(点击经验副本 + '点击经验副本');
                        sleep(2000);
                        UTILS.click(点击经验副本.x + 200, 点击经验副本.y);
                        sleep(2000);
                        UTILS.toastLog('经验副本挑战即将开始,请等待');
                        sleep(2000);
                        let 挑战区域Y = UTILS.deviceHeight / 3 * 2;
                        let 挑战区域H = UTILS.deviceHeight / 3;
                        let 领取区域Y = UTILS.deviceHeight / 2;
                        // log(挑战区域Y,挑战区域H)
                        let 经验副本时间 = setInterval(() => {
                            UTILS.toastLog('经验副本挑战开始,请等待');
                            // let 经验副本挑战 = UTILS.findImage(IMAGE.经验副本挑战s,2,1,0.7);
                            let 经验副本挑战 = UTILS.findColorNoClick('#713E19', [[12, 41, '#B38352'], [102, 41, '#D1C28F'], [131, 77, '#E3C94E']], [0, 挑战区域Y, 屏幕宽, 挑战区域H], 10);
                            UTILS.log(经验副本挑战 + '经验副本挑战');

                            if (经验副本挑战 == null) {
                                clearInterval(经验副本时间);
                                sleep(2000);
                                UTILS.toastLog('经验副本挑战次数不足，稍后将领取通天塔奖励');
                                sleep(2000);
                                let 点击经验副本 = UTILS.findImage(IMAGE.经验副本, 1, 2, 0.7);
                                UTILS.log(点击经验副本 + '通天塔');
                                sleep(2000);
                                UTILS.click(点击经验副本.x - 200, 点击经验副本.y);
                                sleep(2000);
                                let 通天塔每日奖励 = UTILS.findImage(IMAGE.通天塔每日奖励s, 2, 0, 0.7);
                                UTILS.log(通天塔每日奖励 + '通天塔每日奖励');
                                UTILS.click(通天塔每日奖励.x, 通天塔每日奖励.y);
                                sleep(2000);
                                let 通天塔每日领取 = UTILS.findColorNoClick('#AF6D22', [[75, 24, '#A6531E'], [127, 3, '#DEB039'], [103, 87, '#E8D96F']], [0, 领取区域Y, 屏幕宽, 领取区域Y], 10);
                                UTILS.log(通天塔每日领取 + '通天塔每日领取');
                                if (通天塔每日领取 == null) {
                                    UTILS.toastLog('通天塔每日领取完毕');
                                } else {
                                    UTILS.click(通天塔每日领取.x, 通天塔每日领取.y);
                                    sleep(2000);
                                    UTILS.click(通天塔每日领取.x, 通天塔每日领取.y);
                                    sleep(2000);
                                }
                            } else {
                                UTILS.click(经验副本挑战.x, 经验副本挑战.y);
                                sleep(50000);
                                let 领取经验奖励 = UTILS.findImage(IMAGE.领取经验奖励, 2, 2, 0.7);
                                sleep(2000);
                                UTILS.click(领取经验奖励.x, 领取经验奖励.y);
                                sleep(2000);
                            }
                        }, 60000)
                        // },2000)
                    } else {
                        UTILS.click(副本扫荡.x, 副本扫荡.y, 10, 10, 200);
                        // sleep(3000);
                    }
                }, 4000)
            } else {
                // sleep(2000);
                // this.点击副本();
                // UTILS.log(11111);
                sleep(3000);
                UTILS.click(副本挑战.x, 副本挑战.y);
            }

        }, 60000);

    }

    this.开始领取无限福利 = () => {
        let 时间 = setInterval(() => {
            var 返回按钮 = UTILS.findImage(IMAGE.挑战关闭, 0, 3, 0.7);
            if(返回按钮 != null){
                UTILS.click(返回按钮.x,返回按钮.y);
            }else{
                sleep(通用休眠时间);
                clearInterval(时间);
                sleep(通用休眠时间);
                UTILS.toastLog('已回到主页');
                sleep(通用休眠时间);
                this.领取无限福利();
            }
        },通用休眠时间)
    }

    this.领取无限福利 = () => {
        UTILS.toastLog('开始领取无限福利');
        let 无限福利 = UTILS.findImage(IMAGE.无限福利, 0, 1, 0.7);
        log(无限福利, '无限福利');
        sleep(3000);
        UTILS.click(无限福利.x, 无限福利.y);
        // UTILS.toastLog('请等待，两秒后开始领取');
        let 无限福利领取次数 = setInterval(() => {
            let 无限福利领取 = UTILS.findImage(IMAGE.无限福利领取, 2, 2, 0.7);
            if (无限福利领取 == null) {
                clearInterval(无限福利领取次数);
                sleep(2000);
                let 传世神装 = UTILS.findImage(IMAGE.传世神装, 1, 2, 0.7);
                UTILS.click(传世神装.x, 传世神装.y);
                sleep(2000);
                let 传世神装次数 = setInterval(() => {
                    let 传世神装领取 = UTILS.findImage(IMAGE.传世神装领取, 2, 2, 0.7);
                    if (传世神装领取 == null) {
                        clearInterval(传世神装次数);
                        let 无限特戒 = UTILS.findImage(IMAGE.无限特戒, 1, 2, 0.7);
                        UTILS.click(无限特戒.x, 无限特戒.y);
                        sleep(2000);
                        let 无限特戒次数 = setInterval(() => {
                            let 无限特戒领取 = UTILS.findImage(IMAGE.无限特戒领取, 2, 2, 0.7);
                            if (无限特戒领取 == null) {
                                UTILS.toastLog('无限福利领取完毕')
                                clearInterval(无限特戒次数);
                                this.点击返回按钮();
                                sleep(2000);
                            } else {
                                UTILS.click(无限特戒领取.x, 无限特戒领取.y);
                            }
                        }, 2000);
                    } else {
                        UTILS.click(传世神装领取.x, 传世神装领取.y);
                    }
                }, 2000);
            } else {
                UTILS.click(无限福利领取.x, 无限福利领取.y);
            }
        }, 2000);
    }


    this.开始行会任务 = () => {
        let 时间 = setInterval(() => {
            var 返回按钮 = UTILS.findImage(IMAGE.挑战关闭, 0, 3, 0.7);
            if(返回按钮 != null){
                UTILS.click(返回按钮.x,返回按钮.y);
            }else{
                sleep(通用休眠时间);
                clearInterval(时间);
                sleep(通用休眠时间);
                UTILS.toastLog('已回到主页');
                sleep(通用休眠时间);
                this.行会任务();
            }
        },通用休眠时间)
    }

    this.行会任务 = () => {
        UTILS.toastLog('行会任务开始');
        let 屏幕宽 = UTILS.deviceWidth;
        let 屏幕高 = UTILS.deviceHeight;
        let 行会 = UTILS.findImage(IMAGE.行会, 0, 1, 0.7);
        log(行会, '行会');
        sleep(3000);
        UTILS.click(行会.x, 行会.y);
        sleep(2000);
        let 行会大厅 = UTILS.findImage(IMAGE.行会大厅, 2, 1, 0.7);
        log(行会大厅, '行会大厅');
        sleep(3000);
        if(行会大厅 != null){
            UTILS.click(行会大厅.x, 行会大厅.y);
            sleep(2000);
            let 行会捐赠 = UTILS.findImage(IMAGE.行会捐赠, 2, 2, 0.7);
            log(行会捐赠, '行会大厅');
            sleep(3000);
            UTILS.click(行会捐赠.x, 行会捐赠.y);
            sleep(3000);
    
            let 行会金币捐赠次数 = 0;
            let 捐赠区域x = UTILS.deviceWidth / 2;
            let 是否可捐赠 = UTILS.findColorNoClick('#97501A', [[14, 22, '#A6541A'], [25, 15, '#C1894F'], [65, 20, '#C86A1A']], [捐赠区域x, 0, 捐赠区域x, 屏幕高], 20, 0, 30);
            // log(是否可捐赠+'是否可捐赠');
            sleep(2000);
            if (是否可捐赠 != null) {
                let 行会金币捐赠点击 = setInterval(() => {
                    UTILS.click(是否可捐赠.x, 是否可捐赠.y);
                    行会金币捐赠次数 += 1;
                    if (行会金币捐赠次数 == 10) {
                        UTILS.toastLog('今天已经捐赠完毕，请明天再来');
                        clearInterval(行会金币捐赠点击);
                        sleep(2000);
                        UTILS.click(50, 50);
                        sleep(1500);
                        this.点击返回按钮();
                        sleep(2000);
                        let 活动大厅 = UTILS.findImage(IMAGE.活动大厅, 2, 2, 0.7);
                        log(活动大厅, '活动大厅');
                        UTILS.click(活动大厅.x, 活动大厅.y);
                        sleep(2000);
                        let 篝火盛会 = UTILS.findImage(IMAGE.篝火盛会, 1, 2, 0.7);
                        UTILS.log(篝火盛会 + '篝火盛会');
                        UTILS.click(篝火盛会.x, 篝火盛会.y);
                        sleep(2000);
                        let 篝火 = UTILS.findImage(IMAGE.篝火, 2, 1, 0.7);
                        UTILS.log(篝火 + '篝火');
                        sleep(2000);
                        let 篝火点击 = setInterval(() => {
                            let 篝火道具 = UTILS.findColorNoClick('#E10302', [[15, 10, '#FF0000'], [7, 11, '#190A07']], [篝火.x, 篝火.y, 200, 100], 20);
                            UTILS.log(篝火道具 + '篝火道具');
                            if (篝火道具 != null) {
                                UTILS.toastLog('篝火道具不足');
                                sleep(1000);
                                clearInterval(篝火点击);
                                sleep(2000);
                                this.点击返回按钮();
                                sleep(2000);
                                let 行会boss = UTILS.findImage(IMAGE.行会boss, 2, 2, 0.7);
                                UTILS.log(行会boss + '行会boss');
                                sleep(2000);
                                UTILS.click(行会boss.x, 行会boss.y);
                                sleep(2000);
    
                                let 完美通关次数 = setInterval(() => {
                                    let 完美通关 = UTILS.findImageFullScreen(IMAGE.行会boss挑战, 0.7);
                                    UTILS.log(完美通关 + '完美通关');
                                    sleep(2000);
                                    if (完美通关 == null) {
                                        UTILS.toastLog('行会boss挑战领取完毕');
                                        clearInterval(完美通关次数);
                                    } else {
                                        UTILS.click(完美通关.x, 完美通关.y);
                                        sleep(2000);
                                        let 完美领取 = UTILS.findColorNoClick('#A7551F', [[109, 35, '#D1C18E'], [74, 29, '#D1C18E']], [], 20);
                                        UTILS.log(完美领取 + '完美领取');
                                        sleep(2000);
                                        UTILS.click(完美领取.x, 完美领取.y);
                                        sleep(4000);
                                        UTILS.click(100, 100);
                                    }
    
    
                                }, 10000)
                            } else {
                                UTILS.click(篝火.x, 篝火.y);
                            }
                        }, 2000)
                    }
                }, 2000);
            } else {
                sleep(2000);
                UTILS.click(50, 50);
                sleep(1500);
                this.点击返回按钮();
                sleep(2000);
                let 活动大厅 = UTILS.findImage(IMAGE.活动大厅, 2, 2, 0.7);
                log(活动大厅, '活动大厅');
                UTILS.click(活动大厅.x, 活动大厅.y);
                sleep(2000);
                let 篝火盛会 = UTILS.findImage(IMAGE.篝火盛会, 1, 2, 0.7);
                UTILS.log(篝火盛会 + '篝火盛会');
                UTILS.click(篝火盛会.x, 篝火盛会.y);
                sleep(2000);
                let 篝火 = UTILS.findImage(IMAGE.篝火, 2, 1, 0.7);
                UTILS.log(篝火 + '篝火');
                sleep(2000);
                let 篝火点击 = setInterval(() => {
                    let 篝火道具 = UTILS.findColorNoClick('#E10302', [[15, 10, '#FF0000'], [7, 11, '#190A07']], [篝火.x, 篝火.y, 200, 100], 20);
                    UTILS.log(篝火道具 + '篝火道具');
                    if (篝火道具 != null) {
                        UTILS.toastLog('篝火道具不足');
                        sleep(1000);
                        clearInterval(篝火点击);
                        sleep(2000);
                        this.点击返回按钮();
                        sleep(2000);
                        let 行会boss = UTILS.findImage(IMAGE.行会boss, 2, 2, 0.7);
                        UTILS.log(行会boss + '行会boss');
                        sleep(2000);
                        UTILS.click(行会boss.x, 行会boss.y);
                        sleep(2000);
    
                        let 完美通关次数 = setInterval(() => {
                            let 完美通关 = UTILS.findImageFullScreen(IMAGE.行会boss挑战, 0.7);
                            UTILS.log(完美通关 + '完美通关');
                            sleep(2000);
                            if (完美通关 == null) {
                                UTILS.toastLog('行会boss挑战领取完毕');
                                clearInterval(完美通关次数);
                                sleep(通用休眠时间);
                                this.回到主页();
                            } else {
                                UTILS.click(完美通关.x, 完美通关.y);
                                sleep(2000);
                                let 完美领取 = UTILS.findColorNoClick('#A7551F', [[109, 35, '#D1C18E'], [74, 29, '#D1C18E']], [], 20);
                                UTILS.log(完美领取 + '完美领取');
                                sleep(2000);
                                UTILS.click(完美领取.x, 完美领取.y);
                                sleep(4000);
                                UTILS.click(100, 100);
                            }
    
    
                        }, 10000)
                    } else {
                        UTILS.click(篝火.x, 篝火.y);
                    }
                }, 2000)
            }
        }else{
            sleep(通用休眠时间);
            UTILS.toastLog('请加入行会');
            sleep(通用休眠时间);
            UTILS.click(100,100);
        }
    }


    this.BOSS挑战 = () => {
        UTILS.toastLog('开始boss挑战');
        sleep(3000);
        let boss = UTILS.findImage(IMAGE.boss, 2, 2, 0.7);
        UTILS.click(boss.x, boss.y);
        sleep(3000);
        let 个人boss挑战时间 = setInterval(() => {
            let 个人boss挑战 = UTILS.findImage(IMAGE.boss挑战, 1, 2, 0.7);
            UTILS.log(个人boss挑战 + '个人boss挑战');
            let 副本 = UTILS.findImage(IMAGE.霸刀无限版, 2, 2);
            if (个人boss挑战 == null && 副本 == null) {
                clearInterval(个人boss挑战时间);
                sleep(3000);
                UTILS.toastLog('个人boss挑战完毕');
                sleep(3000);
                // let 野外BOSS = UTILS.findImage(IMAGE.野外boss, 1, 2, 0.7);
                // console.log(野外BOSS, '野外BOSS1');
                // UTILS.click(野外BOSS.x, 野外BOSS.y);
            } else if (个人boss挑战 == null && 副本 != null) {
                clearInterval(个人boss挑战时间);
                sleep(3000);
                UTILS.toastLog('请提升战力');
                sleep(3000);
                UTILS.click(boss.x, boss.y);
                sleep(3000);
                // let 野外BOSS = UTILS.findImage(IMAGE.野外boss, 1, 2, 0.7);
                // console.log(野外BOSS, '野外BOSS2');
                // UTILS.click(野外BOSS.x, 野外BOSS.y);

            } else {
                UTILS.click(个人boss挑战.x, 个人boss挑战.y);
                sleep(50000);
            }

        }, 60000)
    }

    this.角色操作 = () => {
        UTILS.toastLog('开始角色操作');
        sleep(3000);
        let 角色 = UTILS.findImage(IMAGE.角色, 1, 2, 0.7);
        sleep(3000);
        UTILS.click(角色.x, 角色.y, 0, 0, 50);
        this.战士角色();
        sleep(3000);
        var 判断有没有一键换装 = this.判断有没有一键换装();
        if (判断有没有一键换装 != null) {
            this.点击一键换装();
        }
        sleep(3000);
        this.法师角色();
        sleep(3000);
        var 判断有没有一键换装 = this.判断有没有一键换装();
        if (判断有没有一键换装 != null) {
            this.点击一键换装();
        }
        sleep(3000);
        this.道士角色();
        sleep(3000);
        var 判断有没有一键换装 = this.判断有没有一键换装();
        if (判断有没有一键换装 != null) {
            this.点击一键换装();
        }

    }

    this.点击副本挑战s = () => {
        var 背包 = UTILS.findImage(IMAGE.背包, 1, 2, 0.7);
        sleep(通用休眠时间);
        UTILS.click(背包.x,背包.y);
        sleep(通用休眠时间);
        var 背包熔炼 = UTILS.findImage(IMAGE.背包熔炼, 0, 3, 0.7);
        log(背包熔炼)
        sleep(通用休眠时间);
        UTILS.log(背包熔炼 + '背包熔炼');
        if(背包熔炼 != null){
            UTILS.click(背包熔炼.x,背包熔炼.y);
            sleep(通用休眠时间);
            var 熔炼 =  UTILS.findColorNoClick('#804C22', [[17, 47, '#853B0D'], [117, 51, '#D1C28F'], [272, 47, '#673013']], [0,0,UTILS.deviceWidth/2,UTILS.deviceHeight], 20);
            UTILS.log(熔炼 + '熔炼按钮');
            sleep(通用休眠时间);
            let 熔炼时间 = setInterval(() => {
                var 是否熔炼 = UTILS.customAreaFindImageNoClick(IMAGE.熔炼结束,0,0,UTILS.deviceWidth/3,UTILS.deviceHeight/2,0,0,0.7);
                sleep(通用休眠时间);
                UTILS.log(是否熔炼+'是否熔炼');
                sleep(通用休眠时间);
                if(是否熔炼 != null){
                    clearInterval(熔炼时间);
                    sleep(通用休眠时间);
                    UTILS.click(100,100);
                    sleep(通用休眠时间);
                    let 屏幕宽 = UTILS.deviceWidth;
                    let 屏幕高 = UTILS.deviceHeight;
                    UTILS.toastLog('开始副本挑战');
                    sleep(2000);
                    this.点击副本();
                    sleep(2000);
                    UTILS.toastLog('副本挑战开始，请等待');
                    sleep(2000);
                    let 副本挑战时间 = setInterval(() => {
                        let 副本挑战 = UTILS.findImage(IMAGE.副本挑战s, 2, 2, 0.7);
                        UTILS.log(副本挑战 + '副本挑战');
                        var 判断是否在副本模块 = UTILS.findImage(IMAGE.副本页面, 0, 0);
                        sleep(3000);
                        var 返回按钮 = UTILS.findImage(IMAGE.挑战关闭, 2, 0, 0.7);
                        sleep(3000);
                        var 判断是否在首页 = this.判断是否在首页();
                        sleep(3000);
                        if (副本挑战 == null && 返回按钮 != null) {
                            sleep(2000);
                            UTILS.toastLog('请等待boss打完')
                        } else if (副本挑战 == null && 判断是否在副本模块 != null) {
                            clearInterval(副本挑战时间);
                            sleep(2000);
                            UTILS.toastLog('副本挑战完毕,等待扫荡');
                            sleep(3000);
                            UTILS.toastLog('副本扫荡开始，请等待');
                            sleep(2000);
                            let 点击经验副本 = UTILS.findImage(IMAGE.经验副本, 1, 2, 0.7);
                            UTILS.log(点击经验副本 + '点击经验副本');
                            sleep(2000);
                            UTILS.click(点击经验副本.x + 200, 点击经验副本.y);
                            sleep(2000);
                            UTILS.toastLog('经验副本挑战即将开始,请等待');
                            sleep(2000);
                            let 挑战区域Y = UTILS.deviceHeight / 3 * 2;
                            let 挑战区域H = UTILS.deviceHeight / 3;
                            let 领取区域Y = UTILS.deviceHeight / 2;
                            // log(挑战区域Y,挑战区域H)
                            let 经验副本时间 = setInterval(() => {
                                var 判断是否在副本模块 = UTILS.findImage(IMAGE.副本页面, 0, 0);
                                sleep(1000);
                                var 返回按钮 = UTILS.findImage(IMAGE.挑战关闭, 2, 0, 0.7);
                                sleep(1000);
                                var 领取经验奖励 = UTILS.findImage(IMAGE.领取经验奖励, 2, 2, 0.7);
                                sleep(1000);
                                var 判断是否在首页 = this.判断是否在首页();
                                sleep(3000);
                                UTILS.toastLog('经验副本挑战中,请等待');
                                // let 经验副本挑战 = UTILS.findImage(IMAGE.经验副本挑战s,2,1,0.7);
                                let 经验副本挑战 = UTILS.findColorNoClick('#713E19', [[12, 41, '#B38352'], [102, 41, '#D1C28F'], [131, 77, '#E3C94E']], [0, 挑战区域Y, 屏幕宽, 挑战区域H], 10);
                                UTILS.log(经验副本挑战 + '经验副本挑战');

                                if (经验副本挑战 == null && 判断是否在副本模块 != null) {
                                    clearInterval(经验副本时间);
                                    sleep(2000);
                                    UTILS.toastLog('经验副本挑战次数不足，稍后将领取通天塔奖励');
                                    sleep(2000);
                                    let 点击经验副本 = UTILS.findImage(IMAGE.经验副本, 1, 2, 0.7);
                                    UTILS.log(点击经验副本 + '通天塔');
                                    sleep(2000);
                                    UTILS.click(点击经验副本.x - 200, 点击经验副本.y);
                                    sleep(2000);
                                    let 通天塔每日奖励 = UTILS.findImage(IMAGE.通天塔每日奖励s, 2, 0, 0.7);
                                    UTILS.log(通天塔每日奖励 + '通天塔每日奖励');
                                    UTILS.click(通天塔每日奖励.x, 通天塔每日奖励.y);
                                    sleep(2000);
                                    let 通天塔每日领取 = UTILS.findColorNoClick('#AF6D22', [[75, 24, '#A6531E'], [127, 3, '#DEB039'], [103, 87, '#E8D96F']], [0, 领取区域Y, 屏幕宽, 领取区域Y], 10);
                                    UTILS.log(通天塔每日领取 + '通天塔每日领取');
                                    if (通天塔每日领取 == null) {
                                        UTILS.toastLog('通天塔每日领取完毕');
                                    } else {
                                        UTILS.click(通天塔每日领取.x, 通天塔每日领取.y);
                                        sleep(2000);
                                        UTILS.click(通天塔每日领取.x, 通天塔每日领取.y);
                                        sleep(2000);
                                    }
                                } else if (经验副本挑战 != null){
                                    UTILS.click(经验副本挑战.x, 经验副本挑战.y);
                                    sleep(2000);
                                }else if(经验副本挑战 == null && 判断是否在副本模块 != null && 领取经验奖励 !=null ){
                                    sleep(2000);
                                    UTILS.click(领取经验奖励.x, 领取经验奖励.y);
                                    sleep(2000);
                                }else if(经验副本挑战 == null && 返回按钮 != null){
                                    sleep(2000);
                                    UTILS.toastLog('请等待boss打完')
                                } else if (经验副本挑战 == null && 判断是否在首页 != null) {
                                    sleep(2000);
                                    UTILS.toastLog('请提升战力');
                                    clearInterval(经验副本时间);
                                    sleep(通用休眠时间);
                                    this.点击副本();
                                    sleep(通用休眠时间);
                                } 
                                }, 10000)
                                } else if (副本挑战 == null && 判断是否在首页 != null) {
                                    sleep(2000);
                                    this.点击副本();
                                    sleep(2000);
                                } else if (副本挑战 != null) {
                                    UTILS.click(副本挑战.x, 副本挑战.y, 0, 30, 200);
                                }
                                }, 10000);
                }else{
                    UTILS.click(熔炼.x,熔炼.y);
                    sleep(通用休眠时间);
                }
            }, 1000);
            
        }   
    }

    this.boss挑战s = () => {
        var 背包 = UTILS.findImage(IMAGE.背包, 1, 2, 0.7);
        sleep(通用休眠时间);
        UTILS.click(背包.x,背包.y);
        sleep(通用休眠时间);
        var 背包熔炼 = UTILS.findImage(IMAGE.背包熔炼, 0, 3, 0.7);
        log(背包熔炼)
        sleep(通用休眠时间);
        UTILS.log(背包熔炼 + '背包熔炼');
        if(背包熔炼 != null){
            UTILS.click(背包熔炼.x,背包熔炼.y);
            sleep(通用休眠时间);
            var 熔炼 =  UTILS.findColorNoClick('#804C22', [[17, 47, '#853B0D'], [117, 51, '#D1C28F'], [272, 47, '#673013']], [0,0,UTILS.deviceWidth/2,UTILS.deviceHeight], 20);
            UTILS.log(熔炼 + '熔炼按钮');
            sleep(通用休眠时间);
            let 熔炼时间 = setInterval(() => {
                var 是否熔炼 = UTILS.customAreaFindImageNoClick(IMAGE.熔炼结束,0,0,UTILS.deviceWidth/3,UTILS.deviceHeight/2,0,0,0.7);
                sleep(通用休眠时间);
                UTILS.log(是否熔炼+'是否熔炼');
                sleep(通用休眠时间);
                if(是否熔炼 != null){
                    clearInterval(熔炼时间);
                    sleep(通用休眠时间);
                    UTILS.click(100,100);
                    sleep(通用休眠时间);
                    UTILS.toastLog('开始boss挑战');
                    sleep(3000);
                    let boss = UTILS.findImage(IMAGE.boss, 2, 2, 0.7);
                    UTILS.click(boss.x, boss.y);
                    sleep(3000);
                    let 个人boss时间 = setInterval(() => {
                        var 判断是否在boss页面 = UTILS.findImage(IMAGE.boss页面, 0, 0); 
                        sleep(1000);
                        let 个人boss挑战 = UTILS.findImage(IMAGE.boss挑战, 1, 2, 0.7);
                        sleep(1000);
                        var 判断是否在首页 = this.判断是否在首页();
                        sleep(1000);
                        UTILS.log(个人boss挑战 + '个人boss挑战');
                        if(判断是否在boss页面 != null && 个人boss挑战 == null){
                            clearInterval(个人boss时间);
                            sleep(2000);
                            UTILS.toastLog('个人boss挑战完毕');
                            sleep(2000);
                        }else if(个人boss挑战 == null && 判断是否在首页 != null){
                            clearInterval(个人boss时间);
                            sleep(2000);
                            UTILS.toastLog('请提升战力');
                            sleep(2000);
                        }else if(个人boss挑战 != null && 判断是否在boss页面 != null){
                            UTILS.click(个人boss挑战.x,个人boss挑战.y);
                            sleep(2000);
                        }
                    }, 3000);
                }else{
                    UTILS.click(熔炼.x,熔炼.y);
                    sleep(通用休眠时间);
                }
            }, 1000);
            
        }   
    }


    this.点击背包S = () => {
        var 背包 = UTILS.findImage(IMAGE.背包, 1, 2, 0.7);
        sleep(通用休眠时间);
        UTILS.click(背包.x,背包.y);
        sleep(通用休眠时间);
        var 背包熔炼 = UTILS.findImage(IMAGE.背包熔炼, 0, 3, 0.7);
        log(背包熔炼)
        sleep(通用休眠时间);
        UTILS.log(背包熔炼 + '背包熔炼');
        if(背包熔炼 != null){
            UTILS.click(背包熔炼.x,背包熔炼.y);
            sleep(通用休眠时间);
            var 熔炼 =  UTILS.findColorNoClick('#804C22', [[17, 47, '#853B0D'], [117, 51, '#D1C28F'], [272, 47, '#673013']], [0,0,UTILS.deviceWidth/2,UTILS.deviceHeight], 20);
            UTILS.log(熔炼 + '熔炼按钮');
            sleep(通用休眠时间);
            let 熔炼时间 = setInterval(() => {
                var 是否熔炼 = UTILS.customAreaFindImageNoClick(IMAGE.熔炼结束,0,0,UTILS.deviceWidth/3,UTILS.deviceHeight/2,0,0,0.7);
                sleep(通用休眠时间);
                UTILS.log(是否熔炼+'是否熔炼');
                sleep(通用休眠时间);
                if(是否熔炼 != null){
                    clearInterval(熔炼时间);
                    sleep(通用休眠时间);
                    UTILS.click(100,100);
                }else{
                    UTILS.click(熔炼.x,熔炼.y);
                    sleep(通用休眠时间);
                }
            }, 1000);
            
        }

    }
    this.回到主页 = () => {
        var 时间 = setInterval(() => {
            var 返回按钮 = UTILS.findImage(IMAGE.挑战关闭, 0, 3, 0.7);
            if(返回按钮 != null){
                UTILS.click(返回按钮.x,返回按钮.y);
            }else{
                sleep(通用休眠时间);
                clearInterval(时间);
                sleep(通用休眠时间);
                UTILS.toastLog('已回到主页')
            }
        },通用休眠时间)
        
    }


    this.通天塔挑战 = () => {
        let 点击经验副本 = UTILS.findImage(IMAGE.经验副本, 1, 2, 0.7);
        UTILS.log(点击经验副本 + '通天塔');
        sleep(2000);
        UTILS.click(点击经验副本.x + 200, 点击经验副本.y);
        sleep(2000);
        let 通天塔每日奖励 = UTILS.findImage(IMAGE.通天塔每日奖励s, 2, 0, 0.7);
        UTILS.log(通天塔每日奖励 + '通天塔每日奖励');
        UTILS.click(通天塔每日奖励.x, 通天塔每日奖励.y);
        sleep(2000);
        let 通天塔每日领取 = UTILS.findColorNoClick('#AF6D22', [[75, 24, '#A6531E'], [127, 3, '#DEB039'], [103, 87, '#E8D96F']], [0, UTILS.deviceHeight / 2, UTILS.deviceWidth, UTILS.deviceHeight / 2], 10);
        UTILS.log(通天塔每日领取 + '通天塔每日领取');
        if (通天塔每日领取 == null) {
            UTILS.toastLog('通天塔每日领取完毕');
        } else {
            UTILS.click(通天塔每日领取.x, 通天塔每日领取.y);
            sleep(2000);
            UTILS.click(通天塔每日领取.x, 通天塔每日领取.y);
            sleep(2000);
            let 通天塔挑战时间 = setInterval(() => {
                var 通天塔挑战 =  UTILS.findImage(IMAGE.通天塔挑战, 0, 3, 0.7);
                if(通天塔挑战 != null){
                    UTILS.click(通天塔挑战.x,通天塔挑战.y);
                    sleep(通用休眠时间);
                }
            },1000)
        }
    }


}
let game = new main();
game.init()