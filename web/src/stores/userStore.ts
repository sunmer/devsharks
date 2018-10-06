import Vue from "vue";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { IState, API_URL } from "./store";
import { IUser } from "../models/IUser";

interface IUserState {
  user: IUser
}

const AUTH_TOKEN = "xyz";

const mutations: MutationTree<IUserState> = {
  setUser(state, user) {
    Vue.set(state, "user", user);
  },
  logout(state) {
    localStorage.removeItem("vuex");
    const s = getInitialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    });
    this.dispatch("talentStore/resetState")
      .then(() => 
        this.dispatch("organizationStore/resetState")
          .then(() => 
            this.dispatch("resetState"))
    );
  }
};

const actions: ActionTree<IUserState, IState> = {
  create(store: ActionContext<IUserState, IState>, user: IUser) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + "/auth/sign-up", 
        user, 
        { headers: { 'content-type': 'application/json' } } 
      ).then(response => {
        axios.get(API_URL + `/users?email=${user.email}&password=${user.password}`)
          .then(response => {
            const user = response.data[0];
            store.commit("setUser", user);
            axios.defaults.headers.common['Authorization'] = 
              'Bearer ' + AUTH_TOKEN;
            resolve(user);
            }).catch(error => reject(error));
        }).catch(function(error) {
          console.log(error);
          reject(error)
        });
    });
  },
  login(store: ActionContext<IUserState, IState>, user: IUser) {
    return new Promise((resolve, reject) => {
      axios.get(API_URL + `/users?email=${user.email}&password=${user.password}`)
        .then(response => {
          if(response.status !== 200) {
            reject(new Error("Email or password was incorrect"));
          } else {
            store.commit("setUser", user);
            axios.defaults.headers.common['Authorization'] = 
              'Bearer ' + AUTH_TOKEN;
            resolve(user);
          }
        }).catch(error => reject(error));
    });
  },
  logout(store: ActionContext<IUserState, IState>) {
    store.commit("logout");
    axios.defaults.headers.common['Authorization'] = undefined;
  },
  resetState(store: ActionContext<IUserState, IState>) {
    store.commit("reset");
  }
};

const getters: GetterTree<IUserState, IState> = {
  get(state: IUserState) {
    return state.user;
  }
};

function getInitialState(): IUserState {
  return {
    user: undefined
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state: getInitialState
};