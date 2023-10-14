$(document).ready(function () {
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
        console.log(data);
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
                            class="text-white w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            id="apply-job-btn" data-id="${job.id}"
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
});
