//1.what to show to user based on the route\

import Dashboard from "/client/pages/Dashboard.js";
import Products from "/client/pages/Products.js";
import Posts from "/client/pages/Posts.js";
import NotFound from "/client/pages/NotFound.js";

const navBtns = document.querySelectorAll(".nav__link");

/*----------------
     FUNCTIONS 
 ----------------*/
//show content based on the route that user is on
function router(params) {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/products", view: Products },
        { path: "/posts", view: Posts },
    ];

    const potentialRoutes = routes.map(item => {
        return {
            route: item,
            isMatch: location.pathname === item.path //returns true if the item.path is the current page path
        };
    });

    //find the isMatch == true object
    let match = potentialRoutes.find((route) => route.isMatch == true);

    //if page not found (like when user puts something randomly in the url)
    if (!match) {
        match = {
            route: { path: "/not-found", view: NotFound },
            isMatch: true
        };
    }

    document.querySelector("#app").innerHTML = match.route.view();

}

//change url to new address
function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}


/*--------------------- 
     Event Listeners
 ---------------------*/


//check the route when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    navBtns.forEach(navBtn => {
        navBtn.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo(e.target.href || e.target.parentElement.href || e.target.parentElement.parentElement.href);
        });
    })
    router();
});

//call router function everytime the history changes
window.addEventListener("popstate", router);