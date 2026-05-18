const redisClient = require('../config/redisClient');

const get = async () => {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

const set = async (key, value, ttl = 3600) => {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
}

const del = async (...keys) => {
    await redisClient.del(...keys)
}

module.exports = { get, set, del };

