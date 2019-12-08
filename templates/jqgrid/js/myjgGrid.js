/*请求封装扩展函数*/
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

/*jqGrid表格请求封装*/
function myjqGrid(el, opt, callback) {
    if (!opt.url) return '未配置url';
    if (!opt.colNames.length || !opt.colModel.length) return 'colNames或colModel配置不正确';
    if (opt.colNames.length != opt.colModel.length) return '列colNames和colModel长度不匹配';
    var el_id = el.attr('id');
    /**未分页**/
    defaults = {
        url: '',
        datatype: "json",
        mtype: "POST",
        postData: {},
        height: 'auto',
        autowidth: true,
        colNames: [],
        colModel: [],
        rowNum: 10,
        rowList:[10,50,100],
        pager: '#pager',
        viewrecords: true,
        multiselect: true,
        multiselectWidth:24,//多选框宽度
        gridview: true, //加速显示
        loadonce: false,
        altRows: true,
        altclass: 'zebra',
        pagerpos: "center", //指定分页栏的位置
        //sortname : 'id',
        //sortorder : "desc",
        //cellEdit:true,//与editable属性对应
        //multiboxonly: true, //是否只有点击多选框时
        jsonReader: {
            root: "d"
        },
        /*beforeSelectRow: function(rowid, e) {
            var $myGrid = $(this),
            i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
            cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb')
        },*/ //仅点击checkebox才可选择行
        loadComplete: function() {
            var re_records = $("#grid").getGridParam('records');
            if (re_records == 0 || re_records == null) {
                if ($(".norecords").html() == null) {
                    $("#grid").parent().append("<div class=\"norecords\">没有符合条件的数据</div>")
                }
                $(".norecords").show()
            } else {
                if ($(".norecords").html()) {
                    $(".norecords").hide()
                }
                var height = re_records < 5? "210":"auto";
                $('#grid').jqGrid('setGridHeight', height).trigger('reloadGrid');
            }
            if (typeof callback == 'function') {
                callback()
            }
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理统计行数据
            var pager_id = 'pager';
            if (opt.pager){
                pager_id = opt.pager;
            }
            var rowNum = $(this).jqGrid('getGridParam','records');
            $('#'+el_id+'_toppager_record').text(rowNum);
            $('#'+pager_id+' .ui-icon.ui-icon-seek-first').text('首页');
            $('#'+pager_id+' .ui-icon.ui-icon-seek-end').text('尾页');
            var head_cb_box = $('#jqgh_'+el_id+'_cb'),head_input_box = head_cb_box.children('input').eq(0);
            if ( head_cb_box.children('label.cb_label').length <= 0){
                head_input_box.after( '<label class="cb_label" for="'+ head_input_box.attr("id")+'"></label>');
            }
            $('td[aria-describedby="'+el_id+'_cb"]').append('<label class="cb_label"></label>');
            /**bottom page backgroundurl**/
            var page= $('#'+el_id).getGridParam('page'),lastpage = $('#'+el_id).getGridParam('lastpage'),
                prev_img='icon-seek-prev-dis170301',next_img='icon-seek-next-dis170301',first_color = 'first-dis',end_color = 'end-dis';
            if (page>1){
                prev_img = 'icon-seek-prev-active170301';
                first_color = 'first-active';
            }
            if (page<lastpage){
                next_img = 'icon-seek-next-active170301';
                end_color = 'end-active';
            }
            $('.ui-icon-seek-prev').attr('style','background-image:url("./image/'+prev_img+'.png")');
            $('.ui-icon-seek-next').attr('style','background-image:url("./image/'+next_img+'.png")');
            $('.ui-icon-seek-first').removeClass('first-dis').removeClass('first-active').addClass(first_color);
            $('.ui-icon-seek-end').removeClass('end-dis').removeClass('end-active').addClass(end_color);
        },
        onSelectRow:function(rowid,status){
            var type = $( 'select[class="'+'jqgh_'+el_id+'_multi_type_select'+'"]').val();
            if (type=='2'){
                $( 'select[class="'+'jqgh_'+el_id+'_multi_type_select'+'"]').val('1');
            }
            var idList=el.jqGrid('getGridParam','selarrrow');
            $('#'+el_id+'_toppager_choose').text(idList.length);
        },
        onSelectAll:function(aRowids, status) {
            var type = $( 'select[class="'+'jqgh_'+el_id+'_multi_type_select'+'"]').val();
            if (type=='2'){
                $( 'select[class="'+'jqgh_'+el_id+'_multi_type_select'+'"]').val('1');
            }
            var idList=el.jqGrid('getGridParam','selarrrow'),
                val=type=="1"?idList.length:status?$('#'+el_id+'_toppager_record').text():0;
            $('#'+el_id+'_toppager_choose').text(val);
        }
    };
    /**分页**/
    if (opt.ispaged){
        defaults['loadonce'] = false;
        defaults['jsonReader'] = {
            root: "d.list",
            /*page: "d.page",*/
            records: "d.total",
            total: "d.max_page"
        };
    }
    settings = extend(defaults, opt);
    /**create top pager**/
    var element = document.createElement('div');
    var totalTitle = opt.totalTitle ? opt.totalTitle: '共计记录';
    var selectedTitle = opt.selectedTitle ? opt.selectedTitle: '已选记录';
    $(element).attr('id',el_id+'_toppager').html(
        '<p>'
        +'<span id="'+el_id+'_toppager_record_container">'+totalTitle+' <font id="'+el_id+'_toppager_record"></font></span>&nbsp;&nbsp;&nbsp;&nbsp;'
        +'<span id="'+el_id+'_toppager_choose_container" hidden="hidden">'+selectedTitle+' <font id="'+el_id+'_toppager_choose">0</font></span>'
        +'</p>'
    );
    el.before(element);
    el.jqGrid(settings)
}

/*判断是否已选中某行-多选*/
function hascheckedrows(callback) {
    var rowIds = $("#grid").getGridParam("selarrrow");
    if (rowIds.length == 0) {
        layer.msg('未选择记录');
        return false
    }
    callback(rowIds);
    return true;
}

/*判断是否已选中某行-单选*/
function hascheckedonerow(callback) {
    var rowIds = $("#grid").getGridParam("selarrrow");
    if (rowIds.length != 1) {
        layer.msg('请选择一条记录');
        return false
    }
    callback(rowIds[0]);
    return true
}