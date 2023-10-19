$(document).ready(function () {
    let userId = $("body").data("user-id");
    let jobId;
    $(".JobContainer").click(function () {
        $(".job-container").removeClass("hide");
        $(".applied-job-main-container").addClass("hide");
    });
    $(".appliedJob").click(function () {
        $(".job-container").addClass("hide");
        $(".applied-job-main-container").removeClass("hide");
        appliedJobs();
    });
    function loadJobs() {
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

    function displayJobs(data) {
        // console.log(data);
        let jobContainer = $(".inner-job-container");
        jobContainer.empty();
        data.Jobs.forEach(function (job) {
            if (job.Status === "active") {
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
                    class="text-white apply-job-btn w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    id="apply-job-btn-${job.id}" data-id="${job.id}"
                >
                            Apply
                        </button>
                    </div>
                </div>
            `);
            }
        });
    }

    loadJobs();
    $(".inner-job-container").on("click", ".apply-job-btn", function () {
        jobId = $(this).data("id");
        $.ajax({
            type: "POST",
            url: "/applyjob",
            data: { userId, jobId },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function () {
                $.toast({
                    heading: "Success",
                    text: "Job applied successfully",
                    showHideTransition: "slide",
                    icon: "success",
                    hideAfter: 1000,
                });
            },
            error: function (error) {
                $.toast({
                    heading: "Error",
                    text: error.responseJSON.message,
                    showHideTransition: "slide",
                    icon: "error",
                });
            },
        });
    });
    function appliedJobs() {
        $.ajax({
            type: "GET",
            url: "/appliedjobs/" + userId,
            dataType: "json",
            success: function (data) {
                console.log(data);
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
                                class="text-white bg-green-700 hover-bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full ${job.status}"
                            >
                             ${job.status}
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
});
