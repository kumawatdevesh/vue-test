<template>
  <div class="">
    <ApolloMutation
      :mutation="
        (gql) => gql`
          mutation($email: String!, $password: String!) {
            EmailSignin(email: $email, password: $password) {
              ok
              error
              token
            }
          }
        `
      "
      :variables="{
        email,
        password,
      }"
      @done="onDone"
    >
      <template v-slot="{ mutate, loading, error }">
        <p v-if="error">An error occurred: {{ error }}</p>
        <p v-if="loading">Lo ading: {{ loading }}</p>
        <form action="">
          <input
            label="Email"
            type="email"
            placeholder="Email"
            name="email"
            v-model="email"
          />
          <input
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            v-model="password"
          />
          <button type="button" @click="mutate()">Submit</button>
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  computed: mapGetters(["user"]),
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onDone(result) {
      localStorage.setItem(
        "apollo-token",
        JSON.stringify(result.data.EmailSignin.token)
      );
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
form {
  max-width: 500px;
  min-width: 400px;
  width: 50%;
  margin: 0 auto;
  padding: 5% 0;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 8px 10px;
  margin: 2rem 0;
  outline: none;
  border: 1px solid #34495e;
}

button {
  width: 100%;
  padding: 10px 30px;
  cursor: pointer;
  color: #34495e;
  background-color: #41b883;
  outline: none;
  border: none;
}

button:hover {
  background-color: #34495e;
  color: #41b883;
}
</style>
