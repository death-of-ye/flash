if (!requestScreenCapture()) {
  toastLog("请求截图失败");
  exit();
}
var IMAGE = require('image.js');
var UTILS = require('utils.js');
UTILS.setScreenMetrics()
var stopFunction = 0;
var ifDef = 0;
var m = 0;
var closeCod = 0;
var sixCod = 0;
var ronCod = 0;
var first = 0;
var three = 0;
var 第一次 = 0;
var back = '';
var sixIm = 0;
var 失败次数 = 0;
var 刷金币次数 = 0;
var 刷金币最大次数 = 200;
var 是否自动刷金币 = false;
var 是否打冒险模式 = false;
var 是否打武道大会 = false;
var 是否打六国远征 = false;
var 是否领取奖励 = false;
var 记录次数 = 0;
var 记录失败次数 = 0;
const 游戏包名 = "com.tencent.tmgp.sgame";
const 游戏名称 = "王者荣耀";
var gameId = 448276; //542018;
var auxiliaryId = 25;
var version = 104;
//
var filePath = "/sdcard/脚本/" + gameId + "/" + auxiliaryId + "/" + version + "/config.json";
function Sc () { };
(function () {
  UTILS.mapList[0].area[0].areaMin = {
    area: [
      { x: 0, y: 0 },
      { x: UTILS.deviceWidth / 4, y: 0 },
      { x: 0, y: UTILS.deviceHeight / 4 },
      { x: UTILS.deviceWidth / 4, y: UTILS.deviceHeight / 4 }
    ]
  }
  UTILS.mapList[0].area[1].areaMin = {
    area: [
      { x: UTILS.deviceWidth / 2, y: 0, },
      { x: UTILS.deviceWidth * (3 / 4), y: 0 },
      { x: UTILS.deviceWidth / 2, y: UTILS.deviceHeight / 4 },
      { x: UTILS.deviceWidth * (3 / 4), y: UTILS.deviceHeight * (3 / 4) }
    ]
  }
  UTILS.mapList[0].area[2].areaMin = {
    area: [
      { x: 0, y: UTILS.deviceHeight / 2, },
      { x: UTILS.deviceWidth / 4, y: UTILS.deviceHeight / 2 },
      { x: 0, y: UTILS.deviceHeight * (3 / 4) },
      { x: UTILS.deviceWidth / 4, y: UTILS.deviceHeight * (3 / 4) }
    ]
  }
  UTILS.mapList[0].area[3].areaMin = {
    area: [
      { x: UTILS.deviceWidth / 2, y: UTILS.deviceHeight / 2, },
      { x: UTILS.deviceWidth * (3 / 4), y: UTILS.deviceHeight / 2 },
      { x: UTILS.deviceWidth / 2, y: UTILS.deviceHeight * (3 / 4) },
      { x: UTILS.deviceWidth * (3 / 4), y: UTILS.deviceHeight * (3 / 4) }
    ]
  }
})();
(function () {
  //读取指定位置文件内容配置初始化数据
  if (!files.isFile(filePath)) {
    UTILS.toastLog("==指定配置文件不存在==");
    exit();
  } else {
    var res = files.read(filePath);
    if (!res) {
      UTILS.toastLog("==指定配置文件内容为空==");
      exit();
    } else {
      var res = JSON.parse(res)
      是否打冒险模式 = res.checkbox[0].checked;
      是否打武道大会 = res.checkbox[1].checked;
      是否打六国远征 = res.checkbox[2].checked;
      是否领取奖励 = res.checkbox[3].checked;
      是否自动刷金币 = res.checkbox[4].checked;
    }
  }
})()
/**
 * @function 指定次数找图并点击
 * @param {打印的字符串} image 
 */
