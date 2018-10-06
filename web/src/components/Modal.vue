<template>
  <div>
    <div class="modal fade show" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">This is a modal title</h5>
            <button type="button" class="close" data-dismiss="modal" @click="closeModal()">
              <span>×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>This is a modal body</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal()">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" @click="closeModal()"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action, State } from "vuex-class";


@Component
export default class CreateModal extends Vue {
  
  @Action closeModal: Function;

}
</script>
<style>
.modal {display: block !important;}
</style>