function TRG(canvas) {
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

    var t_total = 6000;
    var tween_prop = {loop: true, useTicks: false};
    var ease = createjs.Ease.cubicInOut;

    function create_unit(parity=0) {
        // draw a 2x2 unit cell which shrink to one tensor.
        var t0 = 5000;
        var t1 = t_total - t0;
        var unit = new createjs.Container();
        var l0 = new createjs.Shape();
        l0.graphics.ss(lw, null, null, null, true).s("Black")
            .mt(-w/2, -w/2)
            .lt(w/2, -w/2)
            .lt(w/2, w/2)
            .lt(-w/2, w/2)
            .lt(-w/2, -w/2);
        createjs.Tween.get(l0, tween_prop).to({scale: 0}, t_total, ease);
        unit.addChild(l0);

        var a0 = new createjs.Shape();
        var a1 = new createjs.Shape();
        var a2 = new createjs.Shape();
        var a3 = new createjs.Shape();
        a0.graphics.beginFill("#4747ff").drawCircle(0, 0, r);
        a1.graphics.beginFill("#ff4747").drawCircle(0, 0, r);
        a2.graphics.beginFill("#47a3ff").drawCircle(0, 0, r);
        a3.graphics.beginFill("#ffa347").drawCircle(0, 0, r);
        a0.x = -w/2; a0.y = -w/2;
        a1.x = -w/2; a1.y = w/2;
        a2.x = w/2; a2.y = w/2;
        a3.x = w/2; a3.y = -w/2;
        createjs.Tween.get(a0, tween_prop).to({x: 0, y: 0}, t_total, ease);
        createjs.Tween.get(a1, tween_prop).to({x: 0, y: 0}, t_total, ease);
        createjs.Tween.get(a2, tween_prop).to({x: 0, y: 0}, t_total, ease);
        createjs.Tween.get(a3, tween_prop).to({x: 0, y: 0}, t_total, ease);
        createjs.Tween.get(a0, tween_prop).wait(t0).to({scale: Math.sqrt(2.0)}, t1, ease);
        createjs.Tween.get(a1, tween_prop).wait(t0).to({scale: Math.sqrt(2.0)}, t1, ease);
        if(parity==0) {
            unit.addChild(a1, a2, a3, a0);
        } else {
            unit.addChild(a0, a3, a2, a1);
        }
        return unit;
    }

    function create_line(s=1) {
        // draw a diagonal line
        var unit = new createjs.Container();
        var l0 = new createjs.Shape();
        l0.graphics.ss(lw, null, null, null, true).s("Black")
            .mt(-w/2, -w/2*s)
            .lt(w/2, w/2*s);
        l0.scale = 0;
        createjs.Tween.get(l0, tween_prop).to({scale: 1}, t_total, ease);
        unit.addChild(l0);
        return unit;
    }

    for(ix=-Lx; ix<Lx+1; ix++) {
        for(iy=-Ly; iy<Ly+1; iy++) {
            if((ix+iy)%2==0) continue;
            var l0 = create_line(-1);
            var l1 = create_line(+1);
            var u = create_unit(ix%2);

            l0.x = ix*w + w/2;
            l0.y = iy*w - w/2;
            l1.x = ix*w + w/2;
            l1.y = iy*w + w/2;
            u.x = ix*w;
            u.y = iy*w;
            stage.addChild(l0, l1, u);
        }
    }

    createjs.Tween.get(stage, tween_prop)
        .wait(3000)
        .to({ scale: 1.0/Math.sqrt(2.0), rotation: 45}, t_total-3000, ease);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
}
