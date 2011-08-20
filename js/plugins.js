
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

(function(window, document, undefined){

    var cash = Object.create(null),
        extend = function(to, from){
            Array.prototype.splice.call(arguments, 1, arguments.length).map(function(from){
                for(var key in from){
                    to[key] = from[key];
                }
            });
            return to;
        },
        leadingZero = function(num){return num > 0 && num < 10? "0" + num : num; };
    
    cash.ballance = 0;
    cash.spendings = [];
    cash.ins = [];

    cash.spend = function(config){
        config = this._prepare(config); 
        this.spendings.push(config);
        this._updateBallance(-config.amount);
        return this;
    };
    
    cash._updateBallance = function(delta){
        this.ballance += delta;
        return this;
    }
    
    cash.add = function(config){
        config = this._prepare(config);
        this.ins.push(config);
        this._updateBallance(config.amount);
        return this;
    };
    
    cash._prepare = function(config){
        var now = new Date();
        config = extend({date: now.getTime(), amount: 0, comment: ""}, config);
        config.key = now.getFullYear().toString() + leadingZero( now.getMonth() );
        return config;
    };
    

    window.cash = cash;

}(window, document));


(function(){
    
    if(! /test/i.test(window.location.search)){
        return;
    }
    var cash = Object.create(window.cash);
    cash.reset = function(){this.spendings = []; this.ins = []; this.ballance = 0;};
    
    var is = function(assert, onfailMessage){
        console.log(assert? '.' : onfailMessage);
    };
    
    cash.ballance = 10;
    cash.spend({amount: 5});
    is(cash.ballance === 5, "Ballance not updating correctly");
    
    cash.reset();
    is(cash.ballance === 0, "Reset not working on ballance");
    
    cash.spend({amount: 5});
    cash.reset();
    is(cash.spendings.length === 0, "Reset not working on spendings");
    
    
    
    
}());
