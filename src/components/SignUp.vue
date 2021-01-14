<template>
  <div>
    <ApolloMutation
      :mutation="
        (gql) => gql`
          mutation(
            $firstName: String!
            $lastName: String!
            $email: String!
            $password: String!
            $profilePhoto: String!
            $age: String!
            $phoneNumber: String!
          ) {
            EmailSignUp(
              firstName: $firstName
              lastName: $lastName
              email: $email
              password: $password
              profilePhoto: $profilePhoto
              age: $age
              phoneNumber: $phoneNumber
            ) {
              ok
              error
              token
            }
          }
        `
      "
      :variables="{
        firstName,
        lastName,
        email,
        password,
        profilePhoto,
        age,
        phoneNumber,
      }"
      @done="onDone"
    >
      <template v-slot="{ mutate, loading, error }">
        <p v-if="error">An error occurred: {{ error }}</p>
        <p v-if="loading">Loading: {{ loading }}</p>
        <form action="POST">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <input type="email" placeholder="Email" v-model="email" />
          <input type="password" placeholder="Password" v-model="password" />
          <input type="number" placeholder="Age" v-model="age" />
          <input type="text" placeholder="Phone Number" v-model="phoneNumber" />
          <input type="button" value="submit" @click="mutate()" />
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>


<script>
// import gql from "graphql-tag";
// import { useMutation } from "@vue/apollo-composable";

export default {
  // setup() {
  //   const { mutate: onSubmitHandler, onError, onDone } = useMutation(
  //     gql`
  //       mutation(
  //         $firstName: String!
  //         $lastName: String!
  //         $email: String!
  //         $password: String!
  //         $profilePhoto: String!
  //         $age: Int!
  //         $phoneNumber: String!
  //       ) {
  //         EmailSignUp(
  //           firstName: $firstName
  //           lastName: $lastName
  //           email: $email
  //           password: $password
  //           profilePhoto: $profilePhoto
  //           age: $age
  //           phoneNumber: $phoneNumber
  //         ) {
  //           ok
  //           error
  //           token
  //         }
  //       }
  //     `
  //   );
  //   onError((err) => {
  //     console.log("error", err);
  //   });

  //   return {
  //     onSubmitHandler: onSubmitHandler,
  //   };
  // },
  name: "SignUp",
  components: {},
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePhoto: "",
      age: null,
      phoneNumber: "",
    };
  },
  methods: {
    onDone(result) {
      console.log(result);
      localStorage.setItem(
        "apollo-token",
        JSON.stringify(result.data.EmailSignUp.token)
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
  padding: 2% 0;
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

input[type="button"] {
  width: 100%;
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