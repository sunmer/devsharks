<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-8">
          <h2>Create an assignment</h2>
          <p class="text-muted">As soon as you create your assignment our team will start matching it with experienced developers. You will be notified via email when we've found a developer who suits your needs. Billing and reviewing will only start when you've requested it on a pull request or an issue!</p>
        </div>
      </div>
      <div class="row">

        <div class="col-md-8">
          <form autocomplete="off" @submit.prevent="handleSubmit">

            <div class="form-group">
              <label for="description">Description</label>
                <textarea 
                  type="text" 
                  v-model="assignment.description" 
                  class="form-control" 
                  id="description" 
                  rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label for="skills">Areas of expertise your assignment needs</label>
              <select id="skills" class="form-control" @change="addSkill">
                <option>Select the areas of expertise</option>
                <option v-for="skill in skills" v-bind:key="skill.id">{{ skill.name }}</option>
              </select>
              <ul class="list-group mt-4" v-show="selectedSkills.length">
                <li v-for="skill in selectedSkills" v-bind:key="skill.id" class="mb-4 card p-2">
                  <span>{{ skill.name }}</span>
                  <a @click="removeSkill(skill)" class="removeSkill"><i class="fas fa-times-circle"></i></a>
                </li>
              </ul>
            </div>

            <div class="form-group">
              <label for="turnaroundLevel">How fast do you expect to get your code reviewed?</label>
              <select id="turnaroundLevel" class="form-control" v-model="assignment.turnaroundLevel">
                <option v-bind:value="TurnaroundLevel.WITHIN_HOURS">Within hours</option>
                <option v-bind:value="TurnaroundLevel.NEXT_DAY">Next day</option>
                <option v-bind:value="TurnaroundLevel.DAY_AFTER_TOMORROW">Day after tomorrow</option>
              </select>
            </div>

            <div class="form-group">
              <label for="hoursPerWeek">Estimate how many hours of review help you need per week</label>
              <input 
                  type="number" 
                  v-model="assignment.hoursPerWeek" 
                  class="form-control mb-2" 
                  id="hoursPerWeek" 
                  placeholder="0" />
            </div>

            <button type="submit" class="btn btn-primary mt-4">Create assignment</button>
          </form>
          <div class="col-md-4"></div>

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
import { IOrganization } from "../../models/IOrganization";
import { TurnaroundLevel, IAssignment } from "../../models/IAssignment";
import { Skill } from "../../skills";

@Component
export default class Create extends Vue {

  skills = [];
  selectedSkills: Skill[] = [];
  TurnaroundLevel = TurnaroundLevel;
  assignment: IAssignment = {
    organizationID: undefined,
    createdAt: new Date(),
    description: "",
    skillsNeeded: [],
    turnaroundLevel: undefined,
    hoursPerWeek: 0,
    startDate: undefined,
    endDate: undefined
  }
  
  created() {
    let user: IUser = this.$store.getters["userStore/get"];
    let organization = this.$store.getters["organizationStore/getOrganization"];
    this.assignment.organizationID = organization.id;
    this.$store.dispatch("getSkills")
      .then((skills: Skill[]) => {
        this.skills = skills;
      });
  }

  handleSubmit() {
    this.selectedSkills.map(
      (skill) => this.assignment.skillsNeeded.push(skill.id)
    );

    this.$store.dispatch("organizationStore/createAssignment", this.assignment)
      .then(() =>
        this.$router.push("/assignment/success")
      ).catch((error) => {
        console.log(error);
      });
  }

  addSkill(event) {
    let skill = this.skills.find((skill) => skill.name === event.target.value);
    if(this.selectedSkills.indexOf(skill) === -1)
      this.selectedSkills.push(skill);
  }

  removeSkill(skill) {
    this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
  }

}
</script>
<style lang="scss" scoped>
ul {
  list-style-type: none;
}
.removeSkill {
  position: absolute;
  right: 10px;
  top: 8px;
  color: #555 !important;
  cursor: pointer;
}
</style>