<template>
  <v-footer
    padless
    color="red"
    app
    z-index="3"
  >
    <span class="ml-2">v{{version}}</span>
    <v-spacer></v-spacer>
    <v-btn 
      icon
      small
      v-for="btn in btns"
      :key="btn.id"
      @click="openExtUrl(btn.url)"
    ><v-icon :color="btn.color">{{btn.icon}}</v-icon></v-btn>
  </v-footer>
</template>

<script>
// import version from package.json
import {version} from '../../package.json'

export default {
  name: 'vfooter',
  data: function(){
    return{
      version: version,
      btns: [
        {
          id: 1,
          icon: 'mdi-facebook',
          color: 'black',
          url: ''
        },
        {
          id: 2,
          icon: 'mdi-twitter',
          color: 'black',
          url: ''
        },
        {
          id: 3,
          icon: 'mdi-github',
          color: 'black',
          url: ''
        },
      ]
    }
  },
  methods:{
    openExtUrl: function(url){
      alert(url)
    }
  }

}
</script>

<style>

</style>