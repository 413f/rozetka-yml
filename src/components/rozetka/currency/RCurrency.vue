<template>
    <div class="currency">
        <v-text-field
                v-model="value.id"
                label="ID"
                :readonly="!value.isNew"
        ></v-text-field>
        <v-text-field
                v-model="value.rate"
                label="Rate"
        ></v-text-field>
    </div>
</template>

<script>
  export default {
    name: 'RCurrency',
    props: {
      value: {
        type: Object,
        default: function() {
          return {};
        },
      }
    },
  };
</script>

<style scoped>

</style>