import { shallowMount } from "@vue/test-utils";
import TrendingItemDetails from "@/components/TrendingItemDetails/TrendingItemDetails.vue";
import { Item } from "@/interfaces";

describe("TrendingItemDetails.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TrendingItemDetails, {
      propsData: {
        item: {
          title: "Test Title",
          overview: "Test Overview",
          release_date: "2022-01-01",
          vote_average: 8.5,
        } as Item,
        imageUrl: "test_image_url",
        isDialogOpen: false,
      },
    });
  });

  it("renders the details correctly when isDialogOpen is true", async () => {
    await wrapper.setProps({ isDialogOpen: true });
    await wrapper.vm.$nextTick();
    console.log(wrapper.html());

    expect(wrapper.vm.dialog).toBe(true);
    expect(wrapper.find("v-card-title-stub").text()).toBe("Test Title");
    expect(wrapper.find("v-card-subtitle-stub").exists()).toBe(true);
    expect(wrapper.findAll("v-card-subtitle-stub").at(0).text()).toContain(
      "Released on 2022-01-01"
    );
    expect(wrapper.findAll("v-card-subtitle-stub").at(1).text()).toContain(
      "Vote Average: 8.5"
    );
    expect(wrapper.findAll("v-card-subtitle-stub").at(2).text()).toContain(
      "Test Overview"
    );
  });

  it("emits close-details event when closeDialog is called", () => {
    const emitSpy = jest.spyOn(wrapper.vm, "$emit");

    wrapper.vm.closeDialog();

    expect(emitSpy).toHaveBeenCalledWith("close-details");
  });
});
