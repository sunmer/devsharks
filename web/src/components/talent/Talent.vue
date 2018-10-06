<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>{{ user.name }}</h2>
          <p class="text-muted">This is your profile and preferences</p>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Account</span>
            <span class="badge badge-secondary badge-pill">member since {{ formatDate(user.createdAt) }}</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Email</h6>
              <span class="text-muted">{{ user.email }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Phone</h6>
              <span class="text-muted">{{ user.phone }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Preferences &amp; availability</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Areas of expertise</h6>
              <ul class="tags">
                <li 
                  v-for="skill in talent.skills" 
                  v-bind:key="skill.id"
                  class="tag">{{ getSkill(skill.id).name }}</li>
              </ul>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Availability daily</h6>
              <ul class="comma-list">
                <li 
                  class="text-muted" 
                  v-for="availability in talent.availability.daily" 
                  v-bind:key="availability">{{ availability }}</li>
              </ul>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Availability weekly</h6>
              <ul class="comma-list">
                <li 
                  class="text-muted" 
                  v-for="availability in talent.availability.weekly" 
                  v-bind:key="availability">{{ availability }}</li>
              </ul>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Is a contractor</h6>
              <span v-if="talent.isContractor" class="fas fa-check text-success"></span>
              <span v-else class="fas fa-times text-danger"></span>
            </li>
          </ul>
        </div>
        <div class="col-md-4"></div>
      </div>

      <div class="row">
        <div class="col-md-8 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">References</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <i class="fab fa-github"></i>
                <h6 class="my-0 d-inline">GitHub address</h6>
              </div>
              <span class="text-muted">{{ talent.socialProfiles.github }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <i class="fab fa-linkedin"></i>
                <h6 class="my-0 d-inline">LinkedIn address</h6>
              </div>
              <span class="text-muted">{{ talent.socialProfiles.linkedin }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <i class="fab fa-stack-overflow"></i>
                <h6 class="my-0 d-inline">Stack Overflow address</h6>
              </div>
              <span class="text-muted">{{ talent.socialProfiles.stackoverflow }}</span>
            </li>
          </ul>
        </div>
        <div class="col-md-4"></div>
      </div>

      <div class="row">
        <div class="col-md-8 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Address</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">City</h6>
              <span class="text-muted">{{ talent.address.city }}</span>
            </li>
            <!--<li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Street</h6>
              <ul class="comma-list">
                <li class="text-muted">{{ talent.address.line1 }}</li>
                <li class="text-muted" v-if="talent.address.line2">{{ talent.address.line2 }}</li>
              </ul>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Postcode</h6>
              <span class="text-muted">{{ talent.address.postcode }}</span>
            </li>-->
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <h6 class="my-0">Country</h6>
              <span class="text-muted">{{ talent.address.country }}</span>
            </li>
          </ul>
        </div>
        <div class="col-md-4"></div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IUser } from "../../models/IUser";
import { ITalent } from "../../models/ITalent";
import { formatDate } from "../../dateTools";

@Component
export default class Talent extends Vue {

  user: IUser = null;
  talent: ITalent = null;
  getSkill = this.$store.getters["getSkill"];
  formatDate = formatDate;

  created() {
    this.user = this.$store.getters["userStore/get"];
    this.talent = this.$store.getters["talentStore/getTalent"];
  }

}
</script>
<style lang="scss" scoped>
.tag:not(:last-child) {
  margin-right: 4px;
}
</style>