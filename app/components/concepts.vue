<template>
    <Page actionBarHidden="true" @tap="dismissKeyboard">
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#83B1D1">
                <GridLayout class="content-sidedrawer" rows="auto,auto,*,auto" columns="*">
                    <Image horizontalAlignment="left" class="imageProfile" row="0" col="0" height="80" src="~/assets/images/profile.png" stretch="aspectFit" />
                    <Label row="1" col="0" class="name" :text="fullName" />
                    <ListView class="menu" row="2" col="0" for="menu in menus" @itemTap="sideAction">
                        <v-template>
                            <Label class="labelMenu fa" :text="`${menu.name}`" />
                        </v-template>
                    </ListView>
                    <Button @tap="logout" row="3" col="0" class="btn-signout fa" :text="`\uf2f5 Cerrar sesión`" />
                </GridLayout>
            </StackLayout>

            <StackLayout ~mainContent>
                <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto,*" columns="auto,auto,auto,*,auto" class="content-1-field">
                    <Label row="0" @tap="$refs.drawer.nativeView.showDrawer()" col="0" class="icon fa" :text="`\uf0c9`" />
                    <Label row="0" @tap="settings" col="4" class="icon fa" :text="`\uf4fe`" />
                    <Label row="1" col="0" verticalAlignment="center" @tap="goPrograms" class="ruta1 fa" :text="`Programas \uf054 `" />
                    <Label row="1" col="1" verticalAlignment="center" @tap="goProgram" class="ruta1 fa" :text="`${sig} \uf054 `" />
                    <Label row="1" col="2" verticalAlignment="center" class="ruta2" :text="concept.code" />
                    <Label row="2" col="0" colSpan="5" :textWrap="true" class="title" :text="`${concept.name}`" />
                    <Label row="3" col="0" colSpan="5" class="subtitle" :text="`Concepto: ${concept.code}`" />
                    <Label row="4" col="0" colSpan="5" class="subtitle" :text="`Nombre: ${nameAlu}`" />
                    <Label row="5" col="0" colSpan="5" class="subtitle" :text="`Programa: ${sig}`" />
                    <Label row="6" col="0" colSpan="5" class="subtitle" :text="`Codigo: ${cod}`" />
                    <SearchBar hint="Buscar recibo..." textFieldHintColor="#989eb1" id='searchBox' ref="sb" @loaded="sbLoaded" row="7" col="0" colSpan="5" v-model="search"  />
                    <ListView @tap="listAction" row="8" col="0" colSpan="5" for="payment in paymentsFiltered" @itemTap="paymentAction">
                        <v-template >
                            <GridLayout class="paymentGrid" rows="*,*" columns="auto,*,auto">
                                <Label :textWrap="true" row="0" col="0" class="lbl-program fa" :text="`\uf53a ${payment.numero}`" /> 
                                <Label row="0" col="1" class="validPayment" :text="payment.validado==true?'Validado':'Pendiente'" />
                                <Label row="0" col="2" class="fa viewmore" :text="payment.state?`Ver menos \uf077`:`Ver más \uf078`" />
                                <GridLayout v-show="payment.state" class="paymentDetail" row="1" col="0" colSpan="3" rows="*,*,*,*" columns="auto,*,auto">
                                    <Label row="0" col="0" class="detailSubtitle" text="Fecha de pago:" />
                                    <Label row="0" col="1" :text="payment.fecha" />
                                    <Label row="1" col="0" class="detailSubtitle" text="Monto:" />
                                    <Label row="1" col="1" :text="`S/. ${payment.importe}`" />
                                    <Label row="2" col="0" class="detailSubtitle" text="Moneda:" />
                                    <Label row="2" col="1" :text="payment.moneda2" />
                                    <Label row="3" col="0" class="detailSubtitle" text="Ciclo:" />
                                    <Label row="3" col="1" :text="payment.ciclo" />
                                    <Label row="3" col="2" class="iconView fa" :text="`\uf06e`" @tap="generateDocument" />
                                </GridLayout>
                            </GridLayout>
                        </v-template>
                    </ListView>
                </GridLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import Programs from './programs';
