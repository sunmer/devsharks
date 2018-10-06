<template>
  <div>
    <div class="container mb-5">
      <div class="row mt-4 mb-3">
        <div class="col-md-12">
          <h2>Your reviewer profile</h2>
          <p class="text-muted">Tell us about your expertise and we'll match you with code bases where you will have the most impact.</p>
        </div>
      </div>
      <div class="row">
        
        <div class="col-md-8">
          <form autocomplete="off" @submit.prevent="handleSubmit">

            <div class="form-group">
              <label for="skills">Areas of expertise</label>
              <select id="skills" class="form-control" @change="addSkill">
                <option>Select your areas of expertise</option>
                <option v-for="skill in skills" v-bind:key="skill.id">{{ skill.name }}</option>
              </select>
              <ul class="list-group mt-4" v-show="selectedSkills.length">
                <li v-for="skill in selectedSkills" v-bind:key="skill.id" class="mb-4 card p-3">
                  <a @click="removeSkill(skill)" class="removeSkill"><i class="fas fa-times-circle"></i></a>
                  <label for="range" class="text-muted"><span class="tag">{{ skill.name }}</span> skill level</label>
                  <div class="d-flex justify-content-between lh-condensed mb-2">
                    <small class="form-text text-muted">Beginner</small>
                    <small class="form-text text-muted">Intermediate</small>
                    <small class="form-text text-muted">Specialist</small>
                  </div>
                  <div>
                    <input id="range" min="0" max="10" type="range" v-model.number="skill.level" class="form-control-range">
                  </div>
                </li>
              </ul>
            </div>

            <div class="form-group">
              <label for="availabilityDaily">Availability daily</label>
              <div class="form-check">
                <input id="mornings" class="form-check-input" type="checkbox" value="mornings" v-model="talent.availability.daily" />
                <label for="mornings" class="form-check-label">Mornings</label>
              </div>
              <div class="form-check">
                <input id="afternoons" class="form-check-input" type="checkbox" value="afternoons" v-model="talent.availability.daily" />
                <label for="afternoons" class="form-check-label">Afternoons</label>
              </div>
              <div class="form-check">
                <input id="evenings" class="form-check-input" type="checkbox" value="evenings" v-model="talent.availability.daily" />
                <label for="evenings" class="form-check-label">Evenings</label>
              </div>
              <div class="form-check">
                <input id="nights" class="form-check-input" type="checkbox" value="nights" v-model="talent.availability.daily" />
                <label for="nights" class="form-check-label">Nights</label>
              </div>
            </div>

            <div class="form-group">
              <label for="availabilityWeekly">Availability days of week (non-binding, provide an estimate)</label>
              <div class="form-check">
                <input id="mondays" class="form-check-input" type="checkbox" value="mondays" v-model="talent.availability.weekly" />
                <label for="mondays" class="form-check-label">Mondays</label>
              </div>
              <div class="form-check">
                <input id="tuesdays" class="form-check-input" type="checkbox" value="tuesdays" v-model="talent.availability.weekly" />
                <label for="tuesdays" class="form-check-label">Tuesdays</label>
              </div>
              <div class="form-check">
                <input id="wednesdays" class="form-check-input" type="checkbox" value="wednesdays" v-model="talent.availability.weekly" />
                <label for="wednesdays" class="form-check-label">Wednesdays</label>
              </div>
              <div class="form-check">
                <input id="thursdays" class="form-check-input" type="checkbox" value="thursdays" v-model="talent.availability.weekly" />
                <label for="thursdays" class="form-check-label">Thursdays</label>
              </div>
              <div class="form-check">
                <input id="fridays" class="form-check-input" type="checkbox" value="fridays" v-model="talent.availability.weekly" />
                <label for="fridays" class="form-check-label">Fridays</label>
              </div>
              <div class="form-check">
                <input id="saturdays" class="form-check-input" type="checkbox" value="saturdays" v-model="talent.availability.weekly" />
                <label for="saturdays" class="form-check-label">Saturdays</label>
              </div>
              <div class="form-check">
                <input id="sundays" class="form-check-input" type="checkbox" value="sundays" v-model="talent.availability.weekly" />
                <label for="sundays" class="form-check-label">Sundays</label>
              </div>
            </div>

            <div class="form-group">
              <label for="availabilityHoursPerWeek">Availability hours per week (estimate)</label>
              <input 
                type="number" 
                v-model="talent.availability.hoursPerWeek" 
                class="form-control mb-2" 
                id="availabilityHoursPerWeek" 
                placeholder="0" />
            </div>

            <div class="form-group">
              <label for="socialGithub">Github address</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fab fa-github"></i></span>
                </div>
                <input 
                  type="text" 
                  v-model="talent.socialProfiles.github" 
                  class="form-control" 
                  id="socialGithub" 
                  placeholder="Enter your Github username" />
              </div>
              <small class="form-text text-muted">Your GitHub address is needed to confirm your coding experience</small>  
            </div>
            <div class="form-group">
              <label for="socialLinkedIn">LinkedIn profile address</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fab fa-linkedin"></i></span>
                </div>
                <input 
                  type="text" 
                  v-model="talent.socialProfiles.linkedin" 
                  class="form-control" 
                  id="socialLinkedIn" 
                  placeholder="Enter your LinkedIn username" />
              </div>
              <small class="form-text text-muted">Your LinkedIn address is needed to confirm your cereer experience</small>
            </div>
            <div class="form-group">
              <label for="socialStackOverflow">Stack Overflow profile address</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fab fa-stack-overflow"></i></span>
                </div>
                <input 
                  type="text" 
                  v-model="talent.socialProfiles.stackoverflow" 
                  class="form-control" 
                  id="socialStackOverflow" 
                  placeholder="Enter your Stack Overflow username" />
              </div>
              <small class="form-text text-muted">Your Stack Overflow address is needed to confirm your practical experience</small>
            </div>

            <div class="form-group">
              <label for="addressCity">City</label>
              <input 
                  type="text" 
                  v-model="talent.address.city" 
                  class="form-control" 
                  id="addressCity" 
                  placeholder="City where you reside" />
            </div>
            <div class="form-group">
              <label for="addressCountry">Country</label>
              <select class="form-control" v-model="talent.address.country">
                <option value="AF">Afghanistan</option>
                <option value="AX">Åland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia, Plurinational State of</option>
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, the Democratic Republic of the</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Côte d'Ivoire</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curaçao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and McDonald Islands</option>
                <option value="VA">Holy See (Vatican City State)</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran, Islamic Republic of</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">Korea, Democratic People's Republic of</option>
                <option value="KR">Korea, Republic of</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People's Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia, Federated States of</option>
                <option value="MD">Moldova, Republic of</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestinian Territory, Occupied</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Réunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthélemy</option>
                <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin (French part)</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten (Dutch part)</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia and the South Sandwich Islands</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syrian Arab Republic</option>
                <option value="TW">Taiwan, Province of China</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania, United Republic of</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UM">United States Minor Outlying Islands</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VE">Venezuela, Bolivarian Republic of</option>
                <option value="VN">Viet Nam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.S.</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </select>
            </div>

            <div class="form-check">
              <input type="checkbox" v-model="talent.isContractor" class="form-check-input" id="isContractor">
              <label class="form-check-label" for="isContractor">I have freelanced before</label>
              <small class="form-text text-muted">Having freelanced is not a requirement, but can help in certain cases</small>
            </div>

            <button type="submit" class="btn btn-primary mt-4">Create profile</button>
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
import * as moment from "moment";
import { IUser } from "../../models/IUser";
import { ITalent } from "../../models/ITalent";
import { Skill } from "../../skills";

