//dev endpoints

export default {
  data() {
    return {
      serviceUrl : 'http://localhost:3000/static/',
      hostUrl : 'http://hal-sboot-d02:8787/'
    }
  },
  
  computed: {
    $endpoints() {
      return {
        getServiceUrl:this.serviceUrl,
        getAllegryData: `${this.serviceUrl}api/allergy`, //userId
        getPatients: `${this.serviceUrl}consentReport?clinic={1}`, //clinicId  
      }
    }
  }
}
