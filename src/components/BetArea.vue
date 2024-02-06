<template>
    <input type="text" class="playerName" name="playerName" placeholder="名稱" >
    <input type="text" class="point" name="point" placeholder="點數1">
    <input type="text" class="point" name="point" placeholder="點數2">
    <input type="text" class="score" name="score" placeholder="分數">
    {{ index }}
    {{ playerName }}
    {{ point1 }}
    {{ point2 }}
    {{ score }}
</template>

<script>
export default {
  name: 'BetArea',
  props: {
    index: Number,
    playerName: String,
    point1: Number,
    point2: Number,
    score: Number,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.playerName {
  width: 100px;
}
.point {
  width: 50px;
}
.score {
  width: 100px;
}
</style>
