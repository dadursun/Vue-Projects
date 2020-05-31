import Vue from "vue";
import ProductList from "./components/products/ProductList"
import ProductSell from "./components/products/ProductSell"
import ProductPurchase from "./components/products/ProductPurchase"
import Validations from "./components/validations/Validations"
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path : "/", component : ProductList },
  { path : "/urun-islemleri", component : ProductPurchase },
  { path : "/urun-cikisi", component : ProductSell },
  { path : "*", redirect : "/"},
  {path : "/uye-kontrol" , component:Validations}
];

export const router = new VueRouter({
  mode : "history",
  routes
});
