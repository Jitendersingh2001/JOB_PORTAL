<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
       <!-- CSS LINK -->
       <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style.css') }}">
  

</head>
<body>
@include('layouts.adminnavigation') 
<div class="job-main-container" id="JobContainer">
<div class="create-job-container">
    <div class="inner-create-job pt-5 pr-11">
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="create-job-btn">Create Job</button>
 
</div>
<div class="job-container">
    <div class="inner-job-container">

    <div class="max-w-sm p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white job-title">HR Manger</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">The HR Manager is responsible for overseeing all aspects of human resources, talent acquisition, and employee relations within the organization. This role plays a vital part in shaping company culture and ensuring a productive and motivated workforce.</p>
    <h6 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white job-title">Requirements: -</h6>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Talent Acquisition,Employee Relations,Training and Development</p>
    <div class="card-action pt-2">
    <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" id="edit-job-btn">Edit</button>
    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" id="dlt-job-btn">Delete</button>
    </div>
  
    </div>
    </div>
</div>
</div>
<div class="applied-job-main-container" id="appliedJob">
</div>
  <!-- JQUERY CDN LINK -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
        <!-- JAVASCRIPT/JQUERY LINK -->
        <script src="{{ asset('assets/js/script.js') }}"></script>
</body>
</html>