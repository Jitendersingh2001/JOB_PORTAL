$(document).ready(function () {
    // CREATE JOBS
    $("#create-job-btn").click(function (event) {
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
        console.log(data);
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
                            class="text-white bg-green-700 hover-bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            id="edit-job-btn"  data-modal-target="create-job" data-modal-toggle="create-job" data-id="${job.id}"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            class="text-white bg-red-700 hover-bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            id="dlt-job-btn"  data-id="${job.id}" 
                        >
                            Delete
                        </button>
                    </div>
                </div>
            `);
        });
    }
    //DELETE JOBS
    $(".inner-job-container").on("click", "#dlt-job-btn", function () {
        const jobId = $(this).data("id");
        // console.log(jobId);
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
                    afterHidden: function () {},
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
    //EDIT JOBS
    $(".inner-job-container").on("click", "#edit-job-btn", function () {
        const jobId = $(this).data("id");
        console.log(jobId);
    });
});
