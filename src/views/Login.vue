<template>
    <div class="login">
        <h3>Sign in</h3>
        <input type="text" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="password">
        <button @click="login">Connection</button>    
        <p>You don't have account? You can <router-link :to="{name: 'signUp'}">create one</router-link></p>
    </div>
</template>
<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data: () => ({
        email: '',
        password: '',
        userToken: ''
    }),
    methods: {
        login () {
            let vm = this;

            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                function(user) {
                   if(user) {
                       vm.$toaster.success('Successfully signed In');
                       vm.goToHeroesPage(user);
                   }
                },
                function(err) {
                    vm.$toaster.error(err.message);
                }
            )
            
        },
        goToHeroesPage(user) {
            if(user) {
                 this.$router.push({name: 'heroes'});
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
        margin: 10px 0;
        width: 300px;
        padding: 15px;
        border-radius: 3px;
        border: 1px solid grey;
    }
    button {
        margin-top: 20px;
        width: auto;
        height: 35px;
        padding: 5px;
        border-radius: 3px;
        border: 1px solid grey;
        background-color: white;;
        color: brown;
        cursor: pointer;
        &:hover {
            background-color: brown;
            color: white;
        }
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>