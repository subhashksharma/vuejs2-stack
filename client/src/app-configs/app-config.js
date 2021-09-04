//app global config

import { values as _values, each as _each } from 'lodash';
export default {
  methods: {
    $log() {
      //disable browser logging for production and perf
      if (ENV === 'local' || ENV === 'dev' || ENV === 'qa') {
        if (arguments.length === 0) {
          console.log('Params missing in $log');
          return;
        }
        //using lodash for IE11 support 
        var arr = _values(arguments);
        _each(arr, (el) => {
          console.log(el);
        });

        //console.log('arguments', arguments)
      } 
    }
	},
  computed: {
    $config() {
      return {
        ajaxTimeout: 120000,
        idleTimeout: 15 * 60 * 1000, //15 min.
        securityKey: 'A078@8O7tP99d02',
        appTitle:'Allergy Reconsiliation Process',
        appDataError: 'An error occurred retrieving the application data. If this problem persists please call the Help Desk.',
        appDownloadError: 'An error occurred downloading the Excel document. If this problem persists please call the Help Desk.',
        consentSignedDateHeader:'Date when the paper consent form was signed by the patient/authorized representative ',
        assessmentCreatedHeader:'Date when eCC HIE Assessment was initially collected ',
        headerWarning: ['This report represents patient HIE consent status that has been entered into the eCC Health Information Consent Record only.', 'Please ensure that the consent choice listed matches the Health Information Exchange Patient Consent paper form that has been scanned into DocMgr. Use the paper clip link in the report to connect to the scanned paper form.']
      }
    }
  }
}
