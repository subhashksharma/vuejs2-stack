import Vue from 'vue';
import Router from 'vue-router';
import store from '@/app-store/AppCentralStore';

import MainContentComponent from '@/app-components/view-components/MainContentComponent.vue';
import NoAccess from '@/app-components/shared-components/NoAccess.vue'
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainContentComponent',
      beforeEnter: guardMyroute,
      component: MainContentComponent,
    },
    {
      path: '/noaccess',
      name: 'noaccess',
      component: NoAccess
    }
  ],
});

async function guardMyroute(to, from, next)
{
  store.commit("setSpinner", true);
  store.commit("setScreenLock", true);
    
     let isAuth = await store.dispatch("getValidRoleAction", {
           appName : 'abc', 
           instanceKey: 'a', 
           tokenKey:'xxxvvvvv'
          })
          .then((data) => {
            console.log('Loging data from server', data);
            // if(data===true) {
            //    this.$router.push({ name: "noaccess" });
            // }
           
            store.commit("setScreenLock", false);
            store.commit("setSpinner", false);

            return data;
           
          })
          .catch((err) => {
            console.log(`Something went wrong or network not available`, err);
         //   this.$store.commit("setScreenLock", true);
      //      this.$store.commit("setSpinner", false);
          });
  
  console.log('In guards data ', isAuth);
  if (isAuth === false) {
    next('/noaccess');
  } else {
    next();
  }
 
}

