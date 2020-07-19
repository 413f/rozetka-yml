<template>
    <div class="offer">
        <div class="category">
            <ROfferProp
                    v-for="(prop,index) in value"
                    v-model="value[index]"
                    :key="prop.id"
                    :categories="categories"
                    :currency="currency"
                    :states="states"
                    @remove-param="removeParam(value,index,value[index])"
            ></ROfferProp>
            <v-btn @click="addParam">Add User Param</v-btn>
        </div>
    </div>
</template>

<script>

  import ROfferProp from './ROfferProp';

  export default {
    name: 'ROffer',
    components: {
      ROfferProp,
    },
    props: {
      value: {
        type: Array,
        default: function() {
          return {};
        },
      },
      categories: {
        type: Array,
        default: function() {
          return [];
        },
      },
      currency: {
        type: Array,
        default: function() {
          return [];
        },
      },
      states: {
        type: Array,
        default: function() {
          return [];
        },
      },
    },
    methods: {
      addParam: function() {
        this.$emit('add-param', this.value);
      },
      removeParam: function(value, paramIndex, prop) {
          this.$emit('remove-param', value, paramIndex, prop);
      },
    },
  };
</script>

<style scoped>
    .offer {

    }
</style>