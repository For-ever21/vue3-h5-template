import { VuexModule, getModule, Module, Mutation, Action } from "vuex-module-decorators";
import { store } from "@/store";
export enum IDeviceEnv {
  Android = "android",
  Ios = "ios",
  wx = "wx-miniProgram",
  Weibo = "weibo",
}
const NAME = "app";
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private deviceEnv = "mobile";

  get getDeviceEnv() {
    return this.deviceEnv;
  }

  @Mutation
  commitDeviceEnv(): void {
    console.log("commitDeviceEnv");
  }

  @Action
  public async setDeviceEnvAction(): Promise<void> {
    console.log("setDeviceEnvAction");
  }
}

export const appStore = getModule<App>(App);
