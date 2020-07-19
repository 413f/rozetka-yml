<template>
    <div>
        <template
                v-if="propType === 'Number'"
        >
            <v-text-field
                    v-model="value.val"
                    :label="value.title"
                    min="1"
                    step="1"
                    :readonly="value.readonly"
                    type="number"
            ></v-text-field>
        </template>
        <template
                v-else-if="propType === 'String'"
        >
            <v-text-field
                    v-model="value.val"
                    :label="value.title"
                    :readonly="value.readonly"
                    type="text"
            ></v-text-field>
        </template>
        <template
                v-else-if="propType === 'Price'"
        >
            <v-text-field
                    v-model="value.val"
                    :label="value.title"
                    min="0"
                    step="1"
                    :readonly="value.readonly"
                    type="number"
            ></v-text-field>
        </template>
        <template
                v-else-if="propType === 'List'"
        >
            <template v-if="propKey === 'categoryId'">
                <v-autocomplete
                        v-model="value.val"
                        :items="categories"
                        item-value="id"
                        item-text="name"
                        :label="value.title"
                        :readonly="value.readonly"
                ></v-autocomplete>
            </template>
            <template v-else-if="propKey === 'currencyId'">
                <v-autocomplete
                        v-model="value.val"
                        :items="currency"
                        item-value="id"
                        item-text="id"
                        :label="value.title"
                        :readonly="value.readonly"
                ></v-autocomplete>
            </template>
            <template v-else-if="propKey === 'state'">
                <v-autocomplete
                        v-model="value.val"
                        :items="states"
                        item-value="val"
                        item-text="title"
                        :label="value.title"
                        :readonly="value.readonly"
                ></v-autocomplete>
            </template>
            <template v-else>
                <v-autocomplete
                        v-model="value.val"
                        :items="value.list"
                        item-value="val"
                        item-text="title"
                        :label="value.title"
                ></v-autocomplete>
            </template>
        </template>
        <template
                v-else-if="propType === 'Url'"
        >
            <v-text-field
                    v-model="value.val"
                    :label="value.title"
                    :readonly="value.readonly"
                    type="url"
            ></v-text-field>
        </template>
        <template
                v-else-if="propType === 'UrlPick'"
        >
            <div
                    v-for="(val,index) in value.val"
                    :key="index"
                    class="picture-link-block"
            >
                <v-text-field
                        v-model="value.val[index]"
                        :label="value.title"
                        :readonly="value.readonly"
                        type="url"
                ></v-text-field>
                <v-btn @click="rmPick(index,$event)">-</v-btn>
            </div>
            <v-btn @click="addPick">+</v-btn>
        </template>
        <template v-else-if="propType === 'Text'">
            <v-textarea
                    v-model="value.val"
                    :label="value.title"
                    :readonly="value.readonly"
            ></v-textarea>
        </template>
        <template
                v-else-if="propType === 'Checkbox'"
        >
            <v-checkbox
                    v-model="value.val"
                    :label="value.title"
                    :readonly="value.readonly"
            ></v-checkbox>
        </template>
        <template v-else-if="propType === 'prop'">
            <v-text-field
                    v-model="value.paramName"
                    label="Name"
                    :readonly="value.readonly"
                    type="text"
            ></v-text-field>
            <v-text-field
                    v-model="value.paramId"
                    label="ParamId"
                    :readonly="value.readonly"
                    type="text"
            ></v-text-field>
            <v-text-field
                    v-model="value.paramValId"
                    label="ValueId"
                    :readonly="value.readonly"
                    type="text"
            ></v-text-field>
            <v-text-field
                    v-model="value.paramText"
                    label="Param text"
                    :readonly="value.readonly"
                    type="text"
            ></v-text-field>
            <v-btn color='warning' @click="removeParam">Remove param</v-btn>
        </template>
        <template v-else>
            {{value}}
        </template>
    </div>
</template>

<script>
  export default {
    name: 'ROfferProp',
    props: {
      value: {
        type: Object,
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
    computed: {
      propKey: function() {
        return this.value.key;
      },
      propType: function() {
        return this.value.type;
      },
    },
    methods: {
      addPick: function() {
        const cloned = this._.clone(this.value);
        cloned.val.push('');
        this.$emit('input', cloned);
      },
      rmPick: function(rmIndex) {
        const nVal = this.value.val.filter((item, itemIndex) => {
          return itemIndex !== rmIndex;
        });
        const cloned = this._.clone(this.value);
        cloned.val = nVal;
        this.$emit('input', cloned);
      },
      removeParam: function() {
        this.$emit('remove-param', this.value);
      },
    },
  };
</script>

<style scoped>
    .picture-link-block {
        display: flex;
    }
</style>