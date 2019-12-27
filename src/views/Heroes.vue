<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-col cols="12" sm="12">
        <v-text-field label="Search for heroes" single-line solo v-model="search" @input="getData" :disabled="loading"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <v-btn class="ma-2 lg-2 lg-offset-10" outlined color="indigo" @click="showStats = !showStats">Show Power Stats</v-btn>
        <div v-if="showStats" class="filters">
          <v-slider v-model="intelligence" :label="'Intelligence'" :thumb-color="color" thumb-label="always"></v-slider>
          <v-slider v-model="strength" :label="'Strength'" :thumb-color="color" thumb-label="always"></v-slider>
          <v-slider v-model="speed" :label="'Speed'" :thumb-color="color" thumb-label="always"></v-slider>
          <v-slider v-model="durability" :label="'Durability'" :thumb-color="color" thumb-label="always"></v-slider>
          <v-slider v-model="power" :label="'Power'" :thumb-color="color" thumb-label="always"></v-slider>
          <v-slider v-model="combat" :label="'Combat'" :thumb-color="color" thumb-label="always" ></v-slider>
        </div>
      </v-col>
      <v-layout align-center justify-center column fill-height class="align-item" v-if="loading">
          <v-flex row align-center>
              <v-progress-circular indeterminate :size="50" color="amber" class=""></v-progress-circular>
          </v-flex>
      </v-layout>
      <v-layout row wrap v-if="!loading">
        <v-flex xs12 sm6 md4 lg3  v-for="(hero, index) in filteredItems" :key="index">
        <v-card class="mx-auto" light>
            <v-img class="white--text align-end" height="400px" :src="hero.image.url">
              <v-card-title>{{hero.name}}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">{{hero.name}}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Gender: {{hero.appearance.gender}}</div>
              <div>Race: {{hero.appearance.race}}</div>
              <div>Publisher: {{hero.biography.publisher}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text @click="goToPorfile(hero.id)">Go To Profile</v-btn>
            </v-card-actions>
          </v-card>
          </v-flex>
      </v-layout>
      <h1 v-if="noHeroesToDisplay">
          No Heroes Found
      </h1>
  </v-container>
  </div>
</template>

<script>

export default {
  data: () => ({
    heroes: [],
    search: '',
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
    color: 'orange darken-3',
    showStats: false,
    noHeroesToDisplay: false,
    loading: true,
  }),
  computed: {
    filteredItems() {
      return this.heroes.filter((item) => {
          return parseInt(item.powerstats.intelligence) >= this.intelligence
            && parseInt(item.powerstats.strength) >= this.strength
            && parseInt(item.powerstats.speed) >= this.speed
            && parseInt(item.powerstats.durability) >= this.durability
            && parseInt(item.powerstats.power) >= this.power
            && parseInt(item.powerstats.combat) >= this.combat;
      })
    }
  },
  created() {
    this.getData();
  },
  methods: {
      getData() {
        let url = 'https://www.superheroapi.com/api.php/10215798085691994/search/a';
        
        if(this.search !== '') {
          url = `https://www.superheroapi.com/api.php/10215798085691994/search/${this.search}`;
        }

        this.axios.get(url).then((response) => {
            this.noHeroesCheck(response.data.results);
            
            this.heroes = response.data.results;
            this.loading = false;
        });
      },
      noHeroesCheck(heroes) {
       if(heroes.length === 0) {
            this.noHeroesToDisplay = true;

            return;
        }
      },
      goToPorfile(id) {
        this.$router.push({name: 'profile', params: {id: id}});
      }
  }
}
</script>
<style lang="scss">
.filters {
  margin-top: 20px;
  max-width: 500px;
  .v-label {
    width: 90px;
  }
}
.align-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>