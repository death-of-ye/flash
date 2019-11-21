// var 功能列表 = {
//     "commonImage": utils.commonImage, //通用截屏对象
//     "screenCommonImage": utils.screenCommonImage, //为commonImage赋值
//     "emptyCommonImage": utils.emptyCommonImage, //清空commonImage
//     "deviceWidth": utils.deviceWidth, //设备宽度
//     "deviceHeight": utils.deviceHeight, //设备宽度
//     "mapList": utils.mapList, //区域找图规则
//     "returnArea":utils.returnArea // 返回区域数组
//     "log": utils.log, //只打log日志
//     "toastLog": utils.toastLog, //toast吐司+log日志
//     "click": utils.click, //带偏移量的click方法
//     "gesture": utils.gesture, //滑动轨迹方法
//     "setScreenMetrics": utils.setScreenMetrics, //设置脚本坐标点击所适合的屏幕宽高
//     "findImage": utils.findImage, //指定区域找图 返回坐标
//     "findImageFullScreen": utils.findImageFullScreen, //全屏找图  返回坐标 
//     "customAreaFindImageNoClick": utils.customAreaFindImageNoClick, //返回自定义区域找图结果
//     "findColorNoClick": utils.findColorNoClick  //区域找色返回坐标
//     "findModel": utils.findModel  //查找模式选择->只服务于指定次数的等待指定图片出现这个方法
//     "waitViewUntilFindSpecifiedTimes": utils.waitViewUntilFindSpecifiedTimes  //指定次数的等待指定图片出现
//     "checkCurrentPackage": utils.checkCurrentPackage  //判断当前包名是否为指定包名
// }




/**
 * 区域内找图 Intraregionalmapping
 */
var utils = {};

utils.commonImage = '';
/**
 * @function 为commonImage赋值
 */
utils.screenCommonImage = ()=>{
    utils.commonImage = captureScreen();
}
/**
 * @function 清空commonImage
 */
utils.emptyCommonImage = ()=>{
    utils.commonImage = '';
}
utils.deviceWidth = context.resources.configuration.orientation == 1 ? device.width : device.height;
utils.deviceHeight = context.resources.configuration.orientation == 1 ? device.height : device.width;
utils.mapList = [
    {
        layoutType: 1,
        w: utils.deviceWidth / 2,
        h: utils.deviceHeight / 2,
        area: [
            { x: 0, y: 0 },
            { x: utils.deviceWidth / 2, y: 0 },
            { x: 0, y: utils.deviceHeight / 2 },
            { x: utils.deviceWidth / 2, y: utils.deviceHeight / 2 }
        ]
    },
    {
        layoutType: 2,
        w: utils.deviceWidth,
        h: utils.deviceHeight / 3,
        area: [
            { x: 0, y: 0 },
            { x: 0, y: utils.deviceHeight / 3 },
            { x: 0, y: utils.deviceHeight / 3 * 2 }

        ]
    },
    {
        layoutType: 3,
        w: utils.deviceWidth / 3,
        h: utils.deviceHeight,
        area: [
            { x: 0, y: 0 },
            { x: utils.deviceWidth / 3, y: 0 },
            { x: utils.deviceWidth / 3 * 2, y: 0 }
        ]
    }
];
/**
 * @function 返回区域数组
 * @param {区域类型} areaType 0 1 2
 * @param {区域id}  areaIndex 0 1 2 或3
 * @example utils.returnArea(0,0) => [0,0,deviceWidth/2,deviceHeight/2]
 */
utils.returnArea = (areaType,areaIndex)=>{
	return [utils.mapList[areaType].area[areaIndex].x, utils.mapList[areaType].area[areaIndex].y, utils.mapList[areaType].w, utils.mapList[areaType].h];
}
/**
 * @function log日志
 * @param {log文本} msg 
 */
utils.log = (msg) => {
    log(msg);
}
/**
 * @function toastLog日志
 * @param {toastLog文本} msg 
 */
