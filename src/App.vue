<template>
  <div id="app">  
    <div :class="containerClass" @click="onWrapperClick" v-if="!$route.meta.allowAnonymous">
      <LayoutTopBar @menu-toggle="onMenuToggle" 
        :localeMode="localMode" :layoutMode="layoutMode" :layoutColorMode="layoutColorMode" 
        @locale-change="onLocalChange" @layout-change="onLayoutChange" @layout-color-change="onLayoutColorChange" />

      <transition name="layout-sidebar">
        <div :class="sidebarClass" @click="onSidebarClick" v-show="isSidebarVisible()">
          <div class="layout-logo">
            <router-link to="/">
              <h1>Home</h1>
            </router-link>
          </div>

          <LayoutMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>
      </transition>

      <div class="layout-main">
        <router-view />
      </div>

    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>


<script>
import i18n from './i18n';
import LayoutTopBar from './containers/LayoutTopbar.vue';
import LayoutMenu from './containers/LayoutMenu.vue';

export default {
  data() {
    return {
      layoutMode: "static",
      layoutColorMode: "dark",
      localMode: navigator.language,
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,      
      menu: [
        {label: 'Welcome', icon: 'pi pi-fw pi-home', to: '/'},
        {label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/Dashboard'},
        {
					label: 'Pages', icon: 'pi pi-fw pi-clone',
					items: [
						{label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/Login'},
					]
				},
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
      if (event.item.isSinglePage===true){
        this.isSinglePage = true
      } else {
        this.isSinglePage = false
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    onLayoutColorChange(layoutColorMode) {
      this.layoutColorMode = layoutColorMode;
    },
    onLocalChange(localMode) {
      this.localMode = localMode;
      i18n.locale = localMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth > 1024;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
        else return true;
      } else {
        return true;
      }
    },
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$appState.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.ripple === false,
        },
      ];
    },
    sidebarClass() {
      return [
        "layout-sidebar",
        {
          "layout-sidebar-dark": this.layoutColorMode === "dark",
          "layout-sidebar-light": this.layoutColorMode === "light",
        },
      ];
    },
    logo() {
      return this.layoutColorMode === "dark"
        ? "assets/layout/images/logo-white.svg"
        : "assets/layout/images/logo.svg";
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    'LayoutTopBar' : LayoutTopBar,
    'LayoutMenu' : LayoutMenu,
  },
};
</script>