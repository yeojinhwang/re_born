<template>
    <div id="div_float">
      <img class="tree_img" src="../../../../public/tree_01.png" width="30px"/>
      <img class="tree_img" src="../../../../public/tree_02.png" width="30px"/>
      <img class="tree_img" src="../../../../public/tree_03.png" width="30px"/>
      <img class="tree_img" src="../../../../public/tree_04.png" width="30px"/>
      <img class="tree_img" src="../../../../public/tree_05.png" width="30px"/>
      <div class="bar back tree relative_position" :data-skill="pointPercent"></div>
      <span id="hidePercent" color="black" :bind:style="{width:percent}"></span>
    </div>    
</template>
<script>
export default {
    name: 'UserExp',
    data () {
        return {
            user : {
                displayName: 'username',
                points: 1760,
                level: 17,
                photoURL: 'https://picsum.photos/id/11/300/300',
                complaints : {
                    1 : {
                        writer : 'username',
                        content : '환경을 위해 유색 페트병은 사용하지 말아주세요'
                    }
                }
            },
            userPoint : 0,
            pointPercent: 0,
            percent: 0
        }
    },
    mounted () {
      this.pointPercent = this.user.points % 100
      this.percent = 315 - (this.pointPercent * 3.15)
      document.getElementById('hidePercent').style.width = `${this.percent}`+'px'

      this.pointProgress()
      this.percentComputed
    },
    computed: {
        percentComputed() {
            this.pointPercent = this.user.points % 100
            // document.getElementById('hidePercent').style.width = "10px"
            this.percent = 315 - (this.pointPercent * 3.15)
            console.log(this.percent)
        }
    },
    methods : {
        pointProgress: function() {
            this.userPoint = this.user.points 
            // var 
        }
    }

}
// document.getElementById('hidePercent').style.width = "10px"
</script>
<style scoped>
body{
  font-family: Helvetica, Arial, sans-serif;
}
.div{
  width: 50%;
  margin: 0 auto;
}
@keyframes load{
  from {
    width: 0%
  }
}
@-webkit-keyframes load{
  from {
    width: 0%
  }
}
@-moz-keyframes load{
  from {
    width: 0%
  }
}
@-o-keyframes load{
  from {
    width: 0%
  }
}

.bar{
  background-color: #EEE;
  padding: 2px;
  border-radius:15px;
  margin : 15px;
}
.bar::before{
  content:  attr(data-skill);
  background-color: green;
  display: inline-block;
  padding: 5px 0 5px 5px;
  border-radius: inherit;
  animation: load 2s 0s;
  -webkit-animation: load 2s 0s;
  -moz-animation: load 2s 0s;
  -o-animation: load 2s 0s;
}
.bar.tree::before{
  width: calc(100% - 5px);
} 
.tree_img {
  position: relative;
  top: 120px;
  margin-left:20px;
  margin-right:20px;
  margin-bottom:10px;
  border-radius: 50%;
}
#div_float {
  float: left
}
#hidePercent {
  height: 35px;
  width: 315px;
  background-color: #EEEEEE;
  /* background-color: black; */
  position: relative;
  top: 50px;
  right: 16px;
  float:right;
  border-radius:0 15px 15px 0;
  z-index: 100000-1;
}
</style>