utils.toastLog = (msg) => {
    toastLog(msg);
}
/**
 * @function 带偏移量的click方法
 * @param {x轴位置}  x
 * @param {y轴位置}  y
 * @param {x轴偏移量} OffsetX  可不传 默认为0
 * @param {y轴偏移量} OffsetY 可不传 默认为0
 * @param {点击时长}  duration 可不传 默认为150
 * @example click(100,200,10,20)  实则点击了(110,220)位置
 */
utils.click = (x, y, OffsetX, OffsetY,duration) => {
    if (!OffsetX) OffsetX = 0;
    if (!OffsetY) OffsetY = 0;
    if (!duration) duration = 80;
    press(x + OffsetX, y + OffsetY,duration);
}

/**
 * @function 滑动轨迹方法
 * @param {滑动时长} duration 
 * @param {初始点x}  startX
 * @param {初始点y}  startY
 * @param {结束点x}  endX
 * @param {结束点y}  endY
 * @example utils.gesture(1000,150,100,300,450);
 */
utils.gesture = (duration,startX,startY,endX,endY)=>{
    gesture(duration,[startX,startY],[endX,endY]);
}


/**
 * @function 设置脚本坐标点击所适合的屏幕宽高
 */
utils.setScreenMetrics = () => {
    setScreenMetrics(1080,device.height * 1080 / device.width);
}
/**
 * @function 全屏找图
 * @param {小图的base64} base64 
 * @param {精确值} threshold
 * @example findImage(imgBase64,0.7) 
 * @returns 返回一个对象 p 为空则标识未找到 反之则找到了 返回p.x 和 p.y
 */
utils.findImageFullScreen = (base64, threshold) => {
    var img = utils.commonImage ? utils.commonImage : captureScreen();
    var 查找图片 = images.fromBase64(base64);
    var 查找结果 = findImage(img, 查找图片, {
        threshold: threshold
    })
    return 查找结果;
}
/**
 * @function 指定区域找图
 * @param {小图的base64} base64 
 * @param {区域找图方式} areaType  0 1 2
 * @param {区域找图id} areaIndex  0 1 2 3
 * @param {精确值} threshold 
 * @example findImage(imgBase64,0,1,0.7) 
 * @returns 返回一个对象 p 为空则标识未找到 反之则找到了 返回p.x 和 p.y
 */
utils.findImage = (base64, areaType, areaIndex, threshold) => {
    var mapList = utils.mapList;
    var img = utils.commonImage ? utils.commonImage : captureScreen();
    img = images.clip(img, mapList[areaType].area[areaIndex].x, mapList[areaType].area[areaIndex].y, mapList[areaType].w, mapList[areaType].h);
    var 查找图片 = images.fromBase64(base64);
    var 查找结果 = findImage(img, 查找图片, {
        threshold: threshold
    })
    if (查找结果) {
        查找结果.x += mapList[areaType].area[areaIndex].x;
        查找结果.y += mapList[areaType].area[areaIndex].y;
    }
    utils.log(查找结果);
    return 查找结果;
}



/**
 * @function 返回自定义区域找图结果
 * @param {小图的base64} base64 
 * @param {区域起始X} startX  
 * @param {区域起始Y} startY 
 * @param {区域宽} w
 * @param {区域高} h  
 * @param {x轴偏移量} OffsetX  
 * @param {y轴偏移量} OffsetY  
 * @param {精确值} threshold 
 * @example customAreaFindImage(imgBase64,10,20,100,100,0.7) 
 */
utils.customAreaFindImageNoClick = (base64, startX, startY, w, h, threshold) => {
    var img = utils.commonImage ? utils.commonImage : captureScreen();
    img = images.clip(img, startX, startY, w, h);
    var 查找图片 = images.fromBase64(base64);
    var 查找结果 = findImage(img, 查找图片, {
        threshold: threshold
    })
    if (查找结果) {
        查找结果.x += startX;
        查找结果.y += startY;
    }
    return 查找结果;
}

