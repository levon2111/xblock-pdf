/* Javascript for pdfXBlock. */
function pdfXBlockInitView(runtime, element) {
    let credentials = getData();
    let block_id = $(element).attr("data-usage-id");
    let course_id = $(element).attr("data-course-id");
    setTimeout(function () {
        markPdfCompleted({credentials: credentials, block_id: block_id, course_id: course_id});
    }, 3000);

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
    if (data.credentials.username && data.credentials.LMS_ROOT_URL && data.block_id && data.course_id) {
        let batchData = {
            username: data.credentials.username,
            course_key: data.course_id,
            blocks: {}
        };
        batchData.blocks[data.block_id] = 1.0;
        $.ajax({
            url: data.credentials.LMS_ROOT_URL + '/api/completion/v1/completion-batch',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(batchData),
            success: function (res) {
            },
        });
    }
}