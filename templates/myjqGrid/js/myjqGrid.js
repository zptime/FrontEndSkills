String.prototype.format = function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m,i){
            return args[i];
        }
    );
};

$.fn.extend({
	myjqGrid: function(opt, callback) {
		if (!opt.url) return '未配置url';
		if (!opt.colNames.length || !opt.colModel.length) return 'colNames或colModel配置不正确';
		if (opt.colNames.length != opt.colModel.length) return '列colNames和colModel长度不匹配';
		var el = this;
		var el_id = el.attr('id'); /**未分页**/
		var curPageNum = 0;
		var defaults = {
			url: '',
			datatype: "json",
			mtype: "POST",
			postData: {},
			height: 'auto',
			autowidth: true,
			colNames: [],
			colModel: [],
			rowNum: 10,
			rowList: [10, 50, 100],
			pager: 'pager',
			ispaged: true,//是否分页
			viewrecords: true,
			multiselect: true,
			multiselectWidth: 35, //多选框宽度
			gridview: true,
			loadonce: false,//加速显示
			altRows: false,//单双行样式不同
			altclass: 'zebra',
			pagerpos: "center",
			//指定分页栏的位置
			//sortname : 'id',
			//sortorder : "desc",
			//cellEdit:true,//与editable属性对应
			//multiboxonly: true, //是否只有点击多选框时
			totalTitle: '共计记录 {0}',
			selectedTitle: '已选记录 {0}',
			showToppager: false,  //是否显示toppager
			jsonReader: {
				root: "d"
			},
            /*beforeSelectRow: function(rowid, e) {
                var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
                return (cm[i].name === 'cb')
            },*/
			//仅点击checkebox才可选择行
			loadComplete: function() {
				var re_records = $("#" + el_id).getGridParam('records');
				if (re_records == 0 || re_records == null) {
					if ($(".norecords").html() == null) {
						$("#" + el_id).parent().append("<div class=\"norecords\">没有符合条件的数据</div>")
					}
					$(".norecords").show()
				} else {
					if ($(".norecords").html()) {
						$(".norecords").hide()
					}
					var height = re_records < 5 ? "210" : "auto";
					$('#' + el_id).jqGrid('setGridHeight', height).trigger('reloadGrid');
				}
				if (typeof callback == 'function') {
					callback();
				}
			},
			gridComplete: function() { //当表格所有数据都加载完成，处理统计行数据
				//表格多选框，多控监听
				if (opt.multipleBtn) {
					$(opt.multipleBtn).prop('checked', false).unbind('click').on('click', function() {
						$('#cb_' + el_id).click();
					});
					curPageNum = $('#' + el_id + ' tr.jqgrow').length;
				}
				//分页信息
				var pager_id = 'pager';
				if (opt.pager) {
					pager_id = opt.pager;
				}
				var rowNum = $(this).jqGrid('getGridParam', 'records');
				var totalTitle = settings.totalTitle.format(rowNum);
				$('#' + el_id + '_toppager_record_container').text(totalTitle);
				$('#' + pager_id + ' .ui-icon.ui-icon-seek-first').text('首页');
				$('#' + pager_id + ' .ui-icon.ui-icon-seek-end').text('尾页');
				var head_cb_box = $('#jqgh_' + el_id + '_cb'),
					head_input_box = head_cb_box.children('input').eq(0);
				if (head_cb_box.children('label.cb_label').length <= 0) {
					head_input_box.after('<label class="cb_label" for="' + head_input_box.attr("id") + '"></label>');
				}
				$('td[aria-describedby="' + el_id + '_cb"]').append('<label class="cb_label"></label>');
				/**default toggleModule init**/
				if (opt.toggleModule){
					if ($('#'+el_id+'_toggleMulti').val()=='default'||!$('#'+el_id+'_toggleMulti').val()){
						$('#'+el_id+'_toggleMulti').val('default');
						$('#'+el_id+'_toppager_choose_container').attr('hidden','hidden');
						/**grid_cb**/
						$('#'+el_id+'_cb').attr('hidden','hidden');
						$('#'+el_id+' .jqgfirstrow').children('td').eq(0).attr('hidden','hidden');
						$('td[aria-describedby="'+el_id+'_cb"]').attr('hidden','hidden');
					}
				}
				/**bottom page backgroundurl**/
				var page = $('#' + el_id).getGridParam('page'),
					lastpage = $('#' + el_id).getGridParam('lastpage'),
					prev_img = 'icon-seek-prev-dis170301',
					next_img = 'icon-seek-next-dis170301',
					first_color = 'first-dis',
					end_color = 'end-dis';
				if (page > 1) {
					prev_img = 'icon-seek-prev-active170301';
					first_color = 'first-active';
				}
				if (page < lastpage) {
					next_img = 'icon-seek-next-active170301';
					end_color = 'end-active';
				}
				$('.ui-icon-seek-prev').attr('style', 'background-image:url("./image/' + prev_img + '.png")');
				$('.ui-icon-seek-next').attr('style', 'background-image:url("./image/' + next_img + '.png")');
				$('.ui-icon-seek-first').removeClass('first-dis').removeClass('first-active').addClass(first_color);
				$('.ui-icon-seek-end').removeClass('end-dis').removeClass('end-active').addClass(end_color);
			},
			//点击翻页按钮填充数据之前触发此事件，同样当输入页码跳转页面时也会触发此事件
			onPaging:function(){
				//输入的值
				var val_input = parseInt($('#input_pager input').val());
				//最大页数
				var max_page = parseInt($("#input_pager span").text());
				if (val_input > max_page){
					$('#input_pager input').val(''+max_page);
				}
			},
			onSelectRow: function(rowid, status) {
				var idList = el.jqGrid('getGridParam', 'selarrrow');
				var text = settings.selectedTitle.format(idList.length);
				$('#' + el_id + '_toppager_choose_container').text(text);
				if (opt.choosed && typeof opt.choosed == 'function') {
					opt.choosed(idList.length > 0);
				}
				if (opt.multipleBtn) {
					if (idList.length < curPageNum){
						$(opt.multipleBtn).prop('checked', false);
					}
				}
			},
			onSelectAll: function(aRowids, status) {
				var idList = el.jqGrid('getGridParam', 'selarrrow');
				var text = settings.selectedTitle.format(idList.length);
				$('#' + el_id + '_toppager_choose_container').text(text);
				if (opt.choosed && typeof opt.choosed == 'function') {
					opt.choosed(idList.length > 0);
				}
			}
		}; /**分页**/

		if (opt.ispaged) {
			defaults['loadonce'] = false;
			defaults['jsonReader'] = {
				root: "d",
				page: "d.page",
				records: "d.total",
				total: "d.max_page",
				userdata: "d"
			};
		}
		var settings = $.extend(true, defaults, opt);

		/**create grid_toggleMulti**/
		var inp = document.createElement('input');
		$(inp).attr('type','hidden').attr('id', el_id+'_toggleMulti').val('');
		el.before(inp);

		/**create top pager**/
		var element = document.createElement('div');
		var totalTitle = settings.totalTitle.format('0');
		var selectedTitle = settings.selectedTitle.format('0');
		var toppager_display = 'display:none';
		if (opt.toggleModule || opt.showToppager == true){
			toppager_display = 'display:block';
		}
		$(element).attr({'id':el_id+'_toppager', 'class':'grid_toppager', 'style':toppager_display}).html(
				'<span id="'+el_id+'_toppager_choose_container" class="grid-toppager-cell toppager-select-info" hidden="hidden">'+selectedTitle+'</span>'
				+'<span id="'+el_id+'_toppager_record_container" class="grid-toppager-cell toppager-total-info">'+totalTitle+'</span>'
		);
		el.before(element);
		el.jqGrid(settings);

		/**toggleModule**/
		if (opt.toggleModule){
			$(opt.toggleModule).on('click', function () {
				var module = $('#'+el_id+'_toggleMulti').val();
				if (module == 'default'){
					$('#'+el_id+'_toggleMulti').val('multimanage');
					$(this).html('完成管理');
					$('#'+el_id+'_toppager_choose_container').removeAttr('hidden');
					/**grid_cb**/
					$('#'+el_id+'_cb').removeAttr('hidden');
					$('#'+el_id+' .jqgfirstrow').children('td').eq(0).removeAttr('hidden');
					$('td[aria-describedby="'+el_id+'_cb"]').removeAttr('hidden');
				}else{
					$('#'+el_id+'_toggleMulti').val('default');
					$(this).html('批量管理');
					$('#'+el_id+'_toppager_choose_container').attr('hidden','hidden');
					/**grid_cb**/
					$('#'+el_id+'_cb').attr('hidden','hidden');
					$('#'+el_id+' .jqgfirstrow').children('td').eq(0).attr('hidden','hidden');
					$('td[aria-describedby="'+el_id+'_cb"]').attr('hidden','hidden');
				}
			})
		}

	}
});

//全选行id
function hascheckedrows(callback) {
    var rowIds = $("#grid").getGridParam("selarrrow");
    if (rowIds.length == 0) {
        layer.msg('未选择记录');
        return false;
    }
    callback(rowIds);
    return true;
}

//单选行id
function hascheckedonerow(callback) {
    var rowIds = $("#grid").getGridParam("selarrrow");
    if (rowIds.length != 1) {
        layer.msg('请选择一条记录');
        return false;
    }
    callback(rowIds[0]);
    return true;
}

//刷新表格
function reloadGrid(data,el){
	if(!el)el=$("#grid");

	if(!data)data = {keyword:''};

    el.jqGrid('setGridParam', {
        postData: data,
        page: 1
    }).trigger("reloadGrid"); // 重新载入
}