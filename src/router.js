import Vue from "vue";
import ProductList from "./components/products/ProductList"
import ProductSell from "./components/products/ProductSell"
import ProductPurchase from "./components/products/ProductPurchase"
import Validations from "./components/validations/Validations"
import Auth from "./components/auth/Auth"
import About from "./components/auth/About"
import Homepage from "./components/auth/Homepage"
import VueRouter from "vue-router";
import store from "./store/store"

Vue.use(VueRouter);

const routes = [
  { path : "/urun-listesi", component : ProductList },
  { path : "/homepage", component : Homepage },
  { path : "/about", component : About },
  { path : "*", redirect : "/urun-listesi"},
  {path : "/uye-kontrol" , component:Validations},
  {path : "/auth", component:Auth},
  {
    path: "/urun-cikisi",
    component: ProductSell,
    beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
            next()
        } else {
            next("/auth")
        }
    }
},
{
    path: "/urun-islemleri",
    component: ProductPurchase,
    beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
            next()
        } else {
            next("/auth")
        }
    }
},
// {path: "/", component: Auth}
];

export const router = new VueRouter({
  mode : "history",
  routes
});
