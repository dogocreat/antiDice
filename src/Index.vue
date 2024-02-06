<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <DiceGame msg="AntiChat Dice Game"/>
</template>

<script>
import DiceGame from './components/DiceGame.vue'

export default {
  name: 'App',
  components: {
    DiceGame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
