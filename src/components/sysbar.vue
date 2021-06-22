<template>
  <v-system-bar 
    color="primary" 
    app
    window
    class="draggable"
  >
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      small
      icon
      class="nodrag ml-1"
      v-for="btn in btns"
      :key="btn.id"
      @click="btn.action"
    >
      <v-icon small>{{btn.icon}}</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
import {productName} from '../../package.json'
import {ipcRenderer} from 'electron'

export default {
  name: "navbar",
  data: function(){
    return{
      title: productName,
      btns:[
        {
          id: 1,
          icon: 'mdi-minus',
          action: this.min
        },
        {
          id: 2,
          icon: 'mdi-checkbox-blank-outline',
          action: this.max
        },
        {
          id: 3,
          icon: 'mdi-close',
          action: this.exit
        },
      ]
    }
  },
  methods:{
    exit: function(){
      ipcRenderer.send('closeApp')
    },
    max: function(){
      ipcRenderer.send('maxApp')
    },
    min: function(){
      ipcRenderer.send('minApp')
    },
  }

}
</script>

<style scoped>
/* remove margin in navbar icons */
.v-system-bar .v-icon{
  margin: 0;
}
</style>