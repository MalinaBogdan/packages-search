<template>
  <div id="app">
      <Main />
      <Footer />
  </div>
</template>

<script>
import Main from '@/components/Main'
import Footer from '@/components/Footer'

export default {
  components: {
     Main, Footer
  }
};
</script>

<style lang='scss'>
@import "../node_modules/bootstrap/scss/bootstrap";
@import "@/assets/variables.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-dark;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

}
</style>
