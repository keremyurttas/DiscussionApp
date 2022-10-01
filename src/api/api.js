import axios from "axios";

// getalldisc
// getonedisc
// sendcomment

// `https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions/${key}.json`
// "https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions.json"

const axiosClient = axios.create({
  baseURL: "https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions",
});

// axiosClient.interceptors.response.use(response => response, error => {
//   if (error?.response?.status === 401) {
//     store.dispatch('auth/signOut')
//   }
//   return Promise.reject(error)
// })

export async function api(params) {
  try {
    const { data } = await axiosClient[params.method](
      params.URL,
      params.body || null
    );
    return [null, data];
  } catch (error) {
    return [error];
  }
}
