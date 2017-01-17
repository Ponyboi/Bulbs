
var master = {}
master.zoom = 4;
$('zoom-plus').val(master.zoom);

var envelope = nx.add("envelope", { w: 1000, parent: 'nexus' })
var waveform = nx.add("waveform", { w: 1000, parent: 'nexus' })

envelope.pos = 0;
waveform.pos = 0;
var sampleGrouping = (48000 * master.zoom) / 1000;
console.log('sampleGrouping', sampleGrouping);
waveform.zoom = sampleGrouping;
envelope.zoom = sampleGrouping;

// var sampler =  new Tone.Sampler("https://s3-us-west-2.amazonaws.com/s.cdpn.io/152714/Kick_11.wav", function(){
var player =  new Tone.Player("PuupyCatLullaby.wav", function(){
      //repitch the sample down a half step
    waveform.mode = "area";
    waveform.definition = "1";
    waveform.channels = 1;
    waveform.setBuffer(player.buffer._buffer );
      // sampler.triggerAttack(-1);
    }).toMaster();
   
fullDraw();

$('.play-pause').on('click', function() {
  if (player.state == "stopped") {
    $(this).val("||");
    var duration = waveform.val.stop - waveform.val.start;
    console.log(duration);
    if (duration == NaN) { duration = null };
    player.start(0, 10, 1);
  } else {
    $(this).val(">");
    player.stop();
  }
})


nx.onload = function() {

// fullDraw();

    
	  // envelope.on('*', function(data) {
	  //   //console.log(data);
	  // });

	}

  // envelope.GUI.w = sampler.buffer._buffer.length;

master.colorPicker = $('.color-picker').colorPicker(
 {
  // buildCallback: function($elm) {
  //   if (envelope.selectedNodeColor != undefined) {
  //     if (envelope.val.points[envelope.selectedNodeColor].hex != undefined &&
  //         envelope.selectedNodeColorOld != envelope.selectedNodeColor) {
  //       console.log('setcolor', envelope.val.points[envelope.selectedNodeColor].hex)
  //       this.color.setColor(envelope.val.points[envelope.selectedNodeColor].hueRGB, 'rgb', 1);
  //       envelope.selectedNodeColorOld = envelope.selectedNodeColor;
  //     }

  //     // if (envelope.selectedNodeColorOld != envelope.selectedNodeColor) {
  //       envelope.val.points[envelope.selectedNodeColor].hueRGB = this.color.colors.hueRGB;
  //       envelope.val.points[envelope.selectedNodeColor].hex = '#' + this.color.colors.HEX;
  //       fullDraw();
  //     // }
  //   }
  // },
  renderCallback: function($elm, toggled) {
    console.log("color-picker1", this, this.color.setColor, $elm, toggled);
    
    if (envelope.selectedNodeColor != undefined) {
      if (envelope.val.points[envelope.selectedNodeColor].hex != undefined &&
          envelope.selectedNodeColorOld != envelope.selectedNodeColor) {
        console.log('setcolor', envelope.val.points[envelope.selectedNodeColor].hex)
        this.color.setColor(envelope.val.points[envelope.selectedNodeColor].hueRGB, 'rgb', 1);
      }

       if (envelope.selectedNodeColorOld == envelope.selectedNodeColor) {
        var rgb = { r: this.color.colors.rgb.r * 256, g: this.color.colors.rgb.g * 256, b: this.color.colors.rgb.b * 256 }
        envelope.val.points[envelope.selectedNodeColor].hueRGB = rgb;
        envelope.val.points[envelope.selectedNodeColor].hex = '#' + this.color.colors.HEX;
        fullDraw();
       }
        envelope.selectedNodeColorOld = envelope.selectedNodeColor;
    }
    console.log("color-picker", this, this.color.setColor, $elm, toggled);
  }
 }
);
$('.time-slider').on('input change', function(data) {
  // console.log(data.target.value);
  envelope.pos = data.target.value * 20;
  waveform.pos = data.target.value * 20;
  // waveform.definition = data.target.value / 10;
  fullDraw();
});
$('.zoom-minus').on('click', function() {
  master.zoom = master.zoom / 2;
  $('.zoom-value').html(master.zoom);
  var sampleGrouping = (48000 * master.zoom) / 1000;
  console.log(sampleGrouping);
  waveform.zoom = sampleGrouping;
  envelope.zoom = sampleGrouping;
  waveform.setBuffer(player.buffer._buffer );
  fullDraw();
});
$('.zoom-plus').on('click', function() {
  master.zoom = master.zoom * 2;
  $('.zoom-value').html(master.zoom);
  var sampleGrouping = (48000 * master.zoom) / 1000;
  console.log(sampleGrouping);
  waveform.zoom = sampleGrouping;
  envelope.zoom = sampleGrouping;
  waveform.setBuffer(player.buffer._buffer );
  fullDraw();
});


function fullDraw() {
  envelope.draw();
  waveform.draw();
}