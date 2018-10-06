<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <router-link :to="'/index'" class="navbar-brand font-weight-bold">Devsharks</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavDropdown" class="collapse navbar-collapse">
        <ul v-if="user && user.type === UserType.TALENT" class="navbar-nav ml-auto">
          <li><router-link :to="'/talent'" class="nav-link">Your profile</router-link></li>
        </ul>
        <ul v-else-if="user && user.type === UserType.ORGANIZATION" class="navbar-nav ml-auto">
          <li><router-link :to="'/organization'" class="nav-link">Billing information</router-link></li>
          <li><router-link :to="'/assignment/create'" class="btn btn-primary btn-sm">Create an assignment</router-link></li>
        </ul>
        <ul v-else class="navbar-nav ml-auto">
          <li><router-link :to="'/organization/login'" class="nav-link">Company login</router-link></li>
          <li><router-link :to="'/talent/login'" class="nav-link">Reviewer login</router-link></li>
        </ul>
      </div>
      <!--<a class="btn btn-primary" href="#" @click="showModal('Modal')">Show modal</a>-->
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Watch } from 'vue-property-decorator';
import Component from "vue-class-component";
import { State } from "vuex-class";
import { UserType, IUser } from "../models/IUser";
import userStore from '../stores/userStore';

@Component
export default class Header extends Vue {

  UserType = UserType;

  get user() {
    return this.$store.getters["userStore/get"]
  }

}
</script>
