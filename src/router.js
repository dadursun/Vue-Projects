import Vue from "vue";
import ProductList from "./components/products/ProductList"
import ProductSell from "./components/products/ProductSell"
import ProductPurchase from "./components/products/ProductPurchase"
import Validations from "./components/validations/Validations"
import Auth from "./components/auth/Auth"
import About from "./components/auth/About"
import Homepage from "./components/auth/Homepage"
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path : "/", component : ProductList },
  { path : "/urun-islemleri", component : ProductPurchase },
  { path : "/urun-cikisi", component : ProductSell },
  { path : "*", redirect : "/"},
  {path : "/uye-kontrol" , component:Validations},
  {
    path: "/homepage",
    component: Homepage,
    beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
            next()
        } else {
            next("/auth")
        }
    }
},
{
    path: "/about",
    component: About,
    beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
            next()
        } else {
            next("/auth")
        }
    }
},
{path: "/auth", component: Auth}
];

export const router = new VueRouter({
  mode : "history",
  routes
});
