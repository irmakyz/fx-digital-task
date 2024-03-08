import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { GETTERS, MUTATIONS, ACTIONS } from "./constants";
import { Item, RootState } from "@/interfaces";

Vue.use(Vuex);

const apiKey = "e0ed1eadd9e6e0345cc77825f3a6e9b9";
const baseURL = "https://api.themoviedb.org/3";

export default new Vuex.Store<RootState>({
  state: {
    trendingMovies: [] as Item[],
    trendingTVShows: [] as Item[],
  },
  mutations: {
    [MUTATIONS.SET_TRENDING_MOVIES](state, movies: []) {
      state.trendingMovies = movies;
    },
    [MUTATIONS.SET_TRENDING_TV_SHOWS](state, shows: []) {
      state.trendingTVShows = shows;
    },
  },
  actions: {
    async [ACTIONS.FETCH_TRENDING_MOVIES]({ commit }) {
      try {
        const response = await axios.get(`${baseURL}/trending/movie/week`, {
          params: {
            api_key: apiKey,
          },
        });
        commit("setTrendingMovies", response.data.results);
      } catch (error) {
        // eslint-disable-next-line
        console.error("Error fetching trending movies:", error);
        throw error;
      }
    },
    async [ACTIONS.FETCH_TRENDING_TV_SHOWS]({ commit }) {
      try {
        const response = await axios.get(`${baseURL}/trending/tv/week`, {
          params: {
            api_key: apiKey,
          },
        });
        commit("setTrendingTVShows", response.data.results);
      } catch (error) {
        // eslint-disable-next-line
        console.error("Error fetching trending TV shows:", error);
        throw error;
      }
    },
  },
  getters: {
    [GETTERS.GET_TRENDING_MOVIES]: (state) => state.trendingMovies,
    [GETTERS.GET_TRENDING_TV_SHOWS]: (state) => state.trendingTVShows,
  },
});
