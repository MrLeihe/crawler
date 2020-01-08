const schedule = require('node-schedule')

function startTimer() {
    const timer = schedule.scheduleJob(`*/20 * *`, () => {
        console.log('is today')
        timer.cancel()
    })
    console.log('timer', timer)
}

startTimer()

