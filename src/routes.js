import registerPage from "./views/registerPage";
import loginPage from "./views/loginPage";
import discussion from "./views/discussion";
import discussions from "./views/discussions";
// import addCommentComponent from "./components/addCommentComponent";

export const routes = [
  { path: "/register", component: registerPage, name: "register" },
  { path: "/", component: loginPage, name: "login" },
  {
    path: "/discussion/:id",
    component: discussion,
    name: "discussion",
    
  },
  // {
  //   path: "/addComment",
  //   component: addCommentComponent,
  //   name: "addCommentComponent",
  // },
  { path: "/discussions", component: discussions, name: "discussions" },
];
