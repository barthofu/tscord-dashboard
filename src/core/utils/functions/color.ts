export const getActivityColor = (lastInteract: any) => {

    const now = new Date()
    const diff = now.getTime() - new Date(lastInteract).getTime()

    if (diff < 24 * 60*60*1000) {
        return 'green.500' // below one day
    } else if (diff < 7 * 24*60*60*1000) {
        return 'yellow.500' // between one day and one week
    } else {
        return 'red.500' // more than one week
    }
}