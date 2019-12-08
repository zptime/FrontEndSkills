/*
在此处添加一些常量
*/

var SYS_SEPARATE = true;  //独立系统参数， 默认true, false代表用户信息来源于第三方
var CATEGORY_CONST_ATTR_LENGTH = 7; //获奖类型固定属性长度

var AWARD_LEVEL = ["国家级","省级","市级","区级","校级"];
var AWARD_RANK = ["特等奖","一等奖","二等奖","三等奖","公开发表"];
var APPROVAL_STATUS = [
    {
        id: 1,
        name: "未提交"
    },
    {
        id: 2,
        name: "已提交未审核"
    },
    {
        id: 3,
        name: "已审核"
    },
    {
        id: 4,
        name: "未通过"
    }
];

var TYPE_LIST = [
    {
        id : 1,
        name :"文本"
    },
    {
        id : 2,
        name :"时间"
    },
    {
        id : 3,
        name :"序列"
    }
];
/*
在此图片添加路径常量
*/
var ICON = {
    VIEW : "/static/resources/images/icon/view01.png",  //查看
    ICON_ON : "/static/resources/images/icon/icon-on.png",  //开关 开
    ICON_OFF : "/static/resources/images/icon/icon-off.png",  //开关 关
    SHRINK : "/static/resources/images/icon_shrink.png", //向右收起箭头
    UP : "/static/resources/images/icon_up.png", // 向上箭头
    DOWN : "/static/resources/images/icon_down.png", //向下箭头
    RETURN : "/static/resources/images/icon/icon-return.png",  //返回
    PLUS : "/static/resources/images/icon/plus01.png", //新增
    PENCIL : "/static/resources/images/icon/icon-edit.png", //修改
    REMOVE : "/static/resources/images/icon/icon-remove.png",  //删除
    S_REMOVE : "/static/resources/images/icon/icon-s-remove01.png",
    S_REMOVE_DIS : "/static/resources/images/icon/icon-s-remove.png",
    SAVE : "/static/resources/images/icon/icon-save.png",  //保存
    EXPORT : "/static/resources/images/icon/icon-export.png", //导出
    CIRCLE : "/static/resources/images/icon_circle.png" , //实心圆点
    SELECTBG : "/static/resources/images/icon_selectbg.png", //选择框下拉箭头
    SETMONEY : "/static/resources/images/icon_setmoney.png", //积分上限值自定义
    MONEY : "/static/resources/images/icon_money.png", //人民币
    NEWPLUS:"/static/resources/images/icon_limitadd4.png",//上限条件新增
    DELETE:"/static/resources/images/icon_remove.png",//XX 删除
    PUBLISH: "/static/resources/images/icon/publish01.png",//发布
    LOGOUT: "/static/resources/images/icon_logout.png", //退出
    ACCOUNT: "/static/resources/images/icon_account.png", //用户
};
/*
操作提示
*/
var TIPS = {
    VIEW: "查看",
    PUBLISH: "发布",
    UNPUBLISH: "取消发布",
    REMOVE : "删除"
};