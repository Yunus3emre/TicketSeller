import express from "express";

import authentication from "./authentication";

import users from "./users";

import trips from "./trips";

const router = express.Router();

export default(): express.Router => {
    authentication(router);
    users(router);
    trips(router);
    return router;
};