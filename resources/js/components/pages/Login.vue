<template>
<v-app class="background">
    <v-row justify="center" align="center">
        <v-card width="500">
            <v-card-title>
                <card-header title="sign in"></card-header>
            </v-card-title>
            <v-container>
                <v-form class="mx-12 mt-8">
                    <v-text-field label="Username" v-model="user.username" @keyup.enter="login()"></v-text-field>
                    <v-text-field dense label="Password" v-model="user.password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" @keyup.enter="login()"></v-text-field>
                    <v-row justify="end">
                        <v-btn text x-small class="my-auto" to="/signup">Don't have an account?</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn small color="primary" @click="login()">Sign in</v-btn>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-row>
</v-app>
</template>

<script>
import Axios from 'axios';
export default {
    data() {
        return {
            notificationSystem: {
                options: {
                    success: {
                        position: 'bottomRight'
                    },
                    error: {
                        position: 'bottomRight'
                    }
                }
            },
            user: {
                username: '',
                password: ''
            },
            showPassword: false
        }
    },
    created() {
        this.user = this.$store.state.user
    },
    computed: {
        todo() {
            return this.$store.getters.getUser;
        },
    },
    methods: {
        login() {
            let username = this.user.username
            let password = this.user.password
            if (username == '' || username == null) {
                this.$toast.error('Input username!', 'Error', this.notificationSystem.options.error)
            } else if (password == '' || password == null) {
                this.$toast.error('Input password!', 'Error', this.notificationSystem.options.error)
            } else {
                axios.post('api/signin', {
                        username,
                        password
                    })
                    .then(res => {
                        if (res.data != '') {
                            // console.log(res.data[0])
                            this.$store.dispatch('authSuccess', res.data[0])
                            this.$toast.success('Log in successful!', 'Success', this.notificationSystem.options.success)
                            this.$router.push('/home')

                        } else {
                            this.$toast.error('Username or password is incorrect!', 'Error', this.notificationSystem.options.error)
                        }
                    })
            }
        }
    }
}
</script>

<style scoped>
.background {
    background-color: ghostwhite;
}
</style>
