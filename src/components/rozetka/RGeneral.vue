<template>
    <div>
        <v-text-field
                v-model="value.name"
                label="Name"
                type="text"
        ></v-text-field>
        <v-text-field
                v-model="value.company"
                label="Company"
                type="text"
        ></v-text-field>
        <v-text-field
                v-model="value.url"
                label="Url"
                type="url"
        ></v-text-field>
        <v-text-field
                v-model="value.platform"
                label="Platform"
                type="text"
        ></v-text-field>
    </div>
</template>

<script>
  export default {
    name: 'RGeneral',
    props: {
      value: {
        type: Object,
        default: function() {
          return {};
        },
      },
    },
  };
</script>

<style scoped>

</style>