<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
       <!-- CSS LINK -->
       <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/AdminStyle.css') }}">
    <!-- TOAST CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.css" integrity="sha512-8D+M+7Y6jVsEa7RD6Kv/Z7EImSpNpQllgaEIQAtqHcI0H6F4iZknRj0Nx1DCdB+TwBaS+702BGWYC0Ze2hpExQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />


</head>
<body>
@include('layouts.adminnavigation')
<div class="job-main-container" >
<div class="create-job-container">
    <div class="inner-create-job pt-5 pr-11">
    <button type="button"  data-modal-target="create-job" data-modal-toggle="create-job" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 view-create-modal">Create Job</button>
 
</div>
<div class="job-container">
    <div class="inner-job-container">
        <!-- CONTAINER FOR JOBS CARD -->
    </div>
    </div>
</div>
</div>
<div class="applied-job-main-container hide">
   <div class="applied-job-container">
    <!-- Applied Jobs -->
   </div>
</div>

<!-- FORM MODAL -->
<div id="create-job" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="  fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute  top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="create-job" id="close-modal-btn">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white" id="modal-job-head">
                Create Job
                </h3>
            </div>
            <div class="px-6 py-6 lg:px-8">
             <div class="modal-content">
             
             </div>
            </div>
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 hide" id="Canditate-submit-btn">
                <button data-modal-hide="create-job" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 submit-canditate-status">SUBMIT</button>
            </div>
        </div>
       
    </div>
</div> 





  <!-- JQUERY CDN LINK -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
     <!-- flowbite -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
     <!-- TOAST JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js" integrity="sha512-zlWWyZq71UMApAjih4WkaRpikgY9Bz1oXIW5G0fED4vk14JjGlQ1UmkGM392jEULP8jbNMiwLWdM8Z87Hu88Fw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- JAVASCRIPT/JQUERY LINK -->
        <script src="{{ asset('assets/js/AdminScript.js') }}"></script>
</body>
</html>