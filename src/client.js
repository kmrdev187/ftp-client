import store from './store/store'

var ftp = require('ftp')
var fs = require('fs')
var client = new ftp()

export default class Client{
  constructor(){}
  /**Initialize client events */
  initEvents(){
    client.on('error', (err)=>{
      store.commit('setConnection', false)
      console.log(err)
    })
    client.on('ready', ()=>{
      store.commit('setConnection', true)
      console.log('Logged in')
      this.listDir('/')
      this.getCurrentDir()
    })
    client.on('end', ()=>{
      store.commit('setConnection', false)
      console.log('Connection end')
      //clear dataList object
      store.commit('refreshList', {})
    })
  }
  /**
   * Connect to server
   * @param {string} host Server host
   * @param {Number} port Server port
   * @param {string} usr  Username
   * @param {string} pwd  Password
   */
  connect(host, port, usr, pwd) {
    store.commit('getConnection')
    if(store.state.connected === false){
      this.initEvents()
      client.connect({
        host: host,
        port: port,
        user: usr,
        password: pwd
      })
    }
  }
  /**
   * Close sever connection
   */
  closeConnection() {
    client.end()
  }
  /**Get current working directory
   * 'refreshPath' commited
   */
  getCurrentDir(){
    client.pwd((err, dir)=>{
      if(err) store.commit('refreshPath', err)
      else store.commit('refreshPath', dir)
    })
  }
  /**Change working directory
   * @param {string} path Destination path
   */
  changeDir(path){
    client.cwd(path, (err, dir)=>{
      if(err) console.log(err)
      else {
        store.commit('refreshPath', dir)
        this.listDir(dir)
      }
    })
  }
  /**Step back to parent folder */
  backToParent(){
    client.cdup((err)=>{
      if(err) console.log(err)
      else{
        client.pwd((err, dir)=>{
          if(err) console.log(err)
          else{
            this.changeDir(dir)
          }
        })
      }
    })
  }
  /**List working direcotry
   * @param {string} dirPath Working directory
   * 'refreshList' commited
   */
  listDir(dirPath) {
    client.list(dirPath, (err, ls)=>{
      if(err) console.log(err)
      else store.commit('refreshList', ls)
    })
  }
  /**Upload file
   * @param {string} inputPath File which you want to upload
   * @param {string} destPath Destination path with filename
   */
  upload(inputPath, destPath){
    client.put(inputPath, destPath, false, (err) => {
      if(err) console.log(err)
      else{
        this.listDir(store.state.currentPath)
      }
    })
  }
  /**Download file
  * @param {string} inputPath File which you want to download
  * @param {string} destPath Destination path without! filename
  */
  download(inputPath, destPath){
    client.get(inputPath, (err, stream) => {
      if(err) console.log(err)
      let arr = inputPath.split('/')
      let filename = arr[arr.length-1]
      stream.pipe(fs.createWriteStream(destPath + '/' + filename))
    })
  }
  /**Create new directory
   * @param {string} path New directory path
   */
  createDir(path){
    client.mkdir(path, false, (err) => {
      if(err) console.log(err)
      else{
        this.listDir(store.state.currentPath)
      }
    })
  }
  /**Delete file from server
   * @param {string} path Full path of file
   */
  deleteFile(path){
    client.delete(path, (err)=>{
      if(err) console.log(err)
      else{
        this.listDir(store.state.currentPath)
      }
    })
  }
  /**Delete folder from server
   * @param {string} path Full path of folder
   */
  deleteDir(path){
    client.rmdir(path, true, (err)=>{
      if(err) console.log(err)
      else{
        this.listDir(store.state.currentPath)
      }
    })
  }
}
