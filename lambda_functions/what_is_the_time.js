module.exports.handler = async (event, context) => {
    const unixTime = Math.floor(Date.now() / 1000);
    console.log(event)
    console.log(context)
    return {
        statusCode: 200,
        body: unixTime,
    };
};