Sc.prototype.LookImageCirc = function (base64, startX, startY, w, h, threshold, times, maxTimes, image, sleepTime, OffsetX, OffsetY) {
  var receive = UTILS.customAreaFindImageNoClick(base64, startX, startY, w, h, threshold);
  if (!receive) {
    times++;
    if (times < maxTimes) {
      sleep(sleepTime);
      receive = this.LookImageCirc(base64, startX, startY, w, h, threshold, times, maxTimes, image, sleepTime);
    } else {
      log(image + "没找到");
    }
  } else {
    sleep(1000);
    log(image + receive);
    UTILS.click(receive.x, receive.y, OffsetX, OffsetY);
    //Tap(receive.x, receive.y);
  }
  times = 0;
  return receive;
}
Sc.prototype.随机人物 = function () {

  for (var i = 0; i < 3; i++) {
    sleep(500);
    //UTILS.click
    UTILS.click(Math.floor((Math.random() * UTILS.deviceWidth * (3 / 4)) + 1) + 50, Math.random() * UTILS.deviceHeight + 120);
    var 体验卡 = this.LookImageCircNoclick(IMAGE.体验卡取消, UTILS.deviceWidth / 4, UTILS.deviceHeight * (5 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 7, 0.7, 0, 5, "下次吧", 1000)
    if (体验卡) {
      UTILS.click(体验卡.x, 体验卡.y);
    }
  }
  if (receive = this.LookImageCircNoclick(IMAGE.透明, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.8, 0, 3, "透明", 1000)) {
    toast("开始")
  } else if (receivea = this.LookImageCircNoclick(IMAGE.透明1, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.9, 0, 3, "六国", 1000)) {
    toast("开始.")
  }
  ronCod++;
  if ((receive || receivea) && ronCod < 60) {
    this.随机人物();
  }
  ronCod = 0
}
/**
 * @function 指定次数找图
 * @param {打印的字符串} image 
 */
Sc.prototype.LookImageCircNoclick = function (base64, startX, startY, w, h, threshold, times, maxTimes, image, sleepTime) {
  var receive = UTILS.customAreaFindImageNoClick(base64, startX, startY, w, h, threshold);
  if (!receive) {
    times++;
    if (times < maxTimes) {
      sleep(sleepTime);
      receive = this.LookImageCircNoclick(base64, startX, startY, w, h, threshold, times, maxTimes, image, sleepTime);
      log(image + "---" + receive)
    } else {
      log(image + "没找到");
    }
  }
  times = 0;
  return receive;
}
/**
 * @function 指定次数找色
 * @param {打印的字符串} image 
 */
Sc.prototype.ImageCircAndclick = function (firstColor, colorList, positionArray, threshold, times, maxTimes, image, sleepTime) {
  var receive = UTILS.findColorNoClick(firstColor, colorList, positionArray, threshold);
  if (!receive) {
    times++;
    if (times < maxTimes) {
      sleep(sleepTime);
      receive = this.ImageCircAndclick(firstColor, colorList, positionArray, threshold, times, maxTimes, image, sleepTime);
    } else {
      log(image + "没找到");
    }
  } else {
    sleep(2000);
    log(image + receive);
    UTILS.click(receive.x, receive.y);
    //Tap(receive.x, receive.y);
  }
  times = 0;
  return receive;
}
/**
 * @function 判断游戏画面是否卡住
 * @param {回调函数} imageLookClick 
 */
Sc.prototype.estimateLock = function (imageLookClick) {
  sleep(1000)
  lat_img = captureScreen();
  tamp++;
  if (tamp > 25) {
    tamp = 0;
    toast("超时")
    r = 0;
  }
  if ((images.pixel(lat_img, 50, 32) == imgColor) || images.pixel(lat_img, 100, 100) == imgColorS) {
    r++;
    if (r > 20) {
      toast("卡住")
      sleep(500)
      imageLookClick()
      r = 0;
    }
  }
}
Sc.prototype.冒险模式进入 = function () {
  this.LookImageCirc(IMAGE.万象天宫, UTILS.deviceWidth * 0.7, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 5, UTILS.deviceHeight / 4, 0.8, 0, 6, "万象天宫", 2000)
  for (var i = 0; i < 5; i++) {
    sleep(1000)
    swipe(UTILS.deviceWidth * 0.29, UTILS.deviceHeight * 0.46, UTILS.deviceWidth * 0.2, UTILS.deviceHeight * 0.15, 500)
  }
  sleep(2000)
  this.LookImageCirc(IMAGE.万象天宫冒险, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (2 / 5), UTILS.deviceWidth / 4, UTILS.deviceHeight / 5, 0.7, 0, 6, "万象天宫冒险", 2000)
  this.LookImageCirc(IMAGE.冒险开始, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "冒险开始", 2000)
}
/**
 * @function 找特定的图找到了就点击
 * @param {回调函数} randomS, estimateLock, imageLookClick 
 * @param {switch开关} n
 */
Sc.prototype.LoopFigureClick = function (base64, positionArray, threshold, randomS, estimateLock, n, imageLookClick) {
  var n = n || 2;
  var arr = '';
  var receive = UTILS.customAreaFindImageNoClick(base64, positionArray[0], positionArray[1], positionArray[2], positionArray[3], threshold);
  if (receive) {
    // var receiveb = UTILS.findColorNoClick(firstColor, colorList, positionArray, threshold);
    sleep(1000)
    //if ((receiveb)) {
    // log(receiveb)
    sleep(1000)
    UTILS.click((receive.x), receive.y);
    //Tap((receive.x),receive.y);
    arr = receive
    // }
  }
  switch (n) {
    case 1:
      randomS();
      estimateLock(imageLookClick);
      break;
  }
  return arr;
}



/**
 * @function 找特定的图
 */
Sc.prototype.recursionSearchImageBoss = function (base64, firstColor, colorList, positionArray, threshold) {
  var receive = UTILS.customAreaFindImageNoClick(base64, positionArray[0], positionArray[1], positionArray[2], positionArray[3], threshold);
  if (!receive) {
    var receiveb = UTILS.findColorNoClick(firstColor, colorList, positionArray, threshold);
  }
  if (receive) {
    sleep(1000);
    closeCod++;
    if (closeCod > 3) {
      m = 0;
      closeCod = 0;
    }
    sleep(10000)
    this.recursionSearchImageBoss(base64, firstColor, colorList, positionArray, threshold)
  } else if ((!receive) && m < 20) {
    m++;
    log(m + "=====")
    sleep(1000)
    this.recursionSearchImageBoss(base64, firstColor, colorList, positionArray, threshold)
  }
  m = 0;
  closeCod = 0;
}

Sc.prototype.ifHome = function () {
  var home = this.LookImageCircNoclick(IMAGE.万象天宫, UTILS.deviceWidth * 0.7, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 5, UTILS.deviceHeight / 4, 0.8, 0, 5, "万象天宫", 1000)
  if (home) {
    this.冒险模式进入();
  } else if (UTILS.findImage(IMAGE.冒险进入, 2, 0, 0.7)) {
    for (var i = 0; i < 5; i++) {
      sleep(1000)
      swipe(UTILS.deviceWidth * 0.29, UTILS.deviceHeight * 0.46, UTILS.deviceWidth * 0.2, UTILS.deviceHeight * 0.15, 500)
    }
    sleep(2000)
    if (冒险进入了 = UTILS.findImage(IMAGE.冒险进入了, 2, 2, 0.7)) {
      UTILS.click(冒险进入了.x, 冒险进入了.y);
    }
    //this.LookImageCirc(IMAGE.万象天宫冒险, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (2 / 5), UTILS.deviceWidth / 4, UTILS.deviceHeight / 5, 0.7, 0, 6, "万象天宫冒险", 2000)
    this.LookImageCirc(IMAGE.冒险开始, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "冒险开始", 2000)
  } else if (冒险开始 = UTILS.findImage(IMAGE.冒险开始, 0, 3, 0.7)) {
    UTILS.click(冒险开始.x, 冒险开始.y);
    toastLog("进入")
  } else {
    bac = this.LookImageCirc(IMAGE.邮件返回, 0, 0, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4,
      0.7, 0, 6, "邮件返回", 2000)
    for (var k = 0; k < 5; k++) {
      if (!bac) {
        break;
      } else {
        bac = this.LookImageCirc(IMAGE.邮件返回, 0, 0, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4,
          0.7, 0, 6, "邮件返回", 2000)
      }
    }
    this.冒险模式进入();
  }
}
/*
 * @function 返回
*/
Sc.prototype.isBack = function () {
  //   if(back){sleep(500);press(back.x,back.y,100)}
  if (back) {
    sleep(500);
    //Tap(back.x,back.y)
    press(back.x, back.y, 100)
  } else {
    back = this.LookImageCircNoclick(IMAGE.邮件返回, 0, 0, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4,
      0.7, 0, 6, "邮件返回", 2000)
    if (back) {
      //Tap(back.x,back.y)
      press(back.x, back.y, 100)
    } else {
      for (var i = 0; i < 5; i++) {
        if (!back) {
          back = this.isBack();
        }
      }

    }
  }
}
/**
 * @function 找特定的图找到了就点击
 * @param {回调函数} randomS, estimateLock, imageLookClick 
 * @param {switch开关} n
 */
Sc.prototype.recursionSearchImage = function (base64, firstColor, colorList, positionArray, threshold, offtype, randomS, estimateLock, n, selfMotion) {
  offtype = offtype || 1;
  var n = n || 2;
  // var im = captureScreen()
  // imgColor = images.pixel(im, 50, 32);
  // imgColorS = images.pixel(im, 100, 100);
  var receive = UTILS.customAreaFindImageNoClick(base64, positionArray[0], positionArray[1], positionArray[2], positionArray[3], threshold);
  log("receive==" + receive)
  if (receive) {
    var receiveb = UTILS.findColorNoClick(firstColor, colorList, positionArray, threshold);
    sleep(1000)
    if (receiveb) {
      log("receive--b==" + receiveb)
      sleep(1000)
      UTILS.click((receiveb.x) - 30, receiveb.y);
      //Tap((receiveb.x) - 30, receiveb.y);
      arr = receiveb
    }
  }
  switch (n) {
    case 1:
      randomS();
      estimateLock();
      selfMotion();
      if (stopFunction == 1 || stopFunction == 2 || 记录失败次数 > 5) {
        ifDef = 1;
        stopFunction = 0;
        记录失败次数 = 0
        return;
      }
      break;
    case 2:
  }
  switch (offtype) {
    case 1:
      if (!(receive) || !receiveb) {
        sleep(500);
        this.recursionSearchImage(base64, firstColor, colorList, positionArray, threshold, offtype, randomS, estimateLock, n, selfMotion)
      }
      break;
    case 2:
      if (receive) {
        sleep(1000);
        log(m + "----------m")
        closeCod++;
        if (closeCod > 2) {
          m = 0;
          closeCod = 0;
        }
        this.recursionSearchImage(base64, firstColor, colorList, positionArray, threshold, offtype, randomS, estimateLock, n, selfMotion);
      } else if ((!receive) && m < 2) {
        m++;
        toast("等待")
        sleep(1000);
        this.recursionSearchImage(base64, firstColor, colorList, positionArray, threshold, offtype, randomS, estimateLock, n, selfMotion);
      }
  }
  m = 0;
}
var 冒险模式 = new Sc();
冒险模式.章节 = ['', '', IMAGE.第二个章节, IMAGE.第三个章节, IMAGE.第四个章节];
冒险模式.人物 = [IMAGE.诸葛亮, IMAGE.老夫子, IMAGE.嬴政, IMAGE.廉颇];
冒险模式.坐标x = [UTILS.deviceWidth / 4];
冒险模式.坐标y = [UTILS.deviceHeight / 2, UTILS.deviceHeight * (3 / 4)];
冒险模式.judgeChapters = function () {
  //LookImageCirc = function (base64, startX, startY, w, h, threshold, times, maxTimes, image, sleepTime)
  var receiveA = this.LookImageCircNoclick(IMAGE.大师, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight / 2, UTILS.deviceWidth / 8, UTILS.deviceHeight / 2, 0.7, 0, 5, "大师", 1000)
  log("receiveA====" + receiveA)
  if (receiveA) {
    var receiveB = this.LookImageCircNoclick(IMAGE.五角形, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight / 2, UTILS.deviceWidth / 8, UTILS.deviceHeight / 4, 0.9, 0, 5, "五角形", 1000)
    log("receiveB====" + receiveB)
    if (receiveB) {
      for (var i = 0; i < 3; i++) {
        var receiveC = this.LookImageCircNoclick(this.人物[i], UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 8, UTILS.deviceHeight / 5, 0.7, 0, 1, "人物", 1000)
        if (receiveC) {
          if (i == 0) {
            this.LookImageCirc(this.章节[i + 2], this.坐标x[0], this.坐标y[0], UTILS.deviceWidth / 8, UTILS.deviceHeight / 4, 0.7, 0, 6, "第" + i + "个章节", 5000)
          } else if (i == 1) {
            this.LookImageCirc(this.章节[i + 2], this.坐标x[0], this.坐标y[1], UTILS.deviceWidth / 8, UTILS.deviceHeight / 4, 0.7, 0, 6, "第" + i + "个章节", 5000)
          } else if (i == 2) {
            for (var j = 0; j < 3; j++) {
              sleep(500)
              swipe(UTILS.deviceWidth * 0.14, UTILS.deviceHeight * 0.5, UTILS.deviceWidth * 0.15, UTILS.deviceHeight * 0.25, 500)
            }
            this.LookImageCirc(this.章节[i + 2], this.坐标x[0], this.坐标y[1], UTILS.deviceWidth / 8, UTILS.deviceHeight / 4, 0.7, 0, 6, "第" + i + "个章节", 5000)
          }
          break;
        }
      }
    }
  }
}
冒险模式.副本 = function () {
  sleep(2000)
  var make = this.LookImageCirc(IMAGE.闯关, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "闯关", 5000)
  if (make) {
    this.recursionSearchImage(IMAGE.继续1, "#ffffff",
      [
        [1, 0, "#ffffff"],
      ],
      [UTILS.deviceWidth / 2, UTILS.deviceHeight * (7 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8],
      0.7, 1,
      () => {
        this.LookImageCirc(IMAGE.跳过, UTILS.deviceWidth * (3 / 4), 0, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 2, "跳过", 2000)
      },
      () => {
        var b = this.LookImageCirc(IMAGE.失败返回, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 8, UTILS.deviceHeight / 4, 0.9, 0, 1, "失败返回", 2000)
        if (b) { stopFunction++; }
      },
      1
      , () => {
        //LoopFigureClick = function (base64, firstColor, colorList, positionArray, threshold, randomS, estimateLock, n, imageLookClick)
        this.LoopFigureClick(IMAGE.自动,
          [UTILS.deviceWidth * (3 / 4), 0, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4]
          , 0.9)
      },
      new Promise(() => {
        UTILS.customAreaFindImageClick(IMAGE.成就确定, UTILS.deviceWidth * 0.33, UTILS.deviceHeight * 0.62, UTILS.deviceWidth / 4, UTILS.deviceHeight * 0.3, 0, 0, 0.7)
      })

    )
    this.LookImageCirc(IMAGE.成就确定, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 3, "成就确定", 1000)
    this.LookImageCirc(IMAGE.失败返回, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 2, "失败返回", 2000)
    this.LookImageCirc(IMAGE.点击屏幕继续, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 10, "等候", 1000)
    this.LookImageCirc(IMAGE.返回, UTILS.deviceWidth / 2, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 2, "返回", 5000)
  }
}
冒险模式.start = function () {
  sleep(500)
  var 屏幕比例 = [0.21, 0.37, 0.56]
  this.LookImageCirc(IMAGE.冒险, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight / 4, UTILS.deviceWidth / 3, UTILS.deviceHeight / 2, 0.7, 0, 6, "冒险", 3000)
  if (刷金币次数 >= 刷金币最大次数) {
    UTILS.log("脚本执行结束");
    exit();
  } else {
    UTILS.toastLog("刷金币当前次数:" + 刷金币次数 + "次   总次数:" + 刷金币最大次数 + "次");
    第一次++
    ///////////////////////////////////////////////
    sleep(500);
    if (第一次 == 1) {
      for (var j = 0; j < 2; j++) {
        sleep(500)
        swipe(UTILS.deviceWidth * 0.14, UTILS.deviceHeight * 0.29, UTILS.deviceWidth * 0.15, UTILS.deviceHeight * 0.46, 500)
      }//0.7
      sleep(500)
      this.LookImageCirc(IMAGE.第一个章节, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, UTILS.deviceWidth / 8, UTILS.deviceHeight / 8, 0.7, 0, 6, "第一个章节", 2000)

      var nextStep = this.LookImageCircNoclick(IMAGE.下一步, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "下一步", 5000)
      if (nextStep) {
        下一步坐标Y = nextStep.y;
      }//0.37    0.21
      for (var i = 0; i < 3; i++) {
        UTILS.click(nextStep.x, 下一步坐标Y - UTILS.deviceHeight * 屏幕比例[i]);
        if (魔女 = UTILS.findImage(IMAGE.魔女, 2, 1, 0.7)) {
          //"#ffffff",[[10,0,"#ff9900"],[20,0,"#ffff00"]],[0,0,100,100],0.7
          var 白色 = UTILS.findColorNoClick("#cdced0", [], [魔女.x, 魔女.y, 100, 20], 6, 0, 0)
          if (白色) {
            UTILS.click(白色.x, 白色.y);
          }
        }
        if (白色) {
          break;
        }
      }
      this.LookImageCirc(IMAGE.五角形, UTILS.deviceWidth / 4, UTILS.deviceHeight * (3 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.9, 0, 6, "五角星", 3000)
    }
    var nextStep = this.LookImageCircNoclick(IMAGE.下一步, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "下一步", 5000)
    if (nextStep) {
      UTILS.click(nextStep.x, nextStep.y);
      //Tap(nextStep.x,nextStep.y);              
    }
    冒险模式.副本();

    /////////////////////////////////////////////////////
    刷金币次数++;
    this.start();
  }
}
冒险模式.chapter = function () {
  this.LookImageCirc(IMAGE.冒险, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight / 4, UTILS.deviceWidth / 3, UTILS.deviceHeight / 2, 0.7, 0, 6, "冒险", 3000)
  while (true) {
    if (ifDef == 1 && 失败次数 == 1) {
      失败次数 = 0;
      return;
    }
    this.judgeChapters();
    three++;
    var nextStep = this.LookImageCircNoclick(IMAGE.下一步, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "下一步", 5000)
    if (nextStep) {
      UTILS.click(nextStep.x, nextStep.y);
      //Tap(nextStep.x,nextStep.y);              
    }
    if (three == 1) {
      this.LookImageCirc(IMAGE.更换阵容, UTILS.deviceWidth / 2, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 5, "更换阵容", 5000)
      this.LookImageCirc(IMAGE.展开, 0, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "展开", 5000)
      this.随机人物();
    }
    冒险模式.副本();
  }
}
var 武道大会 = new Sc();
武道大会.startBudo = function () {
  var budo = this.LookImageCircNoclick(IMAGE.武道大会, 0, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 4, "武道大会", 2000)
  if (budo) {
    UTILS.click(budo.x, budo.y);
    //Tap(budo.x,budo.y);
  } else if (budoa = this.LookImageCircNoclick(IMAGE.武道, 0, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 4, "武道大会", 2000)) {
    UTILS.click(budoa.x, budoa.y);
    //Tap(budoa.x,budoa.y);
  }
  if (budo || budoa) {
    sleep(500)
    for (var i = 0; i < 6; i++) {
      this.LookImageCirc(IMAGE.武道挑战, UTILS.deviceWidth * (3 / 10), UTILS.deviceHeight * (6 / 10), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 3, "武道挑战", 2000)
      var challenge = this.LookImageCirc(IMAGE.挑战进入, UTILS.deviceWidth / 2, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 3, "挑战进入", 2000)
      log("挑战进入" + challenge);
      first++;
      if (challenge) {
        if (first == 1) {
          this.LookImageCirc(IMAGE.展开, 0, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "展开", 5000)
          this.随机人物(IMAGE.六国远征人物);
        }
        var 确定 = this.LookImageCirc(IMAGE.确定, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 6, "确定", 5000)

        // this.LookImageCirc(IMAGE.确定, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "确定", 5000)

        //(base64, firstColor, colorList, positionArray, threshold, offtype, randomS,estimateLock, n,selfMotion)
        if (确定) {
          this.recursionSearchImage(IMAGE.胜利, "#e9d49a",
            [
              [1, 0, "#e0cb94"],
              [2, 0, "#f8edc4"],
              [3, 1, "#fff7ce"],
              [0, 1, "#dcc78d"],
              [1, 1, "#d1bc85"],
            ], [UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4]
            , 0.7, 1,
            () => {
              var defeated = this.LookImageCirc(IMAGE.武道失败, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 1, "武道失败", 2000)
              if (defeated) { stopFunction++; 失败次数++ }
            }, () => {
              var defeateda = this.LookImageCircNoclick(IMAGE.继续1, UTILS.deviceWidth / 2, UTILS.deviceHeight * (7 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.9, 0, 1, "继续", 2000)
              if (defeateda) { stopFunction++; }
            }, 1, () => { },
            new Promise(() => {
              UTILS.customAreaFindImageClick(IMAGE.成就确定, UTILS.deviceWidth * 0.33, UTILS.deviceHeight * 0.62, UTILS.deviceWidth / 4, UTILS.deviceHeight * 0.3, 0, 0, 0.7)
            })
          );
        }
        this.LookImageCirc(IMAGE.成就确定, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 5, "成就确定", 1000)
        // this.LookImageCirc(IMAGE.武道点击继续, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 5, "武道点击继续", 2000)          
        sleep(3000)
        var goCon = this.LookImageCircNoclick(IMAGE.武道继续, UTILS.deviceWidth / 2, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 10, "武道继续", 2000)
        if (goCon) {
          UTILS.click(goCon.x, goCon.y);
          //Tap(goCon.x,goCon.y);
          for (var j = 0; j < 10; j++) {
            goCon = this.LookImageCircNoclick(IMAGE.武道继续, UTILS.deviceWidth / 2, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 5, "武道继续", 500)
            if (!goCon) {
              break;
            } else {
              UTILS.click(goCon.x, goCon.y);
              //Tap(goCon.x,goCon.y);
            }
          }
        }
        this.LookImageCirc(IMAGE.确定, UTILS.deviceWidth * 0.36, UTILS.deviceHeight * 0.75, UTILS.deviceWidth / 4, UTILS.deviceHeight * 0.25, 0.8, 0, 5, "确定", 500)
        this.LookImageCirc(IMAGE.武道继续1, UTILS.deviceWidth / 3, UTILS.deviceHeight * (7 / 8), UTILS.deviceWidth / 3, UTILS.deviceHeight / 8, 0.8, 0, 3, "武道继续1", 2000)
      }
    }
  }
}
var a = {}
var 六国远征 = new Sc();
六国远征.colors = ["#3dffff"];
六国远征.确定人物位置 = function (控制x, 控制y) {
  if (UTILS.deviceWidth > 1920) {
    this.点击人物(控制x, 控制y, 10);
  } else {
    this.点击人物(控制x, 控制y, 9);
  }
}
六国远征.点击人物 = function (控制x, 控制y, 份数) {
  var 是否透明 = '';
  控制x = 控制x || 0;
  控制y = 控制y || 0;
  var 标识坐标 = UTILS.findImage(IMAGE.六国标识, 2, 2, 0.7)
  log("标识坐标----" + 标识坐标)
  //宽
  标识坐标x = (标识坐标.x) / 份数
  标识坐标y = 标识坐标.y;
  //高
  标识坐标h = (UTILS.deviceHeight - 标识坐标y) / 5
  //标识坐标x/2+标识坐标x*j,
  for (var j = 控制x; j < 份数; j++) {
    log(111)
    标识坐标x1 = 标识坐标x / 2 + 标识坐标x * j
    if (控制y == 4) {
      控制y = 0;
    }
    for (var i = 控制y; i < 5; i++) {
      a.控制x = j;
      a.控制y = i
      log(a)
      UTILS.click(标识坐标x1, (标识坐标y + 标识坐标h / 2) + 标识坐标h * i)
      var 体验卡 = this.LookImageCircNoclick(IMAGE.体验卡取消, UTILS.deviceWidth / 4, UTILS.deviceHeight * (5 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 7, 0.7, 0, 5, "下次吧", 500)
      if (体验卡) {
        UTILS.click(体验卡.x, 体验卡.y);
      }
      if (是否透明 = this.LookImageCircNoclick(IMAGE.透明, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.7, 0, 3, "透明", 500)) {

      } else if (是否透明 = this.LookImageCircNoclick(IMAGE.透明1, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.9, 0, 3, "六国", 500)) {

      }
      if (!是否透明) {
        return a
      }
    }
    标识坐标x1 = 0
  }
  this.是否有绿条();
}
六国远征.是否有绿条 = function () {
  sixIm++;
  if (sixIm == 1) {
    if (blu = UTILS.customAreaFindImageNoClick(IMAGE.绿色, 0, UTILS.deviceHeight * 0.9, UTILS.deviceWidth * 0.83, UTILS.deviceHeight * 0.1, 0, 0, 0.7)) {
      if (blu) {
        for (var i = 0; i < 3; i++) {
          sleep(1000)
          swipe(UTILS.deviceWidth * 0.29, UTILS.deviceHeight * 0.46, UTILS.deviceWidth * 0.2, UTILS.deviceHeight * 0.15, 500)
        }
        this.确定人物位置();
      }
    }
  }
}
六国远征.blur = function () {
  for (var i = 0; i < 3; i++) {
    sleep(500);
    var xx = a.控制x
    var yy = a.控制y
    var 是否选完 = 六国远征.确定人物位置(xx, yy)
    if (是否选完) {
      return;
    }
  }
}
六国远征.startExpedition = function () {
  this.LookImageCirc(IMAGE.六国, UTILS.deviceWidth * (5 / 8), UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 10, "六国", 5000)
  log(55555555)
  var expedition = this.LookImageCirc(IMAGE.远征, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (2 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 3, "六国远征", 2000)
  this.LookImageCirc(IMAGE.六国重置, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight * (7 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.7, 0, 5, "重置", 2000)
  var res = this.LookImageCirc(IMAGE.重置1, UTILS.deviceWidth / 2, UTILS.deviceHeight * 0.6, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 5, "确定重置", 1000)
  if (!res) {
    this.LookImageCirc(IMAGE.六国重置了, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight * 0.6, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 5, "确定重置", 1000)
  }
  if (expedition) {
    for (var i = 0; i < 30; i++) {
      //findImageAndClickFullScreen = (base64, OffsetX, OffsetY, threshold)3dffff
      var receive = this.ImageCircAndclick(this.colors[0],
        [
          [1, 0, this.colors[0]],
        ], [UTILS.deviceWidth * (1 / 5), UTILS.deviceHeight * (1 / 6), UTILS.deviceWidth * 0.7, UTILS.deviceHeight * 0.7]
        , 0.7, 0, 10, "六国远征", 500
      );
      receive = null ? this.colors[0] = "#3dffff" : this.colors[0] = "#72ffff";
      记录次数++
      if (!receive || 记录次数 > 6) {
        var 六国 = UTILS.customAreaFindImageNoClick(IMAGE.六国1, UTILS.deviceWidth * (1 / 5), UTILS.deviceHeight * (1 / 6), UTILS.deviceWidth * 0.7, UTILS.deviceHeight * 0.7, 0.7)
        记录次数 = 0;
        return;
      }
      if (sixCod > 3) {
        return;
      }
      if (receive || 六国) {
        var budo = this.LookImageCircNoclick(IMAGE.六国远征挑战, UTILS.deviceWidth / 2, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 2, UTILS.deviceHeight / 4, 0.8, 0, 4, "六国远征挑战", 500)
        if (budo) {
          UTILS.click(budo.x, budo.y);
          //Tap(budo.x,budo.y);
        } else if (budoa = this.LookImageCircNoclick(IMAGE.挑战3, UTILS.deviceWidth / 2, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 2, UTILS.deviceHeight / 4, 0.8, 0, 4, "六国远征挑战", 1000)) {
          UTILS.click(budoa.x, budoa.y);
          //Tap(budoa.x,budoa.y);
        }
        if (budo || budoa) {
          if (this.LookImageCircNoclick(IMAGE.透明, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.8, 0, 6, "透明", 500)) {
            this.LookImageCirc(IMAGE.展开, 0, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.8, 0, 6, "展开", 5000)
            this.blur();
          } else if (this.LookImageCircNoclick(IMAGE.透明1, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.7, 0, 3, "六国", 1000)) {
            this.LookImageCirc(IMAGE.展开, 0, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 6, "展开", 5000)
            this.blur();
          }
          var a = this.LookImageCirc(IMAGE.确定, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 6, "确定", 5000)
          if (a) {
            this.recursionSearchImage(IMAGE.胜利, "#e9d49a",
              [
                [1, 0, "#e0cb94"],
                [2, 0, "#f8edc4"],
                [3, 1, "#fff7ce"],
                [0, 1, "#dcc78d"],
                [1, 1, "#d1bc85"],
              ], [UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4]
              , 0.7, 1,
              () => {
                var defeated = this.LookImageCirc(IMAGE.武道失败, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.9, 0, 1, "武道失败", 2000)
                if (defeated) { stopFunction++; 记录失败次数++ }
              }, () => {
                var defeateda = this.LookImageCircNoclick(IMAGE.继续1, UTILS.deviceWidth / 2, UTILS.deviceHeight * (7 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 8, 0.9, 0, 1, "继续", 2000)
                if (defeateda) { stopFunction++; 记录失败次数++ }
              }, 1, () => {
                this.LoopFigureClick(IMAGE.自动,
                  [UTILS.deviceWidth * (3 / 4), 0, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4]
                  , 0.9)
              },
              new Promise(() => {
                log("执行")
                UTILS.customAreaFindImageClick(IMAGE.成就确定, UTILS.deviceWidth * 0.33, UTILS.deviceHeight * 0.62, UTILS.deviceWidth / 4, UTILS.deviceHeight * 0.3, 0, 0, 0.8)
              })
            )
          } else {
            sixCod++;
          }
          this.LookImageCirc(IMAGE.成就确定, UTILS.deviceWidth * 0.26, UTILS.deviceHeight * 0.79, UTILS.deviceWidth / 4, UTILS.deviceHeight * 0.2, 0.7, 0, 3, "成就确定", 1000)
          // this.LookImageCirc(IMAGE.武道点击继续, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 5, "武道点击继续", 1000)  
          sleep(3000)
          this.LookImageCirc(IMAGE.武道继续, UTILS.deviceWidth / 2, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 10, "武道继续", 2000)
          var goCon = this.LookImageCirc(IMAGE.武道继续, UTILS.deviceWidth / 2, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 10, "武道继续", 2000)
          if (!(stopFunction == 1 || stopFunction == 2)) {
            this.LookImageCirc(IMAGE.宝箱, UTILS.deviceWidth * (1 / 5), UTILS.deviceHeight * (1 / 8), UTILS.deviceWidth * (4 / 5), UTILS.deviceHeight * (7 / 8), 0.9, 0, 10, "宝箱", 2000)
            this.LookImageCirc(IMAGE.六国确定, UTILS.deviceWidth * 0.3, UTILS.deviceHeight * 0.6, UTILS.deviceWidth / 2, UTILS.deviceHeight / 3, 0.7, 0, 5, "确定", 2000)
          }
        }
      }
    }
  }
  sixCod = 0;
}
var 领取奖励 = new Sc();
领取奖励.邮箱 = function () {
  var read = UTILS.findColorNoClick("#992120",
    [],
    [
      UTILS.deviceWidth * 0.776,
      0,
      UTILS.deviceWidth * 0.0937,
      UTILS.deviceHeight * 0.0925,
    ], 4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)
  if (read) {
    log(read)
    UTILS.click(read.x, read.y)
    var draw = this.LookImageCirc(IMAGE.快速领取, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 5, "快速领取", 2000)
    if (draw) {
      var a = this.LookImageCirc(IMAGE.下次吧, UTILS.deviceWidth / 4, UTILS.deviceHeight * (5 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 7, 0.7, 0, 5, "下次吧", 2000)
      if (a) {
        for (var i = 0; i < 10; i++) {
          b = this.LookImageCirc(IMAGE.下次吧, UTILS.deviceWidth / 4, UTILS.deviceHeight * (5 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 7, 0.7, 0, 5, "下次吧", 2000)
          if (!b) {
            break;
          }
        }
      }
      this.LookImageCirc(IMAGE.六国确定, UTILS.deviceWidth / 3, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 3, UTILS.deviceHeight / 6,
        0.7, 0, 5, "确定", 1000)
    }
    sleep(3000)
    var 系统邮件 = UTILS.findColorNoClick("#992120",
      [],
      [
        0,
        0,
        UTILS.deviceWidth * 0.151,
        UTILS.deviceHeight * 0.259,
      ], 4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)
    if (系统邮件) {
      UTILS.click(系统邮件.x, 系统邮件.y);
      sleep(2000);
      var 快速领取 = this.LookImageCirc(IMAGE.快速领取, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.7, 0, 5, "快速领取", 2000)
      if (快速领取) {
        var receive = this.LookImageCircNoclick(IMAGE.六国确定, UTILS.deviceWidth / 3, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 3, UTILS.deviceHeight / 5,
          0.7, 0, 5, "确定", 3000)
        if (receive) {
          this.recursionSearchImage(IMAGE.六国确定, "#ddeffb",
            [
              [1, 0, "#ddeffb"],
              [0, 1, "#ddeffb"],
              [1, 1, "#ddeffb"],
            ], [UTILS.deviceWidth / 3, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 3, UTILS.deviceHeight / 5]
            , 0.7, 2,
            () => {
              this.LookImageCirc(IMAGE.我知道了, UTILS.deviceWidth / 4, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 4, UTILS.deviceHeight / 5, 0.7, 0, 5, "我知道了", 500)
            }
            , () => {
            }, 1, () => { }
          );
        }
      }
    }
    this.isBack();
  }
}
领取奖励.商城 = function () {
  var shop = UTILS.findColorNoClick("#992120",
    [],
    [
      UTILS.deviceWidth * (10 / 11),
      UTILS.deviceHeight * (1 / 10),
      UTILS.deviceWidth * (1 / 11),
      UTILS.deviceHeight / 7,
    ], 4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)
  if (shop) {
    log("shop")
    sleep(2000)
    UTILS.click(shop.x, shop.y);
    sleep(3000)
    var sh = UTILS.findColorNoClick("#992120",
      [],
      [
        0,
        UTILS.deviceHeight * 0.5,
        UTILS.deviceWidth * 0.156,
        UTILS.deviceHeight * 0.185,
      ], 4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)
    // var sh = this.LookImageCirc(IMAGE.红点, 0, UTILS.deviceHeight / 2, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4,
    //   0.7, 0, 5, "星源", 2000)
    if (sh) {
      log("sh")
      UTILS.click(sh.x, sh.y);
      sleep(2000)
      if (许愿屋 = UTILS.customAreaFindImageNoClick(IMAGE.许愿屋,
        UTILS.deviceWidth * (9 / 10),
        UTILS.deviceHeight * (1 / 10),
        UTILS.deviceWidth * (1 / 10),
        UTILS.deviceHeight / 2,
        0.7)) {
        log("许愿屋")
        UTILS.click(许愿屋.x, 许愿屋.y, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015);
        sleep(2000)
        if (星源领取 = UTILS.customAreaFindImageNoClick(IMAGE.星源领取,
          UTILS.deviceWidth / 4,
          UTILS.deviceHeight / 3,
          UTILS.deviceWidth * 0.6,
          UTILS.deviceHeight / 3,
          0.7)) {
          log("星源领取")
          UTILS.click(星源领取.x, 星源领取.y);
          sleep(2000)
        }
        if (六国确定 = UTILS.findImage(IMAGE.六国确定, 2, 1, 0.7)) {
          UTILS.click(六国确定.x, 六国确定.y);
        }
      }
      // this.LookImageCirc(IMAGE.许愿屋, UTILS.deviceWidth * (9 / 10), UTILS.deviceHeight * (1 / 10), UTILS.deviceWidth * (1 / 10), UTILS.deviceHeight / 2,
      //   0.7, 0, 5, "许愿屋", 2000)
      // this.LookImageCirc(IMAGE.星源领取, UTILS.deviceWidth / 4, UTILS.deviceHeight / 3, UTILS.deviceWidth * 0.6, UTILS.deviceHeight / 3,
      //   0.7, 0, 5, "星源领取", 2000)
      // this.LookImageCirc(IMAGE.六国确定, UTILS.deviceWidth / 3, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 3, UTILS.deviceHeight / 6,
      //   0.7, 0, 5, "确定", 2000)
      // this.LookImageCirc(IMAGE.六国确定, UTILS.deviceWidth / 4, UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4,
      //   0.7, 0, 5, "确定", 2000)
      this.isBack();
    }
    sleep(3000)
    var hd = UTILS.findColorNoClick("#992120",
      [
        // [1, 0, "#991e17"],
        // [2, 0, "#991e17"],
        // [3, 0, "#991d15"],
      ],
      [
        0,
        UTILS.deviceHeight * 0.648,
        UTILS.deviceWidth * 0.156,
        UTILS.deviceHeight * 0.186,
      ], 4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)
    // var hd = this.LookImageCirc(IMAGE.红点, 0, UTILS.deviceHeight * (7 / 10), UTILS.deviceWidth * (1 / 8), UTILS.deviceHeight * (3 / 10),
    //   0.7, 0, 5, "特惠", 1000)
    if (hd) {
      log("hd")
      sleep(2000)
      UTILS.click(hd.x, hd.y)
      sleep(2000)
      this.LookImageCirc(IMAGE.红点, UTILS.deviceWidth / 4, 0, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4,
        0.7, 0, 5, "限购", 2000)
      sleep(3000)
      if (限购免费 = UTILS.findImage(IMAGE.限购免费, 2, 0, 0.7)) {
        log("限购免费")
        UTILS.click(限购免费.x, 限购免费.y);
        sleep(2000)
        if (限购免费领取 = UTILS.findImage(IMAGE.限购免费领取, 2, 1, 0.7)) {
          log("限购免费领取")
          UTILS.click(限购免费领取.x, 限购免费领取.y);
          sleep(2000)
          if (放入背包 = UTILS.customAreaFindImageNoClick(IMAGE.放入背包,
            UTILS.deviceWidth * (1 / 3),
            UTILS.deviceHeight * (3 / 5),
            UTILS.deviceWidth / 4,
            UTILS.deviceHeight / 6,
            0.7)) {
            log("放入背包")
            UTILS.click(放入背包.x, 放入背包.y);
          }
        } else {
          this.isBack();
        }

      }
    }
    this.isBack();
  }

}
领取奖励.铭文 = function () {
  var inscription = UTILS.findColorNoClick("#992120",
    [
      // [1, 0, "#991e17"],
      // [2, 0, "#991e17"],
      // [3, 0, "#991d15"],
    ],
    [
      UTILS.deviceWidth * 0.13,
      UTILS.deviceHeight * 0.90,
      UTILS.deviceWidth * 0.4,
      UTILS.deviceHeight * 0.1,
    ], 4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)

  // var inscription = UTILS.customAreaFindImageNoClick(IMAGE.放入背包,
  //   UTILS.deviceWidth * 0.13,
  //   UTILS.deviceHeight * 0.90,
  //   UTILS.deviceWidth * 0.17,
  //   UTILS.deviceHeight * 0.1,
  //   0.7)
  // var inscription = this.LookImageCirc(IMAGE.红点, UTILS.deviceWidth * 0.13, UTILS.deviceHeight * 0.90, UTILS.deviceWidth * 0.17, UTILS.deviceHeight * 0.1,
  //   0.7, 0, 5, "活动红点", 2000, -(UTILS.deviceWidth * 0.015), UTILS.deviceHeight * 0.015)
  if (inscription) {
    UTILS.click(inscription.x, inscription.y);
    sleep(2000)
    var ins = UTILS.findColorNoClick("#992120",
      [],
      [
        UTILS.deviceWidth * (3 / 4),
        UTILS.deviceHeight * (3 / 8),
        UTILS.deviceWidth / 4,
        UTILS.deviceHeight / 4,
      ],
      4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)

    if (inscription && ins) {
      for (var i = 0; i < 3; i++) {
        sleep(500)
        log(1111)
        //Tap(ins.x,ins.y);
        UTILS.click(ins.x, ins.y)
      }
      this.LookImageCirc(IMAGE.铭文点击, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth * (1 / 4), UTILS.deviceHeight * (1 / 4),
        0.7, 0, 5, "王者生涯", 500)
    }
    // log(inscription)
    if (inscription) {
      this.LookImageCirc(IMAGE.红点, 0, UTILS.deviceHeight * (1 / 4), UTILS.deviceWidth * (1 / 4), UTILS.deviceHeight / 4,
        0.7, 0, 5, "活动红点", 2000, -(UTILS.deviceWidth * 0.015), UTILS.deviceHeight * 0.015)
      this.LookImageCirc(IMAGE.买一次铭文, UTILS.deviceWidth * (2 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth * (1 / 4), UTILS.deviceHeight / 4,
        0.7, 0, 5, "买一次铭文", 2000)
      sleep(15000)
      this.LookImageCirc(IMAGE.六国确定, UTILS.deviceWidth / 3, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 3, UTILS.deviceHeight / 6,
        0.7, 0, 5, "确定", 1000)
      this.isBack();
    }
  }

  //var ins = this.LookImageCircNoclick(IMAGE.铭文向右, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 8), UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 0.8, 0, 4, "铭文向右", 500)

}
领取奖励.签到 = function () {

  var sign = UTILS.findColorNoClick("#992120",
    [
      // [1, 0, "#991e17"],
      // [2, 0, "#991e17"],
      // [3, 0, "#991d15"],
    ],
    [
      UTILS.deviceWidth * (3 / 4),
      UTILS.deviceHeight * (3 / 4),
      UTILS.deviceWidth * (1 / 4),
      UTILS.deviceHeight / 4,
    ], 4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)


  // var sign = this.LookImageCirc(IMAGE.活动红点, UTILS.deviceWidth * (3 / 4), UTILS.deviceHeight * (3 / 4), UTILS.deviceWidth * (1 / 4), UTILS.deviceHeight / 4,
  //   0.8, 0, 5, "活动红点", 2000, -(UTILS.deviceWidth * 0.015), UTILS.deviceHeight * 0.015)


  if (sign) {
    UTILS.click(sign.x, sign.y, -(UTILS.deviceWidth * 0.015), UTILS.deviceHeight * 0.015)
    sleep(2000)
    this.LookImageCirc(IMAGE.王者生涯, UTILS.deviceWidth * (3 / 8), UTILS.deviceHeight * 0.7, UTILS.deviceWidth * (1 / 4), UTILS.deviceHeight * (3 / 10),
      0.7, 0, 5, "王者生涯", 500)
    sleep(2000)
    this.ImageCircAndclick("#961a12",
      [
        [1, 0, "#961a12"],
      ], [UTILS.deviceWidth * (3 / 4), 0, UTILS.deviceWidth / 4, UTILS.deviceHeight / 4,]
      , 0.7, 0, 5, "六国远征", 500
    );
    // this.LookImageCirc(IMAGE.红点, UTILS.deviceWidth * (3 / 4), 0 , UTILS.deviceWidth / 4, UTILS.deviceHeight / 4, 
    // 0.9, 0, 5, "签到", 1000,-30,20) 
    this.LookImageCirc(IMAGE.六国确定, UTILS.deviceWidth / 3, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 3, UTILS.deviceHeight / 6,
      0.7, 0, 5, "确定", 1000)
    sleep(3000)
    var red = UTILS.findColorNoClick("#992120",
      [
        // [1, 0, "#991e17"],
        // [2, 0, "#991e17"],
        // [3, 0, "#991d15"],
      ],
      [
        UTILS.deviceWidth * 0.33,
        UTILS.deviceHeight * 0.8,
        UTILS.deviceWidth * (1 / 3),
        UTILS.deviceHeight * 0.2,
      ], 4, -UTILS.deviceWidth * 0.015, UTILS.deviceHeight * 0.015)
    // var red = this.LookImageCircNoclick(IMAGE.红点, UTILS.deviceWidth * 0.33, UTILS.deviceHeight * 0.8, UTILS.deviceWidth * (1 / 3), UTILS.deviceHeight * 0.2,
    //   0.7, 0, 5, "红点", 500, -(UTILS.deviceWidth * 0.015), UTILS.deviceHeight * 0.015)
    if (red) {
      UTILS.click(red.x, red.y, -(UTILS.deviceWidth * 0.015), UTILS.deviceHeight * 0.015)
      sleep(3000);
      while (andclick = UTILS.findImage(IMAGE.领取5, 0, 1, 0, 0, 0.7)) {
        UTILS.click(andclick.x, andclick.y)
      }
      this.LookImageCirc(IMAGE.六国确定, UTILS.deviceWidth / 3, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 3, UTILS.deviceHeight / 6,
        0.7, 0, 5, "确定", 1000)
    }
    this.isBack();

  }
}
领取奖励.drawStart = function () {
  this.邮箱();
  sleep(2000)
  this.商城();
  sleep(2000)
  this.铭文();
  sleep(2000)
  this.签到();
}
function starta () {
  if (冒险模式.LookImageCircNoclick(IMAGE.万象天宫, UTILS.deviceWidth * 0.7, UTILS.deviceHeight * (3 / 5), UTILS.deviceWidth / 5, UTILS.deviceHeight / 4, 0.8, 0, 6, "万象天宫", 2000)) {
    if (是否打冒险模式 || 是否打武道大会 || 是否打六国远征 || 是否领取奖励 || 是否自动刷金币) {
      if (是否领取奖励) {
        UTILS.toastLog("==自动领取奖励==");
        领取奖励.drawStart();
      }
      领取奖励.ifHome();
      if (是否打武道大会) {
        UTILS.toastLog("==自动打武道大会开始==");
        武道大会.startBudo();
        武道大会.isBack();
      }
      if (是否打六国远征) {
        UTILS.toastLog("==自动打六国远征开始==");
        六国远征.ifHome();
        六国远征.startExpedition();
        六国远征.isBack();
      }
      if (是否打冒险模式) {
        UTILS.toastLog("==自动打冒险模式开始==");
        冒险模式.ifHome();
        冒险模式.chapter();
        冒险模式.isBack();
      }
      if (是否自动刷金币) {
        冒险模式.ifHome();
        冒险模式.start();
      }
    } else {
      UTILS.toastLog("==您未选择任何功能,脚本结束==")
    }
  } else {
    UTILS.toastLog("==请进入到游戏主界面，关闭其他弹窗==");
    sleep(3000);
    starta();
  }
}

starta();