import Vue from "vue";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { IState, API_URL } from "./store";
import { IAssignment } from "../models/IAssignment";
import { IOrganization, IOrganizationProfile } from "../models/IOrganization";

interface IOrganizationState {
  organization: IOrganization
}

const mutations: MutationTree<IOrganizationState> = {
  setOrganization(state, organization) {
    Vue.set(state, "organization", organization);
  },
  setProfile(state, profile) {
    Vue.set(state.organization, "profile", profile);
  },
  addAssignment(state, assigment) {
    state.organization.assignments.push(assigment);
  },
  reset(state) {
    const s = getInitialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    });
  }
};

const actions: ActionTree<IOrganizationState, IState> = {
  createOrganization(store: ActionContext<IOrganizationState, IState>, organization: IOrganization) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + "/organizations", organization)
        .then(function(response) {
          store.commit("setOrganization", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  getOrganization(store: ActionContext<IOrganizationState, IState>, userID: number) {
    return new Promise((resolve, reject) => {
      axios.get(API_URL + "/organizations")
        .then(response => {
          if(!response.data.length) {
            reject(new Error("No organization was found"));
          } else {
            let organization = response.data[0];
            axios.get(API_URL + `/organization-profiles?organizationID=${organization.id}`)
              .then(response => {
                if(response.data.length)
                  organization.profile = response.data[0];

                store.commit("setOrganization", organization);
                resolve(organization);
              }).catch((error) => reject(error));
          }
        }).catch((error) => reject(error));
    });
  },
  createProfile(store: ActionContext<IOrganizationState, IState>, profile: IOrganizationProfile) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + "/organization-profiles", profile)
        .then(function(response) {
          store.commit("setProfile", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  updateProfile(store: ActionContext<IOrganizationState, IState>, profile: IOrganizationProfile) {
    return new Promise((resolve, reject) => {
      axios.put(API_URL + `/organization-profiles/${profile.organizationID}`, profile)
        .then(function(response) {
          store.commit("setProfile", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  createAssignment(store: ActionContext<IOrganizationState, IState>, assignment: IAssignment) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + "/assignments", assignment)
        .then(function(response) {
          store.commit("addAssignment", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  resetState(store: ActionContext<IOrganizationState, IState>) {
    store.commit("reset");
  }
};

const getters: GetterTree<IOrganizationState, any> = {
  getOrganization(state: IOrganizationState) {
    return state.organization;
  }
};

function getInitialState(): IOrganizationState {
  return {
    organization: undefined
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state: getInitialState,
};