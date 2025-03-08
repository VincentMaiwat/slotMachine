import {
    Application,
    Assets,
    BlurFilter,
    Color,
    Container,
    FillGradient,
    Graphics,
    Sprite,
    Text,
    TextStyle,
    Texture,
    TilingSprite,
} from 'pixi.js';
import { initDevtools } from '@pixi/devtools'

Assets.addBundle('fonts', [{alias: 'Irish', src: 'fonts/IrishGrover-Regular.ttf ' }]);
await Assets.loadBundle('fonts');

(async () => {
    // create new app
    const app = new Application();
    //initialize dev tool on the app
    initDevtools({app});

    await app.init({resizeTo: window });

    // append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // prevents from having scroll bar
    app.canvas.style.position = "absolute";

    // load background image
    const textureBg = await Assets.load('assets/images/back.png');
    const sprBg = Sprite.from(textureBg);

    // set bg to the same dimension as screen
    sprBg.width = app.screen.width;
    sprBg.height = app.screen.height;

    // create container for the backgrounds
    const containerBg = new Container();
    containerBg.addChild(sprBg);
    app.stage.addChild(containerBg);

    // load textures for tiling
    const textures = await Assets.load([
        "assets/images/middle.png",
        "assets/images/front.png"
    ]);

    // create tiling sprite
    const sprMiddle = new TilingSprite({
        texture: textures["assets/images/middle.png"],
        width: app.screen.width,
        height: app.screen.height
    });

    const sprFront = new TilingSprite({
        texture: textures["assets/images/front.png"],
        width: app.screen.width,
        height: app.screen.height
    });

    //set tiling position
    sprMiddle.tileScale.set(
        app.screen.width / sprMiddle.texture.width,
        app.screen.height / sprMiddle.texture.height
    );

    sprFront.tileScale.set(
        app.screen.width / sprFront.texture.width,
        app.screen.height / sprFront.texture.height
    );

    containerBg.addChild(sprMiddle);
    containerBg.addChild(sprFront);

    // move sprites
    app.ticker.add(() => {
        sprMiddle.tilePosition.x += 0.5;
        sprFront.tilePosition.x += 1;
    });

    // create container for title
    const containerTitle = new Container();
    app.stage.addChild(containerTitle);

        // load logo
        const textureLogo = await Assets.load('assets/images/SLOT.png');
        const sprLogo = Sprite.from(textureLogo);
        app.stage.addChild(sprLogo);

        //change logo position and size
        sprLogo.anchor.set(0.5);
        sprLogo.setSize(400,280);
        sprLogo.x = (app.screen.width / 2);
        sprLogo.y = 130

        containerTitle.addChild(sprLogo);

    // create container for the symbols
    const containerGrid = new Container();

        // create background rectangle
        const rectangle = new Graphics()
        .roundRect(0,0, 900, 500)
        .fill({
            color:'#ffffff', // Sets the color
            alpha: 0.4     // Sets the opacity
        });
        containerGrid.addChild(rectangle);

        // create blur filter for the rectangle
        const blurRect = new BlurFilter();
        blurRect.blur = 1;
        rectangle.filters = [blurRect];

    app.stage.addChild(containerGrid);
    containerGrid.y = (app.screen.height - containerGrid.height)/2;
    containerGrid.x = (app.screen.width - containerGrid.width)/2;

    // create mask to prevent the symbols from going out of bounds
    let mask = new Graphics()
    .roundRect(0,0, 1450, 710)
    .fill({
        color:'#ffffff', // Sets the color
        alpha: 0.4     // Sets the opacity
      });

    containerGrid.mask = mask;

    // Load the textures
    await Assets.load([
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
    ]);

    // Create different slot symbols
    const slotTextures: Texture[] = [
        Texture.from('assets/images/A.png'),
        Texture.from('assets/images/9.png'),
        Texture.from('assets/images/J.png'),
        Texture.from('assets/images/K.png'),
        Texture.from('assets/images/Q.png'),
        Texture.from('assets/images/10.png'),
        Texture.from('assets/images/wild.png'),
        Texture.from('assets/images/bonus.png'),
        Texture.from('assets/images/s1.png'),
        Texture.from('assets/images/s2.png'),
        Texture.from('assets/images/s3.png'),
        Texture.from('assets/images/s4.png')
    ];

    // Set size of sprites and slots
    const widthReel = 170;
    const sizeSymbol = 130;

    const reels: {
        container: Container;
        symbols: Sprite[];
        position: number;
        previousPosition: number;
        blur: BlurFilter;
    }[] = [];

    for (let i = 0; i < 5; i++) {
        const containerRow = new Container();

            containerRow.x = i * widthReel + 43.5; // sets the spacing between each row as it loops
            containerRow.y = 185;
            containerGrid.addChild(containerRow);

            const reel = {
                container: containerRow,
                symbols: [] as Sprite[],
                position: 0,
                previousPosition: 0,
                blur: new BlurFilter(),
            };

            reel.blur.blurX = 0;
            reel.blur.blurY = 0;
            containerRow.filters = [reel.blur];

            // Build the symbols
            for (let j = 0; j < 3; j++) {
                const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
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

    // insert cyndaquil icon
    const textureCyn = await Assets.load('assets/images/cyndaquil.png');
    const textureCynFire = await Assets.load('assets/images/cyndaquil-fire.png');
    const sprCyn = Object.assign(Sprite.from(textureCyn), {
        width: 290,
        height: 300,
        anchor: { x: 0.5, y: 0.5 },
        position: { x: 300, y: 580 },
        visible: true,
    });
    sprCyn.scale.x *= -1; // flip horizontally

    const sprCyn1 = Object.assign(Sprite.from(textureCyn), {
        width: 290,
        height: 300,
        anchor: { x: 0.5, y: 0.5 },
        position: { x: 1620, y: 580 },
        visible: true,
    });
    const sprCynF = Object.assign(Sprite.from(textureCynFire), {
        width: 400,
        height: 400,
        anchor: { x: 0.5, y: 0.5 },
        position: { x: 1650, y: 530 },
        visible: false,
    });
    const sprCynF1 = Object.assign(Sprite.from(textureCynFire), {
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

    // create a container for balance display
    const containerCoins = new Container();
        app.stage.addChild(containerCoins);

        const rectCoins = new Graphics()
        .roundRect(0,0, 280, 70, 30)
        .fill({
            color:'#870303', // Sets the color
            })
        .stroke({
            width: 2,
            color: 0xFFCB00
        });
        containerCoins.addChild(rectCoins);

        containerCoins.position.set(1490,280);

        const balance: { value: number } = { value: 1000 }; // Use an object to update the balance reference

        const textStyle = new TextStyle({
            dropShadow: true,
            fill: "#fec702",
            fontFamily: "pokemon",
            letterSpacing: 5,
            fontSize:23,
        });
        const txtCoins = new Text({
            text: balance.value.toString(),
            style: textStyle
        });
        txtCoins.anchor.set(0.5);
        txtCoins.x = 150;
        txtCoins.y = rectCoins.height / 2;

        const textureBall = await Assets.load('assets/images/pokeball.png');
        const sprBall = Sprite.from(textureBall);

        sprBall.setSize(30,30);
        sprBall.x = 80;
        sprBall.y = ((containerCoins.width - txtCoins.width) / 12);
        containerCoins.addChild(sprBall);
        containerCoins.addChild(txtCoins);

    // container for wins
    const containerWins = new Container();
        const rectWins = new Graphics()
        .roundRect(0,0, 280, 70, 30)
        .fill({
            color:'#870303', // Sets the color
            })
        .stroke({
            width: 2,
            color: 0x56ff74
        });
        containerWins.addChild(rectWins);

        containerWins.position.set(140,280);

        const winnings: { value: number } = { value: 0 }; // Use an object to update the balance reference

        const textStyle1 = new TextStyle({
            dropShadow: true,
            fill: "#fec702",
            fontFamily: "pokemon",
            letterSpacing: 5,
        });
        const txtWins = new Text({
            text: winnings.value.toString(),
            style: textStyle1
        });
        txtWins.anchor.set(0.5);
        txtWins.x = 150;
        txtWins.y = rectWins.height / 2;

        const texturePlus = await Assets.load('assets/images/plus.png');
        const sprPlus = Sprite.from(texturePlus);

        sprPlus.setSize(25,25);
        sprPlus.y = 20;
        sprPlus.x = ((containerWins.width - txtWins.width)/2.5);
        containerWins.addChild(sprPlus);
        containerWins.addChild(txtWins);

    app.stage.addChild(containerWins);

    // create container for the spin button
    const containerSpin = new Container();
        const textureBtn = await Assets.load('assets/images/spin.png');
        const sprBtn = Sprite.from(textureBtn);

        containerSpin.addChild(sprBtn);

        // make spin clickable
        containerSpin.eventMode = 'static';
        containerSpin.cursor = 'pointer';

        sprBtn.width = 100;
        sprBtn.height = 60;

        const textureGl = await Assets.load('assets/images/gl.png');
        const sprGl = Sprite.from(textureGl);

        containerSpin.addChild(sprGl);
        containerSpin.x = (app.screen.width - sprBtn.width) / 2;
        containerSpin.y = 750;

        sprGl.width = 190;
        sprGl.height = 70;
        sprGl.visible = false;
        sprGl.position.set(-38,0);

    app.stage.addChild(containerSpin);

    containerSpin.addListener('pointerdown', () =>{
        play();
    });

    let blinkSpeed = 0.01;
    let increasing = false;

    app.ticker.add(() => { // create blinking animation for spin button
        if (increasing) {
            sprBtn.alpha += blinkSpeed;
            if (sprBtn.alpha >= 1) increasing = false; // Reverse direction
        } else {
            sprBtn.alpha -= blinkSpeed;
            if (sprBtn.alpha <= 0.2) increasing = true; // Reverse direction
        }

    });
    // function to change visibilities and animate slot machine
    let running = false;

    function play(){
        // update text values
        balance.value -= 5;
        txtCoins.text = balance.value.toString();
        winnings.value += Math.floor(Math.random() * 11);
        txtWins.text = winnings.value.toString();

        // set properties of elements
        containerSpin.interactive = false;
        containerSpin.cursor = 'null';
        [sprCyn, sprCyn1, sprBtn ].forEach(sprite => sprite.visible = false);
        [sprCynF, sprCynF1, sprGl].forEach(sprite => sprite.visible = true);

        if (running) return;
        running = true;

        for (let i = 0; i < reels.length; i++ ){
            const rowIndex = reels[i];
            const extra = Math.floor(Math.random() * 1);
            const target = rowIndex.position + 10 + i * 5 + extra;
            const time = 1500 + i * 600 + extra * 600;

            tweenTo(rowIndex, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    // Reels done handler.
    function reelsComplete() {
        [sprCynF, sprCynF1, sprGl].forEach(sprite => sprite.visible = false);
        [sprCyn, sprCyn1, sprBtn].forEach(sprite => sprite.visible = true);
        containerSpin.interactive = true;
        containerSpin.cursor = 'pointer';
        running = false;
    }

    // Listen for animate update.
    app.ticker.add(() => {
        // Update the slots.
        for (let i = 0; i < reels.length; i++) {
            const rowIndex = reels[i];
            // Update blur filter y amount based on speed.
            rowIndex.blur.blurY = (rowIndex.position - rowIndex.previousPosition) * 8;
            rowIndex.previousPosition = rowIndex.position;

            // Update symbol positions on reel.
            for (let j = 0; j < rowIndex.symbols.length; j++) {
                const s = rowIndex.symbols[j];
                const prevy = s.y;

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

    // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
    const tweening: any[] = [];

    function tweenTo(object: any, property: string, target: number, time: number, easing: Function, onchange: Function | null, oncomplete: Function | null) {
        const tween = {
            object,
            property,
            propertyBeginValue: object[property],
            target,
            easing,
            time,
            change: onchange,
            complete: oncomplete,
            start: Date.now(),
        };

        tweening.push(tween);

        return tween;
    }

    // Listen for animate update.
    app.ticker.add(() => {
        const now = Date.now();
        const remove: any[] = [];

        for (let i = 0; i < tweening.length; i++) {
            const t = tweening[i];
            const phase = Math.min(1, (now - t.start) / t.time);

            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1) {
                t.object[t.property] = t.target;
                if (t.complete) t.complete(t);
                remove.push(t);
            }
        }
        for (let i = 0; i < remove.length; i++) {
            tweening.splice(tweening.indexOf(remove[i]), 1);
        }
    });
    // Basic lerp function.
    function lerp(a1: number, a2: number, t: number): number {
        return a1 * (1 - t) + a2 * t;
    }
    // Backout function from tweenjs.
    function backout(amount: number) {
        return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
    }
})();