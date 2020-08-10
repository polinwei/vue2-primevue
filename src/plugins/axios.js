import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

if (process.env.NODE_ENV === 'production'){
  const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`)) == null ? "" : document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
  axios.defaults.headers = { "X-XSRF-TOKEN": CSRF_TOKEN, "X-REQUEST-TYPE":"axios"};  
  axios.defaults.timeout = 5000;
} else {
  //axios.defaults.withCredentials = true  
  axios.defaults.baseURL = "https://im.globeunion.com/"; // 域名
}