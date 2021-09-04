<template>
  
  <div>
  <label class="wrapper flex items-center">
    <input class="checkbox" type="checkbox" :checked="value" @click="testCheck(dataValue, $event.target.checked)"/>
    <span class="checkmark"  ></span>
    <slot></slot>
  </label> 

  </div>
 

</template>

<script>
export default {
    name: 'ReconcileCheckBox',
    props: ['value', 'dataValue'],

    watch:{
      value(){
        console.log(this.value);
      },
    },
    methods: {
      testCheck(input, eventVale) {
        console.log(input ,eventVale);
      }
    }
}
</script>

<style lang="scss">

$green: #22b573;
$grey: #555;
$transitionSpeed: 200ms;

.wrapper {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 16px;
}
/* Hide the browser's default checkbox */
.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
/* Create a custom checkbox */
.checkmark {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #005496;
  border-radius: 100%;
  top: 15px;
  left: 15px;
  transform: translate(-50%, -50%);
  transition: all ease-out $transitionSpeed;
  text-indent: 90px;
  font: normal normal 30px/60px "Helvetica";
  white-space: nowrap;
  user-select: none;

}
/* On mouse-over, add a grey background color */
.wrapper:hover input ~ .checkmark {
  background-color: #ccc;
}
/* When the checkbox is checked, add a blue background */
.wrapper input:checked ~ .checkmark {
    //background-color: #449d44;
    border: 3px solid #005496 ;
}
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
/* Show the checkmark when checked */
.wrapper input:checked ~ .checkmark:after {
  display: block;
}
/* Style the checkmark/indicator */
.wrapper .checkmark:after {
  left: 15px;
  top: -10px;
  width: 8px;
  height: 30px;
  border: solid #005496 ;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  
}
</style>