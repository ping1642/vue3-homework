import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let newProductModal = '';
let delProductModal = '';
const app = {
    data() {
        return {
          url: 'https://vue3-course-api.hexschool.io/v2',
          path: 'cping',
          tempProduct: {
            imagesUrl: []
          },
          products: [],
          isNew: false 
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
        axios.get(`${this.url}/api/${this.path}/admin/products/all`)
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
      },
      openModal(isNew, item) {
        // 新增產品
        if(isNew === 'new'){
          this.tempProduct = {
            imagesUrl: []
          }
          this.isNew = true;
          newProductModal.show();
        }
        else if(isNew === 'edit'){
          // 編輯時，所點選的資料會先帶出來
          this.tempProduct = {...item }; // 淺層拷貝
          this.isNew = false;
          newProductModal.show();
        }
        // 刪除產品
        else if(isNew === 'del'){
          this.tempProduct = { ...item }; // 淺層拷貝
          delProductModal.show();
        }
        
      },
      // 刪除產品
      delModal() {
        axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
          .then(res => {
            alert(res.data.message);
            delProductModal.hide();
            this.getProduct();
          })
          .catch(err => {
            alert(err.response.data.message);
          })
      },
      // 新增圖片
      createImages() {  
        // 陣列初始化
        this.tempProduct.imagesUrl = [];
        this.tempProduct.imagesUrl.push('');
      },
      updateProduct() {
        if(this.isNew){
          // 新增產品
          axios.post(`${this.url}/api/${this.path}/admin/product`, { data: this.tempProduct })
            .then(res => {
              alert(res.data.message);
              newProductModal.hide();
              this.getProduct();
            })
            .catch(err => {
              alert(err.response.data.message);
            })
        }
        else{
          // 編輯產品
          axios.put(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
            .then(res => {
              alert(res.data.message);
              newProductModal.hide();
              this.getProduct();
            })
            .catch(err => {
              alert(err.response.data.message);
            })
        }
      }
    },
    mounted() {
      // Modal實體化
      newProductModal = new bootstrap.Modal(document.querySelector('#productModal'), {
        keyboard: false
      });
      delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'), {
        keyboard: false
      });

      // 取得token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)productToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
      // 夾帶到headers內
      axios.defaults.headers.common['Authorization'] = token;
      this.checkLogin();
      
    }
};

createApp(app).mount("#app");