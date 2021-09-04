import { httpClient } from '../client/AxiosClient';

export default {
  getAllAllergyBypatientId(id)
  {
    console.log('respository is getting Id', id);
    //const serviceUrl = this.$endpoints.serviceUrl;
    return httpClient.get(`api/allergy`);
  },

  // MANY OTHER ENDPOINT RELATED STUFFS
};
