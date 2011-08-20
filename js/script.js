/* Author: Horia Dragomir <horia@hdragomir.com>

*/

document.addEventListener('DOMContentLoaded', function(){
    
    if(! cash)
        return;
    
    cash.ballance = 500;
    cash.spend({amount: 10, comment: "Lunch at YamYam"});
    document.querySelector('h1').innerHTML = cash.ballance;
    var months = cash.months(), month, ul;
    for(month in months){
        var monthData = months[month];
        if(! (ul && ul.id === "for" + month)){
            ul = document.createElement('ul');
            ul.id = "for" + month;
            document.querySelector('#main').appendChild(ul);
        }
        
    }
    
    
}, false);























