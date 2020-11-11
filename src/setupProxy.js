const proxy = require("http-proxy-middleware");

function router_func(req) {
    let server = req.path.slice(1).split("/")[1];
    let url = "http://" + server + ":3933";
    return url;
}

function path_func(path) {
    return "/" + path.slice(1).split("/").slice(2).join("/");
}

module.exports = app => {
    app.use(
        "/agent/**",
        proxy({
            target: "http://fake.rdelfin.net:3933",
            router: router_func,
            pathRewrite: path_func,
            changeOrigin: true,
        })
    );
};
