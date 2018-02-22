/**
 * 计算贝塞尔曲线控制点的坐标
 */
export default function(x1,y1,x2,y2){
    if(y2===y1 && x2>x1){ //路径方向水平向右
        let Xm = (x1+x2)/2, Ym = (y1+y2)/2;//中点
        let angle = Math.PI/2, r=(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2;
        let Xr = r*Math.cos(angle), Yr=r*Math.sin(angle);
        let Xc = Xm+Xr, Yc=Ym-Yr;
        if(Xc<0||Yc<0){
            Xr = r*Math.cos(-angle);Yr=r*Math.sin(-angle);
            Xc = Xm+Xr;Yc=Ym-Yr;
        }
        return [Xc,Yc];
    }else if(x2===x1 && y2<y1){ //路径方向水平向上
        let Xm = (x1+x2)/2, Ym = (y1+y2)/2;//中点
        let angle = Math.PI, r=(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2;
        let Xr = r*Math.cos(angle), Yr=r*Math.sin(angle);
        let Xc = Xm+Xr, Yc=Ym-Yr;
        if(Xc<0||Yc<0){
            Xr = r*Math.cos(0);Yr=r*Math.sin(0);
            Xc = Xm+Xr;Yc=Ym-Yr;
        }
        return [Xc,Yc];
    }else if(y2===y1 && x2<x1){ //路径方向水平向左
        let Xm = (x1+x2)/2, Ym = (y1+y2)/2;//中点
        let angle = 3*Math.PI/2, r=(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2;//angle是控制点与水平线的角度，r是半径长
        let Xr = r*Math.cos(angle), Yr=r*Math.sin(angle);//控制点在极坐标下的坐标
        let Xc = Xm+Xr, Yc=Ym-Yr;//控制点在仓库地图上的坐标
        return [Xc,Yc];
    }else if(x2===x1 && y2>y1){ //路径方向水平向下
        let Xm = (x1+x2)/2, Ym = (y1+y2)/2;//中点
        let angle = 0, r=(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2;//angle是控制点与水平线的角度，r是半径长
        let Xr = r*Math.cos(angle), Yr=r*Math.sin(angle);//控制点在极坐标下的坐标
        let Xc = Xm+Xr, Yc=Ym-Yr;//控制点在仓库地图上的坐标
        return [Xc,Yc];
    }else if(x2>x1 && y2<y1){ //路径方向右上方
        let Xm = (x1+x2)/2, Ym = (y1+y2)/2;//中点
        let angle = Math.PI/2+Math.atan(Math.abs((y2-y1)/(x2-x1))), r=(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2;//angle是控制点与水平线的角度，r是半径长
        let Xr = r*Math.cos(angle), Yr=r*Math.sin(angle);//控制点在极坐标下的坐标
        let Xc = Xm+Xr, Yc=Ym-Yr;//控制点在仓库地图上的坐标
        if(Xc<0||Yc<0){
            angle = Math.atan(Math.abs((y2-y1)/(x2-x1)))-Math.PI/2;
            Xr = r*Math.cos(angle);Yr=r*Math.sin(angle);
            Xc = Xm+Xr;Yc=Ym-Yr;
        }
        return [Xc,Yc];
    }else if(x2<x1 && y2<y1){ //路径方向左上方
        let Xm = (x1+x2)/2, Ym = (y1+y2)/2;//中点
        let angle = 3*Math.PI/2-Math.atan(Math.abs((y2-y1)/(x2-x1))), r=(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2;//angle是控制点与水平线的角度，r是半径长
        let Xr = r*Math.cos(angle), Yr=r*Math.sin(angle);//控制点在极坐标下的坐标
        let Xc = Xm+Xr, Yc=Ym-Yr;//控制点在仓库地图上的坐标
        if(Xc<0||Yc<0){
            angle = Math.PI/2-Math.atan(Math.abs((y2-y1)/(x2-x1)));
            Xr = r*Math.cos(angle);Yr=r*Math.sin(angle);
            Xc = Xm+Xr;Yc=Ym-Yr;
        }
        return [Xc,Yc];
    }else if(x2<x1 && y2>y1){ //路径方向左下方
        let Xm = (x1+x2)/2, Ym = (y1+y2)/2;//中点
        let angle = 3*Math.PI/2+Math.atan(Math.abs((y2-y1)/(x2-x1))), r=(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2;//angle是控制点与水平线的角度，r是半径长
        let Xr = r*Math.cos(angle), Yr=r*Math.sin(angle);//控制点在极坐标下的坐标
        let Xc = Xm+Xr, Yc=Ym-Yr;//控制点在仓库地图上的坐标
        return [Xc,Yc];
    }else if(x2>x1 && y2>y1){ //路径方向右下方
        let Xm = (x1+x2)/2, Ym = (y1+y2)/2;//中点
        let angle = Math.PI/2-Math.atan(Math.abs((y2-y1)/(x2-x1))), r=(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2;//angle是控制点与水平线的角度，r是半径长
        let Xr = r*Math.cos(angle), Yr=r*Math.sin(angle);//控制点在极坐标下的坐标
        let Xc = Xm+Xr, Yc=Ym-Yr;//控制点在仓库地图上的坐标
        if(Xc<0||Yc<0){
            angle = Math.PI/2+Math.atan(Math.abs((y2-y1)/(x2-x1)));
            Xr = r*Math.cos(-angle);Yr=r*Math.sin(-angle);
            Xc = Xm+Xr;Yc=Ym-Yr;
        }
        return [Xc,Yc];
    }
}