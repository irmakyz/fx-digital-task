import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import { VueConstructor } from "vue";
import HomePage from "@/components/HomePage/HomePage.vue";
import TrendingList from "@/components/TrendingList/TrendingList.vue";
import { ACTIONS } from "@/store/constants";
import Vuetify from "vuetify";
import { Item, RootState } from "@/interfaces";

const localVue: VueConstructor<Vue> = createLocalVue();
localVue.use(Vuex);

jest.mock("axios");

describe("HomePage.vue", () => {
  const actions = {
    [ACTIONS.FETCH_TRENDING_MOVIES]: jest.fn(),
    [ACTIONS.FETCH_TRENDING_TV_SHOWS]: jest.fn(),
  };
  const store: Store<RootState> = new Vuex.Store({
    state: {
      trendingMovies: [
        {
          id: 1,
          title: "Movie 1",
          overview: "Test Overview",
          release_date: "2022-01-01",
          vote_average: 8.5,
        },
        {
          id: 2,
          title: "Movie 2",
          overview: "Test Overview",
          release_date: "2022-01-01",
          vote_average: 8.5,
        },
      ] as Item[],
      trendingTVShows: [
        {
          id: 1,
          name: "Show 1",
          overview: "Test Overview",
          release_date: "2022-01-01",
          vote_average: 8.5,
        },
        {
          id: 2,
          name: "Show 2",
          overview: "Test Overview",
          release_date: "2022-01-01",
          vote_average: 8.5,
        },
      ] as Item[],
    },
    actions,
  });

  it("renders TrendingList with correct props", () => {
    const wrapper = shallowMount(HomePage, {
      localVue,
      store,
      stubs: {
        TrendingList: true,
        TrendingItemDetails: true,
      },
    });

    const trendingListComponent = wrapper.findComponent(TrendingList);

    expect(trendingListComponent.props("listItems")).toEqual(
      store.state.trendingMovies
    );
  });

  it("calls fetchTrendingMovies and fetchTrendingTVShows on beforeMount", async () => {
    shallowMount(HomePage, {
      localVue,
      store,
      stubs: {
        TrendingList: true,
        TrendingItemDetails: true,
      },
    });

    expect(actions[ACTIONS.FETCH_TRENDING_MOVIES]).toHaveBeenCalled();
    expect(actions[ACTIONS.FETCH_TRENDING_TV_SHOWS]).toHaveBeenCalled();
  });

  it("filters movies and TV shows based on search query", async () => {
    const trendingMovies = [
      {
        id: 1,
        title: "Movie 1",
        overview: "Test Overview",
        release_date: "2022-01-01",
        vote_average: 8.5,
      },
      {
        id: 2,
        title: "Movie 2",
        overview: "Test Overview",
        release_date: "2022-01-01",
        vote_average: 8.5,
      },
    ];

    const trendingTVShows = [
      {
        id: 1,
        name: "Show 1",
        overview: "Test Overview",
        release_date: "2022-01-01",
        vote_average: 8.5,
      },
      {
        id: 2,
        name: "Show 2",
        overview: "Test Overview",
        release_date: "2022-01-01",
        vote_average: 8.5,
      },
    ];

    const wrapper = shallowMount(HomePage, {
      localVue,
      store,
      vuetify: new Vuetify(),
      stubs: {
        TrendingList: true,
        TrendingItemDetails: true,
        "v-toolbar": true,
      },
    });

    expect((wrapper.vm as any).trendingMovies).toEqual(trendingMovies);
    expect((wrapper.vm as any).trendingTVShows).toEqual(trendingTVShows);

    wrapper.setData({ searchQuery: "Movie 1" });

    expect((wrapper.vm as any).filteredTrendingMovies).toEqual([
      {
        id: 1,
        title: "Movie 1",
        overview: "Test Overview",
        release_date: "2022-01-01",
        vote_average: 8.5,
      },
    ]);
    expect((wrapper.vm as any).filteredTrendingTVShows).toEqual([]);
  });

  it("handles keyboard events correctly", async () => {
    const wrapper = shallowMount(HomePage, {
      localVue,
      store,
      vuetify: new Vuetify(),
      stubs: {
        TrendingList: true,
        TrendingItemDetails: true,
        "v-toolbar": true,
      },
    });

    await wrapper.trigger("keydown.enter");
    expect((wrapper.vm as any).isKeyEntered).toBe(true);

    await wrapper.trigger("keydown.right");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).activeItemId).toBe(110);
    expect((wrapper.vm as any).isKeyEntered).toBe(false);

    await wrapper.trigger("keydown.right");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).activeItemId).toBe(120);
    expect((wrapper.vm as any).isKeyEntered).toBe(false);

    await wrapper.trigger("keydown.left");
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).activeItemId).toBe(110);
    expect((wrapper.vm as any).isKeyEntered).toBe(false);
  });
});
