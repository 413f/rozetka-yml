<template>
    <div class="ryml">
        <div>
            <v-tabs
                    :value="tabIndex"
                    centered
                    @change="changeTab"
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab
                        v-for="item in lists"
                        :key="item.id"
                >
                    {{ item.title }}
                </v-tab>
            </v-tabs>
        </div>
        <div>
            <RScreen>
                <template v-slot:list>
                    <component
                            :is="componentListName"
                            v-bind="componentListParams"
                            v-on="componentListEvents"
                    ></component>
                </template>
                <template v-slot:default>
                    <component
                            :is="componentMainName"
                            v-bind="componentMainParams"
                            v-on="componentMainEvents"
                    >

                    </component>
                </template>
            </RScreen>
        </div>
        <div class="import-export">
            <div class="import-block">
                <v-file-input
                        dense
                        class="file-select"
                        label="Select yml"
                        :accept="fileFormat"
                        @change="fileSelect"
                ></v-file-input>
                <!--div>
                    <v-text-field
                            v-model="ymlUrl"
                            label="File link"
                            prepend-icon="mdi-web"
                    ></v-text-field>
                    <v-btn @click="pathIntroduced">Get from link</v-btn>
                </div-->
            </div>
            <div class="export-block">
                <v-btn dense color="success" @click="createXml">Create XML</v-btn>
            </div>
        </div>
        <v-switch
                flat
                :label="themeLabel"
                v-model="isDarkTheme"
        ></v-switch>
    </div>
</template>

