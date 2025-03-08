"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var pixi_js_1 = require("pixi.js");
var devtools_1 = require("@pixi/devtools");
pixi_js_1.Assets.addBundle('fonts', [{ alias: 'Irish', src: 'fonts/IrishGrover-Regular.ttf ' }]);
await pixi_js_1.Assets.loadBundle('fonts');
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function play() {
        // update text values
        balance.value -= 5;
        txtCoins.text = balance.value.toString();
        winnings.value += Math.floor(Math.random() * 11);
        txtWins.text = winnings.value.toString();
        // set properties of elements
        containerSpin.interactive = false;
        containerSpin.cursor = 'null';
        [sprCyn, sprCyn1, sprBtn].forEach(function (sprite) { return sprite.visible = false; });
        [sprCynF, sprCynF1, sprGl].forEach(function (sprite) { return sprite.visible = true; });
        if (running)
            return;
        running = true;
        for (var i = 0; i < reels.length; i++) {
            var rowIndex = reels[i];
            var extra = Math.floor(Math.random() * 1);
            var target = rowIndex.position + 10 + i * 5 + extra;
            var time = 1500 + i * 600 + extra * 600;
            tweenTo(rowIndex, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }
    // Reels done handler.
    function reelsComplete() {
        [sprCynF, sprCynF1, sprGl].forEach(function (sprite) { return sprite.visible = false; });
        [sprCyn, sprCyn1, sprBtn].forEach(function (sprite) { return sprite.visible = true; });
        containerSpin.interactive = true;
        containerSpin.cursor = 'pointer';
        running = false;
    }
    function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
        var tween = {
            object: object,
            property: property,
            propertyBeginValue: object[property],
            target: target,
            easing: easing,
            time: time,
            change: onchange,
            complete: oncomplete,
            start: Date.now(),
        };
        tweening.push(tween);
        return tween;
    }
    // Basic lerp function.
    function lerp(a1, a2, t) {
        return a1 * (1 - t) + a2 * t;
    }
    // Backout function from tweenjs.
    function backout(amount) {
        return function (t) { return --t * t * ((amount + 1) * t + amount) + 1; };
    }
    var app, textureBg, sprBg, containerBg, textures, sprMiddle, sprFront, containerTitle, textureLogo, sprLogo, containerGrid, rectangle, blurRect, mask, slotTextures, widthReel, sizeSymbol, reels, i, containerRow, reel, j, symbol, textureCyn, textureCynFire, sprCyn, sprCyn1, sprCynF, sprCynF1, containerCoins, rectCoins, balance, textStyle, txtCoins, textureBall, sprBall, containerWins, rectWins, winnings, textStyle1, txtWins, texturePlus, sprPlus, containerSpin, textureBtn, sprBtn, textureGl, sprGl, blinkSpeed, increasing, running, tweening;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new pixi_js_1.Application();
                //initialize dev tool on the app
                (0, devtools_1.initDevtools)({ app: app });
                return [4 /*yield*/, app.init({ resizeTo: window })];
            case 1:
                _a.sent();
                // append the application canvas to the document body
                document.body.appendChild(app.canvas);
                // prevents from having scroll bar
                app.canvas.style.position = "absolute";
                return [4 /*yield*/, pixi_js_1.Assets.load('assets/images/back.png')];
            case 2:
                textureBg = _a.sent();
                sprBg = pixi_js_1.Sprite.from(textureBg);
                // set bg to the same dimension as screen
                sprBg.width = app.screen.width;
                sprBg.height = app.screen.height;
                containerBg = new pixi_js_1.Container();
                containerBg.addChild(sprBg);
                app.stage.addChild(containerBg);
                return [4 /*yield*/, pixi_js_1.Assets.load([
                        "assets/images/middle.png",
                        "assets/images/front.png"
                    ])];
            case 3:
                textures = _a.sent();
                sprMiddle = new pixi_js_1.TilingSprite({
                    texture: textures["assets/images/middle.png"],
                    width: app.screen.width,
                    height: app.screen.height
                });
                sprFront = new pixi_js_1.TilingSprite({
                    texture: textures["assets/images/front.png"],
                    width: app.screen.width,
                    height: app.screen.height
                });
                //set tiling position
                sprMiddle.tileScale.set(app.screen.width / sprMiddle.texture.width, app.screen.height / sprMiddle.texture.height);
                sprFront.tileScale.set(app.screen.width / sprFront.texture.width, app.screen.height / sprFront.texture.height);
                containerBg.addChild(sprMiddle);
                containerBg.addChild(sprFront);
                // move sprites
                app.ticker.add(function () {
                    sprMiddle.tilePosition.x += 0.5;
                    sprFront.tilePosition.x += 1;
                });
                containerTitle = new pixi_js_1.Container();
                app.stage.addChild(containerTitle);
                return [4 /*yield*/, pixi_js_1.Assets.load('assets/images/SLOT.png')];
            case 4:
                textureLogo = _a.sent();
                sprLogo = pixi_js_1.Sprite.from(textureLogo);
                app.stage.addChild(sprLogo);
                //change logo position and size
                sprLogo.anchor.set(0.5);
                sprLogo.setSize(400, 280);
                sprLogo.x = (app.screen.width / 2);
                sprLogo.y = 130;
                containerTitle.addChild(sprLogo);
                containerGrid = new pixi_js_1.Container();
                rectangle = new pixi_js_1.Graphics()
                    .roundRect(0, 0, 900, 500)
                    .fill({
                    color: '#ffffff', // Sets the color
                    alpha: 0.4 // Sets the opacity
                });
                containerGrid.addChild(rectangle);
                blurRect = new pixi_js_1.BlurFilter();
                blurRect.blur = 1;
                rectangle.filters = [blurRect];
                app.stage.addChild(containerGrid);
                containerGrid.y = (app.screen.height - containerGrid.height) / 2;
                containerGrid.x = (app.screen.width - containerGrid.width) / 2;
                mask = new pixi_js_1.Graphics()
                    .roundRect(0, 0, 1450, 710)
                    .fill({
                    color: '#ffffff', // Sets the color
                    alpha: 0.4 // Sets the opacity
                });
                containerGrid.mask = mask;
                // Load the textures
                return [4 /*yield*/, pixi_js_1.Assets.load([
                        'assets/images/9.png',
                        'assets/images/A.png',
                        'assets/images/J.png',
                        'assets/images/K.png',
                        'assets/images/Q.png',
                        'assets/images/10.png',
                        'assets/images/wild.png',
                        'assets/images/bonus.png',
                        'assets/images/s1.png',
                        'assets/images/s2.png',
                        'assets/images/s3.png',
                        'assets/images/s4.png'
                    ])];
            case 5:
                // Load the textures
                _a.sent();
                slotTextures = [
                    pixi_js_1.Texture.from('assets/images/A.png'),
                    pixi_js_1.Texture.from('assets/images/9.png'),
                    pixi_js_1.Texture.from('assets/images/J.png'),
                    pixi_js_1.Texture.from('assets/images/K.png'),
                    pixi_js_1.Texture.from('assets/images/Q.png'),
                    pixi_js_1.Texture.from('assets/images/10.png'),
                    pixi_js_1.Texture.from('assets/images/wild.png'),
                    pixi_js_1.Texture.from('assets/images/bonus.png'),
                    pixi_js_1.Texture.from('assets/images/s1.png'),
                    pixi_js_1.Texture.from('assets/images/s2.png'),
                    pixi_js_1.Texture.from('assets/images/s3.png'),
                    pixi_js_1.Texture.from('assets/images/s4.png')
                ];
                widthReel = 170;
                sizeSymbol = 130;
                reels = [];
                for (i = 0; i < 5; i++) {
                    containerRow = new pixi_js_1.Container();
                    containerRow.x = i * widthReel + 43.5; // sets the spacing between each row as it loops
                    containerRow.y = 185;
                    containerGrid.addChild(containerRow);
                    reel = {
                        container: containerRow,
                        symbols: [],
                        position: 0,
                        previousPosition: 0,
                        blur: new pixi_js_1.BlurFilter(),
                    };
                    reel.blur.blurX = 0;
                    reel.blur.blurY = 0;
                    containerRow.filters = [reel.blur];
                    // Build the symbols
                    for (j = 0; j < 3; j++) {
                        symbol = new pixi_js_1.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
                        // Scale the symbol to fit symbol area.
                        symbol.y = j * sizeSymbol;
                        symbol.scale.x = symbol.scale.y = Math.min(sizeSymbol / symbol.width, sizeSymbol / symbol.height);
                        symbol.x = Math.round((sizeSymbol - symbol.width) / 2);
                        reel.symbols.push(symbol);
                        containerRow.addChild(symbol);
                    }
                    reels.push(reel);
                }
                app.stage.addChild(containerGrid);
                return [4 /*yield*/, pixi_js_1.Assets.load('assets/images/cyndaquil.png')];
            case 6:
                textureCyn = _a.sent();
                return [4 /*yield*/, pixi_js_1.Assets.load('assets/images/cyndaquil-fire.png')];
            case 7:
                textureCynFire = _a.sent();
                sprCyn = Object.assign(pixi_js_1.Sprite.from(textureCyn), {
                    width: 290,
                    height: 300,
                    anchor: { x: 0.5, y: 0.5 },
                    position: { x: 300, y: 580 },
                    visible: true,
                });
                sprCyn.scale.x *= -1; // flip horizontally
                sprCyn1 = Object.assign(pixi_js_1.Sprite.from(textureCyn), {
                    width: 290,
                    height: 300,
                    anchor: { x: 0.5, y: 0.5 },
                    position: { x: 1620, y: 580 },
                    visible: true,
                });
                sprCynF = Object.assign(pixi_js_1.Sprite.from(textureCynFire), {
                    width: 400,
                    height: 400,
                    anchor: { x: 0.5, y: 0.5 },
                    position: { x: 1650, y: 530 },
                    visible: false,
                });
                sprCynF1 = Object.assign(pixi_js_1.Sprite.from(textureCynFire), {
                    width: 400,
                    height: 400,
                    anchor: { x: 0.5, y: 0.5 },
                    position: { x: 270, y: 530 },
                    visible: false,
                });
                sprCynF1.scale.x *= -1;
                app.stage.addChild(sprCyn);
                app.stage.addChild(sprCyn1);
                app.stage.addChild(sprCynF);
                app.stage.addChild(sprCynF1);
                containerCoins = new pixi_js_1.Container();
                app.stage.addChild(containerCoins);
                rectCoins = new pixi_js_1.Graphics()
                    .roundRect(0, 0, 280, 70, 30)
                    .fill({
                    color: '#870303', // Sets the color
                })
                    .stroke({
                    width: 2,
                    color: 0xFFCB00
                });
                containerCoins.addChild(rectCoins);
                containerCoins.position.set(1490, 280);
                balance = { value: 1000 };
                textStyle = new pixi_js_1.TextStyle({
                    dropShadow: true,
                    fill: "#fec702",
                    fontFamily: "pokemon",
                    letterSpacing: 5,
                    fontSize: 23,
                });
                txtCoins = new pixi_js_1.Text({
                    text: balance.value.toString(),
                    style: textStyle
                });
                txtCoins.anchor.set(0.5);
                txtCoins.x = 150;
                txtCoins.y = rectCoins.height / 2;
                return [4 /*yield*/, pixi_js_1.Assets.load('assets/images/pokeball.png')];
            case 8:
                textureBall = _a.sent();
                sprBall = pixi_js_1.Sprite.from(textureBall);
                sprBall.setSize(30, 30);
                sprBall.x = 80;
                sprBall.y = ((containerCoins.width - txtCoins.width) / 12);
                containerCoins.addChild(sprBall);
                containerCoins.addChild(txtCoins);
                containerWins = new pixi_js_1.Container();
                rectWins = new pixi_js_1.Graphics()
                    .roundRect(0, 0, 280, 70, 30)
                    .fill({
                    color: '#870303', // Sets the color
                })
                    .stroke({
                    width: 2,
                    color: 0x56ff74
                });
                containerWins.addChild(rectWins);
                containerWins.position.set(140, 280);
                winnings = { value: 0 };
                textStyle1 = new pixi_js_1.TextStyle({
                    dropShadow: true,
                    fill: "#fec702",
                    fontFamily: "pokemon",
                    letterSpacing: 5,
                });
                txtWins = new pixi_js_1.Text({
                    text: winnings.value.toString(),
                    style: textStyle1
                });
                txtWins.anchor.set(0.5);
                txtWins.x = 150;
                txtWins.y = rectWins.height / 2;
                return [4 /*yield*/, pixi_js_1.Assets.load('assets/images/plus.png')];
            case 9:
                texturePlus = _a.sent();
                sprPlus = pixi_js_1.Sprite.from(texturePlus);
                sprPlus.setSize(25, 25);
                sprPlus.y = 20;
                sprPlus.x = ((containerWins.width - txtWins.width) / 2.5);
                containerWins.addChild(sprPlus);
                containerWins.addChild(txtWins);
                app.stage.addChild(containerWins);
                containerSpin = new pixi_js_1.Container();
                return [4 /*yield*/, pixi_js_1.Assets.load('assets/images/spin.png')];
            case 10:
                textureBtn = _a.sent();
                sprBtn = pixi_js_1.Sprite.from(textureBtn);
                containerSpin.addChild(sprBtn);
                // make spin clickable
                containerSpin.eventMode = 'static';
                containerSpin.cursor = 'pointer';
                sprBtn.width = 100;
                sprBtn.height = 60;
                return [4 /*yield*/, pixi_js_1.Assets.load('assets/images/gl.png')];
            case 11:
                textureGl = _a.sent();
                sprGl = pixi_js_1.Sprite.from(textureGl);
                containerSpin.addChild(sprGl);
                containerSpin.x = (app.screen.width - sprBtn.width) / 2;
                containerSpin.y = 750;
                sprGl.width = 190;
                sprGl.height = 70;
                sprGl.visible = false;
                sprGl.position.set(-38, 0);
                app.stage.addChild(containerSpin);
                containerSpin.addListener('pointerdown', function () {
                    play();
                });
                blinkSpeed = 0.01;
                increasing = false;
                app.ticker.add(function () {
                    if (increasing) {
                        sprBtn.alpha += blinkSpeed;
                        if (sprBtn.alpha >= 1)
                            increasing = false; // Reverse direction
                    }
                    else {
                        sprBtn.alpha -= blinkSpeed;
                        if (sprBtn.alpha <= 0.2)
                            increasing = true; // Reverse direction
                    }
                });
                running = false;
                // Listen for animate update.
                app.ticker.add(function () {
                    // Update the slots.
                    for (var i = 0; i < reels.length; i++) {
                        var rowIndex = reels[i];
                        // Update blur filter y amount based on speed.
                        rowIndex.blur.blurY = (rowIndex.position - rowIndex.previousPosition) * 8;
                        rowIndex.previousPosition = rowIndex.position;
                        // Update symbol positions on reel.
                        for (var j = 0; j < rowIndex.symbols.length; j++) {
                            var s = rowIndex.symbols[j];
                            var prevy = s.y;
                            s.y = ((rowIndex.position + j) % rowIndex.symbols.length) * sizeSymbol - sizeSymbol;
                            if (s.y < 0 && prevy > sizeSymbol) {
                                // Detect going over and swap a texture.
                                s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                                s.scale.x = s.scale.y = Math.min(sizeSymbol / s.texture.width, sizeSymbol / s.texture.height);
                                s.x = Math.round((sizeSymbol - s.width) / 2);
                            }
                        }
                    }
                });
                tweening = [];
                // Listen for animate update.
                app.ticker.add(function () {
                    var now = Date.now();
                    var remove = [];
                    for (var i = 0; i < tweening.length; i++) {
                        var t = tweening[i];
                        var phase = Math.min(1, (now - t.start) / t.time);
                        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
                        if (t.change)
                            t.change(t);
                        if (phase === 1) {
                            t.object[t.property] = t.target;
                            if (t.complete)
                                t.complete(t);
                            remove.push(t);
                        }
                    }
                    for (var i = 0; i < remove.length; i++) {
                        tweening.splice(tweening.indexOf(remove[i]), 1);
                    }
                });
                return [2 /*return*/];
        }
    });
}); })();
