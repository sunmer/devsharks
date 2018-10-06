<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>Company login</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <form autocomplete="off" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" v-model="user.email" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="user.password" class="form-control" id="password" placeholder="Enter password">
            </div>

            <div v-if="message" class="p-3 mb-2 bg-danger text-white">{{ message }}</div>
            
            <button type="submit" class="btn btn-primary mt-4">Login</button>
          </form>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IUser, UserType } from "../../models/IUser";
import { IOrganization } from "../../models/IOrganization";

@Component
export default class Login extends Vue {

  user = {
    email: "",
    password: "",
    type: UserType.ORGANIZATION
  }

  message: string = null;

  handleSubmit() {
    this.$store.dispatch("userStore/login", this.user)
      .then((user: IUser) =>
        this.$store.dispatch("organizationStore/getOrganization", user.id)
          .then((organization: IOrganization) =>
            this.$router.push("/assignment/create")
          ).catch((error) => {
            this.$router.push("/organization/create-profile")
          })
      ).catch((error: Error) => {
        this.message = error.message;
        console.log(error)
      });
  }

}
</script>
