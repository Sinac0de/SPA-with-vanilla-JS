//1.what to show to user based on the route

//show content based on the route that user is on
function router(params) {
    const routes = [
        { path: "/", view: () => console.log("dashboard page") },
        { path: "products", view: () => console.log("products page") },
        { path: "contanct-us", view: () => console.log("contanct-us page") },
    ];

    const potentialRoutes = routes.map(item => {
        return {
            route: item,
            isMatch: location.pathname === item.path //returns true if the item.path is the current page path
        };
    });

    //find the isMatch == true object
    const match = potentialRoutes.find((route) => route.isMatch);
    console.log(match.route.view());

    //if page not found (like when user puts something randomly in the url)
    if (!match) {
        match = {
            route: { path: "/not-found", view: () => console.log("not-found page") },
            isMatch: true
        };
    }
}

//check the route when the page is loaded
document.addEventListener("DOMContentLoaded", () => router());