/* Author: Horia Dragomir <horia@hdragomir.com>

*/

document.addEventListener('DOMContentLoaded', function(){
    
    if(window.testmode || ! cash)
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
        monthData.spendings.forEach(function(spent){
            var li = document.createElement('li'),
                date = new Date(spent.date);
            
            li.innerHTML = ' <time datetime="' + date.toLocaleString() + '">' + date.toDateString() + '</time> <b>' + spent.amount + '</b> € <span>( ' + spent.comment + ' )</span>';
            ul.appendChild(li);
        });
    }
    
    
}, false);























