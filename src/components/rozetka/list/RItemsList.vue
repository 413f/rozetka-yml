<template>
    <div>
        <div class="btm-add">
            <v-btn @click="add">Add</v-btn>
        </div>
        <div class="search-field">
            <v-text-field
                    v-model="search"
                    label="Search"
                    clearable
            ></v-text-field>
        </div>
        <div class="items-list">
            <v-virtual-scroll
                    :items="filteredItems"
                    :height="listHeight"
                    item-height="48"
            >
                <template v-slot="{ index, item }">
                    <v-list-item
                            :key="index"
                            :dense="dense"
                            :class="[{'selected': item === selectedItem}]"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="iconRemove" @click="remove(item)"></v-icon>
                        </v-list-item-icon>
                        <RListItem
                                class="item-info"
                                :item="item"
                                :item-key="itemKey"
                                :item-name="itemName"
                                @click="itemClick(item)"
                        >
                        </RListItem>
                    </v-list-item>
                </template>
            </v-virtual-scroll>
        </div>
    </div>
</template>

<script>

  import RListItem from './RListItem';

  export default {
    name: 'ROffersList',
    components: {
      RListItem,
    },
    props: {
      items: {
        type: Array,
        default: function() {
          return [];
        },
      },
      itemName: {
        default: 'name',
      },
      itemKey: {
        default: 'id',
      },
      selectedItem: {
        default: null,
      }
    },
    data: function() {
      return {
        dense: true,
        search: '',
        iconRemove: 'mdi-bookmark-remove',
        listHeight: this.calcListHeight(),
      };
    },
    computed: {
      filteredItems: function() {
        const search = (this.search ? this.search : '').toLowerCase();
        return this.items.filter((item) => {
          const name = this.getItemTitle(item).toLowerCase();
          const index = name.indexOf(search);
          return index !== -1;
        });
      },
    },
    methods: {
      getItemTitle: function(item) {
        if (this._.isString(this.itemName)) {
          return this._.get(item, this.itemName, 'Empty');
        }
        if (this._.isFunction(this.itemName)) {
          const name = this.itemName(item);
          return name ? name : 'Empty';
        }
        return 'None';
      },
      itemClick: function(item) {
        this.$emit('select', item);
      },
      add: function() {
        this.$emit('add');
      },
      remove: function(item) {
        this.$emit('remove', item);
      },

      calcListHeight: function() {
        return window.innerHeight / 100 * 45;
      },
      onWindowResize: function() {
        this.listHeight = this.calcListHeight();
      }
    },
    created: function() {
      window.addEventListener('resize', this.onWindowResize);
    },
    destroyed: function() {
      window.removeEventListener('resize', this.onWindowResize)
    }
  };
</script>

<style scoped>
    .item-info {
        cursor: pointer;
    }
    .theme--light.selected {
        background-color: #dedede;
    }
    .theme--dark.selected {
        background-color: #393939;
    }
    .search-field {

    }
</style>