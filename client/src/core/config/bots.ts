export const botsConfig: BotsConfig = [
    {
        name: 'TSCord',
        id: '943804890143133736',
        apiUrl: process.env['TSCORD_API_URL']!,
        secret: process.env['TSCORD_SECRET']!
    }
]

// utilities functions

export const getSanitizedBotsConfig = () => {

    return botsConfig.map(botConfig => ({
        name: botConfig.name,
        id: botConfig.id
    }))
}