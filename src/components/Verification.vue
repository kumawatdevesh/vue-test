<template>
  <div>
    <p>Please do not refresh page!</p>
    <p>Enter this key {{ $route.params.key }}</p>
    <ApolloMutation
      :mutation="
        (gql) => gql`
          mutation($phoneNumber: String!, $key: String!) {
            CompletePhoneVerification(phoneNumber: $phoneNumber, key: $key) {
              ok
              error
              token
            }
          }
        `
      "
      :variables="{
        key,
        phoneNumber,
      }"
      @done="onDone"
    >
      <template v-slot="{ mutate, loading, error }">
        <p v-if="error">An error occurred: {{ error }}</p>
        <p v-if="loading">Lo ading: {{ loading }}</p>
        <form action="">
          <input type="text" name="key" placeholder="enter pin" v-model="key" />
          <input type="button" value="submit" @click="mutate()" />
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
export default {
  name: "Verification",
  data() {
    return {
      key: "",
      phoneNumber: "",
    };
  },
  methods: {
    onDone(result) {
      console.log(result);
      localStorage.setItem(
        "apollo-token",
        JSON.stringify(result.data.CompletePhoneVerification.token)
      );
      this.$router.push("/");
    },
  },
  created() {
    console.log(this.$route.params);
    this.key = this.$route.params.key;
    this.phoneNumber = this.$route.params.phoneNumber;
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
}

input {
  width: 100%;
  display: block;
  padding: 8px 10px;
  margin: 2rem 0;
  outline: none;
  border: 1px solid #34495e;
}

input[type="button"] {
  padding: 10px 30px;
  cursor: pointer;
  color: #34495e;
  background-color: #41b883;
  outline: none;
  border: none;
}

input[type="button"]:hover {
  background-color: #34495e;
  color: #41b883;
}
</style>