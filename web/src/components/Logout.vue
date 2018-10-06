<template>
  <div>
    <div class="container">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>You have been signed out</h2>
          <p class="text-muted">Thanks for using Devsharks!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Logout extends Vue {

  created() {
    this.$store.dispatch("userStore/logout");
  }

}
</script>
