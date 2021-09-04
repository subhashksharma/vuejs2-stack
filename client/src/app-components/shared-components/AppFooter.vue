<template>
  <footer>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12 text-center" style="padding:15px;"> 
          <p>Version: {{getVersion}}</p>
          <p>Copyright &copy; {{getYear}}, Fresenius Kidney Care, All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    userName: String
  },
  computed: {
    getYear() {
      let d = new Date();
      return d.getFullYear();
    },

    getVersion() {
      return VER;
    }
  }
}
</script>

