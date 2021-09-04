<template>
  <div>
    <app-header></app-header>

    <div
      class="container-fluid content form"
      style="padding:50px 0;min-height: 200px;max-width:900px;"
    >
      <div class="row">
        <div
          class="col-xs-12 text-center"
          style="padding:15px 15px 30px 15px;color:blue;font-size:15px"
        >
          User is not allowed to access the application
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-center">
          <button
            class="btn btn-md btn-success"
            :disabled="screenLock"
            tabindex="-1"
            type="button"
            @click="logOut()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/app-components/shared-components/AppHeader';
import AppFooter from '@/app-components/shared-components/AppFooter';

export default {
  name: 'NoAccess',
  data() {
    return {};
  },

  components: {
    AppHeader,
    AppFooter,
  },

  mounted() {
    //this.$store.commit('setScreenLock', false);
  },

  computed: {
    screenLock() {
      return this.$store.getters.screenLock;
    },
  },

  methods: {
    logOut() {},
  },
};
</script>
