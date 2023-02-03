<template>
  <div
    class="bg-white z-10 border-black border-2 rounded-xl left-8 lg:left-16 top-2 flex flex-col w-3/4 items-center"
  >
    <div class="text-lg text-white font-semibold rounded-full bg-red mt-2">
      <p class="mx-5">Warning</p>
    </div>
    <p class="m-2">
      Are you sure you want to delete this item? This operation is permanent and
      you will not be able to undo this action!
    </p>
    <div class="flex flex-row space-x-6 mb-2 font-semibold">
      <button class="rounded-full bg-green px-2 text-white" @click="removeTodo">
        Yes
      </button>
      <button
        class="rounded-full bg-red px-2 text-white"
        @click="showPopUp = false"
      >
        No
      </button>
    </div>
  </div>
</template>
