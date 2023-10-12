<x-app-layout>
    @if($role == ADMIN)
        @include('admin') 
    @else
        @include('user') 
    @endif
</x-app-layout>