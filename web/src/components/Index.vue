<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>Welcome to Devsharks!</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-5">
          <h3>For companies</h3>
          <p class="text-muted">Devsharks is a platform to give you helpful feedback on your code. Integrated with Github, you can easily and seamlessly connect with our code reviewers and get continuous feedback.</p>
          <router-link :to="'/organization/sign-up'" class="btn btn-primary">Company sign up</router-link>
        </div>
        <div class="col-md-6">
          <h3>For reviewers</h3>
          <p class="text-muted">Devsharks is a community for top-tier software engineers who have a passion for helping out with code quality and stability. We connect you with real companies with real world projects. Sign up now to become a member and get the following:</p>
          <router-link :to="'/talent/sign-up'" class="btn btn-primary">Reviewer sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action } from "vuex-class";

@Component
export default class Index extends Vue {

  created() {
    console.log("index page");
  }

}
</script>
