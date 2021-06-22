<template>
  <v-main>
    <div
      class="d-flex align-center"
      style="height: 100%"
      v-if="this.$store.state.connected === false"
    >
      <div class="mx-auto">
        <conn/>
        <settings/>
      </div>
    </div>
    <list v-if="this.$store.state.connected === true"/>
    <toolbar v-if="this.$store.state.connected === true"/>
    <div
      class="credits-container"
      v-if="this.$store.state.connected === true"
    >
      <div class="credits">
        <span>Programmed by kmr</span>
      </div>
    </div>
  </v-main>
</template>

<script>
import conn from './connection'
import list from './list'
import toolbar from './toolbar/toolbar'
import settings from './settings'

export default {
  name: 'vmain',
  components:{
    conn, list, toolbar, settings
  }
}
</script>

<style scoped>
img{
  width: 200px;
  margin: 0 auto;
  display: block;
  filter: grayscale(30%);
}
.credits-container{
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 15px;
}
.credits{
  width: 300px;
  text-align: center;
  color: #D4D4D4;
  border: 1px solid #D4D4D4;
  border-radius: 5px;
  margin: 0 auto;
  padding: 10px 0;
}
</style>
