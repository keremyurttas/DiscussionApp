import registerPage from "./components/registerPage";
import loginPage from "./components/loginPage";
import discussionContainer from "./components/discussionContainer";
import discussionsContainer from "./components/discussionsContainer"
import addCommentComponent from "./components/addCommentComponent";

export const routes = [
  { path: "/register", component: registerPage, name: "register" },
  { path: "/", component: loginPage, name: "login" },
  { path: "/discussion/:id", component: discussionContainer, name: "discussion" ,meta:{requiresAuth:true}},
  {
    path: "/addComment",
    component: addCommentComponent,
    name: "addCommentComponent",
  },
  { path: "/discussions", component: discussionsContainer, name: "discussions" },
];