@Component
export default class Create extends Vue {

  skills = [];
  selectedSkills: Skill[] = [];
  talent: ITalent = {
    userID: undefined,
    skills: [],
    availability: {
      daily: [],
      weekly: [],
      hoursPerWeek: 0
    },
    socialProfiles: {
      github: "",
      linkedin: "",
      stackoverflow: ""
    },
    address: {
      city: "",
      line1: null,
      line2: null,
      postcode: null,
      country: ""
    },
    isContractor: false,
    paymentDetails: null
  }
  
  created() {
    let user: IUser = this.$store.getters["userStore/get"];
    this.talent.userID = user.id;
    this.$store.dispatch("getSkills")
      .then((skills: Skill[]) => {
        this.skills = skills;
      });
  }

  handleSubmit() {
    this.selectedSkills.map(
      (skill) => this.talent.skills.push({ id: skill.id, level: skill.level })
    );

    this.$store.dispatch("talentStore/createTalent", this.talent)
      .then(() =>
        this.$router.push("/talent/create-profile-success")    
      ).catch((error) => {
        console.log(error);
      });
  }

  getYearsRange(yearsBackInTime: number) {
    let years = [];
    let now = moment();
    for(let i = 0; i < yearsBackInTime; i++) {
      years.push(moment().subtract(i, "years").year());
    }

    return years;
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
  top: 5px;
  color: #555 !important;
  cursor: pointer;
}
</style>