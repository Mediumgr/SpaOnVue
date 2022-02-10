<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list flat>
        <v-list-item-group v-model="selectedItem">
          <v-list-item
            link
            v-for="link of links"
            :key="link.title"
            :to="link.url"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link v-if="isUserLoggedIn" @click.stop="dialog = true">
            <v-list-item-icon>
              <v-icon class="material-icons">exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <app-logout-modal :openDialog.sync="dialog"></app-logout-modal>
    <v-app-bar app color="primary lighten-2" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-md-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" custom v-slot="{ navigate }">
          <span @click="navigate" role="link" class="pointer">Application</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="d-none d-md-flex">
        <v-btn text v-for="link of links" :key="link.icon" :to="link.url" tile>
          <v-icon class="material-icons">{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn text @click="dialog = true" v-if="isUserLoggedIn" tile>
          <v-icon class="material-icons">exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <v-btn @click="toggleTheme" text rounded>
          {{ this.$vuetify.theme.dark ? "Light Theme" : "Dark Theme" }}
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>
    <v-container v-if="!loading">
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-snackbar color="error" :value="true" :multi-line="true" v-if="error">
        {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn class="red darken-1" text v-bind="attrs" @click="closeError">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
    <v-container class="circular" d-flex v-else>
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <v-progress-circular
            indeterminate
            color="green"
            :size="100"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <v-footer color="primary lighten-1" app>
      <v-row align="center" justify="center" class="white--text getFullYear">
        <span class="date">{{ new Date().getFullYear() }}</span>
        <a href="https://github.com/Mediumgr" target="blank" class="github">
          <span class="myName">Ruslan Guseinov</span>
          <img src="./img/git_icon_19pcs.jpg" alt="github" class="img" />
        </a>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      snackbar: true,
      dialog: false,
      selectedItem: 1
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    closeError() {
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Orders", icon: "bookmark_border", url: "/orders" },
          { title: "New ad", icon: "note_add", url: "/new" },
          { title: "My ads", icon: "list", url: "/list" }
        ];
      }
      return [
        { title: "Login", icon: "lock", url: "/login" },
        { title: "Registration", icon: "face", url: "/registration" }
      ];
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.pointer {
    cursor: pointer;
}
.myName {
  cursor: pointer;
  color: white;
}
.circular {
  height: 600px;
}
.getFullYear {
  margin: 0 auto;
}
.date {
  position: relative;
  top: 1px;
  right: 5px;
}
.github {
  text-decoration: none;
}
.img {
  padding-left: 7px;
  position: relative;
  top: 3px;
  color: white;
}
</style>