import Program from './program';
import Login from "./login";
import Home from './home';
import Concepts from './concepts';

export default {
    props:['payments','concept', 'cod','sig','nameAlu'],
    data:()=>({
        menus: [
            {name: '\uf015 Inicio', route: Home},
            {name: '\uf15c Programas', route: Programs}
        ],
        search: null,
        newPayments: null
    }),
    mounted(){
        this.newPayments = JSON.parse(JSON.stringify(this.payments));
        this.newPayments = this.newPayments.map(e=>{e['state']=false;return e;});
    },
    computed:{
        paymentsFiltered(){
            return this.newPayments?this.newPayments.filter(e=>this.search?e.numero.indexOf(this.search)!=-1:true):[];
        },
        fullName(){
            return this.$store.getters.fullName;
        },
        getProgram(){
            return this.$store.getters.program(this.cod);
        }
    },
    methods: {
        listAction(){},
        sbLoaded(args){
            const searchBar = args.object;
            searchBar.android.clearFocus();
            searchBar.textFieldHintColor = '#989eb1';
        },
        paymentAction(val){
            let payIndex = this.newPayments.map(e=>e.idRec).indexOf(val.item.idRec);
            this.newPayments[payIndex].state = !this.newPayments[payIndex].state;
            this.newPayments = [...this.newPayments]
        },
        logout() {
            this.$navigateTo(Login,{clearHistory: true});
            this.$store.dispatch('logout');
        },
        sideAction(val){
            if(val.item.route){
                this.$navigateTo(val.item.route,{clearHistory: false});
            } else {
                this.$refs.drawer.nativeView.closeDrawer();
            }
        },
        goPrograms(){
            this.$navigateTo(Programs,{clearHistory: true});
        },
        goProgram(){
            this.$navigateTo(Program,{clearHistory:true,props:{program:this.getProgram}});
        },
        settings(){
            this.$feedback.info({
                message: 'Pronto disponible',
                duration: 2500
            });
        },
        generateDocument(){
            this.$feedback.info({
                message: 'Pronto disponible',
                duration: 2500
            });
        },
        dismissKeyboard(args){
            var layout = args.object;
            var searchBox = layout.getViewById('searchBox');
            searchBox.android.clearFocus();
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~/app.scss';

    .content-1-field{
        margin-top: 20;
        margin-left: 20;
        margin-right: 20;
        margin-bottom: 20;
    }
    .iconView{
        font-size: 25;
    }
    .lbl-program{
        font-size: 13;
        margin-left: 10;
        margin-bottom: 10;
    }
    .viewmore{
        color: $primary;
        margin-bottom: 10;
    }
    .icon{
        color: $subtitle;
        font-size: 25;
    }
    .title{
        font-size: 20;
        font-weight: bold;
        margin-top: 10;
        color: $title;
    }
    .detailSubtitle{
        font-weight: bold;
    }
    .validPayment{
        color: $subtitle;
        font-size: 10;
        margin-bottom: 10;
    }
    .paymentDetail{
        background-color: #ebebeb;
        padding-bottom: 10;
        padding-left: 15;
        padding-right: 15;
    }
    .paymentGrid{
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        margin-left: 10;
        margin-right: 10;
    }
    .subtitle{
        color: $subtitle;
    }
    .ruta1{
        color: #007bff;
        font-size: 15;
        margin-top: 10;
    }
    .ruta2{
        color: $subtitle;
        font-size: 15;
        margin-top: 10;
    }
    .content-sidedrawer{
        margin-top: 20;
        margin-bottom: 10;
        .imageProfile{
            margin-left: 20;
        }
        .btn-signout{
            background-color: white;
            color: $primary;
        }
        .name{
            color: white;
            margin-left: 10;
            font-weight: bold;
            font-size: 15;
        }
        .menu{
            margin-top: 20;
            background-color: #F1F0E8;
            .labelMenu{
                font-size: 20;
                color: $primary;
                background-color: #F1F0E8;
            }
        }
    }
</style>