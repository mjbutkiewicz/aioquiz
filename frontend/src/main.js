import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueSwal from 'vue-swal'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueMarkdown from 'vue-markdown'


import 'bootstrap/dist/css/bootstrap.css'
import 'mdbootstrap/css/mdb.css';
import 'prismjs/themes/prism.css'

import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';
axios.defaults.headers.accepts = 'application/json';

axios.interceptors.response.use(res => {
    console.log('inter_res', res);
    return res
}, (error) => {
    console.log('inter_error', error);
    console.log('inter_error', error.response);
    swal("Error", error.response.data.msg, "error");
    return error
});

axios.interceptors.request.use(req => {
    console.log('inter_req', req);
    req.headers.authorization = store.getters.sessionUUID;
    return req
});

Vue.use(BootstrapVue);
Vue.use(VueSwal);
Vue.use(Vuelidate);
Vue.use(VueMarkdown);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
