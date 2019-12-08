//投票列表 会把请求URLs().AElectList的 ajax 进行拦截，拦截地址那也可以写正则
var data = Mock.mock(URLs().AElectList,{
    // 属性 list 的值是一个数组，其中含有 1 到 30 个元素
    'list|1-30': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'elect_id|+1': 1,
        'elect_name:3':'★',
        'elect_status|0-3':0
    }]
});

console.log(JSON.stringify(data, null, 4));


Mock.mock(URLs().ALogin,{
    "c": 0,
    "m": "完成"
});

//任教配置列表
Mock.mock(URLs().ATeachingSettings,{
    "c": 0,
    "m": "完成" ,
    "d":{
        "teacher_id":1,
        "teacher_name":'',
        "teacher_number":'',
        "teacher_class":''
    }
});

//年级列表
Mock.mock(URLs().AGradeList,{
    "c": 0,
    "m": "完成" ,
    "d":{
        "gradelist|6-9":[{
            "grade_num|+1":1,
            "grade_name": function() {
                return this.grade_num+'年级'
            }
        }]
    }
});


//各班评比数据
Mock.mock(URLs().AClassRating,{
    "c": 0,
    "m": "完成" ,
    "d":{
        "classlist|6":[{
            "class_id|+1":1,
            "class_name": function() {
                return '10'+this.class_id+'班'
            },
            "score_list|2-10":[{
                "score_item|1": [
                    "课前准备",
                    "课堂参与",
                    "课堂倾听"
                ],
                "score_count":/\d{1,2}/
            }],
            "count":/\d{2}/
        }]
    }
});

//各班趋势数据
Mock.mock(URLs().AClassTrend,{
    "c": 0,
    "m": "完成" ,
    "d":{
        "datelist|6":[{
            "count_sum":/\d{1,2}/,
            "date":'@date("yyyy/MM/dd")',
            "itemlist|6-9":[{
                "item_id|+1": 1,
                "item_name":function() {
                    return '10'+this.item_id+'班'
                },
                "count":/\d{1,2}/
            }]
        }]
    }
});

//收到的评选列表
Mock.mock(URLs().AReceiveList,{
    "c": 0,
    "m": "完成" ,
    "d":{
        "receivelist|6-20":[{
            "avatar":"@image('80x80', '#4A7BF7', 'avatar')",
            "name":'@cword(2,4)',
            "time":'@date("yyyy/MM/dd HH:mm:ss")',
            "title":'@csentence',//2018-09-07 至 2018-09-29 期间班级集体评选打分表
            "status|1":[1,2,3]
        }]
    }
});