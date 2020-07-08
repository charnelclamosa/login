<template>
<v-app class="background">
    <v-row justify="center" align="center">
        <v-card width="500">
            <v-card-title>
                <card-header title="sign up"></card-header>
            </v-card-title>
            <v-container>
                <v-form class="mx-12 mt-12">
                    <v-text-field dense label="Username" v-model="user.username" @keyup.enter="validateUsername()"></v-text-field>
                    <v-text-field dense label="Password" v-model="user.password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" @keyup.enter="validateUsername()"></v-text-field>
                    <v-text-field dense label="Confirm password" v-model="confirmPassword" :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'" :type="showConfirm ? 'text' : 'password'" @click:append="showConfirm = !showConfirm" @keyup.enter="validateUsername()"></v-text-field>
                    <v-row justify="end" class="mt-5">
                        <v-btn text x-small class="my-auto" to="/signin">I already have an account</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn small color="success" @click="validateUsername()">Sign up</v-btn>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>

    </v-row>
</v-app>
</template>

<script>
import axios from 'axios'
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
            user: {},
            confirmPassword: '',
            showPassword: false,
            showConfirm: false,
        }
    },
    methods: {
        validateUsername() {
            let username = this.user.username
            axios.post('api/validateUsername', {
                    username
                })
                .then(res => {
                    if (res.data[0] == null) {
                        this.signup()
                    } else {
                        this.$toast.error('Username is already used!', 'Error', this.notificationSystem.options.error)
                    }
                })
        },
        signup() {
            let username = this.user.username
            let password = this.user.password
            let confirmPassword = this.confirmPassword
            if (username == '' || username == null) {
                this.$toast.error('Input username!', 'Error', this.notificationSystem.options.error)
            } else if (password == '' || password == null) {
                this.$toast.error('Input password!', 'Error', this.notificationSystem.options.error)
            } else if (password != confirmPassword) {
                this.$toast.error('Password do not match!', 'Error', this.notificationSystem.options.error)
            } else {
                let username = this.user.username
                let password = this.user.password
                axios.post('api/signup', {
                    username,
                    password
                }).then(res => {
                    this.$toast.success('Registration successful!', 'Success', this.notificationSystem.options.success)
                    this.clearUser()
                    this.clearPassword()
                    this.$router.push('/signin')
                })
            }
        },
        clearUser() {
            this.user = []
        },
        clearPassword() {
            this.confirmPassword = ''
        }
    }
}
</script>

<style scoped>
.background {
    background-color: ghostwhite;
}
</style>
