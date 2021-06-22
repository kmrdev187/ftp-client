<template>
  <v-dialog
    persistent
    v-model="value"
    width="400"
  >
    <v-card>

      <v-card-text>
        <div class="pt-4 pb-2">
          <span>Upload dir: {{this.$store.state.currentPath}}</span>
        </div>
        <v-file-input
          v-model="file"
          counter
          truncate-length="20"
          show-size
          label="Choose file to upload"
        ></v-file-input>
      </v-card-text>

      <v-card-actions>
        <v-btn 
          text
          @click.stop="closeDialog()" 
          color="red"
        ><v-icon>mdi-close</v-icon> cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn 
          text 
          color="success"
          @click="upload()"
        ><v-icon>mdi-upload</v-icon> upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'upload',
  props: {
    value: Boolean
  },
  data (){
    return{
      file: {}
    }
  },
  computed:{
    show:{
      get(){
        return this.$attrs.value
      },
      set (value){
        this.$emit('input', value)
      }
    }
  },
  methods:{
    closeDialog(){
      this.file = {}
      this.show = false
    },
    upload: function(){
      if(this.file !== {}){
        var inputPath = this.file.path
        var destPath = this.$store.state.currentPath + '/' + this.file.name
        this.$client.upload(inputPath, destPath)
        this.closeDialog()
      }
    }
  }

}
</script>

<style>

</style>