<template>
  <v-container class="pa-0">
    <v-card
      max-width="90%"
      class="mx-auto"
      style="margin: 20px 0 80px 0"
    >
      <div class="d-flex">
        <v-btn icon @click="back"><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
        <v-breadcrumbs
          large
          class="pa-0"
          :items="getBreadcrumbsPath()"
        ></v-breadcrumbs>
      </div>
      <v-card-title>
        <v-text-field
          v-if="Object.keys(this.$store.state.dataList).length !== 0"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <div
        v-if="Object.keys(this.$store.state.dataList).length === 0"
        class="d-flex justify-center pb-10"
      >
        <span style="color: grey;">{{getFolder()}} is empty</span>
      </div>

      <template>
        <v-data-table
          v-if="Object.keys(this.$store.state.dataList).length !== 0"
          :headers="headers"
          :items="this.$store.state.dataList"
          :search="search"
          hide-default-footer
          disable-pagination
        >
          <template v-slot:item="{item}">
            <tr
              @dblclick="item.type === 'd'?folderClick(item.name):''"
            >
              <td class="truncate" style="min-width: 280px">
                <span style="font-weight: bold">
                  <font-awesome-icon
                    color="grey"
                    :icon="item.type === 'd'?['fas', 'folder']:entryIcon(item.name)"
                    size="lg"
                    fixed-width/>
                  {{item.name}}
                </span>
              </td>
              <td style="min-width: 103px">
                {{convertSize(item.size)}}
              </td>
              <td style="min-width: 115px">
                {{item.owner}}
              </td>
              <td style="min-width: 124px">
                {{convertDate(item.date)}}
              </td>
              <td style="min-width: 60px">
                <v-menu
                  offset-y
                  left
                  origin="right top"
                  transition="scale-transition"
                  z-index="1"
                >
                  <template v-slot:activator="{on}">
                    <v-btn
                      icon
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <!-- remove -->
                    <v-list-item link dense @click="item.type === 'd'?delDir(item.name):delFile(item.name)">
                      <v-list-item-icon><v-icon color="red">mdi-trash-can</v-icon></v-list-item-icon>
                      <v-list-item-title>remove</v-list-item-title>
                    </v-list-item>
                    <!-- rename -->
                    <v-list-item link dense>
                      <v-list-item-icon><v-icon>mdi-pencil</v-icon></v-list-item-icon>
                      <v-list-item-title>rename</v-list-item-title>
                    </v-list-item>
                    <!-- download -->
                    <v-list-item link dense v-if="item.type !== 'd'" @click="downloadFile(item.name)">
                      <v-list-item-icon><v-icon>mdi-download</v-icon></v-list-item-icon>
                      <v-list-item-title>download</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </template>
        </v-data-table>
      </template>

    </v-card>
  </v-container>
</template>

<script>
export default {
  data (){
    return{
      selected: 1,
      search: '',
      fileExtensions:{
        'png': ['fas', 'file-image'],
        'jpg': ['fas', 'file-image'],
        'ico': ['fas', 'file-image'],
        'pdf': ['fas', 'file-pdf'],
        'zip': ['fas', 'file-archive'],
        'rar': ['fas', 'file-archive'],
        'txt': ['fas', 'file-alt'],
        'doc': ['fas', 'file-word'],
        'docx': ['fas', 'file-word'],
        'xlsx': ['fas', 'file-excel'],
        'xls': ['fas', 'file-excel'],
        'pptx': ['fas', 'file-powerpoint'],
        'ppt': ['fas', 'file-powerpoint'],
        'mp3': ['fas', 'file-audio'],
        'mp4': ['fas', 'file-video'],
        'avi': ['fas', 'file-video'],
        'html': ['fab', 'html5'],
        'css': ['fab', 'css3'],
        'accdb': ['fas', 'database'],
        'gitignore': ['fab', 'git-alt'],
        'exe': ['fas', 'file-code'],
        'js': ['fab', 'js'],
        'jar': ['fab', 'java'],
        'less': ['fab', 'less'],
        'md': ['fab', 'readme'],
        'vue': ['fab', 'vuejs'],
      },
      headers:[
        {
          text: 'Entry name',
          value: 'name'
        },
        {
          text: 'Entry size',
          value: 'size'
        },
        {
          text: 'Entry owner',
          value: 'owner'
        },
        {
          text: 'Last modified',
          value: 'date'
        },
        {
          text: '',
          value: 'action'
        }
      ],
    }
  },
  methods:{
    convertDate(date){
      var d = new Date(date),
          month = (d.getMonth()+1).toString(),
          day = d.getDate().toString(),
          year = d.getFullYear().toString(),
          hour = d.getHours().toString(),
          min = d.getMinutes().toString()

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      if (hour.length < 2)
        hour = '0' + hour;
      if (min.length < 2)
        min = '0' + min;

      var time = hour + ':' + min

      return [year, month, day, time].join('-');
    },
    convertSize(size){
      if(size == 0){
        return '-'
      }
      else if(size < 1024){
        return parseFloat(size).toFixed(2) + ' B'
      }
      else if(size >= 1024 && size <= Math.pow(1024, 2)){
        return parseFloat(size / 1024).toFixed(2) + ' KB'
      }
      else if(size >= Math.pow(1024, 2) && size <= Math.pow(1024, 3)){
        return parseFloat(size / Math.pow(1024, 2)).toFixed(2) + ' MB'
      }
      else if(size >= Math.pow(1024, 3)){
        return parseFloat(size / Math.pow(1024, 3)).toFixed(2) + ' GB'
      }
    },
    folderClick(dir){
      this.$client.changeDir(dir)
    },
    entryIcon(entry){
      var extension = entry.split('.')
      var icon = ['fas', 'file']

      for (const [ext, ic] of Object.entries(this.fileExtensions)){
        if(ext === extension[extension.length-1]) {
          icon = ic
        }
      }
      return icon
    },
    back(){
      this.$client.backToParent()
    },
    getFolder(){
      var split = this.$store.state.currentPath.split('/')
      return split[split.length-1]
    },
    getBreadcrumbsPath(){
      var arr = []
      var buff = this.$store.state.currentPath.split('/')
      for(let i = 1;i<=buff.length-1;i++){
        arr.push({text: buff[i]})
      }
      return arr
    },
    delFile(file){
      var fullPath = this.$store.state.currentPath + '/' + file
      this.$client.deleteFile(fullPath)
    },
    delDir(dir){
      var fullPath = this.$store.state.currentPath + '/' + dir
      this.$client.deleteDir(fullPath)
    },
    downloadFile(file){
      this.$client.download(file, 'C:\\users\\public')
    }
  }

}
</script>

<style>

</style>
