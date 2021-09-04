<template>
  <div class="content">
    <div class="container-fluid form" style="min-height:45vh;">
      <div class="row">
        <div class="col-xs-12" style="padding:5px 15px 15px 15px;">
          <div class="row pillBtn">
            <div class="col-xs-12 text-right blueTxt display-flex">
              <!-- slide button my assessments -->
              <!-- <strong> My assesments only: &nbsp;&nbsp;&nbsp;</strong> -->
            </div>
          </div>
          <ag-grid-vue
            style="width: 100%;height: 70vh;"
            class="ag-theme-balham"
            :columnDefs="columnDefs"
            :rowData="rowData"
            :overlayNoRowsTemplate="overlayNoRowsTemplate"
            rowHeight="45"
            headerHeight="55"
            :gridOptions="gridOptions"
            @grid-ready="onGridReady"
            @body-scroll="onGridScroll"
            :frameworkComponents="frameworkComponents"
          >
          </ag-grid-vue>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-right" style="padding-bottom:10px;">
          <!-- download Excel button -->
          <button
            id="confirmReconcile"
            class="btn btn-md btn-success"
            tabindex="-1"
            type="button"
            @click="exportExcel()"
          >
            Confirm Reconcile/Merge
          </button>
          <button
            id="confirmCancel"
            class="btn btn-md btn-success"
            style="margin-left:15px;"
            tabindex="-1"
            type="button"
            @click="exportExcel()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- END content -->
</template>

<script>
import { AgGridVue } from 'ag-grid-vue';
//import moment from 'moment';
//import axios from 'axios';
import ActionCellRender from '@/app-components/utils-components/ActionCellRender.js';
//axios.defaults.baseURL = this.$endpoints.getServiceUrl;
export default {
  name: 'AllergyDataGrid',
  data() {
    return {
      columnDefs: null,
      rowData: [],
    };
  },
  components: {
    AgGridVue,
    // ActionCellRender
  },

  methods: {
    onGridScroll() {
      var body = document.querySelector('body');
      body.focus();
      body.click();
      this.gridApi.deselectAll();
    },
    onGridReady(params) {
      params.api.sizeColumnsToFit();
      params.api.sizeColumnsToFit();

      window.addEventListener('resize', function() {
        setTimeout(function() {
          params.api.sizeColumnsToFit();
        });
      });
    },
    dateComparator(date1, date2) {
      date1 = date1 ? new Date(date1) : null;
      date2 = date2 ? new Date(date2) : null;

      if (date1 == date2) return 0;
      if (date1 < date2) return -1;
      return 1;
    },

    noCaseComparator(a, b) {
      if (typeof a === 'string') {
        return a.localeCompare(b);
      } else {
        return a > b ? 1 : a < b ? -1 : 0;
      }
    },

    strToIntComparator(a, b) {
      a = parseInt(a);
      b = parseInt(b);

      a = isNaN(a) ? 0 : a;
      b = isNaN(b) ? 0 : b;

      return a > b ? 1 : a < b ? -1 : 0;
    },
  },
  async beforeMount() {
    this.gridOptions = {
      defaultColDef: {
        filter: false, // set filtering on for all cols
      },
      enableCellTextSelection: true,
    };

    this.columnDefs = [
      {
        headerName: 'eCC Allergy Name',
        field: 'eCCAllergyName',
        cellRenderer: 'agGroupCellRenderer',
        comparator: this.noCaseComparator,
        suppressSizeToFit: false,
        resizable: true,
      },
      {
        headerName: 'Reaction',
        field: 'eCCReaction',
        width: 150,
        comparator: this.strToIntComparator,
        suppressSizeToFit: true,
        resizable: true,
      },
      {
        headerName: 'External Allergy Name',
        field: 'externalAllergyName',
        comparator: this.noCaseComparator,
        suppressSizeToFit: false,
        resizable: true,
      },
      {
        headerName: 'Reaction',
        field: 'externalAllergyReaction',
        width: 150,
        suppressSizeToFit: true,
        resizable: true,
      },
      {
        headerName: 'Date/Time',
        field: 'dateTime',
        comparator: this.dateComparator,
        width: 150,
        suppressSizeToFit: true,
        valueFormatter: this.dateFormatter,
        resizable: true,
        // headerComponentFramework: TooltipHeader,
        // headerComponentParams: {
        //   tooltip: this.$config.assessmentCreatedHeader
        // }
      },
      {
        headerName: 'External Source',
        field: 'externalSource',
        comparator: this.noCaseComparator,
        suppressSizeToFit: false,
        width: 200,
        resizable: true,
      },
      {
        headerName: 'Select for Reconcile/Merge',
        field: 'selectedChoise',
        width: 150,
        suppressSizeToFit: true,
        resizable: true,
        cellRenderer: 'ActionCellRender',
        cellEditor: 'agRichSelectCellEditor',
      },
    ];

    //this.detailCellRenderer = "myDetailCellRenderer";
    //this.detailRowHeight = 90;
    this.frameworkComponents = { ActionCellRender: ActionCellRender };
    //this.frameworkComponents = { tooltipColumnTemplate: TooltipColumn, onBaseTemplate: onBase , myDetailCellRenderer: ClinicMasterRowDetail };

    this.defaultColDef = {
      width: 100,
      sortable: true,
      resizable: true,
      suppressMenu: true,
    };

    this.overlayNoRowsTemplate =
      "<span class='blueTxt' style='font-size:13px;'><b>No Data Found</b></span>";

    // const getAllegryData = this.$endpoints.getAllegryData;
    // const resData = await axios.get(getAllegryData);
    // //console.log('resData', resData);
    // resData.data.allergyDa.forEach((rowData) => {
    // this.rowData.push(rowData);
    // });

       this.$store.commit("setSpinner", true);
       this.$store.commit("setScreenLock", true);

        console.log('Initial state  for allergy data  was null so calling this value')
        this.$store
          .dispatch("getAllergyDetailsAction", {
            patientId: 1,
          })
          .then((data) => {
            console.log('incoming data list', data);
            this.rowData = data;
            this.$store.commit("setScreenLock", false);
            this.$store.commit("setSpinner", false);
          })
          .catch((err) => {
            console.log(`Something went wrong or network not available`, err);
         //   this.$store.commit("setScreenLock", true);
      //      this.$store.commit("setSpinner", false);
          });

  },

  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
};
</script>

