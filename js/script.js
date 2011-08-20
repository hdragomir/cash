/* Author: Horia Dragomir <horia@hdragomir.com>

*/

window.addEventListener('load', function(){
    //document.body.style.minHeight = screen.height + 'px';
    //setTimeout(scrollTo, 0,0, 1);
}, false);

document.addEventListener('DOMContentLoaded', function(){
    
    
    
    if(window.testmode || ! cash)
        return;
    if(/cleardata/i.test(window.location.search)){
        cash.reset().save();
    } else {
        cash.load();
    }
    
    function writeCanvas(){
        document.querySelector('h1').innerHTML = (cash.ballance+"").replace(/^(\d+)(\.\d{1,2})?.*?$/g, "$1$2");
        document.querySelector('#main').innerHTML = '';
        var months = cash.months(), month, ul;
        for(month in months){
            var monthData = months[month];
            if(! (ul && ul.id === "for" + month)){
                ul = document.createElement('ul');
                ul.id = "for" + month;
                document.querySelector('#main').appendChild(ul);
            }
            monthData.spendings &&
            monthData.spendings.forEach(function(spent){
                var li = document.createElement('li'),
                    date = cash.parseDate(spent.date);
                
                li.innerHTML = '<time datetime="' + date.toLocaleString() + '">' + date.toDateString() + '</time> <b>' + spent.amount + '</b> € <span>( ' + spent.comment + ' )</span>';
                ul.appendChild(li);
            });
        }
    }
    
    writeCanvas();
    
    var d = cash.stringifyDate(new Date());
    Array.prototype.map.call(document.querySelectorAll('header form'), function(form){
        var dateInput = form.querySelector('input[type=date]');
        dateInput && (dateInput.value = d);
        
        form.addEventListener('submit', function(ev){
            ev.preventDefault();
            if(ev.target.nodeName.toLowerCase() === 'form'){
                var form = ev.target,
                    date = form.querySelector('[type=date]').value;
                    
                cash[form.id]({
                    "amount": form.querySelector('[name=amount]').value,
                    "comment": form.querySelector('[name=comment]').value,
                    "date": date? cash.parseDate(date) : null
                }).save();
                writeCanvas();
            }
        }, false);
        
    });

    
    
}, false);























