var game = new Phaser.Game(640, 300, Phaser.AUTO, 'game',false,true);
var b=0;
var PhaserGame = function() {
  this.bmd = null;
  // points arrays - one for x and one for y
  this.points = {
    'x': [0,610, 420, 356, 0],
    'y': [295, 220, 10, 156, 300]
  };
};

PhaserGame.prototype = {

  preload: function() {
    game.load.crossOrigin = "Anonymous";
    game.load.image('bird', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/173252/angry-bird.png');
  },

  create: function() {
    /*var graphics = game.add.graphics(100, 100);
        graphics.lineStyle(0);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(480, 135, 25);
    graphics.endFill();
*/
    this.stage.backgroundColor = '#eee';
    this.increment = 1 / game.width;  
    this.i = 0;
    this.timer1Stopped = true;
    this.timer1 = null;

    // Somewhere to draw to
    this.bmd = this.add.bitmapData(this.game.width, this.game.height);
    this.bmd.addToWorld();
    // Draw the path
    for (var j = 0; j < 1; j += this.increment) {
      var posx = this.math.catmullRomInterpolation(this.points.x, j);
      var posy = this.math.catmullRomInterpolation(this.points.y, j);
      this.bmd.rect(posx, posy, 3, 3, 'rgba(255, 255, 255, 1)');
    }
    var graphics = game.add.graphics(100, 100);
graphics.lineStyle(2, 0xffffff, 1);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(525, 90, 25);
    graphics.endFill();
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(305, -75, 25);
    graphics.endFill();
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(-85, 185, 25);
    graphics.endFill();
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(225, 75, 25);
    graphics.endFill();

    // create the bird sprite - we will make this sprite  
    // follow the motion path by using the plot function 
    this.birdSprite = game.add.sprite(0, 0, "bird");
    this.birdSprite.anchor.setTo(0.5, 0.5);

  },

  update: function() {
    // this just takes care of resetting
  // the timer so the movement repeats
  
    if (this.timer1Stopped) {
      this.timer1Stopped = false;
      this.timer1 = this.game.time.create(true);
      this.timer1.loop(.01, this.plot, this);
      this.timer1.start();
   
    }
  },

  plot: function() {
    var posx = this.math.catmullRomInterpolation(this.points.x, this.i);
    var posy = this.math.catmullRomInterpolation(this.points.y, this.i);
    this.birdSprite.x = posx;
    this.birdSprite.y = posy;
     b+=.01;   
    var ctr1=0;
    var ctr2=0;
    var ctr3=0;
    var ctr4=0;
    if(posx>600 && posx<640 && posy>210 && posy<230)
    {
      ctr2=0;
      ctr3=0;
      ctr4=0;
      if(ctr1==0)
      {
        ctr1=1;
        document.getElementById('sa').innerHTML=b.toFixed(2);
       // console.log("asd");
       }
     }
           if(posx>400 && posx<450 && posy>1 && posy<20 )
           {
            ctr1=0;
            ctr3=0;
            ctr4=0;
      if(ctr2==0)
      {
        ctr2=1;
        document.getElementById('sa1').innerHTML=b.toFixed(2);
       // console.log("asd");
       }
     }
           if(posx>340 && posx<400 && posy>140  && posy<170 )
           {
            ctr1=0;
            ctr2=0;
            ctr4=0;
      if(ctr3==0)
      {
        ctr3=1;
        document.getElementById('sa2').innerHTML=b.toFixed(2);
       // console.log("asd");
       }
    // document.getElementById('sa').innerHTML=b;
     // var d = this.timer1;
      //console.log(d);
      //console.log('hwlo');

    }
        if(posx>-2 && posx<35 && posy>=296 && posy<350)
    {
      ctr2=0;
      ctr3=0;
      ctr1=0;
      if(ctr4==0)
      {
        ctr4=1;
        document.getElementById('sa3').innerHTML=b.toFixed(2);
       // console.log("asd");
       }
     }


          this.i += this.increment;

    if (posy > 300) {
      this.timer1.stop();
      this.timer1.destroy();
      this.i = 0;
      this.timer1Stopped = true;
       b=0;
    }
  }


};
/*var b=0
function c()
{
  b+=1;
document.getElementById('sa').innerHTML='sasvhdasnaksjd'+b;
}*/
/*var a=setInterval(c,1000);*/
window.onload = function() {
  game.state.add('Game', PhaserGame, true);
}