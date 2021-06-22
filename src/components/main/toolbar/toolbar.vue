<template>
  <div>
    <v-app-bar app z-index="3">
      <div
        v-for="btn in btns"
        :key="btn.id"
      >
        <v-tooltip
          bottom
          open-on-hover
          open-delay="500"
        >
          <template v-slot:activator="{ on }">
            <v-hover v-slot="{ hover }">
              <v-btn
                  icon
                  @click="btn.action"
                  v-on="on"
              ><v-icon :color="hover ? btn.color : ''">{{btn.icon}}</v-icon></v-btn>
            </v-hover>
          </template>
          <span>{{btn.text}}</span>
        </v-tooltip>
      </div>

    </v-app-bar>
    <upload-file v-model="uploadFile"/>
    <create-dir v-model="createDir"/>
  </div>
</template>

<script>
import uploadFile from './upload'
import createDir from './createDir'

export default {
  name: 'toolbar',
  components:{ uploadFile, createDir},
  data(){
    return{
      uploadFile: false,
      createDir: false,
      btns:[
        {
          id: 0,
          text: 'disconnect',
          icon: 'mdi-earth-remove',
          color: 'red',
          action: this.$client.closeConnection
        },
        {
          id: 1,
          text: 'new folder',
          icon: 'mdi-folder-plus-outline',
          color: 'blue',
          action: this.newDir
        },
        {
          id: 2,
          text: 'upload file',
          icon: 'mdi-file-upload-outline',
          color: 'blue',
          action: this.newFile
        },
        {
          id: 3,
          text: 'refresh',
          icon: 'mdi-refresh',
          color: 'green',
          action: this.refreshList
        },
      ]
    }
  },
  methods:{
    refreshList: function(){
      this.$client.listDir(this.$store.state.currentPath)
    },
    newDir: function(){
      this.createDir = true
    },
    newFile: function(){
      this.uploadFile = true
    }
  }

}
</script>

<style>

</style>
