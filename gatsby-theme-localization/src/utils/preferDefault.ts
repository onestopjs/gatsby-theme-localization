type SomeModule = { default: any } | any;

const preferDefault = (m: SomeModule) => (m && m.default) || m;

export default preferDefault;
