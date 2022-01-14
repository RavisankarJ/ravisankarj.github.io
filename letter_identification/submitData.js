const scriptURL = 'https://script.google.com/macros/s/AKfycbyIJkCRWQjfIJuh8dELZDbpxsWyoCz5sJICL9_7dYSLNCcNp3PDnxe6mZYdcbwDzhkv/exec';
// const scriptURL = 'https://script.google.com/macros/s/AKfycbzd0plwIQXhnKlVY3p2hcwaSNn0End6XebwpGdPbps/dev'
function uploadAns() {
    var uploadAnsBtn = document.querySelector('#uploadAns');
    uploadAnsBtn.innerHTML="Uploading...";
    var formData = new FormData();
    var dt = new Date();
    var formatedDate = dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear();

    var i =0;
    answers.forEach((answer) => {
        formData.append(i++, formatedDate);    
        formData.append(i++, answer[0]);
        formData.append(i++, answer[1]);
        formData.append(i++, answer[2]);
        formData.append(i++, answer[3]);
        formData.append(i++, answer[4]);
        formData.append(i++, answer[5]);
        // console.log(formData);
    });
    formData.append('rows', i);
    // var formData = new FormData();
    // formData.append('answers', answers);
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(
            function(response) {
                console.log('Success!', response);
                uploadAnsBtn.innerHTML = "Uploaded";
                uploadAnsBtn.setAttribute("disabled", "disabled");
            }
        )
        .catch(
            function(error){
                 console.error('Error!', error.message);
                 uploadAnsBtn.innerHTML = "Try again..";
            });
}