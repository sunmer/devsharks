<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>Create your company</h2>
          <p class="text-muted">Create your company to set up assignments and get on-demand code reviews</p>
        </div>
      </div>
      <div class="row">
        
        <div class="col-md-8">
          <form autocomplete="off" @submit.prevent="handleSubmit">

            <div class="form-group">
              <label for="organizationName">Company name</label>
              <input 
                type="text" 
                v-validate="'required'"
                v-model="organization.name" 
                name="organizationName"
                class="form-control" 
                id="organizationName" 
                placeholder="Enter the name of your company" 
              >
              <span v-show="isSubmitted && errors.has('organizationName')" class="text-danger">
                Name of organization is required.
              </span>
            </div>

            <div class="form-group">
              <label for="organizationIdentifier">Company registration number</label>
              <input 
                type="text" 
                v-validate="'required'"
                v-model="organization.identifier" 
                name="organizationIdentifier"
                class="form-control" 
                id="organizationIdentifier" 
                placeholder="Enter the organization number of your company" 
              >
              <span v-show="isSubmitted && errors.has('organizationIdentifier')" class="text-danger">
                Organization number is required.
              </span>
            </div>

            <div class="form-group">
              <label for="userName">Your full name</label>
              <input 
                type="text" 
                v-validate="'required'"
                v-model="user.name" 
                name="userName"
                class="form-control" 
                id="userName" 
                placeholder="Enter your first and last name" 
              >
              <span v-show="isSubmitted && errors.has('userName')" class="text-danger">
                Name is required.
              </span>
            </div>
            
            <div class="form-group">
              <label for="userEmail">Your email address</label>
              <input 
                type="email" 
                v-validate="'required|email'"
                v-model="user.email" 
                name="userEmail"
                class="form-control" 
                id="userEmail" 
                placeholder="Enter email"
              >
              <span v-show="isSubmitted && errors.has('userEmail')" class="text-danger">
                Email is required.
              </span>
            </div>

            <div class="form-group">
              <label for="userPhoneNumber">Your phone number (including country code)</label>
              <input 
                type="text" 
                v-validate="'required'"
                v-model="user.phoneNumber" 
                name="userPhoneNumber"
                class="form-control" 
                id="userPhoneNumber" 
                placeholder="Your phone number"
              >
              <span v-show="isSubmitted && errors.has('userPhoneNumber')" class="text-danger">
                Phone number is required.
              </span>
            </div>

            <div class="form-group">
              <label for="password">Your password</label>
              <input 
                type="password" 
                v-validate="'required'"
                v-model="user.password" 
                name="userPassword"
                class="form-control" 
                id="userPassword" 
                placeholder="Create password"
              >
              <span v-show="isSubmitted && errors.has('userPassword')" class="text-danger">
                Password is required.
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

            <button type="submit" class="btn btn-primary mt-4">Create company</button>
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
export default class CreateUser extends Vue {

  isSubmitted = false;

  user: IUser = {
    createdAt: new Date(),
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    acceptedTerms: false,
    type: UserType.ORGANIZATION
  };

  organization: IOrganization = {
    createdAt: new Date(),
    userID: undefined,
    identifier: "",
    name: "",
    assignments: []
  };

  handleSubmit() {
    this.isSubmitted = true;
    this.$validator.validateAll()
      .then((result) => {
        if(result) {
          this.$store.dispatch("userStore/create", this.user)
            .then((user: IUser) => {
              this.organization.userID = user.id;
              this.$store.dispatch("organizationStore/createOrganization", this.organization)
                .then((organization: IOrganization) => 
                  this.$router.push("/assignment/create")
              ).catch((error: Error) => {
                console.log(error);
              });
            }).catch((error: Error) => {
              console.log(error);
            });
        }
      });
  }

}
</script>
