<template>
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          class="my-4 main-btn"
          v-bind="attrs"
          v-on="on"
        ><v-icon x-large>mdi-wan</v-icon></div>
      </template>

      <v-card>
        <v-card-title>New connection</v-card-title>

        <v-row class="mx-0 my-2">
          <v-col class="pa-0">
            <v-text-field
              v-model="host"
              dense
              class="pa-0 mx-2"
              outlined
              label="Server host"
              hide-details
              prepend-inner-icon="mdi-server"
            ></v-text-field>
          </v-col>
          <v-col class="pa-0" cols="4">
            <v-text-field
              v-model="port"
              dense
              class="pa-0 mx-2"
              outlined
              label="Port"
              type="number"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          v-model="user"
          dense
          class="pa-0 mx-2 my-2"
          outlined
          label="Username"
          hide-details
          prepend-inner-icon="mdi-account"
        ></v-text-field>

        <v-text-field
          v-model="password"
          dense
          class="pa-0 mx-2 my-2"
          outlined
          label="Password"
          hide-details
          prepend-inner-icon="mdi-key"
          :append-icon="showPw?'mdi-eye':'mdi-eye-off'"
          @click:append="showPw = !showPw"
          :type="showPw?'text':'password'"
          @keydown="connectOnEnter"
        ></v-text-field>

        <div class="errors" v-if="errors.length">
          <ul class="ml-2">
            <li
              v-for="(error, index) in errors"
              :key="index"
            >
              <span>
                <font-awesome-icon
                  color="red"
                  :icon="['fas', 'exclamation-triangle']"
                  fix-width
                ></font-awesome-icon>
                {{ error }}
              </span>
            </li>
          </ul>
        </div>

        <v-checkbox
          hide-details
          label="Remember connection"
          class="mx-2"
          :ripple="false"
        ></v-checkbox>

        <v-card-actions class="mt-6">
          <v-btn
            color="red"
            text
            @click="clearForm"
          ><v-icon>mdi-close</v-icon> close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="connectFtp"
          ><v-icon>mdi-earth</v-icon>connect</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
// import {ipcRenderer} from 'electron'
export default {
  name: 'connection',
  data: function(){
    return{
      dialog: false,
      showPw: false,
      host: '',
      port: 21,
      user: '',
      password: '',
      errors: []
    }
  },
  methods:{
    clearForm (){
      this.dialog = false
      this.host = ''
      this.port = 21
      this.user = ''
      this.password = ''
    },
    checkCredentials(){
      let valid = true
      this.errors = []

      if(!this.host){
        valid = false
        this.errors.push('Server host cannot be empty!')
      }
      if(!this.port){
        valid = false
        this.errors.push('Server port cannot be empty!')
      }
      if(!this.user){
        valid = false
        this.errors.push('Username cannot be empty!')
      }
      if(!this.password){
        valid = false
        this.errors.push('Password cannot be empty!')
      }

      return valid
    },
    connectFtp(){
      if(this.checkCredentials()){
        this.$client.connect(this.host, this.port, this.user, this.password)
      }
      //this.$client.connect('localhost', 21, 'kmr', 'nincspw')
    },
    connectOnEnter(e){
      if(e.key === 'Enter'){
        this.connectFtp()
      }
    },
  }

}
</script>

<style scoped>
.v-input--checkbox{
  width: max-content;
}
.errors ul{
  list-style-type: none;
  color: red;
  padding: 0;
}
</style>
