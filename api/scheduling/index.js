var ScheduleService = require('./service/'),
    QueueService = require('../queue/service/'),
    JenkinsService = require('../jenkins/service/');

module.exports = {

    start: function (socketio) {

        ScheduleService.schedule(QueueService.process, ['pending-job', null, JenkinsService.fetchAndPopulateJobRun], 25 * 1000);
        ScheduleService.schedule(QueueService.process, ['new-job', socketio, socketio.emit], 15 * 1000);
        ScheduleService.schedule(QueueService.process, ['job-updated', socketio, socketio.emit], 15 * 1000);

    }

};
