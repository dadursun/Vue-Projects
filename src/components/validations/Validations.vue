<template>
    <div class="container">
        <h3 class="text-center mt-3">Vuelidate ile Form Kontrolü</h3>
        <div class="d-flex justify-content-center align-content-center flex-row">
            <div class="card p-4 mt-3 mr-4  shadow">
                <form style="width: 350px" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>E-posta Adresiniz</label>
                        <input
                                @blur="$v.email.$touch()"
                                v-model="$v.email.$model"
                                type="email"
                                class="form-control"
                                :class="{'is-invalid' : $v.email.$error}"
                                placeholder="E-posta adresini giriniz">
                        <small v-if="!$v.email.required" class="form-text text-danger">Bu alan zorunludur...</small>
                        <small v-if="!$v.email.email" class="form-text text-danger">Lütfen geçerli bir e-posta adresi
                            giriniz...
                        </small>
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input v-model="$v.password.$model" type="password" class="form-control"
                               placeholder="Şifrenizi giriniz">
                        <small v-if="!$v.password.numeric" class="form-text text-danger">Lütfen şifreniz rakamlardan
                            oluşsun...
                        </small>
                        <small v-if="!$v.password.required" class="form-text text-danger">Bu alan zorunludur...</small>
                        <small v-if="!$v.password.minLength" class="form-text text-danger">Lütfen şifreniz en az {{
                            $v.password.$params.minLength.min }} karakterden oluşmalıdır...
                        </small>
                        <small v-if="!$v.password.maxLength" class="form-text text-danger">Lütfen şifreniz en fazla {{
                            $v.password.$params.maxLength.max }} karakterden oluşmalıdır...
                        </small>
                    </div>
                    <div class="form-group">
                        <label>Şifre Tekrar</label>
                        <input v-model="$v.repassword.$model" type="password" class="form-control"
                               placeholder="Şifrenizi tekrar giriniz">
                        <small v-if="!$v.repassword.required" class="form-text text-danger">Bu alan zorunludur...
                        </small>
                        <small v-if="!$v.repassword.numeric" class="form-text text-danger">Lütfen şifreniz rakamlardan
                            oluşsun...
                        </small>
                        <small v-if="!$v.repassword.minLength" class="form-text text-danger">Lütfen şifreniz en az {{
                            $v.repassword.$params.minLength.min }} karakterden oluşmalıdır...
                        </small>
                        <small v-if="!$v.repassword.maxLength" class="form-text text-danger">Lütfen şifreniz en fazla {{
                            $v.repassword.$params.maxLength.max }} karakterden oluşmalıdır...
                        </small>
                        <small v-if="!$v.repassword.sameAs" class="form-text text-danger">Girdiğiniz şifreler
                            birbirleriyle uyuşmuyor...
                        </small>
                    </div>

                    <div class="form-group">
                        <label>Yaşınız</label>
                        <input v-model="$v.age.$model" type="text" class="form-control"
                               placeholder="Yaşınızı giriniz">
                        <small v-if="!$v.age.required" class="form-text text-danger">Bu alan zorunludur...</small>
                        <small v-if="!$v.age.numeric" class="form-text text-danger">Lütfen sadece rakam giriniz...
                        </small>
                        <small v-if="!$v.age.between" class="form-text text-danger">
                            Kayıt olabilmeniz için yaşınızın {{ $v.age.$params.between.min }} ile {{
                            $v.age.$params.between.max }} olması gerekir..
                        </small>
                    </div>

                    <div class="form-group">
                        <label>Kayıt olmak istediğiniz kategori</label>
                        <select v-model="$v.selectedCategory.$model" class="form-control">
                            <option v-for="category in categories" :value="category" :key=category>{{ category }}</option>
                        </select>
                        <small v-if="!$v.selectedCategory.checked" class="form-text text-danger">Sadece Yazılım
                            kategorisine ait kayıt oluşturabilirsiniz...
                        </small>
                    </div>

                    <a @click="newHobby" class="text-white btn btn-secondary rounded-0 btn-sm">İlgi Alanı Ekle</a>
                    <small v-if="!$v.hobbies.required" class="form-text text-danger">Bu alan zorunludur...</small>
                    <small v-if="!$v.hobbies.minLength" class="form-text text-danger">İlgi alanlarınız en az {{
                        $v.hobbies.$params.minLength.min }} tane olmalıdır...
                    </small>
                    <ul class="list-group mt-3 mb-3 border-0">
                        <li v-for="(hobby,index) in hobbies" class="list-group-item d-flex pl-2" :key=hobby>
                            <input
                                    type="text"
                                    class="form-control mr-2"
                                    :class="{'is-invalid' : $v.hobbies.$each[index].$error}"
                                    @blur="$v.hobbies.$each[index].value.$touch()"
                                    v-model="hobby.value">
                            <button class="btn btn-sm btn-danger rounded-0" @click="hobbies.splice(index, 1)">Sil
                            </button>
                        </li>
                    </ul>
                    <button class="btn btn-outline-secondary rounded-0" :disabled="$v.$invalid">Kaydet</button>
                </form>
            </div>
            <div class="card p-4 mt-3 shadow" style="width: 400px">
                <p> {{ $v.email }}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import {required, email, numeric, minLength, maxLength, sameAs, between} from "vuelidate/lib/validators"

    export default {
        data() {
            return {
                email: null,
                password: null,
                repassword: null,
                selectedCategory: "Yazılım",
                age: null,
                categories: ["Yazılım", "Donanım", "Cloud", "Sunucular", "Unix", "Linux", "Mac OS", "Windows"],
                hobbies: []
            }
        },
        validations: {
            email: {
                required,
                email,
                // uniq  : value => {
                //     return value !== 'gokhan@gkandemir.com'
                // }
                uniq: value => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(value !== 'gokhan@gkandemir.com')
                        }, 1000)
                    })
                    // return axios.get("url")
                    //     .then(response => {
                    //         return false
                    //     })
                    // return value !== 'gokhan@gkandemir.com'
                }
            },
            password: {
                required,
                numeric,
                minLength: minLength(6),
                maxLength: maxLength(8)
            },
            repassword: {
                required,
                numeric,
                minLength: minLength(6),
                maxLength: maxLength(8),
                 sameAs : sameAs('password'),
        //         sameAs: sameAs(vm => {
        //          return vm.password + "87"
        // })
            },
            age: {
                required,
                numeric,
                between: between(18, 60)
            },
            selectedCategory: {
                checked(val, vm) {
                    return vm.selectedCategory === "Yazılım" ? true : false
                }
            },
            hobbies: {
                required,
                minLength: minLength(2),
                $each: {
                    value: {
                        required,
                        minLength: minLength(6)
                    }
                }
            }
        },
        methods: {
            onSubmit() {
                let form = {
                    email: this.email,
                    password: this.password,
                    category: this.category,
                    hobbies: this.hobbies,
                }
                console.log(form)
            },
            newHobby() {
                let hobby = {
                    id: Math.random() * Math.random() * 1000,
                    value: ''
                }
                this.hobbies.push(hobby)
            }
        }
    }
</script>
