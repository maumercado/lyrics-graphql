import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";

// one can insert globals here.
global.configureMockStore = configureMockStore;

configure({ adapter: new Adapter() });
