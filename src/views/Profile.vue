<template>
	<div>
		<v-btn class="ma-2" outlined color="indigo" @click="goToHeroesListPage">Back</v-btn>
		<v-container grid-list-md text-xs-center >
			<v-layout align-center justify-center column fill-height>
				<v-flex class="align-item">
					<v-card justify="center" align="center" max-width="800" v-if="!loading">
						<v-img :src="heroImage" height="400px"></v-img>
						<v-card-subtitle>
							{{hero.connections.relatives}}
						</v-card-subtitle>
						<v-card-subtitle>
							{{hero.work.occupation}}
						</v-card-subtitle>
						<v-radar
							:stats="hero.powerstats"
							:radar="radar"
							:polycolor="polycolor"
							:scale="scale">
						</v-radar>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
import Radar from '../../node_modules/v-radar/Radar.vue';

export default {
    data: () => ({
        hero: {},
		heroImage: '',
		relatives: '',
		radar: {}, //required for chart
		scale: { 
			intelligence: 100, 
			strength: 100, 
			speed: 100,
			power: 100,
			durability: 100,
			combat: 100
        },
		color: 'rgba(200, 0, 0, .5)',
		polycolor: '#7307D3',
		loading: true, 
    }),
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.axios.get(`https://www.superheroapi.com/api.php/10215798085691994/${this.$route.params.id}`).then((response) => {
                this.hero = response.data;
				this.heroImage = response.data.image.url;
				this.loading = false;
            });
		},
		goToHeroesListPage() {
			this.$router.push({name: 'heroes'});
		}
	},
	components: {
      vRadar: Radar
    },
}
</script>

<style lang="scss">
.align-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>