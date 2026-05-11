// component.js
module.exports = {
    parameters: {
        CityParam: {
            in: "query",
            name: "city",
            schema: { type: "string" },
            example: "Mohali",
        },
        PageParam: {
            in: "query",
            name: "page",
            schema: { type: "integer" },
            example: 1,
        }
    }
};