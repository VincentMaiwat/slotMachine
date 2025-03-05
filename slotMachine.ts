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
} from 'pixi.js';
import { initDevtools } from '@pixi/devtools';


(async () => {
    // Create a new application
    const app = new Application();
    initDevtools({ app });
    // Initialize the application
    await app.init({resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Load background image
    const txtureBg = await Assets.load('images/assets/bg.jpg')
    const sprBg = Sprite.from(txtureBg);
    app.stage.addChild(sprBg);

    sprBg.width = app.screen.width;
    sprBg.height = app.screen.height;

    // Create container for titlle
    const containerTop = new Container();
    app.stage.addChild(containerTop);
    containerTop.width = app.screen.width;

    // Load title
    const txtureTitle = await Assets.load('images/assets/SLOT.png')
    const sprTitle = Sprite.from(txtureTitle);
    containerTop.addChild(sprTitle);
    sprTitle.setSize(800,500);
    
    sprTitle.x = Math.round((containerTop.width - sprTitle.width) / 2);
    sprTitle.y = 0;

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

    const REEL_WIDTH = 150;
    const SYMBOL_SIZE = 120;

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

    // Build the reels
    const reels: {
        container: Container;
        symbols: Sprite[];
        position: number;
        previousPosition: number;
        blur: BlurFilter;
    }[] = [];
    const reelContainer = new Container();

    const reelMarginTop = 50;  // You can adjust this value to add space between title and reels
    reelContainer.y = sprTitle.y + sprTitle.height + reelMarginTop;

    for (let i = 0; i < 5; i++) {
        const rc = new Container();

        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel = {
            container: rc,
            symbols: [] as Sprite[],
            position: 0,
            previousPosition: 0,
            blur: new BlurFilter(),
        };

        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        // Build the symbols
        for (let j = 0; j < 3; j++) {
            const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
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

    // Build top & bottom covers and position reelContainer
    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;

    reelContainer.y = margin;
    reelContainer.x = Math.round((app.screen.width - REEL_WIDTH * 5) / 2);

    

    // Create gradient fill
    const fill = new FillGradient(0, 0, 0, 2);

    const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());

    colors.forEach((number, index) => {
        const ratio = index / colors.length;

        fill.addColorStop(ratio, number);
    });

    // Add Cyndaquill
    const txtureCyndaquil = await Assets.load('images/assets/cyndaquil-fire.png');
    const sprCyndaquil = Sprite.from(txtureCyndaquil);
    app.stage.addChild(sprCyndaquil);

    sprCyndaquil.scale.set(0.5, 0.5);
    sprCyndaquil.position.set(20, 450);

    // Add play text
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: { fill },
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

    
    
    
    const bottom = new Graphics().rect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin);
    const playText = new Text('Spin!', style);

    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = app.screen.height - 50;
    bottom.addChild(playText);

    // Add header text
    const headerText = new Text('Pokemon Slot', style);

    sprTitle.x = Math.round((containerTop.width - headerText.width) / 2);
    sprTitle.y = Math.round((margin - headerText.height) / 2);

    app.stage.addChild(containerTop);
    app.stage.addChild(bottom);

    // Set the interactivity.
    playText.eventMode = 'static';
    playText.cursor = 'pointer';
    playText.addListener('pointerdown', () => {
        startPlay();
    });

    let running = false;

    // Function to start playing.
    function startPlay() {
        if (running) return;
        running = true;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;

            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
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
            const r = reels[i];
            // Update blur filter y amount based on speed.
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            // Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;

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
