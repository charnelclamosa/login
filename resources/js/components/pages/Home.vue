<template>
<v-app class="background">
        <div class="text-end mx-2 my-2">
        <v-btn color="red lighten-1" class="white--text" @click="logout()">Log out</v-btn>
    </div>
    <v-row justify="center" align="center">
        <v-card shaped class="px-5 py-5">
            <h1>Welcome, <span class="red--text">{{user.username}}</span>!</h1>
        </v-card>
    </v-row>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.user = this.$store.state.user
    },
    methods: {
        logout() {
            this.$router.push('/signin')
            this.$store.dispatch('authClear')
        }
    }
}
</script>

<style scoped>
.background {
    background: linear-gradient(45deg, #5189c1 25%, #41b883);
}
</style>
