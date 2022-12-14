import axios from "axios";

const API = axios.create({
  baseURL: "https://socialmemoriesmedia.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const addPost = (newPost) => API.post("/posts", newPost);
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const editPost = (id, data) => API.patch(`/posts/${id}`, data);
export const removePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post(`/user/signIn`, formData);
export const signUp = (formData) => API.post(`/user/signUp`, formData);
