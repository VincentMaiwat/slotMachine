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
    const textureBg = await Assets.load('images/assets/back.png');
    const sprBg = Sprite.from(textureBg);

    // set bg to the same dimension as screen
    sprBg.width = app.screen.width;
    sprBg.height = app.screen.height;
    
    const containerBg = new Container();
    containerBg.addChild(sprBg);
    app.stage.addChild(containerBg);

    const textures = await Assets.load([
        "images/assets/middle.png",
        "images/assets/front.png"
    ]);

        // Create TilingSprite for middle layer
        const sprMiddle = new TilingSprite({
            texture: textures["images/assets/middle.png"],
            width: app.screen.width,
            height: app.screen.height
        });
    
        // Create TilingSprite for front layer
        const sprFront = new TilingSprite({
            texture: textures["images/assets/front.png"],
            width: app.screen.width,
            height: app.screen.height
        });

        sprMiddle.tileScale.set(
            app.screen.width / sprMiddle.texture.width,
            app.screen.height / sprMiddle.texture.height
        );
    
        sprFront.tileScale.set(
            app.screen.width / sprFront.texture.width,
            app.screen.height / sprFront.texture.height
        );
    
        // Add middle and front layers to container
        containerBg.addChild(sprMiddle);
        containerBg.addChild(sprFront); // This ensures it's on top
    
        // Animate the background layers
        app.ticker.add(() => {
            sprMiddle.tilePosition.x += 0.5; // Moves middle layer
            sprFront.tilePosition.x += 1;    // Moves front layer faster
    });

    // set blur effect on logo
    const blurBg = new BlurFilter();
    // blurBg.blur =8;
    // sprBg.filters=blurBg;

    // create container for title
    const containerTitle = new Container();
    app.stage.addChild(containerTitle);

    // load logo
    const textureLogo = await Assets.load('images/assets/SLOT.png');
    const sprLogo = Sprite.from(textureLogo);
    app.stage.addChild(sprLogo);

    //change logo position and size
    sprLogo.anchor.set(0.5);
    sprLogo.setSize(400,250);
    sprLogo.x = (app.screen.width / 2);
    sprLogo.y = 110

    containerTitle.addChild(sprLogo);
    
    // create container for the symbols
    const containerGrid = new Container();
    app.stage.addChild(containerGrid);
    
    // create background rectangle
    const rectangle = new Graphics()
    .roundRect(0,0, 900, 500)
    .fill({
        color:'#ffffff', // Sets the color
        alpha: 0.4     // Sets the opacity
      });
    containerGrid.addChild(rectangle); 

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
        'images/assets/9.png',
        'images/assets/A.png',
        'images/assets/J.png',
        'images/assets/K.png',
        'images/assets/Q.png',
        'images/assets/10.png',
        'images/assets/wild.png',
        'images/assets/bonus.png',
        'images/assets/s1.png',
        'images/assets/s2.png',
        'images/assets/s3.png',
        'images/assets/s4.png'
    ]);

    // Create different slot symbols
    const slotTextures: Texture[] = [
        Texture.from('images/assets/A.png'),
        Texture.from('images/assets/9.png'),
        Texture.from('images/assets/J.png'),
        Texture.from('images/assets/K.png'),
        Texture.from('images/assets/Q.png'),
        Texture.from('images/assets/10.png'),
        Texture.from('images/assets/wild.png'),
        Texture.from('images/assets/bonus.png'),
        Texture.from('images/assets/s1.png'),
        Texture.from('images/assets/s2.png'),
        Texture.from('images/assets/s3.png'),
        Texture.from('images/assets/s4.png')
    ];

    // Set size of sprites and slots
    const widthReel = 170;
    const sizeSymbol = 130; 
    
    // const reels:{

    // }[] = [];

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

    // containerGrid.x = Math.round((app.screen.width - widthReel * 5) / 2);

    // create container for the spin button
    const containerSpin = new Container();
    app.stage.addChild(containerSpin);

    const textureBtn = await Assets.load('images/assets/spin.png');
    const sprBtn = Sprite.from(textureBtn);

    sprBtn.width = 600;
    sprBtn.height = 80;
    
    containerSpin.addChild(sprBtn);

    containerSpin.x = (app.screen.width - sprBtn.width) / 2;
    containerSpin.y = 780;

    // make spin clickable
    containerSpin.eventMode = 'static';
    containerSpin.cursor = 'pointer';
    containerSpin.addListener('pointerdown', () =>{
        play();
    });



    let running = false;

    function play(){
        if (running) return; 
        running = true;
    
        for (let i = 0; i < reels.length; i++ ){
            const rowIndex = reels[i];
            const extra = Math.floor(Math.random() * 1);
            const target = rowIndex.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600; 

            tweenTo(rowIndex, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    // Reels done handler.
    function reelsComplete() {
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