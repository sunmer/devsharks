import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import createPersistedState from "vuex-persistedstate";
import userStore from "./userStore";
import { Skill } from "../skills";
import talentStore from "./talentStore";
import organizationStore from "./organizationStore";


Vue.use(Vuex);

export interface IState {
  modalComponent: string;
  skills: Skill[]
}

export const API_URL = "http://127.0.0.1:3000";
export const USER_STORE = "userStore";
export const TALENT_STORE = "talentStore";
export const ORGANIZATION_STORE = "organizationStore";

const mutations: MutationTree<IState> = {
  showModal(state, name) {
    state.modalComponent = name;
  },
  closeModal(state) {
    state.modalComponent = undefined;
  },
  setSkills(state, skills) {
    state.skills = skills;
  },
  reset(state) {
    const s = getInitialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    });
  }
};

const actions: ActionTree<IState, any> = {
  showModal(store: ActionContext<IState, any>, name: string) {
    store.commit("showModal", name);
  },
  closeModal(store: ActionContext<IState, any>) {
    store.commit("closeModal");
  },
  getSkills(store: ActionContext<IState, any>) {
    return new Promise((resolve, reject) => {
      if(store.state.skills.length === 0) {
        axios.get(API_URL + "/skills")
          .then(function(response) {
            store.commit("setSkills", response.data);
            resolve(response.data);
          }).catch((error) => reject(error));
      } else {
        resolve(store.state.skills);
      }
    });
  },
  resetState(store: ActionContext<IState, IState>) {
    store.commit("reset");
  }
};

const getters: GetterTree<IState, any> = {
  getSkill: state => id => {
    return state.skills.find((skill) => skill.id === id)
  }
};

function getInitialState(): IState {
  return {
    modalComponent: undefined,
    skills: []
  }
}

export default new Vuex.Store<IState>({
  modules: {
    [USER_STORE]: userStore,
    [TALENT_STORE]: talentStore,
    [ORGANIZATION_STORE]: organizationStore
  },
  state: getInitialState(),
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
});