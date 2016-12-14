$(function () {
    var todos=[];
    //判断本地存储里面是否有数据，有就渲染出来
    if(localStorage.todo_data){
    todos=JSON.parse(localStorage.todo_data);
        render();
    }else{
       localStorage.todo_data=JSON.stringify(todos);
    }
    //添加列表
    function addlist(value) {
        todos.push({title:value,state:0,isDel:0})
        localStorage.todo_data=JSON.stringify(todos);//转换成字符串存储在本地
        render();
    }
    $(".cont").focus();
    //点击添加
    $('.icon').on('touchstart',function () {
        var value=$('.cont').val();
        addlist(value);
        render();
        $('.cont').val('');
        $('.cont').blur();
    })
    //滑动
    var left=null;
    $('.list').on('touchstart','.ls',function(e){
        left=e.originalEvent.changedTouches[0].pageX;
    })
    $('.list').on('touchend','.ls',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        $(this).css('transition','transform .8s ease')
        $(this).css('transform','translate3d(0,0,0)');
        $(this).delay(800).queue(function () {
            $(this).css('transition','none').dequeue();
        })
        /*if((n>left)&&((n-left)>40)){
            /!*$(this).addClass('done');*!/
            todos[$(this).index()].state=1;
        }*/
    })
    $('.list').on('touchmove','.ls',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var x=n-left;
        $(this).css('transform','translate3d('+x+'px,0,0)')

    })
    render();
    //删除
   /* $('.list').on('touchstart','.topicon',function(e){
        var i=$(this).closest('li').index();
        todos.splice(i,1);
        localStorage.todo_data=JSON.stringify(todos);
        $(this).closest('li').addClass('feichu').delay(800).queue(function () {
            $(this).remove().dequeue();
        })
    })*/
    $('.list').on('touchstart','.topicon',function(e){
        var i=$(this).closest('li').index();
        todos.splice(i,1);
        $('.mask').css('display','block');
        $('.panduan').css('display','block');
        $('this').closest('li').addClass('feichu').delay(800).queue(function () {
            $(this).remove().dequeue();

        })
        $('.shi').on('click',function(){
            $('.mask').css('display','none');
            $('.panduan').css('display','none');
            localStorage.todo_data=JSON.stringify(todos);
            render();


        })
        $('.fou').on('click',function(){
            $('.mask').css('display','none');
            $('.panduan').css('display','none');
        })
        
    })

    //绘制列表
    function render() {
        $('.list').empty();
        $.each(todos,function(i,v){
            $('<li class="ls"><div class="cicle"><i class="iconfont icon-zhizhang5"></i></div><div class="items">'+v.title+'</div><input type="text" class="inputs"><div class="topicon"><i class="iconfont icon-xuanzhong"></i></div><div class="boticon"><i class="iconfont icon-more1170511easyiconnet"></i></div></li>').addClass(function () {
                if(v.state){
                    return 'done';
                }

            })
                .appendTo('.list');
        })
    }
    //修改
    $('.list').on('click','.items',function (e) {
        $(this).parent().find('.inputs')
            .css('display','block')
            .val($(this).text());
        $('.inputs').focus();
        $('.inputs').blur(function () {
            $(this).parent().find('.items').text($(this).val());
            $(this).css('display','none');
            var index=$(this).parent().index();
            todos[index].title=$(this).val();
            localStorage.todo_data=JSON.stringify(todos);
            render();


        })

    })
    // 点击完成成为完成状态
    $('.list').on('click','.boticon',function(){
        var lis=$(this).closest('li')
        lis.toggleClass('done');
        if(lis.hasClass('done')){
            todos[lis.index()].state=1;
        }else{
            todos[lis.index()].state=0;
        }
        localStorage.todo_data=JSON.stringify(todos);
        render();

    })
    //查看完成列表
    $('.item4right').on('click',function(){
        $('.list').empty();
        $(this).css('background','#bebdc3');
        $(this).parent().find('.item4left').css('background','#fff');
        for(var j=0;j<todos.length;j++){
            if(todos[j].state){
                $('<li class="ls" attr="id"><div class="cicle"><i class="iconfont icon-zhizhang5"></i></div><div class="items">'+todos[j].title+'</div><input type="text" class="inputs"><div class="topicon"><i class="iconfont icon-xuanzhong"></i></div><div class="boticon"><i class="iconfont icon-more1170511easyiconnet"></i></div></li>').addClass('done').appendTo('.list');

            }
            localStorage.todo_data=JSON.stringify(todos);



        }
        $('.boticon').on('touchstart',function(){
            var li=$(this).closest('li')
            var nam=$('.ls').filter('.done');
            console.log(nam);
            console.log(todos[nam.index()])
            todos[nam.index()].state=0;
            li.removeClass('done').queue(function () {
                $(this).remove().dequeue();

            });


        })
    })

    //查看便签
    $('.item4left').on('click',function(){
        $(this).css({'background':'#bebdc3','color':'#000'});
        $(this).parent().find('.item4right').css('background','#fff');
        render();
    })

})