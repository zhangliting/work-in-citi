app.service('sessionService', ['$window', sessionService1]);

function sessionService1($window) {
    this.save = save;
    function save(key, value) {
        $window.sessionStorage.setItem(key, value);
    }
    
    this.get = get;
    function get(key) {
        return $window.sessionStorage.getItem(key);
    }
    
    this.clear = clear;
    function clear() {
        $window.sessionStorage.clear();
    }
    
    return this;
}
