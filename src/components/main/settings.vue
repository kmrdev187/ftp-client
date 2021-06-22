<template>
  <v-dialog
    v-model="v"
    width="300"
    persistent
  >

    <template v-slot:activator="{ on, attrs }">
      <div
        class="my-4 main-btn"
        v-bind="attrs"
        v-on="on"
      ><v-icon x-large>mdi-cog</v-icon></div>
    </template>

    <v-card>
      <v-card-text>
        <v-switch
          label="dark theme"
          :ripple="false"
          hide-details
        ></v-switch>
        <v-text-field
          v-model="defaultDir"
          class="mt-4"
          label="Download directory"
          prepend-icon="mdi-folder"
          hide-details
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          color="red"
          @click="v = !v"
        ><v-icon>mdi-close</v-icon> close</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="green"
          text
        ><v-icon>mdi-check</v-icon> done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'settings',
  data(){
    return{
      v: false,
      defaultDir: 'C:\\Users\\Public\\Downloads'
    }
  }
}
</script>

<style>

</style>
