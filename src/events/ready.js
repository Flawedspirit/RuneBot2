module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.logger.log('RuneBot started successfully', 'green');
    },
};