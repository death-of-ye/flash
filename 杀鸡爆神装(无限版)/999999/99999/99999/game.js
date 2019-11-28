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
       
        // var 一键强化 = UTILS.findImage(IMAGE.锻造.一键强化,2,2,0.7);
        // log(一键强化+'一键强化');
        // log(UTILS.findImageFullScreen(IMAGE.角色.神装合成s,0.7));
        // UTILS.click(.x,UTILS.findImageFullScreen(IMAGE.角色.神装合成s,0.7).y-50);
        // return;
        // var 角色按钮 = UTILS.findImage(IMAGE.角色.角色按钮,1,2,0.7);
        // UTILS.click(角色按钮.x,角色按钮.y);
        // sleep(通用休眠时间*2);
        // this.角色换装();
        this.日常任务();
        return;
        UTILS.toastLog('开始运行');
        sleep(3000);
        // this.角色换装();
        // this.新手任务();
        // this.日常任务();
        // sleep(3000);
        // this.升阶();
        // this.判断是否在主页();
        // this.日常任务判断();
        // this.新手每日必刷();
    }

    this.VIP = () => {
        var VIP = UTILS.findImage(IMAGE.VIP,0,0,0.7);
        log(VIP,'vip');
        sleep(通用休眠时间);
        if(VIP != null){
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
        }else{
            log(2222)
        }
    }

    this.角色换装 = () => {
        var 一键换装 = UTILS.findImage(IMAGE.角色.一键换装,2,1,0.7);
        log(一键换装);
        // sleep(通用休眠时间);
        var 神装 = UTILS.findImage(IMAGE.角色.神装,2,1,0.7);
        log(神装+'神装');
        var 心法 = UTILS.findImage(IMAGE.角色.心法,1,2,0.7);
        log(心法+'心法');
        var 兵法 = UTILS.findImage(IMAGE.角色.兵法,0,3,0.7);
        log(兵法+'兵法');
        if(一键换装){
            UTILS.click(一键换装.x,一键换装.y);
            sleep(2000);
            var 玄珠激活 = UTILS.findImage(IMAGE.角色.玄珠激活,0,1,0.7);
            log(玄珠激活+'玄珠激活');
            sleep(2000);
            if(玄珠激活){
                UTILS.click(玄珠激活.x,玄珠激活.y);
                sleep(2000);
                this.玄珠();
            }else if(神装){
                log(神装);
                UTILS.click(神装.x,神装.y);
                sleep(2000);
                this.橙装();
            }else if(心法){
                log(心法);
                UTILS.click(心法.x,心法.y);
                sleep(2000);
                this.心法();
            }else if(兵法){
                log(兵法);
                UTILS.click(兵法.x,兵法.y);
                sleep(2000);
                this.兵法();
            }
        }
    }



    this.玄珠 = () => {
        var 玄珠提升 = UTILS.findImage(IMAGE.角色.玄珠提升,2,1,0.7);
        sleep(通用休眠时间);
        var 是否提升 = UTILS.findColorNoClick('#CE220F',[[66,2,'#D5220F'],[60,21,'#962211']],[UTILS.deviceWidth/3,UTILS.deviceHeight/3*2,UTILS.deviceWidth/3,UTILS.deviceHeight/3],20,0,0);
        log(是否提升+'是否提升')
        if(是否提升 == null){
            sleep(通用休眠时间);
            UTILS.click(玄珠提升.x,玄珠提升.y);
            sleep(通用休眠时间);
            this.玄珠();
        }else{
            sleep(通用休眠时间);
            UTILS.toastLog('材料不足');
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            UTILS.click(返回.x,返回.y);
            sleep(通用休眠时间);
            var 神装 = UTILS.findImage(IMAGE.角色.神装,2,1,0.7);
            log(神装+'神装');
            sleep(通用休眠时间);
            click(神装.x,神装.y);
            this.橙装();
        }
    }

    this.橙装 = () => {
        var 获取橙装碎片 = UTILS.findImage(IMAGE.角色.获取橙装碎片,2,2,0.7);
        log(获取橙装碎片+'获取橙装碎片');
        if(获取橙装碎片){
            sleep(通用休眠时间);
            UTILS.click(获取橙装碎片.x+50,获取橙装碎片.y+30);
            sleep(2000);
            this.橙装();
        }

        var 分解橙装 = UTILS.findImage(IMAGE.角色.分解橙装,2,2,0.7);
        log(分解橙装)
        if(分解橙装){
            log(111)
           this.分解橙装(); 
        }else{
            click(100,100);
            sleep(1000);
            var 神装合成 = UTILS.customAreaFindImageNoClick(IMAGE.角色.神装合成s,0,0,UTILS.deviceWidth,UTILS.deviceHeight/3*2,0.7);
            log(神装合成+'神装合成')
            sleep(通用休眠时间);
            if(神装合成){
                this.橙装合成();
            }
            var 神装升级 = UTILS.customAreaFindImageNoClick(IMAGE.角色.神装升级s,0,0,UTILS.deviceWidth,UTILS.deviceHeight/3*2,0.7);
            log(神装升级+'神装升级');
            sleep(通用休眠时间);
            if(神装升级){
                log(1111)
                this.橙装升级();
            }else{
                sleep(通用休眠时间);
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间);
                this.角色换装();
            }
        }
    }

    this.分解橙装 = () => {
        for(var i=0; i<100; i++){
            var 分解橙装 = UTILS.findImage(IMAGE.角色.分解橙装,2,2,0.7);
            if(分解橙装 == null){
                click(100,100);
                sleep(1000);
                var 神装合成 = UTILS.customAreaFindImageNoClick(IMAGE.角色.神装合成s,0,0,UTILS.deviceWidth,UTILS.deviceHeight/3*2,0.7);
                log(神装合成+'神装合成');
                sleep(通用休眠时间);
                var 神装升级 = UTILS.customAreaFindImageNoClick(IMAGE.角色.神装升级s,0,0,UTILS.deviceWidth,UTILS.deviceHeight/3*2,0.7);
                log(神装升级+'神装升级');
                sleep(通用休眠时间);
                if(神装合成){
                    this.橙装合成();
                    sleep(通用休眠时间);
                    this.分解橙装();
                }
                
                if(神装升级){
                    log(1111)

                    this.橙装升级();
                    sleep(通用休眠时间);
                    this.分解橙装();
                }
            }else{
                UTILS.click(分解橙装.x,分解橙装.y);
            }
        }
    }

    this.橙装合成 = () => {
        var 神装合成按钮 = UTILS.findImage(IMAGE.角色.神装合成按钮,2,1,0.7);
        log(神装合成按钮+'神装合成按钮');
        var 神装合成 = UTILS.findImageFullScreen(IMAGE.角色.神装合成s,0.7)
        log(神装合成+'神装合成');
        if(神装合成){
            click(神装合成.x,神装合成.y);
            sleep(2000);
            click(神装合成按钮.x+50,神装合成按钮.y+50);
            sleep(2000);
            this.橙装合成();
        }else{
            var 神装升级 = UTILS.customAreaFindImageNoClick(IMAGE.角色.神装升级s,0,0,UTILS.deviceWidth,UTILS.deviceHeight/3*2,0.7);
            log(神装升级+'神装升级');
            sleep(通用休眠时间);
            if(神装升级){
                this.橙装升级();  
            }
        }
    }

    this.橙装升级 = () => {
        var 神装升级 = UTILS.customAreaFindImageNoClick(IMAGE.角色.神装升级s,0,0,UTILS.deviceWidth,UTILS.deviceHeight/3*2,0.7);
        log(神装升级+'神装升级');
        var 神装合成按钮 = UTILS.findImage(IMAGE.角色.神装合成按钮,2,1,0.7);
        log(神装合成按钮+'神装合成按钮');
        sleep(通用休眠时间);
        if(神装升级){
            UTILS.click(神装升级.x,神装升级.y);
            sleep(通用休眠时间);
            UTILS.click(神装合成按钮.x+100,神装合成按钮.y+50); 
            sleep(2000);
            this.橙装升级();
        }else{
            sleep(通用休眠时间);
            clearInterval(升级时间); 
            sleep(通用休眠时间);
            UTILS.toastLog('没有橙装碎片了');
            sleep(通用休眠时间);
        }
    }

    this.心法 = () => {
        var 心法升级按钮 = UTILS.findImage(IMAGE.角色.心法升级按钮,2,1,0.7);
        sleep(通用休眠时间);
        var 心法材料不足 = UTILS.findImage(IMAGE.角色.心法材料不足,2,1,0.7);
        sleep(通用休眠时间);
        var 心法没钱 = UTILS.findImage(IMAGE.角色.心法没钱,2,1,0.7);
        sleep(通用休眠时间);
        if(心法材料不足 || 心法没钱){
            UTILS.toastLog('材料不足');
            sleep(通用休眠时间);
            var 福利大厅 = UTILS.findImage(IMAGE.福利大厅,2,1,0.7);
            log(福利大厅+'福利大厅');
            if(福利大厅){
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间);
                var 角色按钮 = UTILS.findImage(IMAGE.角色.角色按钮,1,2,0.7);
                UTILS.click(角色按钮.x,角色按钮.y);
                sleep(通用休眠时间);
                this.角色换装();
            }else{
                var 兵法 = UTILS.findImage(IMAGE.角色.兵法,0,3,0.7);
                log(兵法+'兵法');
                click(兵法.x,兵法.y);
                this.兵法();
            }
        }else{
            UTILS.click(心法升级按钮.x,心法升级按钮.y,200);
            sleep(通用休眠时间);
            
        }
    }

    this.兵法 = () => {
        var 兵法升级按钮 = UTILS.findImage(IMAGE.角色.心法升级按钮,2,1,0.7);
        sleep(通用休眠时间);
        var 兵法没钱 = UTILS.findImage(IMAGE.角色.兵法没钱,2,1,0.7);
        sleep(通用休眠时间);
        if(兵法没钱){
            UTILS.toastLog('材料不足');
            sleep(通用休眠时间);
        }else{
            UTILS.click(兵法升级按钮.x,兵法升级按钮.y,200);
            sleep(通用休眠时间);
            UTILS.click(兵法升级按钮.x,兵法升级按钮.y,200);
            sleep(通用休眠时间);
            this.兵法();
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
            var 坐骑标志 = UTILS.findImage(IMAGE.升阶.坐骑标志,2,2,0.7);
            log(坐骑标志+'坐骑标志');
            if(坐骑标志){
                this.坐骑丹提升();  
            }
               
        }
    }

    this.坐骑丹提升 = () => {
        var 是否提升 = UTILS.findColorNoClick('#0ECC13',[[10,8,'#0DC412'],[26,7,'#042104']],[760,1177,157,64],20);
        log(是否提升+' sleep(通用休眠时间);');
        sleep(通用休眠时间);
        var 坐骑丹 = UTILS.findImage(IMAGE.升阶.坐骑丹提升,2,2,0.7);
        log(坐骑丹+'坐骑丹');
        sleep(通用休眠时间);
        if(是否提升){
            UTILS.click(坐骑丹.x,坐骑丹.y,200);
            sleep(通用休眠时间);
            this.坐骑丹提升();
        }else{
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            UTILS.click(返回.x,返回.y);
            sleep(通用休眠时间);   
        }
    }

    this.技能 = () => {
        var 技能 = UTILS.findImage(IMAGE.技能.技能,1,2,0.7);
        log(技能+'技能');
        sleep(通用休眠时间);
        if(技能){
            UTILS.click(技能.x,技能.y);
            sleep(通用休眠时间);
            var 一键升级 = UTILS.findImage(IMAGE.技能.一键升级,0,2,0.7);
            log(一键升级+'一键升级');
            sleep(通用休眠时间);
            if(一键升级){
                UTILS.click(技能.x,技能.y,200);
                sleep(通用休眠时间);
                this.技能();
            }else{
                return;
            }
        }
    }




    this.判断是否在主页 = () =>{
        var 邮箱 = UTILS.findImage(IMAGE.其他.邮箱,2,2,0.7);
        if(邮箱){
            UTILS.toastLog('回到主页了')
        }
    }

    this.新手任务 = () => {
        var VIP领取 = UTILS.findImage(IMAGE.VIP领取,0,0,0.7);
        if(VIP领取){
           click(VIP领取.x,VIP领取.y);
           sleep(1000);
           this.VIP领取按钮();
        }else{
            this.新手任务s();
        }
           
    }

    this.VIP领取按钮 = () =>{
        var vip领取按钮 = vip领取 = UTILS.findColorNoClick('#271D13',[[73,27,'#EACF34'],[82,31,'#796B1B'],[93,3,'#AE6524'],[98,1,'#F8C74D']],[0,UTILS.deviceHeight/2,UTILS.deviceWidth,UTILS.deviceHeight/2],20,0,0); 
        log(vip领取按钮);
        if(vip领取按钮){
         click(vip领取按钮.x,vip领取按钮.y);
         this.新手任务();
         }
    }

    this.新手任务s = () => {
        var 奖励时间 = setInterval(() => {
            var 奖励 = UTILS.findImage(IMAGE.其他.奖励,2,0,0.7);
            log(奖励+'奖励');
            sleep(通用休眠时间*2);
            var 新手任务 = UTILS.findColorNoClick('#037108',[[22,5,'#06D910'],[17,9,'#037D09'],[51,18,'#037C09']],[3,1198,383,103],20);
            sleep(通用休眠时间*2);
            if(奖励 != null){
                UTILS. click(奖励.x,奖励.y,200);
                sleep(通用休眠时间);
                var 一键换装 = UTILS.findImage(IMAGE.角色.一键换装,2,1,0.7);
                log(一键换装+'一键换装');
                var 坐骑标志 = UTILS.findImage(IMAGE.升阶.坐骑标志,2,2,0.7);
                log(坐骑标志+'坐骑标志');
                // sleep(通用休眠时间*2);
                var 坐骑丹 = UTILS.findImage(IMAGE.升阶.坐骑丹提升,2,2,0.7);
                log(坐骑丹+'坐骑丹');
                // sleep(通用休眠时间*2);
                var 福利大厅 = UTILS.findImage(IMAGE.福利大厅,2,1,0.7);
                log(福利大厅+'福利大厅');
                // sleep(通用休眠时间*2);
                var 招财聚宝 = UTILS.findImage(IMAGE.招财聚宝,2,2,0.7);
                log(招财聚宝+'招财聚宝');
                // sleep(通用休眠时间*2);
                // sleep(通用休眠时间);
                var 熔炼 = UTILS.findImage(IMAGE.背包.熔炼,2,0,0.7);
                log(熔炼+'熔炼');
                // sleep(通用休眠时间*2);
                var 美人领取 = UTILS.findImage(IMAGE.其他.领取,2,1,0.7);
                log(美人领取+'美人领取');
                // sleep(通用休眠时间*2);
                var 美人提升 = UTILS.findImage(IMAGE.其他.美人提升,2,2,0.7);
                log(美人提升+'美人提升');
                // sleep(通用休眠时间*2);
                var 首领挑战 = UTILS.findImage(IMAGE.其他.首领挑战,2,2,0.7);
                log(首领挑战+'首领挑战');
                // sleep(通用休眠时间*2);
                var 活跃度领取 = UTILS.findImageFullScreen(IMAGE.其他.活跃度领取,0.7);
                log(活跃度领取+'活跃度领取');
                // sleep(通用休眠时间*2);
                var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                log(日常领取+'日常领取');
                // sleep(通用休眠时间*2);
                var 副本挑战 = UTILS.findImage(IMAGE.副本.副本挑战,2,1,0.7);
                log(副本挑战+'副本挑战');
                // sleep(通用休眠时间*2);
                var 章节领取 = UTILS.findImage(IMAGE.其他.章节领取,2,2,0.7);
                log(章节领取+'章节领取');
                // sleep(通用休眠时间*2);
                var 竞技挑战 = UTILS.findImageFullScreen(IMAGE.竞技场.挑战,0.7);
                log(竞技挑战+'竞技挑战');
                // sleep(通用休眠时间*2);
                var 膜拜 = UTILS.findImageFullScreen(IMAGE.其他.膜拜,0.7);
                log(膜拜+'膜拜');
                // sleep(通用休眠时间*2);
                var 签到 = UTILS.findImageFullScreen(IMAGE.其他.签到,0.7);
                log(签到+'签到');
                var 副本进入 = UTILS.findImage(IMAGE.其他.副本进入,2,2,0.7);
                log(副本进入+'副本进入');
                var 失败 = UTILS.findImage(IMAGE.失败,2,1,0.7);
                log(失败+'失败');
                sleep(通用休眠时间*2);
                if(一键换装 != null && 竞技挑战 == null){
                    if(坐骑标志 != null && 坐骑丹 != null){
                        click(坐骑丹.x,坐骑丹.y);
                    }else{
                        click(一键换装.x+50,一键换装.y+50);
                    }
                    sleep(2000)
                }else if(熔炼){
                    UTILS.click(熔炼.x,熔炼.y,200);
                }else if(美人领取){
                    UTILS.click(美人领取.x ,美人领取.y,200);
                    sleep(通用休眠时间);
                    UTILS.toastLog('领取成功');
                    sleep(通用休眠时间);
                }else if(美人提升){
                    click(美人提升.x ,美人提升.y);
                }else if(失败){
                  UTILS.toastLog('请提升战力');
                }else if(首领挑战){
                    this.角色换装();
                   click(首领挑战.x ,首领挑战.y);
                }else if(活跃度领取){
                    click(活跃度领取.x ,活跃度领取.y);
                }else if(日常领取){
                    click(日常领取.x ,日常领取.y);
                }else if(章节领取 != null && 日常领取 != null){
                    click(章节领取.x ,章节领取.y+30);
                }else if(竞技挑战 != null && 一键换装 != null){
                    click(竞技挑战.x ,竞技挑战.y);
                }else if(膜拜 != null){
                    click(膜拜.x ,膜拜.y);
                }else if(副本进入){
                    console.log(11111);
                    sleep(通用休眠时间*2)
                    click(副本进入.x+50,副本进入.y+40); 
                }else if(签到){
                    sleep(通用休眠时间*2)
                    click(签到.x,签到.y); 
                }else if(福利大厅 != null && 招财聚宝 != null) {
                    UTILS.click(招财聚宝.x,招财聚宝.y);
                    sleep(通用休眠时间);
                    var 聚宝 = UTILS.findImage(IMAGE.聚宝,2,1,0.7);
                    if(聚宝){
                        UTILS.click(聚宝.x,聚宝.y,200);
                        sleep(通用休眠时间);
                    }
                 }
                sleep(通用休眠时间);
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                if(返回){
                    UTILS.click(返回.x,返回.y);
                    this.新手任务();
                }
            }else if(UTILS.findImage(IMAGE.其他.菜单s,2,0,0.7) && UTILS.findImage(IMAGE.无限商店,1,0,0.7)){
                var 奖励 = UTILS.findImage(IMAGE.其他.奖励,2,0,0.7);
                log(奖励+'奖励');
                sleep(通用休眠时间);
                if(奖励 == null){
                    clearInterval(奖励时间);
                    sleep(通用休眠时间);
                    UTILS.toastLog('新手任务完毕');
                }
            }else if(奖励 != null && 新手任务 != null){
                UTILS. click(奖励.x,奖励.y,200);
            }
            
        },2000)
    }


    this.商城购买 = () => {
        var 商城购买 = UTILS.findImage(IMAGE.商城.商城购买按钮,2,2,0.7);
        log(商城购买+'商城购买'); 
        sleep(通用休眠时间*2);
        var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
        log(日常任务+'开始日常任务');
        sleep(通用休眠时间*2);
        if(商城购买){
            UTILS.click(商城购买.x,商城购买.y);
        }
        var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
        sleep(通用休眠时间);
        if(返回){
            UTILS.click(返回.x,返回.y);
        }
        sleep(通用休眠时间);
        if(日常任务){
            UTILS.click(日常任务.x,日常任务.y);
        }
        sleep(通用休眠时间*2);
    }

    this.竞技场挑战 = () => {
        var 竞技挑战 = UTILS.findImageFullScreen(IMAGE.竞技场.挑战,0.7);
        log(竞技挑战+'竞技挑战');
        sleep(通用休眠时间*2);
        var 匹配对手 = UTILS.findImage(IMAGE.竞技场.匹配对手,2,1,0.7);
        log(匹配对手+'匹配对手');
        sleep(通用休眠时间*2);
        if(竞技挑战){
            UTILS.click(竞技挑战.x,竞技挑战.y);
        }else if(匹配对手){
            UTILS.click(匹配对手.x,匹配对手.y);
        }
    }

    this.锻造s = () => {
        var 锻造 = UTILS.findImage(IMAGE.锻造.锻造,1,2,0.7);
        log(锻造+'锻造');
        sleep(通用休眠时间*2);
        UTILS. click(锻造.x,锻造.y)
    }

    this.日常任务 = () => {
        var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,1,2,0.7);
        log(日常任务+'开始日常任务');
        click(日常任务.x,日常任务.y);
        sleep(2000);
        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
        log(日常领取+'日常领取');
        var 前往任务 = UTILS.findImage(IMAGE.任务.前往任务,2,2,0.7);
        log(前往任务+'前往任务');
        if(日常领取 && 前往任务){
            this.日常领取();
        }
        if(前往任务){
            this.日常任务前往();
        }

    }

    this.日常领取 = () => {
        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
        log(日常领取+'日常领取');
        sleep(1000);
        if(日常领取){
            click(日常领取.x,日常领取.y+50);
            sleep(1000);
            this.日常领取();
        }else{
            this.日常任务前往();
            sleep(1000);
        }
    }
    this.日常任务前往 = () => {
        sleep(通用休眠时间);
        var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
        log(日常任务+'开始日常任务');
        // sleep(通用休眠时间*2);
        var 前往任务 = UTILS.findImage(IMAGE.任务.前往任务,2,2,0.7);
        log(前往任务+'前往任务');
        sleep(1000);
        var 日常标志 = UTILS.findImage(IMAGE.任务.日常标志,1,0,0.7);
        log(日常标志+'日常标志');
        // sleep(通用休眠时间*2);
        var 商城标志 = UTILS.findImage(IMAGE.商城.商城标志,2,1,0.7);
        log(商城标志+'商城标志');
        // sleep(通用休眠时间*2);
        var 竞技挑战 = UTILS.findImageFullScreen(IMAGE.竞技场.挑战,0.7);
        log(竞技挑战+'竞技挑战');
        // sleep(通用休眠时间*2);
        var 一键强化 = UTILS.findImage(IMAGE.锻造.一键强化,0,2,0.7);
        log(一键强化+'一键强化');
        // sleep(通用休眠时间*2);
        var 强化 = UTILS.findImage(IMAGE.锻造.强化,0,3,0.7);
        log(强化+'强化');
        // sleep(通用休眠时间*2);
        var 强化标志 = UTILS.findImage(IMAGE.锻造.强化标志,2,1,0.7);
        log(强化标志+'强化标志');
        // sleep(通用休眠时间*2);
        var 宝石标志 = UTILS.findImage(IMAGE.锻造.宝石标志,2,1,0.7);
        log(宝石标志+'宝石标志');
        // sleep(通用休眠时间*2);
        var 注灵标志 = UTILS.findImage(IMAGE.锻造.注灵标志,2,1,0.7);
        log(注灵标志+'注灵标志');
        // sleep(通用休眠时间*2);
        var 铸魂标志 = UTILS.findImage(IMAGE.锻造.铸魂标志,2,1,0.7);
        log(铸魂标志+'铸魂标志');
        // sleep(通用休眠时间*2);
        var 跨服5V5标志 = UTILS.findImage(IMAGE.竞技场.跨服5V5标志,2,1,0.7);
        log(跨服5V5标志+'跨服5V5标志');
        // sleep(通用休眠时间*2);
        var 膜拜 = UTILS.findImageFullScreen(IMAGE.其他.膜拜,0.7);
        log(膜拜+'膜拜');
        // sleep(通用休眠时间*2);
        var 寻宝标志 = UTILS.findImage(IMAGE.其他.寻宝标志,2,1,0.7);
        log(寻宝标志+'寻宝标志');
        // sleep(通用休眠时间*2);
        var 寻宝购买 = UTILS.findImage(IMAGE.其他.寻宝购买,2,1,0.7);
        log(寻宝购买+'寻宝购买');
        // sleep(通用休眠时间*2);
        var 神将首领 = UTILS.findImage(IMAGE.其他.神将首领,2,1,0.7);
        log(神将首领+'神将首领');
        // sleep(通用休眠时间*2);
        var 神将首领前往 = UTILS.findImage(IMAGE.其他.神将首领前往,2,2,0.7);
        log(神将首领前往+'神将首领前往');
        // sleep(通用休眠时间*2);
        var 精英首领 = UTILS.findImage(IMAGE.其他.精英首领,2,1,0.7);
        log(精英首领+'精英首领');
        // sleep(通用休眠时间*2);
        // var 精英首领扫荡 = UTILS.findImage(IMAGE.其他.精英首领扫荡,2,2,0.7);
        // log(精英首领扫荡+'精英首领扫荡');
        // sleep(通用休眠时间*2);
        var 副本进入 = UTILS.findImage(IMAGE.其他.副本进入,2,2,0.7);
        log(副本进入+'副本进入');
        // sleep(通用休眠时间*2);
        var 副本扫荡 = UTILS.findImage(IMAGE.其他.副本扫荡,2,2,0.7);
        log(副本扫荡+'副本扫荡');
        // sleep(通用休眠时间*2);
        var 材料副本 = UTILS.findImage(IMAGE.副本.材料副本,2,1,0.7);
        log(材料副本+'材料副本');
        // sleep(通用休眠时间*2);
        var 军团标志 = UTILS.findImageFullScreen(IMAGE.军团.军团标志,0.7);
        log(军团标志+'军团标志');
        // sleep(通用休眠时间*2);
        var 魔神首领 = UTILS.findImage(IMAGE.其他.魔神首领,2,1,0.7);
        log(魔神首领+'魔神首领');
        // sleep(通用休眠时间*2);
        var 主线都尉 = UTILS.findImage(IMAGE.主线.都尉,2,2,0.7);
        log(主线都尉+'主线都尉');
        // sleep(通用休眠时间*2);
        var 福利大厅 = UTILS.findImage(IMAGE.福利大厅,2,1,0.7);
        log(福利大厅+'福利大厅');
        // sleep(通用休眠时间*2);
        var 招财聚宝 = UTILS.findImage(IMAGE.招财聚宝,2,2,0.7);
        log(招财聚宝+'招财聚宝');
        // sleep(通用休眠时间*2);
        var 坐骑标志 = UTILS.findImage(IMAGE.升阶.坐骑标志,2,2,0.7);
        log(坐骑标志+'坐骑标志');
        // sleep(通用休眠时间*2);
        var 坐骑丹 = UTILS.findImage(IMAGE.升阶.坐骑丹提升,2,2,0.7);
        log(坐骑丹+'坐骑丹');
        // sleep(通用休眠时间*2);
        var 美人标识 = UTILS.findImage(IMAGE.其他.美人标识,2,1,0.7);
        log(美人标识+'美人标识');
        // sleep(通用休眠时间*2);
        var 美人提升 = UTILS.findImage(IMAGE.其他.美人提升,2,2,0.7);
        log(美人提升+'美人提升');
        // sleep(通用休眠时间*2);
        var 心法 = UTILS.findImage(IMAGE.角色.心法,1,2,0.7);
        log(心法+'心法');
        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
        log(日常领取+'日常领取');
        var 取消托管 = UTILS.findImageFullScreen(IMAGE.竞技场.取消托管,0.7);
        sleep(通用休眠时间);
        if(日常任务){
            UTILS.click(日常任务.x,日常任务.y);
            this.日常任务前往();
        }
        if(前往任务){
            sleep(1000);
            click(前往任务.x,前往任务.y);
            this.日常任务前往();
        }

        if((材料副本 && 副本扫荡 && 副本进入) || (材料副本 && 副本进入)){
            sleep(1000);
            click(副本扫荡.x,副本扫荡.y);
            this.日常任务前往();
        }

        if(商城标志){
            var 商城购买 = UTILS.findImage(IMAGE.商城.商城购买按钮,2,2,0.7);
            log(商城购买+'商城购买'); 
            sleep(通用休眠时间*2);  
            if(商城购买){
                click(商城购买.x+20,商城购买.y+20);
                sleep(通用休眠时间);
                var 商品购买 = UTILS.findImage(IMAGE.商城.商品购买,2,2,0.7);
                log(商品购买+'商品购买'); 
                sleep(通用休眠时间);
                click(商品购买.x,商品购买.y);
                sleep(通用休眠时间);
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                if(返回){
                    UTILS.click(返回.x,返回.y);
                    this.日常任务前往();
                }else{
                    this.日常任务前往(); 
                }
            }
        }

        if(魔神首领 != null && 寻宝购买 != null){
            // storage.put('魔神首领',前往任务);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间*2);
                this.日常任务前往();
            }
        }

        if(坐骑标志 != null && 坐骑丹 != null){
            this.升阶();
            sleep(通用休眠时间*2);
            this.日常任务前往();
        }

        if(美人标识 != null && 美人提升 != null){
            var 美人提升次数 = 0;
            let 提升时间 = setInterval(() => {
                美人提升次数+=1;
                if(美人提升次数 == 6){
                    clearInterval(提升时间);
                    sleep(通用休眠时间);
                    var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                    sleep(通用休眠时间);
                    if(返回){
                        UTILS.click(返回.x,返回.y);
                    }
                }else{
                    click(美人提升.x,美人提升.y);
                    sleep(通用休眠时间);
                }
            },通用休眠时间)
        }
        if(日常领取){
            click(日常领取.x,日常领取.y);
            sleep(通用休眠时间);
            this.日常任务前往();
        }

        if(强化标志 != null || 注灵标志 != null && 一键强化 != null && 强化 != null){
            UTILS.click(一键强化.x+30,一键强化.y+20,200);
            sleep(通用休眠时间);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间);
                this.日常任务前往();
            }
        }

        if(膜拜){
            click(膜拜.x ,膜拜.y);
            sleep(通用休眠时间);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间);
                this.日常任务前往();
            }
        }

        if(寻宝标志 != null && 寻宝购买 != null){
            click(寻宝购买.x ,寻宝购买.y+50);
            sleep(通用休眠时间);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间);
                this.日常任务前往();
            }
        }

        if(神将首领 != null && 神将首领前往 != null){
            click(神将首领前往.x ,神将首领前往.y);
            sleep(通用休眠时间);
            sleep(通用休眠时间);
            this.日常任务前往();    
        }
        if(取消托管){
            UTILS.toastLog('挑战中请等待');
            sleep(通用休眠时间);
            this.日常任务前往();
        }

        if(军团标志){
            UTILS.toastLog('你已经进入军团页面');
            sleep(通用休眠时间);
            var 军团大厅 = UTILS.findImageFullScreen(IMAGE.军团.军团大厅,0.7);
            if(军团大厅){
                UTILS.click(军团大厅.x,军团大厅.y);
                sleep(通用休眠时间);
                var 军团捐赠 = UTILS.findImage(IMAGE.军团.军团捐赠,2,2,0.7);
                log(军团捐赠)
                sleep(通用休眠时间);
                var 捐赠时间 = setInterval(() => {
                  var 是否捐赠 = UTILS.findColorNoClick('#B21C0C',[[0,3,'#D5220F'],[10,6,'#AA1B0C']],[UTILS.deviceWidth/3*2,UTILS.deviceHeight/2,UTILS.deviceWidth/4,UTILS.deviceHeight/4],20)
                 if(是否捐赠 != null){
                     clearInterval(捐赠时间);
                     sleep(通用休眠时间);
                     var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                     sleep(通用休眠时间);
                     if(返回){
                        UTILS.click(返回.x,返回.y);
                        sleep(通用休眠时间);
                        var 退出 = UTILS.findColorNoClick('#140303',[[26,33,'#EDDB9C'],[62,59,'#752B11']],[UTILS.deviceWidth/6*5,0,UTILS.deviceWidth/7,UTILS.deviceHeight],20); 
                        if(退出){
                            UTILS.click(退出.x,退出.y);
                            sleep(通用休眠时间);
                            this.日常任务前往();    
                        }
                        
                     }
                 }else{
                     UTILS.click(军团捐赠.x,军团捐赠.y,200)
                 }
                },通用休眠时间)
            }
         }

         if(心法){
            sleep(通用休眠时间);
            UTILS.click(心法.x,心法.y,200);
            sleep(2000);
            var 心法升级按钮 = UTILS.findImage(IMAGE.角色.心法升级按钮,2,1,0.7);
            sleep(2000);
            UTILS.click(心法升级按钮.x,心法升级按钮.y,400);
            sleep(2000);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间);   
                sleep(通用休眠时间);
                this.日常任务前往();
            }
        }
        if(主线都尉){
            console.log(111);
            sleep(通用休眠时间);
            click(主线都尉.x,主线都尉.y);
            sleep(通用休眠时间);
            this.日常任务前往();
         }
         if(福利大厅 != null && 招财聚宝 != null) {
            UTILS.click(招财聚宝.x,招财聚宝.y);
            sleep(通用休眠时间);
            var 聚宝 = UTILS.findImage(IMAGE.聚宝,2,1,0.7);
            if(聚宝){
                UTILS.click(聚宝.x,聚宝.y,200);
                sleep(通用休眠时间);
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                if(返回){
                    UTILS.click(返回.x,返回.y);
                    sleep(通用休眠时间);
                    this.日常任务前往();      
                
                }
            }
         }
         if(跨服5V5标志 != null){
            sleep(通用休眠时间);
            UTILS.toastLog('战场未开启,请等待');
            sleep(通用休眠时间);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间);
                this.日常任务前往();
            }
        }   

    }


    this.日常任务判断 = () => {
        sleep(通用休眠时间*2);
        var 日常标志 = UTILS.findImage(IMAGE.任务.日常标志,1,0,0.7);
        log(日常标志+'日常标志');
        // sleep(通用休眠时间*2);
        var 商城标志 = UTILS.findImage(IMAGE.商城.商城标志,2,1,0.7);
        log(商城标志+'商城标志');
        // sleep(通用休眠时间*2);
        var 竞技挑战 = UTILS.findImageFullScreen(IMAGE.竞技场.挑战,0.7);
        log(竞技挑战+'竞技挑战');
        // sleep(通用休眠时间*2);
        var 一键强化 = UTILS.findImage(IMAGE.锻造.一键强化,0,2,0.7);
        log(一键强化+'一键强化');
        // sleep(通用休眠时间*2);
        var 强化 = UTILS.findImage(IMAGE.锻造.强化,0,3,0.7);
        log(强化+'强化');
        // sleep(通用休眠时间*2);
        var 强化标志 = UTILS.findImage(IMAGE.锻造.强化标志,2,1,0.7);
        log(强化标志+'强化标志');
        // sleep(通用休眠时间*2);
        var 宝石标志 = UTILS.findImage(IMAGE.锻造.宝石标志,2,1,0.7);
        log(宝石标志+'宝石标志');
        // sleep(通用休眠时间*2);
        var 注灵标志 = UTILS.findImage(IMAGE.锻造.注灵标志,2,1,0.7);
        log(注灵标志+'注灵标志');
        // sleep(通用休眠时间*2);
        var 铸魂标志 = UTILS.findImage(IMAGE.锻造.铸魂标志,2,1,0.7);
        log(铸魂标志+'铸魂标志');
        // sleep(通用休眠时间*2);
        var 跨服5V5标志 = UTILS.findImage(IMAGE.竞技场.跨服5V5标志,2,1,0.7);
        log(跨服5V5标志+'跨服5V5标志');
        // sleep(通用休眠时间*2);
        var 膜拜 = UTILS.findImageFullScreen(IMAGE.其他.膜拜,0.7);
        log(膜拜+'膜拜');
        // sleep(通用休眠时间*2);
        var 寻宝标志 = UTILS.findImage(IMAGE.其他.寻宝标志,2,1,0.7);
        log(寻宝标志+'寻宝标志');
        // sleep(通用休眠时间*2);
        var 寻宝购买 = UTILS.findImage(IMAGE.其他.寻宝购买,2,1,0.7);
        log(寻宝购买+'寻宝购买');
        // sleep(通用休眠时间*2);
        var 神将首领 = UTILS.findImage(IMAGE.其他.神将首领,2,1,0.7);
        log(神将首领+'神将首领');
        // sleep(通用休眠时间*2);
        var 神将首领前往 = UTILS.findImage(IMAGE.其他.神将首领前往,2,2,0.7);
        log(神将首领前往+'神将首领前往');
        // sleep(通用休眠时间*2);
        var 精英首领 = UTILS.findImage(IMAGE.其他.精英首领,2,1,0.7);
        log(精英首领+'精英首领');
        // sleep(通用休眠时间*2);
        // var 精英首领扫荡 = UTILS.findImage(IMAGE.其他.精英首领扫荡,2,2,0.7);
        // log(精英首领扫荡+'精英首领扫荡');
        // sleep(通用休眠时间*2);
        var 副本进入 = UTILS.findImage(IMAGE.其他.副本进入,2,2,0.7);
        log(副本进入+'副本进入');
        // sleep(通用休眠时间*2);
        var 副本扫荡 = UTILS.findImage(IMAGE.其他.副本扫荡,2,2,0.7);
        log(副本扫荡+'副本扫荡');
        // sleep(通用休眠时间*2);
        var 材料副本 = UTILS.findImage(IMAGE.副本.材料副本,2,1,0.7);
        log(材料副本+'材料副本');
        // sleep(通用休眠时间*2);
        var 军团标志 = UTILS.findImageFullScreen(IMAGE.军团.军团标志,0.7);
        log(军团标志+'军团标志');
        // sleep(通用休眠时间*2);
        var 魔神首领 = UTILS.findImage(IMAGE.其他.魔神首领,2,1,0.7);
        log(魔神首领+'魔神首领');
        // sleep(通用休眠时间*2);
        var 主线都尉 = UTILS.findImage(IMAGE.主线.都尉,2,2,0.7);
        log(主线都尉+'主线都尉');
        // sleep(通用休眠时间*2);
        var 福利大厅 = UTILS.findImage(IMAGE.福利大厅,2,1,0.7);
        log(福利大厅+'福利大厅');
        // sleep(通用休眠时间*2);
        var 招财聚宝 = UTILS.findImage(IMAGE.招财聚宝,2,2,0.7);
        log(招财聚宝+'招财聚宝');
        // sleep(通用休眠时间*2);
        var 坐骑标志 = UTILS.findImage(IMAGE.升阶.坐骑标志,2,2,0.7);
        log(坐骑标志+'坐骑标志');
        // sleep(通用休眠时间*2);
        var 坐骑丹 = UTILS.findImage(IMAGE.升阶.坐骑丹提升,2,2,0.7);
        log(坐骑丹+'坐骑丹');
        // sleep(通用休眠时间*2);
        var 美人标识 = UTILS.findImage(IMAGE.其他.美人标识,2,1,0.7);
        log(美人标识+'美人标识');
        // sleep(通用休眠时间*2);
        var 美人提升 = UTILS.findImage(IMAGE.其他.美人提升,2,2,0.7);
        log(美人提升+'美人提升');
        // sleep(通用休眠时间*2);
        var 心法 = UTILS.findImage(IMAGE.角色.心法,1,2,0.7);
        log(心法+'心法');
        sleep(通用休眠时间);
        if(商城标志 ){
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
                sleep(通用休眠时间);
                var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                log(日常任务+'开始日常任务');
                sleep(通用休眠时间*2);
                if(日常任务){
                    UTILS.click(日常任务.x,日常任务.y);
                    sleep(通用休眠时间);
                    var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                    log(日常领取+'日常领取');
                    sleep(通用休眠时间*2);
                    if(日常领取){
                        click(日常领取.x,日常领取.y);
                    }
                }
            }
        }else if(魔神首领 != null && 寻宝购买 != null){
            // storage.put('魔神首领',前往任务);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
            }
            sleep(通用休眠时间);
            var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
            log(日常任务+'开始日常任务');
            sleep(通用休眠时间*2);
            if(日常任务){
                UTILS.click(日常任务.x,日常任务.y);
            }
            sleep(通用休眠时间*2);
        }else if(坐骑标志 != null && 坐骑丹 != null){
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
                    sleep(通用休眠时间);
                    var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                    sleep(通用休眠时间);
                    if(返回){
                        UTILS.click(返回.x,返回.y);
                    }
                    sleep(通用休眠时间);
                    var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                    log(日常任务+'开始日常任务');
                    sleep(通用休眠时间*2);
                    if(日常任务){
                        UTILS.click(日常任务.x,日常任务.y);
                        sleep(通用休眠时间);
                        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                        log(日常领取+'日常领取');
                        sleep(通用休眠时间*2);
                        if(日常领取){
                            click(日常领取.x,日常领取.y);
                        }
                    }
                    sleep(通用休眠时间*2);
                }
            },通用休眠时间)
        }else if(美人标识 != null && 美人提升 != null){
            var 美人提升次数 = 0;
            let 提升时间 = setInterval(() => {
                美人提升次数+=1;
                if(美人提升次数 == 6){
                    clearInterval(提升时间);
                    sleep(通用休眠时间);
                    var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                    sleep(通用休眠时间);
                    if(返回){
                        UTILS.click(返回.x,返回.y);
                    }
                    sleep(通用休眠时间);
                    var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                    log(日常任务+'开始日常任务');
                    sleep(通用休眠时间*2);
                    if(日常任务){
                        UTILS.click(日常任务.x,日常任务.y);
                        sleep(通用休眠时间);
                        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                        log(日常领取+'日常领取');
                        sleep(通用休眠时间*2);
                        if(日常领取){
                            click(日常领取.x,日常领取.y);
                        }
                    }
                    sleep(通用休眠时间*2);
                }else{
                    click(美人提升.x,美人提升.y);
                    sleep(通用休眠时间);
                }
            },通用休眠时间)
        }else if(竞技挑战){
            var 任务时间 = setInterval(() => {
                var 是否竞技 = UTILS.findColorNoClick('#00CA21',[[8,9,'#00CA21'],[5,17,'#007212']],[UTILS.deviceWidth/2,200,UTILS.deviceWidth/4,UTILS.deviceWidth/4],20);
                var 竞技挑战 = UTILS.findImageFullScreen(IMAGE.竞技场.挑战,0.7);
                if(是否竞技 == null && 竞技挑战 != null){
                    clearInterval(任务时间);
                    sleep(通用休眠时间);
                    var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                    sleep(通用休眠时间);
                    if(返回){
                        UTILS.click(返回.x,返回.y);
                    }
                    sleep(通用休眠时间);
                    var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                    log(日常任务+'开始日常任务111111');
                    sleep(通用休眠时间*2);
                    if(日常任务){
                        UTILS.click(日常任务.x,日常任务.y);
                        sleep(通用休眠时间);
                        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                        log(日常领取+'日常领取');
                        sleep(通用休眠时间*2);
                        if(日常领取){
                            click(日常领取.x,日常领取.y);
                        }
                    }
                    sleep(通用休眠时间*2);
                }else{
                    UTILS.click(竞技挑战.x,竞技挑战.y);
                }
             },通用休眠时间)
        }else if(强化标志 != null || 注灵标志 != null && 一键强化 != null && 强化 != null){
            UTILS.click(一键强化.x+30,一键强化.y+20,200);
            sleep(通用休眠时间);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
            }
            sleep(通用休眠时间);
            var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
            log(日常任务+'开始日常任务');
            sleep(通用休眠时间*2);
            if(日常任务){
                UTILS.click(日常任务.x,日常任务.y);
                sleep(通用休眠时间);
                var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                log(日常领取+'日常领取');
                sleep(通用休眠时间*2);
                if(日常领取){
                    click(日常领取.x,日常领取.y);
                }
            }
            sleep(通用休眠时间*2);
        }else if(膜拜){
            click(膜拜.x ,膜拜.y);
            sleep(通用休眠时间);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
            }
            sleep(通用休眠时间);
            var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
            log(日常任务+'开始日常任务');
            sleep(通用休眠时间*2);
            if(日常任务){
                UTILS.click(日常任务.x,日常任务.y);
                sleep(通用休眠时间);
                var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                log(日常领取+'日常领取');
                sleep(通用休眠时间*2);
                if(日常领取){
                    click(日常领取.x,日常领取.y);
                }
            }
            sleep(通用休眠时间*2);
        }else if(寻宝标志 != null && 寻宝购买 != null){
            click(寻宝购买.x ,寻宝购买.y+50);
            sleep(通用休眠时间);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
            }
            sleep(通用休眠时间);
            var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
            log(日常任务+'开始日常任务');
            sleep(通用休眠时间*2);
            if(日常任务){
                UTILS.click(日常任务.x,日常任务.y);
                sleep(通用休眠时间);
                var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                log(日常领取+'日常领取');
                sleep(通用休眠时间*2);
                if(日常领取){
                    click(日常领取.x,日常领取.y);
                }
            }
            sleep(通用休眠时间*2);
        }else if(日常标志){
            UTILS.toastLog('暂时没有资格，请看清要求')
            sleep(通用休眠时间);
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
                UTILS.click(返回.x,返回.y);
            }
            sleep(通用休眠时间);
            var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
            log(日常任务+'开始日常任务');
            sleep(通用休眠时间*2);
            if(日常任务){
                UTILS.click(日常任务.x,日常任务.y);
                sleep(通用休眠时间);
                var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                log(日常领取+'日常领取');
                sleep(通用休眠时间*2);
                if(日常领取){
                    click(日常领取.x,日常领取.y);
                }
            }
            sleep(通用休眠时间*2);
            // clearInterval(任务时间);
        }else if(神将首领 != null && 神将首领前往 != null){
            click(神将首领前往.x ,神将首领前往.y);
            sleep(通用休眠时间);
            var 任务时间 = setInterval(() => {
                var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                log(日常任务+'开始日常任务');
                sleep(通用休眠时间*2);
                if(日常任务){
                    clearInterval(任务时间);
                    sleep(通用休眠时间);
                    UTILS.click(日常任务.x,日常任务.y);
                    sleep(通用休眠时间);
                    var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                    log(日常领取+'日常领取');
                    sleep(通用休眠时间*2);
                    if(日常领取){
                        click(日常领取.x,日常领取.y);
                    }
                }
             },通用休眠时间)
            
        }//else if(精英首领 != null && 精英首领扫荡 != null){
            // click(精英首领扫荡.x ,精英首领扫荡.y);
            // sleep(通用休眠时间);
            // var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            // sleep(通用休眠时间);
            // if(返回){
            //     UTILS.click(返回.x,返回.y);
            // }
            // sleep(通用休眠时间);
            // var 任务时间 = setInterval(() => {
            //     var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
            //     log(日常任务+'开始日常任务');
            //     sleep(通用休眠时间*2);
            //     if(日常任务){
            //         clearInterval(任务时间);
            //         sleep(通用休眠时间);
            //         UTILS.click(日常任务.x,日常任务.y);
            //         sleep(通用休眠时间);
            //         var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
            //         log(日常领取+'日常领取');
            //         sleep(通用休眠时间*2);
            //         if(日常领取){
            //             click(日常领取.x,日常领取.y);
            //         }
            //     }
            //  },通用休眠时间)
            
        /*}*/else if(副本进入 != null && 副本扫荡 != null && 材料副本 != null){
            let 副本扫荡时间 = setInterval(() => {
                var 副本进入 = UTILS.findImage(IMAGE.其他.副本进入,2,2,0.7);
                var 副本扫荡 = UTILS.findImage(IMAGE.其他.副本扫荡,2,2,0.7);
                var 材料副本 = UTILS.findImage(IMAGE.副本.材料副本,2,1,0.7);
                if(副本进入 == null && 材料副本 != null && 副本扫荡 != null){
                   clearInterval(副本扫荡时间);
                   sleep(通用休眠时间);
                    var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                    sleep(通用休眠时间);
                    if(返回){
                        UTILS.click(返回.x,返回.y);
                    }
                    sleep(通用休眠时间);
                    var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                    log(日常任务+'开始日常任务');
                    sleep(通用休眠时间*2);
                    if(日常任务){
                        UTILS.click(日常任务.x,日常任务.y);
                        sleep(通用休眠时间);
                        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                        log(日常领取+'日常领取');
                        sleep(通用休眠时间*2);
                        if(日常领取){
                            click(日常领取.x,日常领取.y);
                        }
                    } 
                }else{
                    click(副本扫荡.x ,副本扫荡.y);
                    sleep(通用休眠时间*2);
                }
            },通用休眠时间)
              
        }else if(副本进入 != null && 材料副本 != null){
            click(副本进入.x ,副本进入.y);
            sleep(通用休眠时间);
            var 返回时间 = setInterval(() => {
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                if(返回){
                    UTILS.click(返回.x,返回.y);
                    sleep(通用休眠时间);
                    clearInterval(返回时间);
                    sleep(通用休眠时间);
                    var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                    log(日常任务+'开始日常任务');
                    sleep(通用休眠时间*2);
                    if(日常任务){
                        UTILS.click(日常任务.x,日常任务.y);
                        sleep(通用休眠时间);
                        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                        log(日常领取+'日常领取');
                        sleep(通用休眠时间*2);
                        if(日常领取){
                            click(日常领取.x,日常领取.y);
                        }
                    }   
                }
            },通用休眠时间)
        }else if(军团标志){
                UTILS.toastLog('你已经进入军团页面');
                sleep(通用休眠时间);
                var 军团大厅 = UTILS.findImageFullScreen(IMAGE.军团.军团大厅,0.7);
                if(军团大厅){
                    UTILS.click(军团大厅.x,军团大厅.y);
                    sleep(通用休眠时间);
                    var 军团捐赠 = UTILS.findImage(IMAGE.军团.军团捐赠,2,2,0.7);
                    log(军团捐赠)
                    sleep(通用休眠时间);
                    var 捐赠时间 = setInterval(() => {
                      var 是否捐赠 = UTILS.findColorNoClick('#B21C0C',[[0,3,'#D5220F'],[10,6,'#AA1B0C']],[UTILS.deviceWidth/3*2,UTILS.deviceHeight/2,UTILS.deviceWidth/4,UTILS.deviceHeight/4],20)
                     if(是否捐赠 != null){
                         clearInterval(捐赠时间);
                         sleep(通用休眠时间);
                         var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                         sleep(通用休眠时间);
                         if(返回){
                            UTILS.click(返回.x,返回.y);
                            sleep(通用休眠时间);
                            var 退出 = UTILS.findColorNoClick('#140303',[[26,33,'#EDDB9C'],[62,59,'#752B11']],[UTILS.deviceWidth/6*5,0,UTILS.deviceWidth/7,UTILS.deviceHeight],20); 
                            if(退出){
                                UTILS.click(退出.x,退出.y);
                                sleep(通用休眠时间);
                                var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                                log(日常任务+'开始日常任务');
                                sleep(通用休眠时间);
                                var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                                log(日常任务+'开始日常任务');
                                sleep(通用休眠时间*2);
                                if(日常任务){
                                    UTILS.click(日常任务.x,日常任务.y);
                                    sleep(通用休眠时间);
                                    var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                                    log(日常领取+'日常领取');
                                    sleep(通用休眠时间*2);
                                    if(日常领取){
                                        click(日常领取.x,日常领取.y);
                                    }
                                }      
                            }
                            
                         }
                     }else{
                         UTILS.click(军团捐赠.x,军团捐赠.y,200)
                     }
                    },通用休眠时间)
                }
             }else if(心法){
                sleep(通用休眠时间);
                UTILS.click(心法.x,心法.y);
                sleep(2000);
                var 心法升级按钮 = UTILS.findImage(IMAGE.角色.心法升级按钮,2,1,0.7);
                sleep(2000);
                UTILS.click(心法升级按钮.x,心法升级按钮.y,400);
                sleep(2000);
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                if(返回){
                UTILS.click(返回.x,返回.y);
                sleep(通用休眠时间);
                var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                log(日常任务+'开始日常任务');
                sleep(通用休眠时间);
                if(日常任务){
                    UTILS.click(日常任务.x,日常任务.y);
                    sleep(通用休眠时间);
                    var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                    log(日常领取+'日常领取');
                    sleep(通用休眠时间*2);
                    if(日常领取){
                        click(日常领取.x,日常领取.y);
                    }
                }      
                
                }
            }else if(主线都尉){
                 console.log(111);
                 sleep(通用休眠时间);
                 click(主线都尉.x,主线都尉.y);
                 sleep(通用休眠时间);
                 var 任务时间 = setInterval(() => {
                    var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                    log(日常任务+'开始日常任务');
                    sleep(通用休眠时间*2);
                    if(日常任务){
                        clearInterval(任务时间);
                        sleep(通用休眠时间);
                        UTILS.click(日常任务.x,日常任务.y);
                        sleep(通用休眠时间);
                        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                        log(日常领取+'日常领取');
                        sleep(通用休眠时间*2);
                        if(日常领取){
                            click(日常领取.x,日常领取.y);
                        }
                    }
                 },通用休眠时间)
             }else if(福利大厅 != null && 招财聚宝 != null) {
                UTILS.click(招财聚宝.x,招财聚宝.y);
                sleep(通用休眠时间);
                var 聚宝 = UTILS.findImage(IMAGE.聚宝,2,1,0.7);
                if(聚宝){
                    UTILS.click(聚宝.x,聚宝.y,200);
                    sleep(通用休眠时间);
                    var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                    sleep(通用休眠时间);
                    if(返回){
                    UTILS.click(返回.x,返回.y);
                    sleep(通用休眠时间);
                    var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                    log(日常任务+'开始日常任务');
                    sleep(通用休眠时间);
                    if(日常任务){
                        UTILS.click(日常任务.x,日常任务.y);
                        sleep(通用休眠时间);
                        var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                        log(日常领取+'日常领取');
                        sleep(通用休眠时间*2);
                        if(日常领取){
                            click(日常领取.x,日常领取.y);
                        }
                    }      
                    
                    }
                }
             }else if(跨服5V5标志 != null){
                sleep(通用休眠时间);
                UTILS.toastLog('战场未开启,请等待');
                sleep(通用休眠时间);
                var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
                sleep(通用休眠时间);
                if(返回){
                    UTILS.click(返回.x,返回.y);
                }
                sleep(通用休眠时间);
                var 日常任务 = UTILS.findImage(IMAGE.任务.任务按钮,0,2,0.7);
                log(日常任务+'开始日常任务');
                sleep(通用休眠时间*2);
                if(日常任务){
                    UTILS.click(日常任务.x,日常任务.y);
                    sleep(通用休眠时间);
                    var 日常领取 = UTILS.findImage(IMAGE.其他.日常领取,2,2,0.7);
                    log(日常领取+'日常领取');
                    sleep(通用休眠时间*2);
                    if(日常领取){
                        click(日常领取.x,日常领取.y);
                    }
                }
                sleep(通用休眠时间*2);
        }
    }


    this.新手每日必刷 = () => {
        UTILS.toastLog('开始领取登录礼包');
        sleep(通用休眠时间);
        var 领取奖励;
        var 登录礼包 = UTILS.findImage(IMAGE.新手必刷.登录礼包,0,0,0.7);
        log(登录礼包+3333);
        sleep(通用休眠时间);
        if(登录礼包){
            UTILS.click(登录礼包.x,登录礼包.y);
            sleep(通用休眠时间);
            this.新手每日必刷();
        }
        sleep(通用休眠时间);
        var 领取奖励 = UTILS.findColorNoClick('#1F1B15',[[6,34,'#251E12'],[33,18,'#6C0C00'],[49,33,'#C6991F'],[87,53,'#4A2D05'],[222,8,'#4A2D05']],[UTILS.deviceWidth/3,0,UTILS.deviceWidth/3,UTILS.deviceHeight],20);
        log(领取奖励+2222);
        if(领取奖励){
            UTILS.click(领取奖励.x,领取奖励.y);
            sleep(通用休眠时间);
            this.新手每日必刷();
        }
        sleep(通用休眠时间);
        var 暂无领取 = UTILS.findColorNoClick('#1A1A1A',[[224,5,'#7D7D7D'],[13,38,'#3D3D3D'],[172,29,'#BEBEBE'],[57,38,'#AAAAAA'],[123,55,'#494949']],[UTILS.deviceWidth/3,300,UTILS.deviceWidth/3,UTILS.deviceHeight-300],20);
        log(暂无领取+1111);
        if(暂无领取){
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
            UTILS.click(返回.x,返回.y);   
            }
            return;
        }
    }

    this.竞技挑战s = () => {
        var 是否竞技 = UTILS.findColorNoClick('#00CA21',[[8,9,'#00CA21'],[5,17,'#007212']],[UTILS.deviceWidth/2,200,UTILS.deviceWidth/4,UTILS.deviceWidth/4],20);
        var 竞技挑战 = UTILS.findImageFullScreen(IMAGE.竞技场.挑战,0.7);
        var 取消托管 = UTILS.findImageFullScreen(IMAGE.竞技场.取消托管,0.7);
        if(是否竞技 == null && 竞技挑战 != null){
            UTILS.toastLog('挑战次数不够');
            var 返回 = UTILS.findImage(IMAGE.返回,2,2,0.7);
            sleep(通用休眠时间);
            if(返回){
            UTILS.click(返回.x,返回.y);   
            }
        }
        if(是否竞技 != null && 竞技挑战 != null){
            UTILS.click(竞技挑战.x,竞技挑战.y);
            sleep(1000);
            this.竞技挑战s();
        }
        if(取消托管){
            UTILS.toastLog('正在挑战请等待');
            this.竞技挑战s();
        }
    }


    this.主线任务 = () => {
        var 主线都尉 = UTILS.findImage(IMAGE.主线.都尉,2,2,0.7);
        var 取消托管 = UTILS.findImageFullScreen(IMAGE.竞技场.取消托管,0.7);
        log(主线都尉+'主线都尉');

        if(主线都尉){
            click(主线都尉.x,主线都尉.y);
            this.主线任务();
        }

        if(取消托管){
            UTILS.toastLog('正在挑战请等待');
            this.主线任务();   
        }
    }



    


}
let game = new main();
game.init()