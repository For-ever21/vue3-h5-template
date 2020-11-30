import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

// 注： vue-template-compiler@2.6.12 不支持vue3.0 故走不了 vue 单元测试
const factory = (values = {}) => {
  return shallowMount(App, {
    data () {
      return {
        ...values
      }
    }
  })
}

describe("App.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(App, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});