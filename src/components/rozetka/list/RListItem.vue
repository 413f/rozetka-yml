<template>
    <v-list-item-content @click="itemClick">
        <v-list-item-title v-text="title"></v-list-item-title>
    </v-list-item-content>
</template>

<script>
  export default {
    name: 'RListItem',
    props: {
      item: {
        default: function() {
          return {};
        },
      },
      itemKey: {
        default: 'id',
      },
      itemName: {
        default: 'name',
      },
    },
    computed: {
      title: function(){
        if(this._.isString(this.itemName)){
          return this._.get(this.item,this.itemName,'Empty');
        }
        if(this._.isFunction(this.itemName)){
          const name = this.itemName(this.item);
          return name ? name : 'Empty';
        }
        return 'None';
      }
    },
    methods: {
      itemClick: function(e) {
        this.$emit('click',e);
      }
    }
  };
</script>

<style scoped>

</style>