# TSCord Dashboard

This [Next.js](https://nextjs.org/) web dashboard application will take the management of your bots created with the [TSCord bot template](https://github.com/barthofu/tscord) to another level!

## Features

- Real-time monitoring (such as logs, performances, latency, etc)
- Toggle maintenance mode directly from the UI
- Many useful statistics with beautiful graphs (such as commands usage, user/guilds evolution, users activity and so much more)
- Guilds preview and management
- Database backups control
- Multi-bot support
- Dark/white theme
- Nice-looking UI

## Configuration
Before anything else, head over to your **bot** config and enable the API server and Websocket client.

### Client
1. Copy the `client/.env.example`
2. Fill in all the information
    2bis. You can find your bot's secret in your [Discord Developer Portal](https://discord.com/developers/applications)
3. Rename the file `.env`
4. Go to the `client/src/core/config/bots.ts`
5. Fill in your bot info (here is a sample)
    ```ts
        {
            id: '943804890143133736',
            name: 'TSCord',
            iconUrl: 'https://cdn.discordapp.com/avatars/943804890143133736/c08ad02818b89d43210a232094b32215.webp',
            apiUrl: process.env['TSCORD_API_URL']!,
            apiToken: process.env['TSCORD_API_TOKEN']!,
            secret: process.env['TSCORD_SECRET']!
        }
    ```
    5bis. As you may have noticed, the bots config is an array, so you can setup multiple bots!
6. Run `npm run build` in the `client` folder
7. Then, run `npm run start`

### Websocket

In order to make the **Monitoring** dashboard page working, you must spin up the Websocket proxy server on which your bot *and* your Next.js app will connect.

1. Edit the `proxy/.env.example` at your convenance
2. Rename it `.env`
3. Put the correct websocket url to access the proxy server both in the Next.js app and TSCord bot env files
4. Go to the `proxy` folder
5. Run `npm run build`
6. Run `npm run start`
7. Now, if your bot is running in parallel, you should see in the console: `New client connected: <name_of_your_bot>`

## Todo 
- [ ] Toggle maintenance mode