/**
 * @function 区域找色返回坐标
 * @param {base64图} base64
 * @param {第一个点的颜色} firstColor
 * @param {剩下的点相对于第一个点的位置和颜色的数组，数组的每个元素为[x, y, color]} colorList Array
 * @param {找色区域} positionArray
 * @param {找色时颜色相似度的临界值} threshold 
 * @param {x轴偏移量} OffsetX  可不传 默认为0
 * @param {y轴偏移量} OffsetY 可不传 默认为0
 * @example findColorNoClick("#444D5D",[[10,0,"#ff9900"],[20,0,"#ffff00"]],[],20) 
 */
utils.findColorNoClick = (firstColor, colorList, positionArray, threshold, OffsetX, OffsetY) => {
    var img = utils.commonImage ? utils.commonImage : captureScreen();
    positionArray = positionArray == [] ? [0, 0] : positionArray;
    var 查找结果 = images.findMultiColors(img, firstColor, colorList, {
        region: positionArray,
        threshold: threshold
    })
    if (!OffsetX) OffsetX = 0;
    if (!OffsetY) OffsetY = 0;
    if(查找结果){
        查找结果.x += OffsetX;
        查找结果.y += OffsetY;
    }
    return 查找结果;
}

/**
 * @function 查找模式选择->只服务于指定次数的等待指定图片出现这个方法
 * @param {base64图} base64
 * @param {相似值} threshold 
 * @param {区域找图方式} areaType  0 1 2  不传则代表全图找图
 * @param {区域找图id} areaIndex  0 1 2 3 不传则代表全图找图
 * @example 等待指定图片出现(baseImg,1000,1,10,0.7,1,3) 
 */
utils.findModel = (baseImg,threshold,areaType,areaIndex)=>{
    var 查找图片结果;
    if (areaType === 0 || areaType || areaIndex === 0 || areaIndex) {
        查找图片结果 = UTILS.findImage(baseImg,areaType,areaIndex,threshold);
    } else {
        查找图片结果 = UTILS.findImageFullScreen(baseImg,threshold);
    }
    return 查找图片结果;
}
/**
 * @function 指定次数的等待指定图片出现
 * @param {单次查找未找到需要休息的时间} sleepTime
 * @param {当前次数} times
 * @param {查找最大次数} maxTimes
 * @param {base64图} base64
 * @param {相似值} threshold 
 * @param {找到图之后的方法} successCallback 
 * @param {未找到图之后的方法} failedCallback 
 * @param {区域找图方式} areaType  0 1 2  不传则代表全图找图
 * @param {区域找图id} areaIndex  0 1 2 3 不传则代表全图找图
 * @example waitViewUntilFindSpecifiedTimes(3000,1,20,baseImg,1000,1,10,0.7,()=>{utils.log("执行找到了后的操作");},()=>{utils.log("执行未找到后的操作");},1,3) 
 */
utils.waitViewUntilFindSpecifiedTimes = (sleepTime, times, maxTimes, baseImg, threshold, successCallback, failedCallback, areaType, areaIndex) => {
    utils.log("第" + times + "次查找");
    if (times < maxTimes) {
        var 查找结果 = utils.findModel(baseImg, threshold, areaType, areaIndex);
        if (!查找结果) {
            utils.log("没找到");
            times++;
            sleep(sleepTime);
            utils.waitViewUntilFindSpecifiedTimes(sleepTime, times, maxTimes, baseImg, threshold, successCallback, failedCallback, areaType, areaIndex);
        } else {
            successCallback();
        }
    } else {
        failedCallback();
    }
}
/**
 * @function  判断当前包名是否为指定包名
 * @param {包名} packageName
 * @example 判断当前包名是否为指定包名("com.xxx.xxx"); 
 */
utils.checkCurrentPackage = (packageName) => {
    if (currentPackage() == packageName) {
        return true;
    } else {
        return false;
    }
}
module.exports = utils;