<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>Sign up to become a reviewer</h2>
          <p class="text-muted">Become one of our reviewers and help quality assure real world business solutions.</p>
        </div>
      </div>
      <div class="row">

        <div class="col-md-8">
          <form autocomplete="off" novalidate @submit.prevent="handleSubmit">

            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text"
                v-validate="'required'"
                v-model="user.name" 
                name="name"
                class="form-control" 
                id="name" 
                placeholder="Enter your first and last name" 
              >
              <span v-show="isSubmitted && errors.has('name')" class="text-danger">
                {{ errors.first('name') }}
              </span>
            </div>
            
            <div class="form-group">
              <label for="email">Email address</label>
              <input 
                type="email" 
                v-validate="'required|email'" 
                v-model="user.email" 
                name="email"
                class="form-control" 
                id="email" 
                placeholder="Enter email"
              >
              <span v-show="isSubmitted && errors.has('email')" class="text-danger">
                {{ errors.first('email') }}
              </span>
            </div>

            <div class="form-group">
              <label for="phoneNumber">Phone number (including country code)</label>
              <input 
                type="text"
                v-validate="'required'"
                v-model="user.phoneNumber"
                name="phoneNumber" 
                class="form-control" 
                id="phoneNumber" 
                placeholder="Your phone number"
              >
              <span v-show="isSubmitted && errors.has('phoneNumber')" class="text-danger">
                The phone number field is required.
              </span>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                v-validate="'required|min:8'"
                v-model="user.password" 
                name="password"
                class="form-control" 
                id="password" 
                placeholder="Create password"
              >
              <span v-show="isSubmitted && errors.has('password')" class="text-danger">
                {{ errors.first('password') }}
              </span>
            </div>
            
            <div class="form-check">
              <input 
                type="checkbox" 
                v-validate="'required'" 
                v-model="user.acceptedTerms"
                name="acceptedTerms"
                class="form-check-input" 
                id="acceptedTerms"
              >
              <label class="form-check-label" for="acceptedTerms">I accept the <a target="_blank" href="https://devsharks.io/terms-conditions/">terms &amp; conditions</a> and <a target="_blank" href="https://devsharks.io/privacy-policy/">privacy policy</a></label>
              <br />
              <span v-show="isSubmitted && errors.has('acceptedTerms')" class="text-danger">
                You need to accept the terms for Devsharks
              </span>
            </div>

            <button type="submit" class="btn btn-primary mt-4">Create account</button>
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

@Component
export default class SignUp extends Vue {

  isSubmitted = false;
  
  user: IUser = {
    createdAt: new Date(),
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    acceptedTerms: false,
    type: UserType.TALENT
  };

  handleSubmit() {
    this.isSubmitted = true;
    this.$validator.validateAll()
      .then((result) => {
        if(result) {
          this.$store.dispatch("userStore/create", this.user)
            .then((user: IUser) => {
              this.$router.push("/talent/create-profile")
            }).catch((error: Error) => {
              console.log(error);
            });
        }
      });
  }

}
</script>