<style lang="scss">
@import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
@import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
/* override grid header cells */
.custom-tooltip {
  position: absolute;
  width: 150px;
  height: 70px;
  border: 1px solid #535457;
  overflow: hidden;
  pointer-events: none;
  transition: opacity 1s;
  background-color: white;
}

.custom-tooltip.ag-tooltip-hiding {
  opacity: 0;
}

.custom-tooltip p {
  margin: 5px;
  white-space: nowrap;
}

.custom-tooltip p:first-of-type {
  font-weight: bold;
}

.ag-theme-balham {
  .ag-header-cell-text {
    text-overflow: clip !important;
    white-space: normal !important;
    line-height: 18px !important;
    padding-top: 2px;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-weight: 700;
    color: #535457;
    position: absolute;
    top: 5px;
    left: 12px;
  }

  .ag-header {
    background-color: #f4f7fb;
  }

  .ag-header-cell-label .ag-header-icon {
    position: absolute;
    top: 0;
    right: 0;
  }

  .ag-body-viewport,
  .ag-body-horizontal-scroll-viewport {
    overflow-x: hidden !important;
  }

  .ag-cell,
  .ag-row {
    text-overflow: clip;
    white-space: normal !important;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-weight: 400;
  }

  .ag-cell-label-container.ag-header-cell-sorted-none {
    height: 100%;
  }

  .ag-header-cell-label {
    align-items: start;
  }

  .ag-cell .ag-icon {
    font-weight: bold;
    font-size: 19px;
    margin-left: -4px;
  }
}

.pillBtn {
  padding-bottom: 10px;
}

.display-flex {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* grid custom component styles */
.gridReason {
  width: 380px;
  word-break: break-word;
  white-space: normal;
}
.gridBullet {
  height: 15px;
  width: 15px;
  vertical-align: middle;
  border-radius: 50%;
  display: inline-block;
}
.paperClip {
  height: 30px;
  width: 30px;
  margin-left: -4px;
}
</style>
