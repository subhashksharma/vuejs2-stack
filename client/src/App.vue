<template>
  <!-- disabling screen lock -->
  <div id="appCss">
    <app-screen-lock v-if="screenLock"></app-screen-lock>
    <!-- progress spinner -->
    <app-spinner v-if="showSpinner"></app-spinner>
    <router-view></router-view>
  </div>
</template>

<script>
import AppSpinner from '@/app-components/shared-components/AppSpinner.vue';
import AppScreenLock from '@/app-components/shared-components/AppScreenLock.vue';

import axios from 'axios';
export default {
  name: 'App',
  components: {
    AppSpinner,
    AppScreenLock,
  },

  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    showSpinner() {
      return this.$store.getters.spinner;
    },
    screenLock() {
      return this.$store.getters.screenLock;
    },
  },
  beforeMount() {
    this.$log(
      '=================Launching Allergy reconcilion process App================='
    );
    this.$log(
      'Setting base URL for the application based on environment ==>',
      this.$endpoints.getServiceUrl
    );
    axios.defaults.baseURL = this.$endpoints.getServiceUrl;
  },
};
</script>

<style>
#appCss {
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  color: #333333;
  background-color: #f4f7fb;
  font-size: 13px;
  min-height: 100%;
  position: relative;
}
</style>
