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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    // Function to start playing.
    function startPlay() {
        if (running)
            return;
        running = true;
        for (var i = 0; i < reels.length; i++) {
            var r = reels[i];
            var extra = Math.floor(Math.random() * 3);
            var target = r.position + 10 + i * 5 + extra;
            var time = 2500 + i * 600 + extra * 600;
            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }
    // Reels done handler.
    function reelsComplete() {
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
    var app, REEL_WIDTH, SYMBOL_SIZE, slotTextures, reels, reelContainer, i, rc, reel, j, symbol, margin, top, bottom, fill, colors, texturePikachu, spritePikachu, style, playText, headerText, running, tweening;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new pixi_js_1.Application();
                // Initialize the application
                return [4 /*yield*/, app.init({ background: '#1099bb', resizeTo: window })];
            case 1:
                // Initialize the application
                _a.sent();
                // Append the application canvas to the document body
                document.body.appendChild(app.canvas);
                // Load the textures
                return [4 /*yield*/, pixi_js_1.Assets.load([
                        'images/assets/9.png',
                        'images/assets/A.png',
                        'images/assets/J.png',
                        'images/assets/K.png',
                        'images/assets/Q.png',
                    ])];
            case 2:
                // Load the textures
                _a.sent();
                REEL_WIDTH = 160;
                SYMBOL_SIZE = 150;
                slotTextures = [
                    pixi_js_1.Texture.from('images/assets/A.png'),
                    pixi_js_1.Texture.from('images/assets/9.png'),
                    pixi_js_1.Texture.from('images/assets/J.png'),
                    pixi_js_1.Texture.from('images/assets/K.png'),
                    pixi_js_1.Texture.from('images/assets/Q.png'),
                ];
                reels = [];
                reelContainer = new pixi_js_1.Container();
                for (i = 0; i < 5; i++) {
                    rc = new pixi_js_1.Container();
                    rc.x = i * REEL_WIDTH;
                    reelContainer.addChild(rc);
                    reel = {
                        container: rc,
                        symbols: [],
                        position: 0,
                        previousPosition: 0,
                        blur: new pixi_js_1.BlurFilter(),
                    };
                    reel.blur.blurX = 0;
                    reel.blur.blurY = 0;
                    rc.filters = [reel.blur];
                    // Build the symbols
                    for (j = 0; j < 4; j++) {
                        symbol = new pixi_js_1.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
                        // Scale the symbol to fit symbol area.
                        symbol.y = j * SYMBOL_SIZE;
                        symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
                        symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
                        reel.symbols.push(symbol);
                        rc.addChild(symbol);
                    }
                    reels.push(reel);
                }
                app.stage.addChild(reelContainer);
                margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
                reelContainer.y = margin;
                reelContainer.x = Math.round((app.screen.width - REEL_WIDTH * 5) / 2);
                top = new pixi_js_1.Graphics().rect(0, 0, app.screen.width, margin).fill({ color: 0x0 });
                bottom = new pixi_js_1.Graphics().rect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin).fill({ color: 0x0 });
                fill = new pixi_js_1.FillGradient(0, 0, 0, 2);
                colors = [0xffffff, 0x00ff99].map(function (color) { return pixi_js_1.Color.shared.setValue(color).toNumber(); });
                colors.forEach(function (number, index) {
                    var ratio = index / colors.length;
                    fill.addColorStop(ratio, number);
                });
                return [4 /*yield*/, pixi_js_1.Assets.load('images/assets/pikachu.png')];
            case 3:
                texturePikachu = _a.sent();
                spritePikachu = pixi_js_1.Sprite.from(texturePikachu);
                app.stage.addChild(spritePikachu);
                spritePikachu.scale.set(0.5, 0.2);
                spritePikachu.position.set(1000, 500);
                style = new pixi_js_1.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 36,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fill: { fill: fill },
                    stroke: { color: 0x4a1850, width: 5 },
                    dropShadow: {
                        color: 0x000000,
                        angle: Math.PI / 6,
                        blur: 4,
                        distance: 6,
                    },
                    wordWrap: true,
                    wordWrapWidth: 440,
                });
                playText = new pixi_js_1.Text('Choose your Pokemon!', style);
                playText.x = Math.round((bottom.width - playText.width) / 2);
                playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
                bottom.addChild(playText);
                headerText = new pixi_js_1.Text('Pokemon Slot', style);
                headerText.x = Math.round((top.width - headerText.width) / 2);
                headerText.y = Math.round((margin - headerText.height) / 2);
                top.addChild(headerText);
                app.stage.addChild(top);
                app.stage.addChild(bottom);
                // Set the interactivity.
                bottom.eventMode = 'static';
                bottom.cursor = 'pointer';
                bottom.addListener('pointerdown', function () {
                    startPlay();
                });
                running = false;
                // Listen for animate update.
                app.ticker.add(function () {
                    // Update the slots.
                    for (var i = 0; i < reels.length; i++) {
                        var r = reels[i];
                        // Update blur filter y amount based on speed.
                        r.blur.blurY = (r.position - r.previousPosition) * 8;
                        r.previousPosition = r.position;
                        // Update symbol positions on reel.
                        for (var j = 0; j < r.symbols.length; j++) {
                            var s = r.symbols[j];
                            var prevy = s.y;
                            s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                            if (s.y < 0 && prevy > SYMBOL_SIZE) {
                                // Detect going over and swap a texture.
                                s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                                s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                                s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
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
