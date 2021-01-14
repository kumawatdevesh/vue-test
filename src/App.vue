<template>
  <div id="app">
    <div v-if="token" class="header">
      <router-link to="/">Home</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/login" @click.native="logout">logout</router-link>
      <router-link to="/verify" @click.native="logout"></router-link>
    </div>
    <div v-else-if="!token" class="header">
      <router-link to="/signup">SignUp</router-link>
      <router-link to="/login">Login</router-link>
    </div>
    <router-view class="routes" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      token: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  updated() {
    this.token = JSON.parse(localStorage.getItem("apollo-token"));
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap");
* {
  padding: 0;
  margin: 0;
  font-size: 16px;
  box-sizing: border-box;
}
#app {
  height: 100%;
  font-family: "Source Sans Pro", sans-serif;
}
.header {
  background-color: #41b883;
  display: flex;
  justify-self: flex-start;
  min-height: 30px;
}
.routes {
  text-align: center;
  margin: 2% 0;
}
.header a,
.routes a {
  margin: 1% 2%;
  text-decoration: none;
  color: #34495e;
}
</style>
