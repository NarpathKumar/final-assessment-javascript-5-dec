console.clear();

$(()=>{ 
    let dataFromBackened ;
    const tableBody = $('#tableBody')
    const search = $("#search");
    const reset = $('#reset')

    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",(e)=>{
        window.localStorage.setItem('productPageDetails', JSON.stringify(e))
        dataFromBackened = e
        dataFromBackened.map(item=>{
            const newRow = createRow(item)
            tableBody.append(newRow)
        })
        console.log(dataFromBackened)
    })

    const createRow = (item)=>{
        let row = $('<tr>')
    
        row.append($('<td>').addClass('lightGrey').text(item.id))
        row.append($('<td>').append($('<img>').attr({src: item.profilePic})))
        row.append($('<td>').addClass('lightGrey').text(item.fullName))
        row.append($('<td>').text(item.dob))
        row.append($('<td>').addClass('lightGrey').text(item.gender))
        row.append($('<td>').addClass('lightGrey').text(`${item.currentCity}, ${item.currentCountry}`))
    
        return row
    }
    
    search.on({
        input: function(e){
                tableBody.get(0).innerHTML = ""
                let input = e.target.value.toLowerCase()
                dataFromBackened.map(item=>{
                    let name = item.fullName.toLowerCase();
                    if(name.includes(input)){
                    tableBody.append(createRow(item))
                    }
                })
        }
    })

    reset.click(()=>{
        search.get(0).value = ''
        tableBody.get(0).innerHTML = ""
        dataFromBackened.map(item=>{
            const newRow = createRow(item)
            tableBody.append(newRow)
        })
    })


    $('#logout').click(()=>{
        window.location.assign('/index.html')
    })
});

