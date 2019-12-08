/**-----------------基础公用函数--------------------**/
function extend(target, source) {
    "use strict";
    var property;
    for (property in source) {
        if (source.hasOwnProperty(property)) {
            target[property] = source[property]
        }
    }
    return target
}

/**ajax请求封装**/
function myajax(opt, callback) {
    if (!opt.url) return '未配置url';
    defaults = {
        url: '',
        type: 'POST',
        dataType: 'json',
        complete: function(data) {
            if (typeof callback == 'function') {
                callback(JSON.parse(data.responseText))
            }
        },
        error: function(data) {
            console.log('请求错误...'+JSON.parse(data));
            layer.msg("请求超时");
        },
        success: function(data) {
            if (data.c != 0) {
                console.log('操作失败,错误代码[' + data.c + ']' + data.m);
                layer.msg('操作失败：' + data.m);
            }
        }
    };
    settings = extend(defaults, opt);
    $.ajax(settings)
}


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return '';
}

/**form表单数据转为JSON格式**/
function SerializeToJSON(str) {
    "use strict";
    str = str.replace(/\+/g," ");
    var res = {},
    arr = decodeURIComponent(str, true).split('&');
    for (var i in arr) {
        var item = arr[i].split('='),
        key = item[0],
        value = item[1];
        res[key] = value
    }
    return res
}

/**form表单提交验证**/
function myCheck(opt){
    var res = true;
    var defaults = {
        element: '#content'
    };
    var settings = extend(defaults, opt);
    //校验
    $(settings.element+' label.required').each(function(index,element){
        var el_check = $(element).attr('for');
        if (el_check){
            var el =  $('[check="'+el_check+'"]') ;
            var loop2 = true;
            el.each(function (index2, element2) {
                if ( !$(element2).val() ){
                    layer.msg($(element).text()+'不允许为空');
                    element2.focus();
                    loop2 = false;
                    res = false;
                    return false;
                }
            });
            return loop2;
        }
    });
    return res;
}