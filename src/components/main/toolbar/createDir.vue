<template>
  <v-dialog
    persistent
    v-model="value"
    width="400"
  >
    <v-card>

      <v-card-text>
        <div class="py-2">
          <v-text-field
            v-model="folderName"
            label="New directory name"
            hide-details
            :rules=[rules.required]
            prepend-icon="mdi-folder"
          ></v-text-field>
        </div>
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
          @click="createDir()"
        ><v-icon>mdi-folder-plus-outline</v-icon> create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'createDir',
  props: {
    value: Boolean
  },
  data (){
    return{
      folderName: '',
      rules:{
        required: value => !!value || 'Required.'
      }
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
      this.show = false
      this.folderName = ''
    },
    createDir: function(){
      if(this.folderName !== ''){
        this.$client.createDir(this.$store.state.currentPath + '/' + this.folderName)
        this.closeDialog()
      }
    }
  }
}

</script>

<style>

</style>
