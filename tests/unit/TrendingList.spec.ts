import { shallowMount, createLocalVue } from "@vue/test-utils";
import TrendingList from "@/components/TrendingList/TrendingList.vue";
import { Item } from "@/interfaces";
import Vue, { VueConstructor } from "vue";

const localVue: VueConstructor<Vue> = createLocalVue();

interface TrendingListProps {
  title: string;
  listItems: Item[];
  activeItemId: number;
  isKeyEntered: boolean;
}

describe("TrendingList.vue", () => {
  let wrapper;

  beforeEach(() => {
    const propsData: TrendingListProps = {
      title: "Test Title",
      listItems: [
        {
          id: 1,
          title: "Movie 1",
          backdrop_path: "/path/to/image1.jpg",
          poster_path: "/path/to/image1.jpg",
        } as Item,
        {
          id: 2,
          title: "Movie 2",
          backdrop_path: "/path/to/image2.jpg",
          poster_path: "/path/to/image2.jpg",
        } as Item,
      ],
      activeItemId: 1,
      isKeyEntered: false,
    };

    wrapper = shallowMount(TrendingList, {
      localVue,
      propsData,
    });
  });

  it("renders list items correctly", () => {
    expect(wrapper.find(".trending-list__title").text()).toBe("Test Title");
    expect(wrapper.findAll(".trending-list-item")).toHaveLength(2);

    const listItems = wrapper.props("listItems");
    listItems.forEach((item: Item) => {
      const listItem = wrapper.find(`[data-id="${item.id}"]`);
      expect(listItem.exists()).toBe(true);
      expect(listItem.find(".item-image").attributes("src")).toBe(
        `https://image.tmdb.org/t/p/w500${item.poster_path}`
      );
      expect(listItem.find(".item-image v-card-title-stub").text()).toBe(
        item.title
      );
    });

    const activeItem = wrapper.find(".trending-list-item--selected");
    expect(activeItem.exists()).toBe(true);
    expect(activeItem.attributes("tabindex")).toBe("0");
  });

  it("emits show-details event on item click", () => {
    const showDetailsSpy = jest.spyOn(wrapper.vm, "showDetails");
    wrapper.find(".trending-list-item").trigger("click");
    expect(showDetailsSpy).toHaveBeenCalledWith(wrapper.props("listItems")[0]);
  });

  it("scrolls into view when activeItemId changes", async () => {
    const scrollIntoViewSpy = jest.fn();
    (wrapper.vm.$refs[2][0].$el as HTMLElement).scrollIntoView =
      scrollIntoViewSpy;
    await wrapper.setProps({ activeItemId: 2 });
    await wrapper.vm.$nextTick();
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });

  it("clicks the active item element when isKeyEntered is true", async () => {
    const clickSpy = jest.fn();
    (wrapper.vm.$refs[1][0].$el as HTMLElement).click = clickSpy;
    wrapper.setProps({ isKeyEntered: true });
    await wrapper.vm.$nextTick();
    expect(clickSpy).toHaveBeenCalled();
  });
});