<script>
  import xmlbuilder from 'xmlbuilder';

  import RScreen from './screens/RScreen';
  import RItemsList from './list/RItemsList';
  import RCategory from './categories/RCategory';
  import ROffer from './offers/ROffer';
  import RCurrency from './currency/RCurrency';
  import RGeneral from './RGeneral';
  import moment from 'moment';
  import download from 'downloadjs';

  export default {
    name: 'RozetkaYml',
    components: {
      RScreen,
      RItemsList,
      RCategory,
      ROffer,
      RCurrency,
      RGeneral,
    },
    data: function() {
      const lists = [
        {
          id: 'general',
          title: 'General',
        },
        {
          id: 'categories',
          title: 'Categories',
        },
        {
          id: 'offers',
          title: 'Offers',
        },
        {
          id: 'currency',
          title: 'Currency',
        },
      ];
      const selectedList = lists[0];
      return {
        tabIndex: 0,
        selectedList: selectedList,
        lists: lists,

        selectedCategory: {},
        categories: [],

        selectedOffer: {},
        offers: [],

        selectedCurrency: {},
        currencies: [
          {
            id: 'UAH',
            rate: 1,
          },
          {
            id: 'USD',
            rate: 24.50,
          },
          {
            id: 'EUR',
            rate: 28.50,
          },
          {
            id: 'RUR',
            rate: 0.31,
          },
        ],

        general: {
          name: 'Yellow Unicorn',
          company: 'ООО "Моя оборна"',
          url: 'google.com',
          platform: 'Bitrix',
        },

        states: [
          {
            val: 'new',
            title: 'New',
          }, {
            val: 'used',
            title: 'Used',
          }, {
            val: 'refurbished',
            title: 'Refurbished',
          },
        ],

        componentListName: null,
        componentListParams: {},
        componentListEvents: {},

        componentMainName: null,
        componentMainParams: {},
        componentMainEvents: {},

        ymlUrl: '',

        fileFormat: 'application/xml',
        fileName: 'rozetkaYml.txt',
      };
    },
    computed: {
      isDarkTheme: {
        get: function() {
          return !!this.$vuetify.theme.dark;
        },
        set: function(val) {
          this.$vuetify.theme.isDark = !!val;
        },
      },
      themeLabel: function() {
        if (this.$vuetify.theme.dark) {
          return 'Light theme';
        }
        return 'Dark theme';
      },
    },
    methods: {
      changeTab: function(index) {
        const selectedList = this.lists[index];
        if (!selectedList) {
          return;
        }
        this.selectedList = selectedList;
        this.updateList();
      },
      updateList: function(item) {
        if (!item) {
          item = this.selectedList;
        }
        const id = this._.get(item, 'id', null);
        if (id === null) {
          return;
        }

        let componentListName = null;
        let componentListParams = {};
        let componentListEvents = {};

        let componentMainName = null;
        let componentMainParams = {};
        let componentMainEvents = {};

        switch (id) {
          case 'categories':
            componentListName = 'RItemsList';
            componentMainName = 'RCategory';

            componentListParams.items = this.categories;
            componentListParams.itemName = 'name';
            componentListParams.itemKey = 'id';
            componentListParams.selectedItem = this.selectedCategory;

            componentListEvents['add'] = this.addCategory;
            componentListEvents['select'] = this.selectCategory;
            componentListEvents['remove'] = this.removeCategory;

            componentMainParams.value = this.selectedCategory;
            break;
          case 'offers':
            componentListName = 'RItemsList';
            componentMainName = 'ROffer';

            componentListParams.items = this.offers;
            componentListParams.itemName = (item) => {
              const found = item.find((obj) => {
                return obj.key === 'name';
              });
              return this._.get(found, 'val', '');
            };
            componentListParams.itemKey = (item) => {
              const found = item.find((obj) => {
                return obj.key === 'id';
              });
              return this._.get(found, 'val', '');
            };
            componentListParams.selectedItem = this.selectedOffer;

            componentListEvents['add'] = this.addOffer;
            componentListEvents['select'] = this.selectOffer;
            componentListEvents['remove'] = this.removeOffer;

            componentMainParams.value = this.selectedOffer;
            componentMainParams.categories = this.categories;
            componentMainParams.currency = this.currencies;
            componentMainParams.states = this.states;

            componentMainEvents['add-param'] = this.addParam;
            componentMainEvents['remove-param'] = this.removeParam;
            break;
          case 'currency':
            componentListName = 'RItemsList';
            componentMainName = 'RCurrency';

            componentListEvents['add'] = this.addCurrency;
            componentListEvents['select'] = this.selectCurrency;
            componentListEvents['remove'] = this.removeCurrency;

            componentListParams.items = this.currencies;
            componentListParams.itemName = 'id';
            componentListParams.itemKey = 'id';
            componentListParams.selectedItem = this.selectedCurrency;

            componentMainParams.value = this.selectedCurrency;
            break;
          case 'general':
            componentMainName = 'RGeneral';

            componentMainParams.value = this.general;
            break;
        }
        this.componentListName = componentListName;
        this.componentListParams = componentListParams;
        this.componentListEvents = componentListEvents;

        this.componentMainName = componentMainName;
        this.componentMainParams = componentMainParams;
        this.componentMainEvents = componentMainEvents;

        this.selectedList = item;
      },

      fileSelect: function(file) {
        if (!file) {
          return;
        }
        let fr = new FileReader();
        fr.addEventListener('loadend', (res) => {
          const target = res.target;
          if (target) {
            const text = target.result;
            this.parseXml(text);
            this.fileName = file.name;
          }
        });
        fr.readAsText(file);
      },

      pathIntroduced: function() {
        const url = this.ymlUrl;
        if (!this.isValidUrl(url)) {
          return;
        }
        this.$http.get(url).then(response => {
          this.parseXml(response.body);
        }, console.log);
      },

      isValidUrl: function(string) {
        try {
          new URL(string);
        }
        catch (_) {
          return false;
        }

        return true;
      },

      parseXmlGeneral: function(shopEl) {
        const general = this.general;
        const nGeneral = {};
        for (const key in general) {
          const element = this.getChildElByTagName(shopEl, key);
          if (element) {
            nGeneral[key] = element.textContent;
          }
          else {
            nGeneral[key] = '';
          }
        }
        return nGeneral;
      },
      parseXmlCategories: function(shopEl) {
        let nCat = [];
        const xmlCategories = this.getChildElByTagName(shopEl, 'categories');
        if (xmlCategories) {
          const xmlCat = this.getChildColElByTagName(xmlCategories, 'category');
          for (let i = 0; i < xmlCat.length; i++) {
            const catEl = xmlCat.item(i);
            let template = this.getCategoryTemplate();
            template.readonly = true;
            template.id = catEl.id;
            template.name = catEl.textContent;
            const rzId = catEl.getAttribute('rz_id');
            template.rz_id = rzId ? rzId : template.rz_id;
            nCat.push(template);
          }
        }
        return nCat;
      },
      parseXmlCurrencies: function(shopEl) {
        let nCur = [];
        const xmlCurrencies = this.getChildElByTagName(shopEl, 'currencies');
        if (xmlCurrencies) {
          const xmlCur = this.getChildColElByTagName(xmlCurrencies, 'currency');
          for (let i = 0; i < xmlCur.length; i++) {
            const curEl = xmlCur.item(i);
            let template = this.getCurrencyTemplate();
            template.id = curEl.id;
            template.rate = curEl.getAttribute('rate');
            nCur.push(template);
          }
        }
        return nCur;
      },
      parseXmlOffers: function(shopEl) {
        let nOffers = [];
        const xmlOffers = this.getChildElByTagName(shopEl, 'offers');
        if (xmlOffers) {
          const xmlOffer = this.getChildColElByTagName(xmlOffers, 'offer');
          for (let i = 0; i < xmlOffer.length; i++) {
            let offerEl = xmlOffer.item(i);
            let template = this.getOfferTemplate();
            for (let j = 0; j < template.length; j++) {
              const key = template[j].key;
              if (key === 'id') {
                let atr = offerEl.getAttribute(key);
                template[j].readonly = true;
                template[j].val = atr;
              }
              else if (key === 'available') {
                template[j].val = offerEl.getAttribute(key) !== 'false';
              }
              else if (key === 'picture') {
                const xmlOfferProps = this.getChildColElByTagName(offerEl, key);
                let arVal = [];
                for (let k = 0; k < xmlOfferProps.length; k++) {
                  const xmlPropsItem = xmlOfferProps.item(k);
                  arVal.push(xmlPropsItem.textContent);
                }
                template[j].val = arVal;
              }
              else {
                const xmlOfferProp = this.getChildElByTagName(offerEl, key);
                if (xmlOfferProp) {
                  template[j].val = xmlOfferProp.textContent;
                }
              }
            }
            const xmlOfferParams = this.getChildColElByTagName(offerEl, 'param');
            for (let k = 0; k < xmlOfferParams.length; k++) {
              const xmlParam = xmlOfferParams.item(k);
              let templateParam = this.getParamTemplate();
              templateParam.paramName = xmlParam.getAttribute('name');
              templateParam.paramId = xmlParam.getAttribute('paramid');
              templateParam.paramValId = xmlParam.getAttribute('valueid');
              templateParam.paramText = xmlParam.textContent;
              template.push(templateParam);
            }

            nOffers.push(template);
          }
        }
        return nOffers;
      },

      parseXml: function(xml) {
        let oParser = new DOMParser();
        let oDOM = oParser.parseFromString(xml, this.fileFormat);
        if (oDOM.documentElement.tagName !== 'yml_catalog') {
          console.log('error while parsing');
          return;
        }
        const shopEl = this.getChildElByTagName(oDOM, 'shop');
        if (!shopEl) {
          return;
        }

        this.general = this.parseXmlGeneral(shopEl);

        this.categories = this.parseXmlCategories(shopEl);
        this.selectedCategory = this.categories[0] ? this.categories[0] : {};

        this.currencies = this.parseXmlCurrencies(shopEl);
        this.selectedCurrency = this.currencies[0] ? this.currencies[0] : {};

        this.offers = this.parseXmlOffers(shopEl);
        this.selectedOffer = this.offers[0] ? this.offers[0] : [];

        this.updateList();
      },

      getChildElByTagName(el, tagName) {
        const elements = el.getElementsByTagName(tagName);
        if (elements.length > 0) {
          return elements.item(0);
        }
        return null;
      },
      getChildColElByTagName(el, tagName) {
        return el.getElementsByTagName(tagName);
      },

      createGeneralObjForXml: function() {
        let obj = {};
        const general = this.general;
        for (const key in general) {
          obj[key] = general[key];
        }
        return obj;
      },
      createCategoriesObjForXml: function() {
        let obj = {
          categories: {
            category: [],
          },
        };

        for (const category of this.categories) {
          let cat = {
            '@id': category.id,
            '#text': category.name,
          };
          let rzId = this._.get(category, 'rz_id', null);
          if (rzId) {
            cat['@rz_id'] = rzId;
          }
          obj.categories.category.push(cat);
        }

        return obj;
      },
      createCurrencyObjForXml: function() {
        let obj = {
          currencies: {
            currencies: [],
          },
        };

        for (const currency of this.currencies) {
          let cur = {
            '@id': currency.id,
            '@rate': currency.rate,
          };
          obj.currencies.currencies.push(cur);
        }

        return obj;
      },
      createOffersObjForXml: function() {
        let obj = {
          offers: {
            offer: [],
          },
        };

        let arProps = [
          'url', 'price', 'currencyId', 'categoryId', 'picture', 'vendor',
          'stock_quantity', 'name', 'description',
        ];
        for (const offer of this.offers) {
          let offerXml = {};
          for (const offerProp of offer) {
            const key = offerProp.key;
            const val = offerProp.val;
            if (key === 'id' || key === 'available') {
              offerXml['@' + key] = val.toString();
            }
            else if (key === 'description') {
              offerXml[key] = {
                '#cdata': val,
              };
            }
            else if (arProps.indexOf(key) !== -1) {
              offerXml[key] = val;
            }
          }
          obj.offers.offer.push(offerXml);
        }

        return obj;
      },
      createXml: function() {
        const date = moment().format('YYYY-MM-DD hh:mm');
        let root = xmlbuilder.create('yml_catalog', {version: '1.0', encoding: 'UTF-8'});
        root.att('date', date);
        let shop = root.ele('shop');
        shop.ele(this.createGeneralObjForXml());
        shop.ele(this.createCurrencyObjForXml());
        shop.ele(this.createCategoriesObjForXml());
        shop.ele(this.createOffersObjForXml());

        const xml = root.end({pretty: true, allowEmpty: true});
        download(xml, this.fileName, this.fileFormat);
      },

      removeCurrency: function(rItem) {
        this.currencies = this.currencies.filter(item => item !== rItem);
        if (this.selectedCurrency === rItem) {
          this.selectedCurrency = this.currencies[0] ? this.currencies[0] : {};
        }
        this.updateList();
      },
      selectCurrency: function(item) {
        this.selectedCurrency = item;
        this.updateList();
      },
      addCurrency: function() {
        let template = this.getCurrencyTemplate();
        this.currencies.push(template);

      },
      getCurrencyTemplate: function() {
        return {
          isNew: true,
          id: 'NEW',
          rate: 1,
        };
      },

      removeCategory: function(rItem) {
        this.categories = this.categories.filter(item => item !== rItem);
        if (this.selectedCategory === rItem) {
          this.selectedCategory = this.categories[0] ? this.categories[0] : {};
        }
        this.$store.commit('deleteCategory', rItem);
        this.updateList();
      },
      selectCategory: function(item) {
        this.selectedCategory = item;
        this.updateList();
      },
      addCategory: function() {
        let template = this.getCategoryTemplate();
        const id = this.categories.length + 1;
        template.id = id;
        template.name = template.name ? template.name : id.toString();
        this.categories.push(template);
      },
      getCategoryTemplate: function() {
        return {
          readonly: false,
          id: null,
          name: '',
          rz_id: '',
        };
      },

      removeOffer: function(rItem) {
        this.offers = this.offers.filter(item => item !== rItem);
        if (this.selectedOffer === rItem) {
          this.selectedOffer = this.offers[0] ? this.offers[0] : [];
        }
        this.updateList();
      },
      selectOffer: function(item) {
        this.selectedOffer = item;
        this.updateList();
      },
      addOffer: function() {
        let template = this.getOfferTemplate();
        const id = this.offers.length + 1;
        template[0].val = id;
        template[2].val = id.toString();
        this.offers.push(template);
      },
      getOfferTemplate: function() {
        return [
          {
            key: 'id',
            title: 'ID',
            val: '',
            type: 'Number',
            readonly: false,
            userProp: false,
          },
          {
            key: 'available',
            title: 'Available',
            val: true,
            type: 'Checkbox',
            readonly: false,
            userProp: false,
          },
          {
            key: 'name',
            title: 'Name',
            val: '',
            type: 'String',
            readonly: false,
            userProp: false,
          },
          {
            key: 'categoryId',
            title: 'Category',
            val: null,
            type: 'List',
            list: [],
            readonly: false,
            userProp: false,
          },
          {
            key: 'currencyId',
            title: 'Currency',
            val: 'UAH',
            type: 'List',
            list: [],
            readonly: false,
            userProp: false,
          },
          {
            key: 'stock_quantity',
            title: 'Stock Quantity',
            val: null,
            type: 'Number',
            readonly: false,
            userProp: false,
          },
          {
            key: 'url',
            title: 'Url',
            val: null,
            type: 'Url',
            readonly: false,
            userProp: false,
          },
          {
            key: 'price',
            title: 'Price',
            val: null,
            type: 'Price',
            readonly: false,
            userProp: false,
          },
          {
            key: 'price_old',
            title: 'Old Price',
            val: null,
            type: 'Price',
            readonly: false,
            userProp: false,
          },
          {
            key: 'vendor',
            title: 'Vendor',
            val: null,
            type: 'String',
            readonly: false,
            userProp: false,
          },
          {
            key: 'picture',
            title: 'Picture',
            val: [''],
            type: 'UrlPick',
            readonly: false,
            userProp: false,
          },
          {
            key: 'state',
            title: 'State',
            val: 'new',
            type: 'List',
            list: [],
            readonly: false,
            userProp: false,
          },
          {
            key: 'description',
            title: 'Description',
            val: '',
            type: 'Text',
            readonly: false,
            userProp: false,
          },
        ];
      },

      addParam: function(item) {
        const foundIndex = this.offers.findIndex(offer => offer === item);
        if(foundIndex === -1){
          return;
        }
        let cloned = this._.cloneDeep(this.offers[foundIndex]);
        const template = this.getParamTemplate();
        cloned.push(template);
        this.offers[foundIndex] = cloned;
        this.selectedOffer = this.offers[foundIndex];
        this.updateList();
      },
      removeParam: function(item, itemIndex, prop) {
        console.log(item, itemIndex, prop);
        const foundIndex = this.offers.findIndex(offer => offer === item);
        if(foundIndex === -1){
          return;
        }
        this.offers[foundIndex] = this._.cloneDeep(this.offers[foundIndex].filter(el => el !== prop));
        this.selectedOffer = this.offers[foundIndex];
        this.updateList();
      },
      getParamTemplate: function() {
        return {
          'key': 'prop',
          'title': 'ID',
          'paramName': '',
          'paramId': '',
          'paramValId': '',
          'paramText': '',
          'type': 'prop',
          'readonly': false,
          'userProp': true,
        };
      },
    },
    mounted: function() {
      this.addCategory();
      this.selectCategory(this.categories[0]);
      this.addOffer();
      this.selectOffer(this.offers[0]);
      //this.selectCurrency(this.currency[0]);
      this.updateList();
    },
  }
  ;
</script>

<style scoped>
    .ryml {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

    .import-export {
        display: flex;
        justify-content: space-between;
    }
    .import-export .import-block {
        width: 40%;
    }
</style>