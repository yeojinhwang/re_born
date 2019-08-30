<template>
  <div id="cam">
    <div v-show="captures === 0">
      <video ref="video" id="video" width="100%" height="50%" autoplay></video>
    </div>
    <img v-if="captures !== 0" :src="captures" width="100%" height="50%" />
    <div>
      <button id="snap" v-on:click="capture()">Snap Photo</button>
    </div>
    <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
  </div>
</template>

<script>
import firebase from "firebase";
const Swal = require("sweetalert2");

export default {
  name: "cam",
  data() {
    return {
      video: {},
      canvas: {},
      captures: 0
    };
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.$refs.video.srcObject = stream;
        this.$refs.video.play();
      });
    }
  },
  methods: {
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.captures = this.canvas.toDataURL("image/png");
      this.$refs.video.pause();

      var fileName =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      let uploadTask = firebase
        .storage()
        .ref("/upload/")
        .child(fileName);
      fetch(this.captures)
        .then(res => res.blob())
        .then(blob =>
          uploadTask.put(blob).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(res => {
              console.log(res);
            });
          })
        );
    }
  },
  watch: {
    captures: function(newCaptures) {
      if (newCaptures != 0) {
        Swal.fire("Good job!", "You clicked the button!", "success");
        this.captures = 0;
      } else {
        this.$refs.video.play();
      }
    }
  }
};
</script>

<style>
#cam {
  text-align: center;
  color: #2c3e50;
}
#video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
}
</style>