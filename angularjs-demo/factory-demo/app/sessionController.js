app.controller('sessionController', ['sessionService', sessionController]);

function sessionController(sessionService, sessionFactory) {
    
    
    var ss = sessionService;
    this.getServiceSession = function () {
        this.model = {
            name: ss.get('name'),
            nickname: ss.get('nickname'),
            status: 'Retrieved by factory on ' + new Date()
        };
    }
    
    this.setServiceSession = function() {
        ss.save('name', this.model.name);
        ss.save('nickname', this.model.nickname);
        this.getServiceSession();
    }
    
    this.clearServiceSession = function() {
        ss.clear();
        this.getServiceSession();
    }
    
    
}