/* Author: Horia Dragomir <horia@hdragomir.com>

*/

document.addEventListener('DOMContentLoaded', function(){
    
    if(window.testmode || ! cash)
        return;
    cash.load();
    
    document.querySelector('h1').innerHTML = cash.ballance;
    function writeCanvas(){
        document.querySelector('#main').innerHTML = '';
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
                
                li.innerHTML = '<time datetime="' + date.toLocaleString() + '">' + date.toDateString() + '</time> <b>' + spent.amount + '</b> € <span>( ' + spent.comment + ' )</span>';
                ul.appendChild(li);
            });
        }
    }
    
    writeCanvas();
    
    var spendForm = document.querySelector('#spend');
    spendForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        
        
        var date = spendForm.querySelector('#spenddate').value,
        
            spendMessage = {
                amount: spendForm.querySelector('#spendamount').value,
                comment: spendForm.querySelector('#spendcomment').value,
                date: date? new Date(date) : null
            };
        
        cash.spend(spendMessage).save();
        writeCanvas();
        
    }, false);

    var d = new Date();
    spendForm.querySelector('[type=date]').value = d.getFullYear() + '-' + cash.leadingZero(d.getMonth()+1) + '-' + d.getDate();
    
    
}, false);























