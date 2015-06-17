module.exports = {

    schedule: function (methodDefinition, methodArguments, interval) {
        setInterval(function () {
            methodDefinition.apply(this, methodArguments);
        }, interval);
    }

};