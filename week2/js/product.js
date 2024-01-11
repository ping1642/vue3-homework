import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
// 產品資料格式
const app = {
    data() {
        return {
          url: 'https://vue3-course-api.hexschool.io/v2',
          path: 'cping',
          tempProduct: {},
          products: [] 
        }
    },
    methods: {
      checkLogin() {
        axios.post(`${this.url}/api/user/check`)
          .then(res => {
            this.getProduct();
          })
          .catch(err => {
            alert(err.response.data.message);
            // 驗證錯誤，跳轉到登入畫面
            window.location.href = "login.html";
          })
      },
      getProduct() {
        axios.get(`${this.url}/api/${this.path}/admin/products`)
          .then(res => {
            this.products = res.data.products;
          })
          .catch(err => {
            alert(err.response.data.message);
          })
      },
      logout() {
        axios.post(`${this.url}/logout`)
          .then(res => {
            alert(res.data.message);
            // 登出，跳轉到登入畫面
            window.location.href = "login.html";
          })
          .catch(err => {
            alert(err.response.data.message);
          })
      }
    },
    created() {
        // 取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)productToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        // 夾帶到headers內
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    }
};

createApp(app).mount("#app");