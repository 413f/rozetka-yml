<template>
    <div class="category">
        <v-text-field
                v-model="value.id"
                label="ID"
                :readonly="!value.isNew"
        ></v-text-field>
        <v-text-field
                v-model="value.name"
                label="Name"
        ></v-text-field>
        <v-text-field
                v-model="value.rz_id"
                label="ID of category from site"
        ></v-text-field>
    </div>
</template>

<script>
  export default {
    name: 'RCategory',
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
    .category {

    }
</style>