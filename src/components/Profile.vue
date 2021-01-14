<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="!loading">{{ data }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  methods: {},
  created() {},
  data() {
    return {
      data: [],
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const result = await axios({
        method: "POST",
        headers: {
          authorization: `token ${JSON.parse(
            localStorage.getItem("apollo-token")
          )}`,
        },
        url: "http://localhost:4000/graphql",
        data: {
          query: `
            {
              GetMyProfile {
                ok
                error
                user {
                  firstName
                  lastName
                  phoneNumber
                  age
                }
              }
            }
          `,
        },
      });
      this.data = await result.data.data.GetMyProfile.user;
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
</style>