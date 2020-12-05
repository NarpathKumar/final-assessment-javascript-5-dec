console.clear();

$(()=>{ 
    let dataFromBackened ;
    const tableBody = $('#tableBody');
    const count = $('#count')
    let statusArray = ['new', 'packed', 'intransit', 'delivered']


    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",(e)=>{
        window.localStorage.setItem('orderPageDetails', JSON.stringify(e))
        dataFromBackened = e
        dataFromBackened.map(item=>{
            const newRow = createRow(item)
            tableBody.append(newRow)
        })
        count.text(dataFromBackened.length)
    })
    
    const createRow = (item)=>{
        let row = $('<tr>')

        row.append($('<td>').addClass('lightGrey').text(item.id))
        row.append($('<td>').text(item.customerName))
        row.append($('<td>').text(item.orderDate).append($('<p>').addClass('lightGrey timePara').text(item.orderTime)))
        row.append($('<td>').addClass('lightGrey').text(`$${item.amount}`))
        row.append($('<td>').text(item.orderStatus))

        return row
    }

    $('input').click((e)=>{
        let event = e.target;
        
        if(event.checked == true){ 
            let localCount = 0;
            statusArray.push(event.value) 
            tableBody.get(0).innerHTML = ''
            dataFromBackened.map(item=>{
                if(statusArray.includes(item.orderStatus.toLowerCase())){
                    tableBody.append(createRow(item))
                    localCount++
                }
            })
            count.text(localCount)
        }
        else {
            let localCount = 0;
            for(let i=0; i<statusArray.length; i++){ 
                if(event.value == statusArray[i]){ statusArray.splice(i,1) } 
            }
            tableBody.get(0).innerHTML = ''
            dataFromBackened.map(item=>{
                if(statusArray.includes(item.orderStatus.toLowerCase())){
                    tableBody.append(createRow(item))
                    localCount++
                }
            })
            count.text(localCount)
        }
    })

    $('#logout').click(()=>{
        window.location.assign('/index.html')
    })


    console.log(tableBody.get(0))
});

