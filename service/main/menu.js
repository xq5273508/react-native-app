export async function getCommon() {
  return [{
    title: "录音",
    icon: require("../../images/voice-record.png"),
    action: "Page.Audio"
  },{
    title: "扫一扫",
    icon: require("../../images/scan_fun.png"),
    action: "scan"
  }, {
    title: "待我处理",
    icon: require("../../images/todo.png"),
    action: "workDesk"
  }, {
    title: "工作日志",
    icon: require("../../images/maintenancelog2.png"),
    action: "workRecord"
  }, {
    title: "我的企业",
    icon: require("../../images/mybusiness.png"),
    action: "prodlib"
  }, {
    title: "我的企业123",
    icon: require("../../images/mybusiness.png"),
    action: "prodlib313"
  }];
}

export async function getMod() {
  return [{
    title: "快捷录入",
    menus: [{
      title: "安装调试",
      icon: require("../../images/newdebug.png"),
      action: "debug"
    }, {
      title: "锁定装配",
      icon: require("../../images/machine-assembly.png"),
      action: "freeAssembly"
    }]
  }, {
    title: "常用应用",
    menus: [{
      title: "服务查询",
      icon: require("../../images/sellafter.png"),
      action: "aftersaleservice"
    }, {
      title: "设备维护",
      icon: require("../../images/equipmentlibrary.png"),
      action: "devicemanagement"
    }, {
      title: "产品分布",
      icon: require("../../images/dev_maps.png"),
      action: "prodDis"

    }, {
      title: "服务地图",
      icon: require("../../images/servicemap.png"),
      action: "serviceMap"
    }, {
      title: "扫码地图",
      icon: require("../../images/scanmap.png"),
      action: "scanProds"

    }]
  }]
}
