<template>
  <v-app>
    <sysbar/>
    <vmain/>
    <vfooter/>
  </v-app>
</template>

<script>
import sysbar from './components/sysbar'
import vfooter from './components/vfooter'
import vmain from './components/main/vmain'

export default {
  name: 'App',
  components: {
    sysbar, vfooter, vmain
  },
  beforeMount(){
    this.$store.commit('setConnection', false)
  }
};
</script>

<style lang="scss">
.main-btn{
  padding: 5px;
  &:hover{
    background-color: rgba(0,0,0,.1);
    border-radius: 50%;
  }
}
.draggable{
  -webkit-app-region: drag
}
.nodrag{
  -webkit-app-region: none
}
::-webkit-scrollbar{
  width: 0;
}
/* hide number input's arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
*{
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.truncate {
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
td{
  cursor: default;
}
</style>
