$(document).ready(function () {
    let jobId;
    //To reset the name of modal
    $("#close-modal-btn").on("click", function () {
        $("#modal-job-head").text("Create Job");
        $("#create-job-btn").val("Create");
        $(".update-btn").attr("id", "create-job-btn");
        $(".status-container").empty();
        $("#Job_title").val("");
        $("#Job_description").val("");
        $("#Job_requirment").val("");
    });
    // CREATE JOBS
    $(document).on("click", ".create-job-btn", function (event) {
        let jobTitle = $("#Job_title").val();
        let jobDescription = $("#Job_description").val();
        let jobRequirement = $("#Job_requirment").val();
        event.preventDefault();
        if (jobTitle === "" || jobDescription === "" || jobRequirement === "") {
            $.toast({
                heading: "Error",
                text: "All fields are mandatory to fill",
                showHideTransition: "slide",
                icon: "error",
            });
        } else {
            let formData = new FormData($("#CreateFrom")[0]);
            $.ajax({
                type: "POST",
                url: "/job",
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    $("#create-job").addClass("hide");
                    $.toast({
                        heading: "Success",
                        text: "Job Created Successfully",
                        showHideTransition: "slide",
                        icon: "success",
                        hideAfter: 1000,
                        afterHidden: function () {
                            $("#Job_title").val("");
                            $("#Job_description").val("");
                            $("#Job_requirment").val("");
                            location.reload();
                        },
                    });
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    });
    // GET JOBS
    function getJobs() {
        $.ajax({
            type: "GET",
            url: "/job",
            dataType: "json",
            success: function (data) {
                displayJobs(data);
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
    getJobs();
    // DISPLAY JOBS
    function displayJobs(data) {
        // console.log(data);
        let jobContainer = $(".inner-job-container");
        jobContainer.empty();
        data.Jobs.forEach(function (job) {
            jobContainer.append(`
                <div class="max-w-sm p-6 m-3 job-card bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white job-title">
                           ${job.job_title}
                        </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    ${job.Job_description}
                    </p>
                    <h6 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white job-title">
                        Requirements: -
                    </h6>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    ${job.Job_requirement}
                    </p>
                    
                    <div class="card-action pt-2">
                    
                        <button
                            type="button"
                            class="text-white bg-green-700 hover-bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 edit-btn"
                            id="edit-job-btn-${job.id}"  data-modal-target="create-job" data-modal-toggle="create-job" data-id="${job.id}"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            class="text-white bg-red-700 hover-bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dlt-btn"
                            id="dlt-job-btn-${job.id}" data-id="${job.id}" 
                        >
                            Delete
                        </button>
                    </div>
                </div>
            `);
        });
    }
    //DELETE JOBS
    $(".inner-job-container").on("click", ".dlt-btn", function () {
        jobId = $(this).data("id");
        console.log(jobId);
        $.ajax({
            type: "DELETE",
            url: `/job/${jobId}`,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function () {
                getJobs();
                $.toast({
                    heading: "Success",
                    text: "Job Deleted Successfully",
                    showHideTransition: "slide",
                    icon: "success",
                    hideAfter: 1000,
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
    //EDIT JOBS
    $(".inner-job-container").on("click", ".edit-btn", function () {
        jobId = $(this).data("id");
        // console.log(jobId);
        $("#create-job").removeClass("hidden");
        $("#create-job-btn").removeClass("create-job-btn");
        $("#create-job").addClass("flex");
        $("#create-job-btn").addClass("update");
        $("#modal-job-head").text("Edit Job");
        $("#create-job-btn").val("Update");
        $(
            ".status-container"
        ).append(`<legend class="sr-only">Countries</legend>

        <div class="flex items-center mb-4">
          <input id="active-status" type="radio" name="status" value="active" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked>
          <label for="country-option-1" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Active
          </label>
        </div>
        <div class="flex items-center ml-4 mb-4">
          <input id="inactive-status" type="radio" name="status" value="inactive" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked>
          <label for="country-option-1" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
           Inactive
          </label>
        </div>`);
        $.ajax({
            type: "GET",
            url: `/job/${jobId}`,
            success: function (data) {
                // console.log(data);
                $("#Job_title").val(data.job_title);
                $("#Job_description").val(data.Job_description);
                $("#Job_requirment").val(data.Job_requirement);
                if (data.Status === "active") {
                    $("#active-status").prop("checked", true);
                } else {
                    $("#inactive-status").prop("checked", true);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
    //Update Job
    $(document).on("click", ".update", function (event) {
        event.preventDefault();
        // console.log(jobId);
        let formData = new FormData($("#CreateFrom")[0]);
        formData.append("jobId", jobId);
        formData.forEach(function (value, key) {
            console.log(key, value);
        });
        $.ajax({
            type: "POST",
            url: "/updatejob/" + jobId,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                $("#create-job").addClass("hide");
                $.toast({
                    heading: "Success",
                    text: "Job Updated Successfully",
                    showHideTransition: "slide",
                    icon: "success",
                    hideAfter: 1000,
                    afterHidden: function () {
                        location.reload();
                    },
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
});
