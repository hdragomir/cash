
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
        var now = config.date instanceof Date ? config.date : new Date();
        config = extend({date: now.getTime(), amount: 0, comment: ""}, config);
        config.key = now.getFullYear().toString() + leadingZero( now.getMonth() + 1 );
        return config;
    };
    
    cash.month = function(key){
        var month = {
            spendings: this.spendings.filter(function(spent){
                return spent.key === key;
            }),
            ins: this.ins.filter(function(earned){
                return earned.key === key;
            })
        };
        month.spent = month.spendings.reduce(function(prev, spent){
            return prev + spent.amount;
        }, 0);
        month.earned = month.ins.reduce(function(prev, earned){
            return prev + earned.amount;
        }, 0);
        month.ballance = month.earned - month.spent;
        return month;
    };
    
    cash.months = function(){
        var reducingFunction = function(prev, cur){
                if( ! prev[cur.key]){
                    prev[cur.key] = [cur];
                } else {
                    prev[cur.key].push(cur);
                }
                return prev;
            },
            spending = this.spendings.reduce(reducingFunction, {}),
            earnings = this.ins.reduce(reducingFunction, {}),
            combined = {};
        Object.keys(spending).forEach(function(month){
            combined[month] = {"spendings": spending[month]};
        });
        Object.keys(earnings).forEach(function(month){
            combined[month]||(combined[month] = {});
            combined[month].earnings = earnings[month];
            
        });
        return combined;
    };
    
    cash.toString = function(){
        return "Cash";
    };
    
    cash.save = function(){
        this.saveKey = this.saveKey || 'cash_data';
        
        localStorage[this.saveKey] = JSON.stringify({ballance: this.ballance,
                                                    spendings: this.spendings,
                                                    ins: this.ins});
        return this;
    };
    
    cash.load = function(){
        return this;  
    };
    
    cash.leadingZero = leadingZero;
    
    

    window.cash = cash;

}(window, document));

