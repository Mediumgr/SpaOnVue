<template>
<div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer" temporary
        app
      > <!-- temporary - затемнение фона при клике -->
        <v-list dense>
          <v-list-item link v-for="link of links" :key="link.title" :to="link.url">
            <v-list-item-action>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{link.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        color="cyan lighten-1"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none d-lg-flex"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title class="d-none d-md-flex">
          <v-btn color="cyan lighten-1" v-for="link of links" :key="link.icon" :to="link.url" :tile=true>
            <span class="material-icons">{{link.icon}}</span>
            <pre> </pre>{{link.title}}
        </v-btn>
        </v-toolbar-title>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-footer
        color="indigo"
        app
      >
        <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </v-app>
</div>
</template>

<script>

export default {
  data () {
    return {
      drawer: false,
      source: '',
      links: [
        { title: 'Login', icon: 'lock', url: '/login' },
        { title: 'Registration', icon: 'face', url: '/registration' },
        { title: 'Orders', icon: 'bookmark_border', url: '/orders' },
        { title: 'New ad', icon: 'note_add', url: '/new' },
        { title: 'My ads', icon: 'list', url: '/list' }
      ]
    }
  }
}
</script>
