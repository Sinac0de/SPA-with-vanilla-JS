//1.what to show to user based on the route


/*----------------
     FUNCTIONS 
 ----------------*/
//show content based on the route that user is on
function router(params) {
    const routes = [
        { path: "/", view: () => console.log("dashboard page") },
        { path: "/products", view: () => console.log("products page") },
        { path: "/contanct-us", view: () => console.log("contanct-us page") },
    ];

    const potentialRoutes = routes.map(item => {
        return {
            route: item,
            isMatch: location.pathname === item.path //returns true if the item.path is the current page path
        };
    });

    //find the isMatch == true object
    let match = potentialRoutes.find((route) => route.isMatch == true);
    console.log(match.route.view());

    //if page not found (like when user puts something randomly in the url)
    if (!match) {
        match = {
            route: { path: "/not-found", view: () => console.log("not-found page") },
            isMatch: true
        };
    }
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
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();//prevent refreshing the page
            navigateTo(e.target.href);
        }
    });
    router();
});

//call router function everytime the history changes
window.addEventListener("popstate", router);