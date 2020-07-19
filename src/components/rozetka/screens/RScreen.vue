<template>
    <div class="screen">
        <div class="main-block">
            <slot></slot>
        </div>
        <div class="list-block">
            <slot name="list"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'RScreen',
    props: {
    },
    data: function() {
      return {
      };
    }
  };
</script>

<style scoped>
    .screen {
        margin: 30px;
        display: flex;
        justify-content: space-between;
    }
    .list-block {
        width: 28%;
    }
    .main-block {
        width: 70%;
        max-height: 55vh;
        overflow: auto;
    }
    .main-block > * {
        max-width: 95%;
    }
</style>