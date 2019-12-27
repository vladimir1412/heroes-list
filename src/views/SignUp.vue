<template>
    <div class="signUp">
        <p>Let's create a new account!</p>
        <input type="text" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="password">
        <button @click="signUp">Sign Up</button>    
        <span>or go back to <router-link :to="{name: 'login'}">login</router-link></span>
    </div>
</template>
<script>
import firebase from 'firebase';

export default {
    name: 'signUp',
    data: () => ({
        email: '',
        password: '',
    }),
    methods: {
        signUp() {
            let vm = this;

            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function(user) {
                     if(user) {
                       vm.$toaster.success('Successfully registered');

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
.signUp {
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
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }
}
</style>