/* Javascript for pdfXBlock. */
function pdfXBlockInitView(runtime, element) {
    alert(888)
    let credentials = getData();
    let block_id = $(element).attr("data-usage-id");
    let course_id = $(element).attr("data-course-id");
    markPdfCompleted({credentials:credentials, block_id: block_id, course_id: course_id});

    console.log(credentials)
    console.log(element)
    console.log(block_id)
    console.log(course_id)
    /* Weird behaviour :
     * In the LMS, element is the DOM container.
     * In the CMS, element is the jQuery object associated*
     * So here I make sure element is the jQuery object */
    if (element.innerHTML) {
        element = $(element);
    }

    $(function () {
        element.find('.pdf-download-button').on('click', function () {
            var handlerUrl = runtime.handlerUrl(element, 'on_download');
            $.post(handlerUrl, '{}');
        });
    });
}

function markPdfCompleted(data) {



    let batchData = {
                    username: data.credentials.username,
                    course_key: data.course_id,
                    blocks: {}
                };
                batchData.blocks[data.block_id] = 1.0;
                console.log(batchData)
                $.ajax({
                    url: data.credentials.LMS_ROOT_URL+'/api/completion/v1/completion-batch',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(batchData),
                    success: function (res) {
                        console.log(res);
                    },


                });


        //
        // $.post(data.credentials.LMS_ROOT_URL+'/oauth2/access_token/',
        // {
        //     client_id: data.credentials.client_id,
        //     client_secret: data.credentials.client_secret,
        //     grant_type: "client_credentials",
        //     token_type: "jwt",
        // },
        // function (response, status) {
        //     if(response.access_token) {
        //         let batchData = {
        //             username: data.credentials.username,
        //             course_key: data.course_id,
        //             blocks: {}
        //         };
        //         batchData.blocks[data.block_id] = 1.0;
        //         console.log(batchData)
        //         $.ajax({
        //             url: data.credentials.LMS_ROOT_URL+'/api/completion/v1/completion-batch',
        //             type: 'POST',
        //             dataType: 'json',
        //             contentType: 'application/json',
        //             data: JSON.stringify(batchData),
        //             success: function (res) {
        //                 console.log(res);
        //             },
        //
        //
        //         });
                // data.credentials.LMS_ROOT_URL+'/api/completion/v1/completion-batch', batchData, function (res, status_code) {
                //     console.log(res)
                //     console.log(status_code)
                // });
            // }
            // console.log(response);
            // alert("Data: " + response + "\nStatus: " + status);
        // });
}