<template>
  <footer class="text-center navbar-dark bg-dark">
    <div class="container">
      <ul v-if="user && user.type === UserType.TALENT">
        <li><router-link :to="'/logout'" class="btn btn-outline-primary">Logout</router-link></li>
      </ul>
      <ul v-else-if="user && user.type === UserType.ORGANIZATION">
        <li><router-link :to="'/logout'" class="btn btn-outline-primary">Logout</router-link></li>
      </ul>
      <ul v-else>
        <li><router-link :to="'/organization/login'" class="nav-link">Company login</router-link></li>
        <li><router-link :to="'/talent/login'" class="nav-link">Reviewer login</router-link></li>
      </ul>
      <p class="text-center text-light">
        Copyright © 2018 Devsharks Ltd. All rights reserved. <br />
        All other trademarks are property of their respective owners.
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { UserType, IUser } from "../models/IUser";

@Component
export default class Footer extends Vue {

  UserType = UserType;

  get user() {
    return this.$store.getters["userStore/get"];
  }

}
</script>

<style lang="scss">
  footer {
    padding-top: 1rem;
    padding-bottom: 1rem;

    ul {
      list-style-type: none;
      padding: 0;

      li {
        margin-bottom: 1rem;
        display: inline-block;
      }
    }
  }
</style>