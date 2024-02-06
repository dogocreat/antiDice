<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr>
    <h2>莊</h2>
    <div id="bankerArea">
      <BetArea></BetArea>
    </div>
    <hr>
    {{ rows }}
    <h2>閒<button class="addbtn" v-on:click="addRow()">+</button></h2>
    <div id="playerArea" v-for="(row, index) in rows" :key="row.index">
      <div>
        <BetArea :index=index :playerName=row.playerName></BetArea>
        <button v-on:click="removeRow(index)">-</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
const players = [];
import BetArea from './BetArea.vue'

export default {
  name: 'DiceGame',
  props: {
    msg: String
  },
  components: {
    BetArea,
  },
  data: function(){
    return {
      rows: players,
    }
  },
  methods: {
    addRow: function () {
      this.rows.push({playerName: '', point1: '', point2: '', score: ''})
    },
    removeRow: function (index) {
      console.log(this.rows)
      console.log(index)
      this.rows.splice(index,1)
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  text-align: left;
}

.addbtn {
  float: right;
  margin-right: 20px;
}
</style>
