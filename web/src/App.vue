<template>
  <div>
    <Header />
    <Modal v-if="modalComponent === 'Modal'"/>
    <main role="main">
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";
import { State } from "vuex-class";

import "./scss/app.scss";

@Component({
  components: {
    Header,
    Footer,
    Modal
  } 
})
export default class App extends Vue {

  @State modalComponent: string;

}
</script>
