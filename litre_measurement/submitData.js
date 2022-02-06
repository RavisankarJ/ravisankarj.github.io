const scriptURL = 'https://script.google.com/macros/s/AKfycbzcVaTfmGO1j221Cbok02L_ephNzZ0Ga3mLCLS5ihLm365iPSRTXKllFQtyjPHg_OSs/exec'

function uploadAns() {
    var uploadAnsBtn = document.querySelector('#uploadAns');
    uploadAnsBtn.innerHTML = "Uploading...";
    var formData = new FormData();
    var dt = new Date();
    var formatedDate = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

    var i = 0;
    answers.forEach((answer) => {
        formData.append(i++, formatedDate);
        formData.append(i++, schoolid);
        formData.append(i++, stuid);
        formData.append(i++, answer[0].target);
        formData.append(i++, answer[0].maxMov);
        formData.append(i++, answer[0].exactMove);
        formData.append(i++, answer[0].question);
        if (answer.length > 1) {
            formData.append(i++, answer[1]);
            formData.append(i++, answer[2]);
            formData.append(i++, answer[3]);
        }else i+=3;
        // console.log(formData);
    });
    formData.append('rows', i);
    // var formData = new FormData();
    // formData.append('answers', answers);
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(
            function (response) {
                console.log('Success!', response);
                uploadAnsBtn.innerHTML = "Uploaded";
                uploadAnsBtn.setAttribute("disabled", "disabled");
            }
        )
        .catch(
            function (error) {
                console.error('Error!', error.message);
                uploadAnsBtn.innerHTML = "Try again..";
            });
}