import {Application, Graphics, Text, TextStyle, Assets, Sprite, Container} from 'pixi.js';
import {initDevtools} from '@pixi/devtools';

(async() => {
  const app = new Application(); //put objects into staging area

  await app.init({ //change canvas size
    resizeTo: window,
    antialias: true
  });

  initDevtools({
    app
  });

  app.canvas.style.position = 'absolute';
  document.body.appendChild(app.canvas);

  const rectangle = new Graphics() //Create rectangle shape
  .rect(200, 200, 200, 180) // first 2 values are for position and the last 2 for size

  .fill({
    color: 0xffea00, // Sets the color
    alpha: 0.5     // Sets the opacity
  })
  .stroke({
    width: 8,
    color: 0x00ff00
});
  app.stage.addChild(rectangle);

  // Text creation
  // const text = new Text({
  //   text: 'Hello Pixi',
  //   style: {
  //     fill: '#ffffff',
  //     // fontFamily: 'Montserrat Medium',
  //     fontFamily: 'Playwrite US Trad',
  //     fontSize: 72,
  //     // fontStyle: 'italic',
  //     // fontWeight: 'bold',
  //     stroke: { color: '#4a1850', width: 5 },
  //     dropShadow: {
  //         color: '#4a1850',
  //         blur: 4,
  //         angle: Math.PI / 6,
  //         distance: 6,
  //     },
  //     wordWrap: true,
  //     wordWrapWidth: 440
  //   }
  // });
  // app.stage.addChild(text);

  const style = new TextStyle({ //Text style creation instead of modifying every text
    fill: '#ffffff',
    fontFamily: 'Playwrite US Trad',
    fontSize: 72,
    stroke: { color: '#4a1850', width: 5 },
    dropShadow: {
        color: '#4a1850',
        blur: 4,
        angle: Math.PI / 6,
        distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 440
  });

  const text = new Text({
    text: 'Hello Pixi',
    style
  });
  app.stage.addChild(text);

  text.position.set(300, 520); //changing text position

const texture = await Assets.load('images/charizard.png');  //loading texture

// Step 2
const sprite = Sprite.from(texture); //setting the sprite to the loaded texture

sprite.skew.set( Math.PI / 4, 0); 
sprite.rotation = Math.PI / 4;

// sprite.pivot.set(100, 200); //pivot and anchor changes the center of rotation but anchor is for sprites only
sprite.anchor.set(0.5, 0.5);
// Or

// Step 3
app.stage.addChild(sprite);

rectangle.cursor = 'pointer'; // change the cursor when hovered on the sprite
rectangle.eventMode = 'static'; // make sprite interactable
rectangle.on('pointerdown', moveRectangle); // when sprite is clicked, move it

function moveRectangle(){
  rectangle.position.x -=10;
  rectangle.position.y +=10;
}

// create snow
// const circle = new Graphics();
// app.ticker.add(() => {
//   circle.circle(
//     // Random x-coordinate
//     Math.random() * app.screen.width,
//     // Random y-coordinate
//     Math.random() * app.screen.height,
//     // Circle radius
//     5
//     )
//   .fill({
//     color: 0xffffff
//   });
//   app.stage.addChild(circle);
// });


//creating container
const container = new Container();
app.stage.addChild(container);
container.position.set(200, 200);

//putting a sprite on a container
const charmander = await Assets.load('images/charizard.png');
const sprite1 = Sprite.from(charmander);
container.addChild(sprite1);

console.log(`x: ${sprite1.x}, y: ${sprite1.y}`);

// creating assets
const asset = await Assets.load('images/charizard.png');
const sprAsset = Sprite.from(asset);
app.stage.addChild(sprAsset);
})();