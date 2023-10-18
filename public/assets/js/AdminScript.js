$(document).ready(function () {
    let jobId;
    $(".JobContainer").click(function () {
        $(".job-main-container").removeClass("hide");
        $(".applied-job-main-container").addClass("hide");
    });
    $(".appliedJob").click(function () {
        $(".job-main-container").addClass("hide");
        $(".applied-job-main-container").removeClass("hide");
        appliedJob();
    });
    // To open Modal
    function OpenModal() {
        $("#create-job").removeClass("hidden");
        $("#create-job").addClass("flex");
        $("#Canditate-submit-btn").addClass("hide");
    }
    //modal content
    function modalContent() {
        $(".modal-content").empty();
        $(
            ".modal-content"
        ).append(`<form class="space-y-6" id="CreateFrom" action="POST">
        <div>
            <label for="Job_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
            <input type="text" name="Job_title" id="Job_title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        <div>
            <label for="Job_description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Description</label>
            <textarea id="Job_description" name="Job_description" id="Job_description" rows="2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></textarea>
        </div>
        <div>
            <label for "Job_requirement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Requirement</label>
            <textarea id="Job_requirement" rows="2" name="Job_requirement" id="Job_requirement" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></textarea>
        </div>
        <div class="status-container"></div>
        <div class="modal-footer">
            <input type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 create-job-btn" id="create-job-btn" name="submit" value="Create">
        </div>
    </form>`);
    }
    //Create modal
    $(".view-create-modal").click(function () {
        $("modal-content").empty();
        OpenModal(2);
        modalContent();
    });
    //To reset the name of modal
    $("#close-modal-btn").on("click", function () {
        $("#modal-job-head").text("Create Job");
        $("#create-job-btn").val("Create");
        $(".update-btn").attr("id", "create-job-btn");
        $(".status-container").empty();
        $("#Job_title").val("");
        $("#Job_description").val("");
        $("#Job_requirement").val("");
    });
    // CREATE JOBS
    $("#create-job").on("click", ".create-job-btn", function (event) {
        event.preventDefault();
        let jobTitle = $("#Job_title").val();
        let jobDescription = $("#Job_description").val();
        let jobRequirement = $("#Job_requirement").val();

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
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
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
                            $("#Job_requirement").val("");
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
        modalContent();
        jobId = $(this).data("id");
        // console.log(jobId);
        OpenModal();
        $("#create-job-btn").removeClass("create-job-btn");
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
                $("#Job_requirement").val(data.Job_requirement);
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
        // formData.forEach(function (value, key) {
        //     console.log(key, value);
        // });
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
    //Get applied Jobs
    function appliedJob() {
        $.ajax({
            type: "GET",
            url: "/applied_jobs",
            dataType: "json",
            success: function (data) {
                // console.log(data);
                let jobContainer = $(".applied-job-container");
                jobContainer.empty();
                data.forEach(function (job) {
                    // console.log(job.jobs);
                    jobContainer.append(`
                    <div class="max-w-sm p-6 m-3 job-card bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white job-title">
                               ${job.jobs.job_title}
                            </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        ${job.jobs.Job_description}
                        </p>
                        <h6 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white job-title">
                            Requirements: -
                        </h6>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        ${job.jobs.Job_requirement}
                        </p>
                        
                        <div class="card-action pt-2">
                        
                            <button
                                type="button"
                                class="text-white bg-green-700 hover-bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 view-job-btn"
                                id="view-job-btn-${job.jobs.id}"  data-id="${job.jobs.id}"
                            >
                             View Canditates
                            </button>
                        </div>
                    </div>
                `);
                });
            },
            error: function (err) {
                console.log(err);
            },
        });
    }

    // View applied candidates
    $(".applied-job-main-container").on("click", ".view-job-btn", function () {
        jobId = $(this).data("id");

        $.ajax({
            type: "POST",
            url: "/getCanditates/" + jobId,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                // console.log(data);
                OpenModal();
                $("#modal-job-head").text("View Canditates");
                $(".modal-content").empty();
                $("#Canditate-submit-btn").removeClass("hide");
                data.forEach(function (job) {
                    // console.log(job.users);
                    $(".modal-content").append(`<ul class="my-4 space-y-3">
                    <li  data-id="${job.users.id}"class="flex items-center justify-between p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <span class="flex-1 ml-3 whitespace-nowrap">${job.users.name}</span>
                        <select id="application-action" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="pending">pending</option>
                            <option value="approved">approved</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </li>
                </ul>
               
                `);
                });
            },
            error: function () {
                $.toast({
                    heading: "Error",
                    text: ERROR,
                    showHideTransition: "slide",
                    icon: "error",
                });
            },
        });
    });
    //Submit Canditate Status
    $(".submit-canditate-status").click(function () {
        let candidateStatuses = [];
        $(".modal-content ul").each(function () {
            let userId = $(this).find("li").data("id");
            let status = $(this).find("#application-action").val();

            candidateStatuses.push({
                userId: userId,
                status: status,
            });
        });

        $.ajax({
            type: "POST",
            url: "/updateCandidateStatus/" + jobId,
            data: JSON.stringify(candidateStatuses),
            contentType: "application/json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function () {
                $.toast({
                    heading: "Success",
                    text: "Canditate Status Updated successfully",
                    showHideTransition: "slide",
                    icon: "success",
                    hideAfter: 1000,
                });
            },
            error: function () {
                $.toast({
                    heading: "Error",
                    text: ERROR,
                    showHideTransition: "slide",
                    icon: "error",
                });
            },
        });
    });
});
