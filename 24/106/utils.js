// var 功能列表 = {
//     "deviceWidth": utils.deviceWidth, //设备宽度
//     "deviceHeight": utils.deviceHeight, //设备宽度
//     "mapList": utils.mapList, //区域找图规则
//     "log": utils.log, //日志
//     "click": utils.click, //带偏移量的click方法
//     "setScreenMetrics": utils.setScreenMetrics, //设置脚本坐标点击所适合的屏幕宽高
//     "findImage": utils.findImage, //指定区域找图 返回坐标
//     "findImageFullScreen": utils.findImageFullScreen, //全屏找图  返回坐标 
//     "findImageAndClick": utils.findImageAndClick, //指定区域找图并配置偏移量直接点击
//     "findImageAndClickFullScreen": utils.findImageAndClickFullScreen, //全屏找图并配置偏移量直接点击
//     "customAreaFindImageClick": utils.customAreaFindImageClick, //自定义区域找图直接点击
//     "customAreaFindImageNoClick": utils.customAreaFindImageNoClick, //返回自定义区域找图结果
//     "findColorClick": utils.findColorClick, //区域找色直接点击
//     "findColorNoClick": utils.findColorNoClick  //区域找色返回坐标
//     "findModel": utils.findModel  //查找模式选择->只服务于指定次数的等待指定图片出现这个方法
//     "waitViewUntilFindSpecifiedTimes": utils.waitViewUntilFindSpecifiedTimes  //指定次数的等待指定图片出现
//     "checkCurrentPackage": utils.checkCurrentPackage  //判断当前包名是否为指定包名
// }




/**
 * 区域内找图 Intraregionalmapping
 */
var utils = {};
/**
 * @function log日志
 * @param {log文本} msg 
 */
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
utils.log = (msg) => {
    log(msg);
}
utils.toastLog = (msg) => {
    toastLog(msg);
}
/**
 * @function 带偏移量的click方法
 * @param {x轴位置}  x
 * @param {y轴位置}  y
 * @param {x轴偏移量} OffsetX  可不传 默认为0
 * @param {y轴偏移量} OffsetY 可不传 默认为0
 * @example click(100,200,10,20)  实则点击了(110,220)位置
 */
