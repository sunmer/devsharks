import Vue from "vue";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { IState, API_URL } from "./store";
import organizationStore from "./organizationStore";
import talentStore from "./talentStore";
import store from "./store";
import { IUser } from "../models/IUser";

interface IUserState {
  user: IUser
}

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
      axios.post(API_URL + "/auth/register", 
        user, 
        { headers: { 'content-type': 'application/json' } } 
      ).then(response => {
          axios.post(API_URL + "/auth/login", 
            { email: user.email, password: user.password }, 
            { headers: { 'content-type': 'application/json' } }
          ).then(response => {
            store.commit("setUser", user);
            axios.defaults.headers.common['Authorization'] = 
              'Bearer ' + response.data.data.authToken;
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
      axios.post(API_URL + "/auth/login", 
          { email: user.email, password: user.password }, 
          { headers: { 'content-type': 'application/json' } }
        ).then(response => {
          if(response.status !== 200) {
            reject(new Error("Email or password was incorrect"));
          } else {
            store.commit("setUser", user);
            axios.defaults.headers.common['Authorization'] = 
              'Bearer ' + response.data.data.authToken;
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