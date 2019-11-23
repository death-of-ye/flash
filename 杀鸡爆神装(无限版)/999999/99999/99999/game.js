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
        sleep(1000);
        this.initEvents();
        sleep(1000);
        // if (UTILS.checkCurrentPackage(游戏包名)) {
        this.开始运行();
        // } else {
        //     UTILS.toastLog('请先运行游戏!')
        //     return;
        // }
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
        // var 是否提升 = UTILS.findColorNoClick('#0ECC13',[[10,8,'#0DC412'],[26,7,'#042104']],[UTILS.deviceWidth/3*2,600,UTILS.deviceWidth/3,100],20);
        //         log(是否提升+'兵法')
        // //         sleep(2000)
        // // UTILS.click(兵法升级按钮.x,兵法升级按钮.y,200);
        // // log(兵法升级按钮.x+50,兵法升级按钮.y+50)
        // return;
        UTILS.toastLog('开始运行');
        // sleep(3000);
        // this.VIP();
        // sleep(3000);
        this.升阶();
    }

    this.VIP = () => {
        var VIP = UTILS.findImage(IMAGE.VIP,0,0,0.7);
        log(VIP,'vip');
        sleep(通用休眠时间);
        if(VIP){
            UTILS.click(VIP.x,VIP.y);
            sleep(通用休眠时间);
            let VIP领取时间 = setInterval(() => {
                var vip领取 =   UTILS.findColorNoClick('#6A3F25',[[85,26,'#FBDD38'],[62,65,'#8D3B1E'],[87,14,'#8E7D20']],[0,UTILS.deviceHeight/2,UTILS.deviceWidth,UTILS.deviceHeight/2],20,0,0);       
                UTILS.log(vip领取+'vip领取');
                if(vip领取){
                    UTILS.click(vip领取.x,vip领取.y);
                }else{
                    clearInterval(VIP领取时间);
                    sleep(通用休眠时间);
                    UTILS.toastLog('VIP领取完毕');
                    sleep(通用休眠时间);
                    var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                    sleep(通用休眠时间);
                    UTILS.click(返回.x,返回.y);
                    sleep(通用休眠时间);
                    this.是否领取VIP = true;
                    sleep(通用休眠时间);
                    this.角色换装();
                }
            },通用休眠时间);
        }
    }
   

    this.角色换装 = () => {
        var 角色按钮 = UTILS.findImage(IMAGE.角色.角色按钮,1,2,0.7);
        if(角色按钮){
            UTILS.click(角色按钮.x,角色按钮.y);
            sleep(通用休眠时间);
            var 一键换装 = UTILS.findImage(IMAGE.角色.一键换装,2,1,0.7);
            log(一键换装);
            sleep(通用休眠时间);
            if(一键换装){
                UTILS.click(一键换装.x,一键换装.y);
            }
            sleep(通用休眠时间);
            var 玄珠激活 = UTILS.findImage(IMAGE.角色.玄珠激活,1,0,0.7);
            log(玄珠激活+'玄珠激活');
            sleep(通用休眠时间);
            if(玄珠激活){
                UTILS.click(玄珠激活.x,玄珠激活.y);
                sleep(通用休眠时间);
                var  玄珠提升时间 = setInterval(() => {
                    var 玄珠提升 = UTILS.findImage(IMAGE.角色.玄珠提升,2,1,0.7);
                    sleep(通用休眠时间);
                    var 是否提升 = UTILS.findColorNoClick('#CE220F',[[66,2,'#D5220F'],[60,21,'#962211']],[UTILS.deviceWidth/3,UTILS.deviceHeight/3*2,UTILS.deviceWidth/3,UTILS.deviceHeight/3],20,0,0);
                    log(是否提升+'是否提升')
                    if(是否提升){
                        sleep(通用休眠时间);
                        UTILS.click(玄珠提升.x,玄珠提升.y);
                    }else{
                        clearInterval(玄珠提升时间);
                        sleep(通用休眠时间);
                        UTILS.toastLog('材料不足');
                        var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                        sleep(通用休眠时间);
                        UTILS.click(返回.x,返回.y);
                    }
                },通用休眠时间)
            }
            sleep(通用休眠时间);
            var 神装 = UTILS.findImage(IMAGE.角色.神装,2,1,0.7);
            log(神装+'神装');
            sleep(通用休眠时间);
            if(神装){
                UTILS.click(神装.x,神装.y);
                sleep(通用休眠时间);
                var 神装合成按钮 = UTILS.findImage(IMAGE.角色.神装合成按钮,2,1,0.7);
                log(神装合成按钮+'神装合成按钮')
                sleep(通用休眠时间);
                var 获取橙装碎片 = UTILS.findImage(IMAGE.角色.获取橙装碎片,2,2,0.7);
                log(获取橙装碎片+'获取橙装碎片');
                if(获取橙装碎片){
                    sleep(通用休眠时间);
                    UTILS.click(获取橙装碎片.x+50,获取橙装碎片.y+30);
                    sleep(通用休眠时间);
                    var 分解橙装 = UTILS.findImage(IMAGE.角色.分解橙装,2,2,0.7);
                    sleep(通用休眠时间);
                    
                        let 分解时间 = setInterval(() => {
                            if(分解橙装){
                            UTILS.click(分解橙装.x,分解橙装.y);
                            sleep(通用休眠时间);
                            }else{
                                sleep(通用休眠时间);
                                clearInterval(分解时间);
                                sleep(通用休眠时间);
                                var 合成时间 = setInterval(() => { 
                                    var 神装合成 = UTILS.customAreaFindImageNoClick(IMAGE.角色.神装合成s,0,0,UTILS.deviceWidth,UTILS.deviceHeight/3*2,0.7);
                                    log(神装合成+'神装合成')
                                    sleep(通用休眠时间);
                                    if(神装合成){
                                        UTILS.click(神装合成.x,神装合成.y);
                                        sleep(通用休眠时间);
                                        UTILS.click(神装合成按钮.x+100,神装合成按钮.y+50);
                                    }else{
                                        sleep(通用休眠时间);
                                        clearInterval(合成时间);
                                        let 升级时间 = setInterval(() => {
                                            var 神装升级 = UTILS.customAreaFindImageNoClick(IMAGE.角色.神装升级s,0,0,UTILS.deviceWidth,UTILS.deviceHeight/3*2,0.7);
                                            log(神装升级+'神装升级')
                                            sleep(通用休眠时间);
                                            if(神装升级){
                                                UTILS.click(神装升级.x,神装升级.y);
                                                sleep(通用休眠时间);
                                                UTILS.click(神装合成按钮.x+100,神装合成按钮.y+50); 
                                            }else{
                                                sleep(通用休眠时间);
                                                clearInterval(升级时间); 
                                                sleep(通用休眠时间);
                                                UTILS.toastLog('没有橙装碎片了');
                                                sleep(通用休眠时间);
                                                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                                                sleep(通用休眠时间);
                                                UTILS.click(返回.x,返回.y);
                                                sleep(通用休眠时间);
                                            }
                                        },通用休眠时间)
                                    }
                                },通用休眠时间)
                            }
                        },通用休眠时间)

                }
            }

            var 心法 = UTILS.findImage(IMAGE.角色.心法,1,2,0.7);
            log(心法+'心法');
            sleep(通用休眠时间);
            if(心法){
                sleep(通用休眠时间);
                UTILS.click(心法.x,心法.y);
                sleep(通用休眠时间);
                let 心法升级时间 = setInterval(() => {
                    var 心法升级按钮 = UTILS.findImage(IMAGE.角色.心法升级按钮,2,1,0.7);
                    sleep(通用休眠时间);
                    var 心法材料不足 = UTILS.findImage(IMAGE.角色.心法材料不足,2,1,0.7);
                    if(心法材料不足){
                        UTILS.click(心法升级按钮.x,心法升级按钮.y,200);
                        sleep(通用休眠时间);
                    }else{
                        clearInterval(心法升级时间);
                        sleep(通用休眠时间);
                        UTILS.toastLog('心法材料不足');
                        sleep(通用休眠时间);
                        // var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                        // sleep(通用休眠时间);
                        // UTILS.click(返回.x,返回.y);
                        // sleep(通用休眠时间);
                    }
                    
                },通用休眠时间)
            }

            var 兵法 = UTILS.findImage(IMAGE.角色.兵法,0,3,0.7);
            log(兵法+'兵法');
            sleep(通用休眠时间);
            if(兵法){
                sleep(通用休眠时间);
                UTILS.click(兵法.x,兵法.y);
                sleep(通用休眠时间);
                let 兵法升级时间 = setInterval(() => {
                    var 兵法升级按钮 = UTILS.findImage(IMAGE.角色.心法升级按钮,2,1,0.7);
                    sleep(通用休眠时间);
                    var 心法材料不足 = UTILS.findImage(IMAGE.角色.心法材料不足,2,1,0.7);
                    sleep(通用休眠时间);
                    if(心法材料不足){
                        UTILS.click(兵法升级按钮.x,兵法升级按钮.y,400);
                        sleep(通用休眠时间);
                    }else{
                        clearInterval(兵法升级时间);
                        sleep(通用休眠时间);
                        UTILS.toastLog('心法材料不足');
                        sleep(通用休眠时间);
                        // var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                        // sleep(通用休眠时间);
                        // UTILS.click(返回.x,返回.y);
                        // sleep(通用休眠时间);
                    }
                    
                },通用休眠时间)
            }
        }
    }


    this.升阶 = () => {
        var 升阶 = UTILS.findImage(IMAGE.升阶.升阶,1,2,0.7);
        sleep(通用休眠时间);
        log(升阶);
        sleep(通用休眠时间);
        if(升阶){
            sleep(通用休眠时间);
            click(升阶.x,升阶.y)
            sleep(通用休眠时间);
            
            let 提升时间 = setInterval(() => {
                var 是否提升 = UTILS.findColorNoClick('#0ECC13',[[10,8,'#0DC412'],[26,7,'#042104']],[760,1177,157,64],20);
                log(是否提升+' sleep(通用休眠时间);');
                sleep(通用休眠时间);
                var 坐骑丹提升 = UTILS.findImage(IMAGE.坐骑丹提升,2,2,0.7);
                sleep(通用休眠时间);
                if(是否提升){
                    UTILS.click(坐骑丹提升.x,坐骑丹提升.y);
                    sleep(通用休眠时间);
                }else{
                    clearInterval(提升时间);
                    
                }
            },通用休眠时间)
           
        }else{

        }
    }



    


}
let game = new main();
game.init()