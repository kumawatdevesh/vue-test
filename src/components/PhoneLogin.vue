<template>
  <div>
    <p>The code will be sent to my phone because it is in test mode</p>
    <p>Code will be available on next screen</p>
    <ApolloMutation
      :mutation="
        (gql) =>
          gql`
            mutation($phoneNumber: String!) {
              StartPhoneVerification(phoneNumber: $phoneNumber) {
                ok
                error
              }
            }
          `
      "
      :variables="{
        phoneNumber,
      }"
      @done="onDone"
    >
      <template v-slot="{ mutate, loading, error }">
        <p v-if="error">An error occurred: {{ error }}</p>
        <p v-if="loading">Loading: {{ loading }}</p>
        <p v-if="codeSent">Code sent on phone number!</p>
        <form action="">
          <input type="text" v-model="phoneNumber" placeholder="enter number" />
          <input type="button" value="submit" @click="mutate()" />
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
export default {
  name: "PhoneLogin",
  data() {
    return {
      phoneNumber: "",
      codeSent: false,
    };
  },
  methods: {
    onDone(result) {
      this.codeSent = true;
      this.$router.push({
        name: "verify",
        params: {
          key: result.data.StartPhoneVerification.ok,
          phoneNumber: this.phoneNumber,
        },
      });
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