(function (component) {
    component.service('SocketIO', ['$rootScope', function ($rootScope) {
        var socket = io.connect();

        var internalRegistry = [];
        var socketInstance;

        socketInstance = {
            on: function (eventName, fn) {

                internalRegistry.push(eventName);

                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        fn.apply(socket, args);
                    });
                });
            },
            bindTo: function (scope) {
                scope.$on('$destroy', function () {
                    console.log('destroying: ', internalRegistry.join(', '));
                    // removeListener doesnt seem to work for some reason - see https://github.com/socketio/socket.io/issues/1445
                    internalRegistry = [];
                    socket.removeAllListeners();
                });
            }
        };

        return socketInstance;

    }]);
})(angular.module('socketio.service', []));