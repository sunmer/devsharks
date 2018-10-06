import Vue from "vue";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { IState, API_URL } from "./store";
import { ITalent } from "../models/ITalent";


interface ITalentState {
  talent: ITalent
}

const mutations: MutationTree<ITalentState> = {
  setTalent(state, talent) {
    Vue.set(state, "talent", talent);
  },
  reset(state) {
    const s = getInitialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    });
  }
};

const actions: ActionTree<ITalentState, IState> = {
  createTalent(store: ActionContext<ITalentState, IState>, talent: ITalent) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + "/talents", talent)
        .then(function(response) {
          store.commit("setTalent", talent);
          resolve(response.data);
        }).catch((error) => reject(error));
    });
  },
  getTalent(store: ActionContext<ITalentState, IState>, userID: number) {
    return new Promise((resolve, reject) => {
      axios.get(API_URL + "/talents")
        .then(response => {
          if(!response.data.length) {
            reject(new Error("No talent profile was found"));
          } else {
            store.commit("setTalent", response.data[0]);
            resolve(response.data[0]);
          }
        }).catch((error) => reject(error));
    });
  },
  resetState(store: ActionContext<ITalentState, IState>) {
    store.commit("reset");
  }
};

const getters: GetterTree<ITalentState, IState> = {
  getTalent(state: ITalentState) {
    return state.talent;
  }
};

function getInitialState(): ITalentState {
  return {
    talent: undefined
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state: getInitialState,
};