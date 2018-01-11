$(function(){
    let qipan = $('.qipan'),
        flag = true,
        hei = {},
        bai = {},
        ai = true,
        blank = {};

    for(let i =0;i < 15;i++){
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for(let j =0;j<15;j++){
            blank[i+"_"+j]=true;
            $('<span>')
                .appendTo(qipan)
                .addClass('qizi')
                .attr('id',i+"_"+j)
                .data('pos',{x:i,y:j});
        }
    }

    qipan.on('click','.qizi',function(){
        if($(this).hasClass('hei')||$(this).hasClass('bai')){
            return;
        }
        let data = $(this).data('pos');
        if(flag){
            $(this).addClass('hei');
            hei[data.x+"_"+data.y] = true;
            delete blank[data.x+'_'+ data.y];
            if(isSuccess(data,hei)>=5){
                alert('黑方胜利');
                qipan.off();
            }
            if(ai){
                let pos = position();
                $('#'+ pos.x + '_'+ pos.y).addClass('bai');
                bai[pos.x+"_"+pos.y]=true;
                delete blank[pos.x+'_'+pos.y];
                if(isSuccess(pos,bai) >= 5){
                    alert('白方胜利');
                    qipan.off();
                }
                return;
            }

        }else{
            $(this).addClass('bai');
            bai[data.x+"_"+data.y] = true;
            if(isSuccess(data,bai)===5){
                alert('白方胜利');
                qipan.off();
            }
        }
        flag = !flag;
    })

    // 位置
    function position() {
        let scoreh = 0,scoreb = 0,posh = null,posb = null;
        for (let i in blank){
            let obj = {x:i.split('_')[0],y:i.split('_')[1]};
            if(isSuccess(obj,hei)>scoreh){
                scoreh = isSuccess(obj,hei);
                posh = obj;
            }
            if(isSuccess(obj,bai)>scoreb){
                scoreb = isSuccess(obj,bai);
                posb = obj;
            }
        }
        return scoreh >= scoreb ? posh : posb;
    }

    function isSuccess(data,colorObj){
        let h=1,s=1,zx=1,yx=1;
        let x=data.x,y=data.y;

        while (colorObj[x+'_'+(++y)]){
            h++;
        }
        x=data.x,y=data.y;
        while (colorObj[x+'_'+(--y)]){
            h++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+'_'+y]){
            s++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+'_'+y]){
            s++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+'_'+(++y)]){
            yx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+'_'+(--y)]){
            zx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+'_'+(--y)]){
            yx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+'_'+(++y)]){
            zx++;
        }
        return Math.max(h,s,zx,yx);
    }

});