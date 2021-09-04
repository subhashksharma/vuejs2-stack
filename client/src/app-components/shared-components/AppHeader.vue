<template>
    <nav class="navbar">
      <div class="container-fluid">
         <!-- header top colored lines -->
      <div class="nav-blue"></div>
      <div class="nav-green"></div>
      <div class="nav-teal"></div>

        <ul class="nav navbar-nav" style="margin: 0px !important;">
            <li class="active" style="padding-top:18px;"><a href="javascript:;"><strong> Welcome,</strong> {{userId}}</a></li>
        </ul>

        <ul class="nav navbar-nav navbar-right" style="margin: 0px !important;">
            <li style="text-align:left"><a href="javascript:;" id="logOutBtn" title="Logout" @click="logOut()" class="closeBtn">&times;</a></li>
        </ul>
        
        <ul class="nav navbar-nav navbar-right" style="margin: 0px !important;">
            <li><a href="javascript:;"><img src="@/assets/images/freseniuskc-logo-blue.svg" style="margin-right:60px;width:145px;height:33px;"></a></li>
        </ul>

        <ul class="nav navbar-nav navbar-right" id="branding" style="margin: 0px !important;">
            <a class="navbar-brand" href="javascript:;" style="padding-right:40px;padding-top:30px;">{{appTitle}}</a>
        </ul>
      </div>
     
    </nav> 
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      userId :'TNURSE'
    }
  },

	computed: {
		
		appTitle() {
				return this.$config.appTitle;
		}
  },

  methods: {
    logOut() {
      this.$store.commit('setScreenLock', true);
      this.$store.commit('setSpinner', true);
    }
  },

  created() {
  }
}
</script>

<style>
.closeBtn {
  font-size:28px;color:#9f9f9f;cursor:pointer !important;text-decoration:none;
}
.tooltip .tooltip-arrow {
  border-bottom-color: #294c86 !important;
}
.tooltip-inner {
  background-color: #294c86 !important;
  font-size:13px !important;
  text-align:left !important;
  max-width:600px !important;
}
</style>