utils.click = (x, y, OffsetX, OffsetY) => {
    if (!OffsetX) OffsetX = 0;
    if (!OffsetY) OffsetY = 0;
    // var orientation = context.resources.configuration.orientation;
    // var dw, dh;
    // if (orientation == 1) { //竖屏
    //     dw = 1080;
    //     dh = device.height * 1080 / device.width;
    // } else if (orientation == 2) {
    //     dw = device.height * 1080 / device.width;
    //     dh = 1080;
    // }
    // x = x * dw / device.width;
    // y = y * dh / device.height;
    click(x + OffsetX, y + OffsetY);
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
    var img = captureScreen();
    var 查找图片 = images.fromBase64(base64);
    // if (device.width != 1080) {
    //     查找图片 = images.scale(查找图片, device.width / 1080, device.width / 1080);
    // }
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
    var img = captureScreen();
    img = images.clip(img, mapList[areaType].area[areaIndex].x, mapList[areaType].area[areaIndex].y, mapList[areaType].w, mapList[areaType].h);
    var 查找图片 = images.fromBase64(base64);
    // if (device.width != 1080) {
    //     查找图片 = images.scale(查找图片, device.width / 1080, device.width / 1080);
    // }
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
 * @function 指定区域找图并配置偏移量直接点击
 * @param {小图的base64} base64 
 * @param {区域找图方式} areaType  0 1 2
 * @param {区域找图id} areaIndex  0 1 2 3
 * @param {x轴偏移量} OffsetX  
 * @param {y轴偏移量} OffsetY  
 * @param {精确值} threshold 
 * @example findImageAndClick(imgBase64,0,1,20,30,0.7) 
 */
utils.findImageAndClick = (base64, areaType, areaIndex, OffsetX, OffsetY, threshold) => {
    var mapList = utils.mapList;
    var img = captureScreen();
    img = images.clip(img, mapList[areaType].area[areaIndex].x, mapList[areaType].area[areaIndex].y, mapList[areaType].w, mapList[areaType].h);
    var 查找图片 = images.fromBase64(base64);
    var 查找结果 = findImage(img, 查找图片, {
        threshold: threshold
    })
    if (查找结果) {
        查找结果.x += mapList[areaType].area[areaIndex].x;
        查找结果.y += mapList[areaType].area[areaIndex].y;
    }
    if (!OffsetX) OffsetX = 0;
    if (!OffsetY) OffsetY = 0;
    utils.click(查找结果.x, 查找结果.y, OffsetX, OffsetY);
}

/**
 * @function 自定义区域找图直接点击
 * @param {小图的base64} base64 
 * @param {区域起始X} startX  
 * @param {区域起始Y} startY 
 * @param {区域宽} w
 * @param {区域高} h  
 * @param {x轴偏移量} OffsetX  
 * @param {y轴偏移量} OffsetY  
 * @param {精确值} threshold 
 * @example customAreaFindImage(imgBase64,10,20,100,100,20,30,0.7) 
 */
utils.customAreaFindImageClick = (base64, startX, startY, w, h, OffsetX, OffsetY, threshold) => {
    var img = captureScreen();
    img = images.clip(img, startX, startY, w, h);
    var 查找图片 = images.fromBase64(base64);
    var 查找结果 = findImage(img, 查找图片, {
        threshold: threshold
    })
    if (查找结果) {
        查找结果.x += startX;
        查找结果.y += startY;
    }
    if (!OffsetX) OffsetX = 0;
    if (!OffsetY) OffsetY = 0;
    utils.click(查找结果.x, 查找结果.y, OffsetX, OffsetY);
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
    var img = captureScreen();
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
 * @function 全屏找图并配置偏移量直接点击
 * @param {小图的base64} base64 
 * @param {x轴偏移量} OffsetX  
 * @param {y轴偏移量} OffsetY  
 * @param {精确值} threshold 
 * @example findImageAndClick(imgBase64,10,20) 
 */
utils.findImageAndClickFullScreen = (base64, OffsetX, OffsetY, threshold) => {
    var img = captureScreen();
    var 查找图片 = images.fromBase64(base64);
    var 查找结果 = findImage(img, 查找图片, {
        threshold: threshold
    })
    if (查找结果) {
        if (!OffsetX) OffsetX = 0;
        if (!OffsetY) OffsetY = 0;
        utils.click(查找结果.x, 查找结果.y, OffsetX, OffsetY);
    }

}



/**
 * @function 区域找色直接点击
 * @param {第一个点的颜色} firstColor
 * @param {剩下的点相对于第一个点的位置和颜色的数组，数组的每个元素为[x, y, color]} colorList Array
 * @param {找色区域} positionArray  空则表示全图找
 * @param {找色时颜色相似度的临界值} threshold 
 * @param {x轴偏移量} OffsetX  可不传 默认为0
 * @param {y轴偏移量} OffsetY 可不传 默认为0
 * @example findColorClick("#ffffff",[[10,0,"#ff9900"],[20,0,"#ffff00"]],[0,0,100,100],0.7) 
 */
utils.findColorClick = (firstColor, colorList, positionArray, threshold, OffsetX, OffsetY) => {
    var img = captureScreen();
    positionArray = positionArray == [] ? [0, 0] : positionArray;
    var 查找结果 = images.findMultiColors(img, firstColor, colorList, {
        region: positionArray,
        threshold: threshold
    })
    if (!OffsetX) OffsetX = 0;
    if (!OffsetY) OffsetY = 0;
    if (查找结果) {
        utils.click(查找结果.x, 查找结果.y, OffsetX, OffsetY);
    }
}
/**
 * @function 区域找色返回坐标
 * @param {第一个点的颜色} firstColor
 * @param {剩下的点相对于第一个点的位置和颜色的数组，数组的每个元素为[x, y, color]} colorList Array
 * @param {找色区域} positionArray
 * @param {找色时颜色相似度的临界值} threshold 
 * @param {x轴偏移量} OffsetX  可不传 默认为0
 * @param {y轴偏移量} OffsetY 可不传 默认为0
 * @example findColorNoClick("#ffffff",[[10,0,"#ff9900"],[20,0,"#ffff00"]],[],0.7) 
 */
utils.findColorNoClick = (firstColor, colorList, positionArray, threshold, OffsetX, OffsetY) => {
    var img = captureScreen();
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