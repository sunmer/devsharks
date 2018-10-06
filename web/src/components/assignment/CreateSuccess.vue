<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>Thank you!</h2>
        </div>
      </div>
      <div class="row">

        <div class="col-md-8">
          <p>You have now created an assigment and we will soon get it into our reviewer matching process. After that we'll reach out to you via email.</p>
          <p>
            <router-link :to="'/assignment/create'" class="btn btn-primary btn-sm">Create another assignment</router-link>
          </p>
        </div>
        <div class="col-md-4"></div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CreateSuccess extends Vue {}
</script>
