let id = 'here'
showData()

// Adding and Editing the data using the input field
function manageData(e) {
    e.preventDefault()
    message("")
    let name = document.getElementById ('inputBox').value
    if (!name) {
        message(`<p>Please Enter some data</p>`)
    }
    else {                      // Valid data entered in input box
        if (id == 'here') {     // Check if there is any data in the localStorage?
            let arr = getData()
            if (!arr) {         // If No, then entering the data for the first time, input value in array
                arr = [name]
            }
            arr.push(name)      // Some data is already present, hence add the new one
            setData(arr)        // Push the array with updated data back
            message(`Data Inserted Successfully`)
        }
        
        else {                  // 
            let arr = getData()
            arr[id] = name
            setData(arr)
            id = 'here'
            message(`Data Updated Successfully`)
        }
        showData()            // Show updated data in the page
        document.getElementById ('inputBox').value = '' // Empty the input box after operation
    }
}

// Output the data in the page
function showData() {
    let arr = getData()
    if (arr) {
        let html = ''
        let sno = 1             // we used predefined variable instead of iterative one (k) as it'll print additional entry
        for (let k in arr) {
            html += `
                <tr>
                <td>${sno}</td>
                <td>${arr[k]}</td>
                <td><table class="dataTable"><tr>
                    <!-- <td><a href="editData()">Edit</a></td> -->
                    <td><a href="javascript:void(0)" class="link" onclick="editData(${k})">Edit</a></td>
                    <td><a href="javascript:void(0)" class="link" onclick="deleteData(${k})">Delete</a></td>
                </table></tr></td>
                </tr>
                `
            sno++
                document.getElementById ('root').innerHTML = html
        }
    }
}

// Data editing function
function editData(rId) {
    id = rId
    let arr = getData()
    document.getElementById ('inputBox').value = arr[rId]
}

// Deleting data
function deleteData(rId) {
    let arr = getData()
    console.log(rId)
    arr.splice(rId, 1)
    setData(arr)
    showData()
    // alert ("Data deleted successfully!")
}

// Fetch Array from localStorage
function getData() {
    let arr = JSON.parse(localStorage.getItem ('crud'))
    return arr
}

// Push Array to localStorage
function setData(arr) {
    return localStorage.setItem('crud', JSON.stringify(arr))
}

// Printing messages on screen
function message (text) {
    return document.getElementById('msg').innerHTML = text
}