
(function(){
    
    if(! /test/i.test(window.location.search)){
        return;
    }
    var cash = Object.create(window.cash);
    cash.reset = function(){this.spendings = []; this.ins = []; this.ballance = 0;};
    
    var is = function(assert, onfailMessage){
        if(assert)
            console.log('.');
        else
            throw onfailMessage;
    };
    
    var month = '201108';
    
    cash.ballance = 10;
    cash.spend({amount: 5});
    is(cash.ballance === 5, "Ballance not updating correctly");
    
    cash.reset();
    is(cash.ballance === 0, "Reset not working on ballance");
    
    cash.spend({amount: 5});
    cash.reset();
    is(cash.spendings.length === 0, "Reset not working on spendings");
    
    var mockSpend = cash._prepare({amount: 5});
    is(mockSpend.key === month, "Key not being calculated right");
    
    cash.spend({amount: 5, comment: "A comment"});
    is(cash.spendings[0].comment === "A comment", "Comments not being saved properly");
    
    cash.reset();
    cash.spend({amount: 10});
    is(cash.month(month) !== undefined, "Month api not working");
    
    cash.reset();
    var spent = Math.floor(Math.random() * 18),
        earned = Math.floor(Math.random() * 20);
    cash.spend({amount: spent});
    cash.add({amount: earned});
    var monthAggregate = cash.month(month);
    is( monthAggregate.spendings !== undefined
       && monthAggregate.spendings.length === 1
       && (
          monthAggregate.spendings[0].amount === spent
       )
       && cash.month(month).ins !== undefined
       && monthAggregate.ins.length === 1
       && monthAggregate.ins[0].amount === earned
       
       && monthAggregate.earned !== undefined
       && monthAggregate.earned === earned, "Month api not returning a proper object");
    
    is(monthAggregate.spendings[0].amount === spent
       && monthAggregate.spent !== undefined
       && monthAggregate.spent === spent, "Month spendings are not calculated correcly");
    
    is(monthAggregate.ins[0].amount === earned
       && monthAggregate.earned !== undefined
       && monthAggregate.earned === earned, "Month earnings are not calculated correcly");
    
    is(monthAggregate.ballance === earned - spent, "Month ballance is not correct");
    
    cash.reset();
    var month = Math.floor(Math.random() * 12) + 1;
    cash.spend({amount: 1, date: new Date('2011-' + cash.leadingZero(month) + '-01')});
    is(cash.spendings[0].key === "2011" + cash.leadingZero(month), "Date is not properly reflected in key");
    
    var months = cash.months
    is(months != undefined, "Months api not working");
    
    
}());
