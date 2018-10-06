<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-8">
          <h2>Your company profile</h2>
          <p class="text-muted">This information is used to set up your company's billing information.</p>
        </div>
        <div class="col-md-4 text-right">
          <router-link :to="'/organization/create-profile'" class="btn btn-outline-primary">Add billing information</router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Account</span>
            <span class="badge badge-secondary badge-pill">created {{ formatDate(organization.createdAt) }}</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Company name</h6>
              <span class="text-muted">{{ organization.name }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Company registration number</h6>
              <span class="text-muted">{{ organization.identifier }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="row" v-if="organization.profile && organization.profile.billingAddress">
        <div class="col-md-8 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Billing address</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">City</h6>
              <span class="text-muted">{{ organization.profile.billingAddress.city }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Address</h6>
              <span class="text-muted">{{ organization.profile.billingAddress.line1 }}</span>
              <span class="text-muted">{{ organization.profile.billingAddress.line2 }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Postcode</h6>
              <span class="text-muted">{{ organization.profile.billingAddress.postcode }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Country</h6>
              <span class="text-muted">{{ organization.profile.billingAddress.country }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="row" v-if="organization.profile && organization.profile.officeAddress">
        <div class="col-md-8 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Office address</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">City</h6>
              <span class="text-muted">{{ organization.profile.officeAddress.city }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Address</h6>
              <span class="text-muted">{{ organization.profile.officeAddress.line1 }}</span>
              <span class="text-muted">{{ organization.profile.officeAddress.line2 }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Postcode</h6>
              <span class="text-muted">{{ organization.profile.officeAddress.postcode }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Country</h6>
              <span class="text-muted">{{ organization.profile.officeAddress.country }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as moment from "moment";
import { IUser } from "../../models/IUser";
import { ITalent } from "../../models/ITalent";
import { Skill  } from "../../skills";
import { IOrganization, IOrganizationProfile } from "../../models/IOrganization";
import { formatDate } from "../../dateTools";

@Component
export default class Profile extends Vue {

  skills = [];
  selectedSkills: Skill[] = [];
  organization: IOrganization;
  formatDate = formatDate;

  created() {
    let user: IUser = this.$store.getters["userStore/get"];
    this.organization = this.$store.getters["organizationStore/getOrganization"];
    this.$store.dispatch("getSkills")
      .then((skills: Skill[]) => {
        this.skills = skills;
      });
  }

  handleSubmit() {
    this.$store.dispatch("organizationStore/createProfile", this.organization.profile)
      .then(() =>
        this.$router.push("/organization")
      ).catch((error) => {
        console.log(error);
      });
  }

}
</script>