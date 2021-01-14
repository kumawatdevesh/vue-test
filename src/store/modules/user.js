import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const state = {
    user: {
        get: {
            loading: false,
            reset: false,
            success: {
                ok: false,
                data: null,
            },
            failure: {
                error: false,
                message: '',
            },
        }
    }
}

const getters = {
    user: (state) => state.user
}

const actions = {
    async getUser({ commit }) {
        try {
            const typeDefsUser = gql`
            query {
                GetMyProfile {
                  ok
                  error
                  user {
                    firstName
                    lastName
                  }
                }
            }
        `
            const result = await useQuery(typeDefsUser)
            console.log(result)
            // commit('setUser', result)
        } catch (e) {
            commit('setUser', e.message)
        }
    }
}

const mutations = {
    setUser: (state, data) => console.log('second', data)
}

export default {
    state,
    getters,
    actions,
    mutations
}