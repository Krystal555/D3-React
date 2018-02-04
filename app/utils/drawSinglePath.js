/**
 * 输入的x1,y1,x2,y2是以地图为标准的尺寸（大尺寸）
 */
export default{
    drawSingleLine(x1,y1,x2,y2){ //两个圆心距离
        let dx1, dy1, dx2, dy2, value, angle, drawX1, drawY1, drawX2, drawY2, r1 = 8, r2 = 14;
        if (x2 === x1 && y2 < y1) {
            dx1 = 0;
            dy1 = -r1;
            dx2 = 0;
            dy2 = -r2;
        } else if (x2 === x1 && y2 > y1) {
            dx1 = 0;
            dy1 = r1;
            dx2 = 0;
            dy2 = r2;
        } else if (y2 === y1 && x2 > x1) {
            dx1 = r1;
            dy1 = 0;
            dx2 = r2;
            dy2 = 0;
        } else if (y2 === y1 && x2 < x1) {
            dx1 = -r1;
            dy1 = 0;
            dx2 = -r2;
            dy2 = 0;
        } else {
            value = (y2 - y1) / (x2 - x1);
            angle = Math.atan(value);
            if ((y2 - y1 < 0 && x2 - x1 > 0) || (y2 - y1 > 0 && x2 - x1 > 0)) {
                dx1 = r1 * Math.cos(angle);
                dy1 = r1 * Math.sin(angle);
                dx2 = r2 * Math.cos(angle);
                dy2 = r2 * Math.sin(angle);
            } else {
                dx1 = r1 * Math.cos(angle + Math.PI);
                dy1 = r1 * Math.sin(angle + Math.PI);
                dx2 = r2 * Math.cos(angle + Math.PI);
                dy2 = r2 * Math.sin(angle + Math.PI);
            }
        }
        drawX1 = (x1 + dx1);
        drawY1 = (y1 + dy1);
        drawX2 = (x2 - dx2);
        drawY2 = (y2 - dy2);

        return {
            x1:drawX1,
            y1:drawY1,
            x2:drawX2,
            y2:drawY2,
        }
    }
}