/* Author: Horia Dragomir <horia@hdragomir.com>

*/

document.addEventListener('DOMContentLoaded', function(){
    
    if(! cash)
        return;
    
    cash.ballance = 500;
    
    cash.spend({amount: 10, comment: "Lunch at YamYam"});
    
    document.querySelector('h1').innerHTML = cash.ballance;
    
    
    
}, false);























