import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import Repository from "../app-services/RepositoryFactory";

Vue.use(Vuex);
const vuexSessionStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage,
  reducer: () => ({
  }),
});

export default new Vuex.Store({
  state: {
    spinner: false,
    screenLock: false,
    loginInfo: {
        userId:'',
        userName: '',
        fistName: '',
        lastName: '',
        clinicId: '',
        appName: '',
        appInstance: '',
        token: '',
    },
    hasValidRole: false,
    allergyDetails:[]
  },
  plugins: [vuexSessionStorage.plugin],
  getters: {
    getApplicationVersion(state) {
      return state.version;
    },

    screenLock: (state) => {
      return state.screenLock;
    },
    spinner: (state) => {
      return state.spinner;
    },
    getLoginInfo: (state) =>{
      return state.loginInfo;
    },
    getAllergyDetails: state => {
			return state.allergyDetails;
    },
    hasValidRole: state =>
    {
      return state.hasValidRole; 
    }
  },
  actions: {
   async getValidRoleAction(context, payload)
    {
     
      console.log(context, payload);
      const loginDetailsRepository = Repository.get("loginDetails");
      let serverToken = null;
      return await loginDetailsRepository.validateUserRole(payload.appName, payload.instanceKey, payload.tokenKey).
        then(response =>
        {
          console.log(response);
          serverToken = response;
          console.log('serverToken', serverToken);
          context.commit('setValidRole', serverToken);
          return serverToken;
        }).catch (error =>{
          console.log('Something was wrong while fetching login role data from server.' + error);
          context.commit('setValidRole', serverToken);
          throw error;
        });
    },
    getAllergyDetailsAction(context, userPayload)
    {
      const AllergyDetailsRepository = Repository.get("allergyDetails");
      console.log('Patient Id is here ', userPayload);
      let allergyDetailsServerList = [];
      return  AllergyDetailsRepository.getAllAllergyBypatientId(userPayload.patientId).then(response =>
        {
          allergyDetailsServerList = response.data.allergyDa;
          console.log('allergyDetailsServerList', allergyDetailsServerList);
          context.commit('setAllergyDetails', allergyDetailsServerList);
          return allergyDetailsServerList;
        }).catch (error =>{
          console.log('Something was wrong while fetching data from server.' + error);
          context.commit('setAllergyDetails', allergyDetailsServerList);
          throw error;
        });
    }
  },
  mutations: {
    setApplicationVersion(state, payload) {
      state.version = payload;
    },
    setSpinner: (state, spinner) => {
      state.spinner = spinner;
    },
    setScreenLock: (state, screenLock) => {
      state.screenLock = screenLock;
    },
    setAllergyDetails: (state, payload) =>
    {
      state.allergyDetails = payload;
    },
    setValidRole: (state, payload) =>{
      state.hasValidRole = payload;
    }
  },
});
