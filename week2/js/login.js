import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
// 產品資料格式
const app = {
    data() {
        return {
          url: 'https://vue3-course-api.hexschool.io/v2',
          path: 'cping',
          user: {
            username: '',
            password: ''
          }
        }
    },
    methods: {
        login() {
            axios.post(`${this.url}/admin/signin`, this.user)
                .then(res => {
                    const { token, expired} = res.data;
                    // 將token儲存(productToken：自訂名稱，expires：到期日)
                    document.cookie = `productToken=${token}; expires=${new Date(expired)};`;
                    // 網頁跳轉
                    window.location.href = "product.html";
                })
                .catch(err => {
                    alert(`${err.response.data.message}，請確認您的帳號密碼`);
                })
        }
    }
};

createApp(app).mount("#app");