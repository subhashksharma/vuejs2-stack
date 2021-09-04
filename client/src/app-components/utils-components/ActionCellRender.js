import Vue from "vue";

import ReconcileCheckBox from '@/app-components/utils-components/ReconcileCheckBox.vue';
export default Vue.extend({
    template: `
            <span>
              <ReconcileCheckBox :dataValue="rowDataFromTable" ></ReconcileCheckBox>
            </span>`,
    
    components:{
        ReconcileCheckBox
    },
    data() {
        return {
            rowDataFromTable: ''
        };
    },
    beforeMount() {
        //Get Row Data from the table
        this.rowDataFromTable = this.params.node.data;
        console.log(this.rowDataFromTable);
    },
    mounted() {
    },
    methods: {
        
    }
});