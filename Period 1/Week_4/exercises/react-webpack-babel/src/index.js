const getUserModule = () =>
  import(/* webpackChunkName: "usersAPI" */ "./common/usersAPI");

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  getUserModule().then(({ getUsers }) => {
    getUsers().then(json => console.log(json));
  });
});