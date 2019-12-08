/**
 * 接口url配置
 * */
function URLs(){
    var debug = true;

    var mockURLs = {
        "ALogin":"http://usercenter-test.hbeducloud.com/api/login",
        "AElectList":"../../static/resources/mock/elect_list.json",
        "ANoticeInbox":"../../static/resources/mock/notice_inbox.json",
        "ATeacherList":"../../static/resources/mock/teacher_list.json",
        "ATeacherInfo":"../../static/resources/mock/teacher_info.json",
        "ATitleList":"../../static/resources/mock/title_list.json",

        "AGradeList":"/api/mngcheck/grade/list",//年级列表
        "AClassRating":"/api/mngcheck/grade/group/statistics",//各级评比数据列表
        "AClassTrend":"/api/mngcheck/day/abnormal/group/statistics",//各级趋势数据列表
        "AReceiveList":"/api/receive/list",//收到的评选列表


        //任教配置
        "ATeachingSettings":"/static/resources/mock/inbox.json"


    };

    var URLs = {
        "root" : "/",
        "Rawardtemp_edit" : "pages/awardtemp_edit.html",

        "ALogin":"http://usercenter-test.hbeducloud.com/api/login",
        "AElectList":"http://vote-test.hbeducloud.com/api/elect/list",
        "ANoticeInbox":"http://interact-test.hbeducloud.com/api/notification/inbox",
        "ATeacherList":"http://usercenter-test.hbeducloud.com/api/list/teacher",

        //模板工厂
        "Pmodalfactory": "pages/modalfactory"

    };

    if(debug === true){
        return mockURLs;
    } else{
        return URLs;
    }
}