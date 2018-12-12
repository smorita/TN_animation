function HOTRG(canvas) {
    var cw = canvas.width;
    var ch = canvas.height;

    var stage = new createjs.Stage(canvas);
    stage.x = cw/2;
    stage.y = ch/2;

    var Lx = 6;
    var Ly = 6;
    var w = cw / Lx; // grid width
    var r = w / 6.0; // radius
    var lw = w / 50.0; // line width
    var ix, iy;

    var t0 = 2000;
    var t1 = 2500;
    var t2 = 1000;
    var t3 = 500;
    var t_pop = 1000;

    var t_total = t0 + t1 + t2 + t3;
    var tween_prop = {loop: true, useTicks: false};
    var ease = createjs.Ease.cubicInOut;

    var curve = new createjs.Graphics()
        .ss(lw, null, null, null, true).s("Black")
        .mt(-w/2, w/2)
        .lt(-w*3/8, w/4)
        .qt(-w/4, 0, -w/8, 0)
        .lt(w/8, 0)
        .qt(w/4, 0, w*3/8, w/4)
        .lt(w/2, w/2);

    var tri0 = new createjs.Graphics()
        .beginFill("#ffa347")
        .mt(r, 0)
        .lt(-r/2.0, r/1.17)
        .lt(-r/2.0, -r/1.17)
        .closePath();
    var tri1 = new createjs.Graphics()
        .beginFill("#ff4747")
        .mt(-r, 0)
        .lt(r/2.0, r/1.17)
        .lt(r/2.0, -r/1.17)
        .closePath();

    function create_unit() {
        var l0 = new createjs.Shape(curve);
        l0.scaleY = 1e-10;
        l0.y = -w/2;
        var l1 = new createjs.Shape(curve);
        l1.scaleY = 1e-10;
        l1.y = w/2;
        l1.rotation = 180;
        createjs.Tween.get(l0, tween_prop)
            .to({scaleY: 1}, t0, ease)
            .wait(t_total - t0);
        createjs.Tween.get(l1, tween_prop)
            .to({scaleY: 1}, t0, ease)
            .wait(t_total - t0);

        var lines = new createjs.Container();
        createjs.Tween.get(lines, tween_prop)
            .wait(t0)
            .to({scale: 0}, t1, ease)
            .wait(t_total - t0 - t1);
        lines.addChild(l0, l1);

        var lv = new createjs.Shape();
        lv.graphics.ss(lw, null, null, null, true).s("Black")
            .mt(0, -w)
            .lt(0, w);

        var lhg = new createjs.Graphics()
            .ss(lw, null, null, null, true).s("Black")
            .mt(-w/2, 0)
            .lt(w/2, 0);
        var lh = new createjs.Shape(lhg);
        lh.x = w/2; lh.y = 0; lh.scale = 0;
        createjs.Tween.get(lh, tween_prop)
            .wait(t0)
            .to({scale: 1}, t1, ease)
            .wait(t_total - t0 - t1);

        var a0 = new createjs.Shape();
        var a1 = new createjs.Shape();
        a0.graphics.beginFill("#4747ff").drawCircle(0, 0, r);
        a1.graphics.beginFill("#4747ff").drawCircle(0, 0, r);
        a0.x = 0; a0.y = w/2;
        a1.x = 0; a1.y = -w/2;
        createjs.Tween.get(a0, tween_prop)
            .wait(t0)
            .to({x: 0, y:0}, t1, ease)
            .wait(t_total - t0 - t1);
        createjs.Tween.get(a0, tween_prop)
            .wait(t_total - t3 - t2)
            .to({scaleY: 2.0}, t3 + t2, ease);
        createjs.Tween.get(a1, tween_prop)
            .wait(t0)
            .to({x: 0, y:0}, t1, ease)
            .wait(t_total - t0 - t1);

        var b0 = new createjs.Shape(tri0);
        var b1 = new createjs.Shape(tri1);
        b0.x = w/2; b0.y = 0; b0.scale=0;
        b1.x = -w/2; b1.y = 0; b1.scale=0;
        createjs.Tween.get(b0, tween_prop)
            .wait(t0-t_pop)
            .to({scale: 1}, t_pop, ease)
            .to({x: 0, y:0}, t1, ease)
            .wait(t_total - t0 - t1);
        createjs.Tween.get(b1, tween_prop)
            .wait(t0-t_pop)
            .to({scale: 1}, t_pop, ease)
            .to({x: 0, y:0}, t1, ease)
            .wait(t_total - t0 - t1);

        var unit = new createjs.Container();
        unit.addChild(lines, lv, lh, b1, b0, a1, a0);
        return unit;
    }

    for(ix=-Lx; ix<Lx+1; ix++) {
        for(iy=-Ly; iy<Ly+1; iy++) {
            if((iy+2*Ly)%2==1) {
                var u = create_unit();
                u.x = ix*w + w/2;
                u.y = iy*w;
                stage.addChild(u);
            }
        }
    }

    var ease2 = createjs.Ease.linear;
    createjs.Tween.get(stage, tween_prop)
        .wait(t0 + t1/2)
        .to({scaleY: 1.0/2.0}, t_total - t0 - t1/2, ease);
    createjs.Tween.get(stage, tween_prop)
        .set({rotation: 0})
        .wait(t_total)
        .set({rotation: 90})
        .wait(t_total);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
}
