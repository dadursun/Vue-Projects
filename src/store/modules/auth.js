import Vue from "vue"

import axios from "axios"
import {router} from "../../router";



const state = {
        token : "",
        fbAPIKey : "AIzaSyBxDmSlS5VTh1NAPykdIgzn3gwsWv7s-WQ",
    }
    const mutations = {
        setToken(state, token){
            state.token = token
        },
        clearToken(state){
            state.token = ""
        }
    }
    const actions = {
        initAuth({ commit, dispatch}){
           let token = localStorage.getItem("token")
            if(token){

                let expirationDate = localStorage.getItem("expirationDate")
                let time = new Date().getTime()

                if(time >= +expirationDate){
                    console.log("token süresi geçmiş...")
                    dispatch("logout")
                } else {
                    commit("setToken", token)
                    let timerSecond = +expirationDate - time
                    console.log(timerSecond)
                    dispatch("setTimeoutTimer", timerSecond)
                    router.push("/")
                }

            } else {
                router.push("/auth")
                return false
            }
        },
        login({ commit, dispatch, state}, authData){
            let authLink = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="
            if(authData.isUser){
                authLink = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="
            }
            return axios.post(
                authLink + "AIzaSyBxDmSlS5VTh1NAPykdIgzn3gwsWv7s-WQ",
                { email :authData.email, password : authData.password, returnSecureToken : true}
            ).then(response => {
                // console.log(response.data)
                commit("setToken", response.data.idToken)
                localStorage.setItem("token", response.data.idToken)

                localStorage.setItem("expirationDate", new Date().getTime() + +response.data.expiresIn * 1000)
                // localStorage.setItem("expirationDate", new Date().getTime() + 10000)

                dispatch("setTimeoutTimer", +response.data.expiresIn * 1000)
                // dispatch("setTimeoutTimer", 10000)
            })
        },
        logout({ commit}){
            commit("clearToken")
            localStorage.removeItem("token")
            localStorage.removeItem("expirationDate")
            router.replace("/auth")
        },
        setTimeoutTimer({dispatch}, expiresIn){
            setTimeout(() => {
                dispatch("logout")
            }, expiresIn)
        }
    }
    const getters = {
        isAuthenticated(state){
            return state.token !== ""
        }
    }


    export default {
        state,
        getters,
        mutations,
        actions
      }