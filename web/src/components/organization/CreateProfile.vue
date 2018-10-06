<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>Your company profile</h2>
          <p class="text-muted">This information is used to set up your company's billing information.</p>
        </div>
      </div>  

      <form autocomplete="off" @submit.prevent="handleSubmit">
        <div class="row mb-3">
          <div class="col-md-8">
            <div class="form-group">
              <label for="vat">VAT number</label>
                <input 
                  type="text" 
                  v-model="organizationProfile.vat" 
                  class="form-control" 
                  id="vat" 
                  placeholder="Your company VAT number" />
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div class="row mb-3">
          <div class="col-md-8">
            <h3>Billing address</h3>
            <div class="form-group">
              <label for="billingAddressLine1">Address</label>
                <input 
                  type="text" 
                  v-model="organizationProfile.billingAddress.line1" 
                  class="form-control mb-2" 
                  id="billingAddressLine1" 
                  placeholder="Company street address" />
                <input 
                  type="text" 
                  v-model="organizationProfile.billingAddress.line2" 
                  class="form-control" 
                  id="billingAddressLine2" 
                  placeholder="Building or unit (optional)" />
            </div>
            <div class="form-group">
              <label for="billingAddressPostCode">Postcode</label>
                <input 
                  type="text" 
                  v-model="organizationProfile.billingAddress.postcode" 
                  class="form-control" 
                  id="billingAddressPostCode" 
                  placeholder="Company post code" />
            </div>
            <div class="form-group">
              <label for="billingAddressCity">City</label>
              <input 
                  type="text" 
                  v-model="organizationProfile.billingAddress.city" 
                  class="form-control" 
                  id="billingAddressCity" 
                  placeholder="City where your company is seated" />
            </div>
            <div class="form-group">
              <label for="billingAddressCountry">Country</label>
                <input 
                  type="text" 
                  v-model="organizationProfile.billingAddress.country" 
                  class="form-control" 
                  id="billingAddressCountry" 
                  placeholder="The country where your company is registered" />
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>

        <div class="row mb-3">
          <div class="col-md-8">
            <h3>Office address</h3>
            <div class="form-group">
              <label for="officeAddressLine1">Address</label>
                <input 
                  type="text" 
                  v-model="organizationProfile.officeAddress.line1" 
                  class="form-control mb-2" 
                  id="officeAddressLine1" 
                  placeholder="Company street address" />
                <input 
                  type="text" 
                  v-model="organizationProfile.officeAddress.line2" 
                  class="form-control" 
                  id="officeAddressLine2" 
                  placeholder="Building or unit (optional)" />
            </div>
            <div class="form-group">
              <label for="officeAddressPostCode">Postcode</label>
                <input 
                  type="text" 
                  v-model="organizationProfile.officeAddress.postcode" 
                  class="form-control" 
                  id="officeAddressPostCode" 
                  placeholder="Your company post code" />
            </div>
            <div class="form-group">
              <label for="officeAddressCity">City</label>
              <input 
                  type="text" 
                  v-model="organizationProfile.officeAddress.city" 
                  class="form-control" 
                  id="officeAddressCity" 
                  placeholder="City where your company is seated" />
            </div>
            <div class="form-group">
              <label for="officeAddressCountry">Country</label>
                <input 
                  type="text" 
                  v-model="organizationProfile.officeAddress.country" 
                  class="form-control" 
                  id="officeAddressCountry" 
                  placeholder="The country where your company is registered" />
            </div>

            <button type="submit" class="btn btn-primary mt-4">Add billing information</button>

          </div>
          <div class="col-md-4"></div>
        </div>
      </form>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as moment from "moment";
import { IUser } from "../../models/IUser";
import { ITalent } from "../../models/ITalent";
import { Skill } from "../../skills";
import { IOrganization, IOrganizationProfile } from "../../models/IOrganization";

@Component
export default class Profile extends Vue {

  skills = [];
  selectedSkills: Skill[] = [];
  organization: IOrganization;
  organizationProfile: IOrganizationProfile = {
    organizationID: undefined,
    vat: "",
    officeAddress: {
      city: "",
      line1: "",
      line2: "",
      postcode: "",
      country: ""
    },
    billingAddress: {
      city: "",
      line1: "",
      line2: "",
      postcode: "",
      country: ""
    },
    developerUserIDs: []
  };

  created() {
    let user: IUser = this.$store.getters["userStore/get"];
    this.organization = this.$store.getters["organizationStore/getOrganization"];

    if(this.organization.profile)
      this.organizationProfile = this.organization.profile;
    
    this.organizationProfile.organizationID = this.organization.id;
    
    this.$store.dispatch("getSkills")
      .then((skills: Skill[]) => {
        this.skills = skills;
      });
  }

  handleSubmit() {
    if(!this.organizationProfile.id) {
      this.$store.dispatch("organizationStore/createProfile", this.organizationProfile)
      .then(() =>
        this.$router.push("/organization")
      ).catch((error) => {
        console.log(error);
      });
    } else {
      this.$store.dispatch("organizationStore/updateProfile", this.organizationProfile)
        .then(() =>
          this.$router.push("/organization")
        ).catch((error) => {
          console.log(error);
        });
    }
    
  }

}
</script>