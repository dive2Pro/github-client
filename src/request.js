import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:9999/api",
});

/**
 * 每次请求前 添加 authHeaders
 *
 * @type {axios.Axios.request|*}
 */
const originRequest = axios.Axios.prototype.request;
axios.Axios.prototype.request = function(config, ...args) {
  if (typeof config === "string") {
    config = {
      url: config,
      ...args
    };
  }
  config.headers = { ...config.headers, ...authHeaders() };
  return originRequest.call(this, config)
      .then(res => res.data)
};

function authHeaders() {
  const cookie = document.cookie;
  const splitWith = "; ";
  return cookie.split(splitWith).reduce((p, str) => {
    const [k, v] = str.split("=");
    p[k] = v;
    return p;
  }, {});
  // return {
  //     'Content-Type': 'text/json'
  // }
}

export async function authenticate(code) {
  try {
    const result = await request.get("/authenticate/" + code);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}

export async function trending(params = {}) {
  return request.get(
    "/trending?" +
      Object.entries(params).reduce((p, [k, v]) => {
        p += `&${k}=${v}`;
        return p;
      }, "")
  );
}
