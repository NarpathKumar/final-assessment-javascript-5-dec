console.clear();

$(()=>{ 
    let dataFromBackened ;
    let statusArray = ['expired', 'lowstock'];
    const tableBody = $('#tableBody');
    const count = $('#count')
    


    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",(e)=>{
        window.localStorage.setItem('productPageDetails', JSON.stringify(e))
        dataFromBackened = e
        dataFromBackened.map(item=>{
            tableBody.append(createRow(item))
        })
    })

    const createRow = (item)=>{
        let row = $('<tr>')
    
        row.append($('<td>').addClass('lightGrey').text(item.id))
        row.append($('<td>').text(item.medicineName))
        row.append($('<td>').addClass('lightGrey').text(item.medicineBrand))
        row.append($('<td>').text(item.expiryDate))
        row.append($('<td>').addClass('lightGrey').text(`$${item.unitPrice}`))
        row.append($('<td>').addClass('lightGrey').text(item.stock))
    
        return row
    }

    const checkDate = (date)=>{
        console.log('ec')
        const monthArr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
        const arr = date.split('-'); arr[1] = arr[1].toLowerCase()
        monthArr.map((item,pos)=>{
            if(item == arr[1]){ arr[1] = pos+1 }
        })
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let pDate = new Date().getDate()
        if(arr[2]<year){ return false }
        else if(arr[1]<month && arr[2] == year){ return false }
        else if(arr[0]<=pDate && arr[1]<month && arr[2] == year){ return false }     
        else return true
    }

    const updLeftData = (name)=>{
        if(name == 'expired'){
            let localCount = 0;
            dataFromBackened.map(item=>{
                if(!(item.stock<100)){
                    tableBody.append(createRow(item))
                    localCount++
                }
            })
            count.text(localCount)
        }
        else {
            let localCount = 0;
            dataFromBackened.map(item=>{
                if(checkDate(item.expiryDate)){
                    tableBody.append(createRow(item))
                    localCount++
                }
            })
            count.text(localCount)
        }
    }

    const bothUncheckValue = (data)=>{
        let localCount = 0;
        data.map(item=>{
            if(item.stock >= 100 && checkDate(item.expiryDate)){
                tableBody.append(createRow(item))
                localCount++
            }
        })
        count.text(localCount)
    }

    $('input').click((e)=>{
        let event = e.target;
       
        if(event.checked == true){ 
            let localCount = 0;
            statusArray.push(event.value) 
            tableBody.get(0).innerHTML = '';
            if(statusArray.length === 2){
                dataFromBackened.map(item=>{
                    tableBody.append(createRow(item))
                    localCount++
                })
                count.text(localCount)
            }
            else if(statusArray.length == 1) updLeftData(statusArray[0])
            else {
                tableBody.get(0).innerHTML = ''; 
                bothUncheckValue(dataFromBackened)
            }
        }
        else {
            for(let i=0; i<statusArray.length; i++){ 
                if(event.value == statusArray[i]){ statusArray.splice(i,1) } 
            }
            tableBody.get(0).innerHTML = ''
            if(statusArray.length === 2){
                dataFromBackened.map(item=>{
                    tableBody.append(createRow(item))
                    localCount++
                })
                count.text(localCount)
            }
            else if(statusArray.length == 1) updLeftData(statusArray[0])
            else { 
                tableBody.get(0).innerHTML = ''; 
                bothUncheckValue(dataFromBackened)
            }
        }
    })

    $('#logout').click(()=>{
        window.location.assign('/index.html')
    })
});
























// if(statusArray.includes('expired')){
//     expireUpdate(dataFromBackened)
// }
// if(statusArray.includes('lowstock')){
//     lowstockUpdate(dataFromBackened)
// }