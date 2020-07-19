import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: '#05bc52',
                secondary: '#424242',
                accent: '#82b1ff',
                error: '#ff5252',
                info: '#2196f3',
                success: '#05bc52',
                warning: '#ffc107',
            },
            dark: {
                primary: '#05bc52',
                secondary: '#424242',
                accent: '#82b1ff',
                error: '#ff5252',
                info: '#2196f3',
                success: '#05bc52',
                warning: '#ffc107',
            },
        },
        dark: true,
    },
};

export default new Vuetify(opts);