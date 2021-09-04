<template>
  <div >
     <app-header></app-header>
   <AllergyDataGrid></AllergyDataGrid>
    <app-footer></app-footer>
  </div>
</template>

<script>

import AppHeader from '@/app-components/shared-components/AppHeader';
import AppFooter from '@/app-components/shared-components/AppFooter';
import AllergyDataGrid from '@/app-components/utils-components/AllergyDataGrid.vue';

export default {
  name: 'MainContentComponent',
  components: {
    AppHeader,
    AppFooter,
    AllergyDataGrid

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
