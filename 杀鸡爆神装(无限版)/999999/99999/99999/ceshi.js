/**
 * 杀鸡爆神装(无限版)
 */
let IMAGE = require('./image.js');
let UTILS = require('./utils.js');

const 游戏包名 = "com.game456.sjbsz";
const 游戏名称 = "杀鸡爆神装(无限版)";
let gameId = 99999; //542018;
let auxiliaryId = 999;
let version = 999;
//指定文件路径"./sdcard/                                    脚本/游戏ID/脚本ID/版本ID/config.json";
let filePath = "/storage/emulated/0/sdcard/脚本/" + gameId + "/" + auxiliaryId + "/" + version + "/config.json";
let 是否执行新手任务 = true;
let 是否打BOSS任务 = true;
let 是否打副本任务 = true;
let 是否打竞技任务 = true;
var 是否领取VIP = false;
let 通用休眠时间 = 1000;
let main = function () {
    this.init = () => {
        UTILS.log("start");
        sleep(通用休眠时间);
        this.initEvents();
        sleep(通用休眠时间);
        // if (UTILS.checkCurrentPackage(游戏包名)) {
        this.开始运行();
        // } else {
        //     UTILS.toastLog('请先运行游戏!')
        //     return;
        // }
        // this.initData(filePath);
        // sleep(通用休眠时间)
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
       
        if(商城标志){
            var 商城购买 = UTILS.findImage(IMAGE.商城.商城购买按钮,2,2,0.7);
            log(商城购买+'商城购买'); 
            sleep(通用休眠时间*2);  
            if(商城购买){
                UTILS.click(商城购买.x,商城购买.y+20,200);
                sleep(通用休眠时间*2);
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                if(返回){
                    UTILS.click(返回.x,返回.y);
                }
            }
        }
    }




    


}
let game = new main();
game.init()