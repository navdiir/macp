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
                <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,*" columns="auto,auto,*,auto" class="content-1-field">
                    <Label row="0" @tap="$refs.drawer.nativeView.showDrawer()" col="0" class="icon fa" :text="`\uf0c9`" />
                    <Label row="0" @tap="settings" col="3" class="icon fa" :text="`\uf4fe`" />
                    <Label row="1" col="0" verticalAlignment="center" @tap="goPrograms" class="ruta1 fa" :text="`Programas \uf054 `" />
                    <Label row="1" col="1" verticalAlignment="center" class="ruta2" :text="program.siglaProg.trim()" />
                    <Label :textWrap="true" row="2" col="0" colSpan="4" class="title" :text="`(${program.siglaProg.trim()}) ${program.nom_programa}`" />
                    <Label row="3" col="0" colSpan="4" class="subtitle" :text="`Nombre: ${totalName}`" />
                    <Label row="4" col="0" colSpan="4" class="subtitle" :text="`Codigo: ${program.codAlumno}`" />
                    <Label row="5" col="0" colSpan="4" class="subtitle" :text="`Ingreso: ${program.anioIngreso}`" />

                    <SearchBar hint="Buscar concepto..." textFieldHintColor="#989eb1" id='searchBox' ref="sb" @loaded="sbLoaded" row="6" col="0" colSpan="4" v-model="search"  />

                    <ListView @tap="listAction" row="7" col="0" colSpan="4" for="concept in paymentsFiltered" @itemTap="paymentAction">
                        <v-template>
                            <GridLayout rows="*" columns="*,auto">
                                <Label :textWrap="true" row="0" col="0" class="lbl-program fa" :text="`\uf570 (${codeConcept(concept)}) ${nameConcept(concept)}`" />
                                <Label row="0" col="1" class="fa viewmore" :text="`Ver más \uf054`" />
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
import Login from "./login";
import Home from './home';
import Concepts from './concepts';

export default {
    props:['program'],
    data:()=>({
        menus: [
            {name: '\uf015 Inicio', route: Home},
            {name: '\uf15c Programas', route: Programs}
        ],
        search: null,
        paymentsByConcept: [],
    }),
    async mounted(){
        this.$loadingindicator.show({message:'Cargando ...',dimBackground: true, color: '#f85f6a',android:{cancelable:false}});
        await Promise.all([this.$store.dispatch('setProgram',this.program.codAlumno),this.$store.dispatch('getConcepts')]);
        this.paymentsByConcept = Object.keys(this.payments.reduce((obj,item)=>{
            obj[item.idconcepto] = obj[item.idconcepto] || [];
            obj[item.idconcepto].push(item);
            return obj;
        },{}));
        this.$loadingindicator.hide();
    },
    computed:{
        paymentsFiltered(){
            return this.paymentsByConcept.filter(e=>this.search?(this.nameConcept(e).toLowerCase().indexOf(this.search.toLowerCase())!=-1 || this.codeConcept(e).toLowerCase().indexOf(this.search.toLowerCase())!=-1):true);
        },
        nameConcept(){
            return (id) => this.concepts?this.concepts.filter(e=>e.idConcepto==id)[0].descripcion:[];
        },
        codeConcept(){
            return (id) => this.concepts?this.concepts.filter(e=>e.idConcepto==id)[0].concepto.trim():[]
        },
        payments(){
            return this.$store.state.program;
        },
        concepts(){
            return this.$store.state.concepts;
        },
        fullName(){
            return this.$store.getters.fullName;
        },
        totalName(){
            return `${this.program.nomAlumno} ${this.program.apePaterno} ${this.program.apeMaterno}`
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
            this.$navigateTo(Concepts, {clearHistory: false, props: {nameAlu: this.totalName,sig: this.program.siglaProg.trim(),cod: this.program.codAlumno,concept: {name:this.nameConcept(val.item),code:this.codeConcept(val.item)}, payments: this.payments.filter(e=>e.idconcepto==val.item)}});
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
        settings(){
            this.$feedback.info({
                message: 'Pronto disponible',
                duration: 2500
            })
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
    .icon{
        color: $subtitle;
        font-size: 25;
    }
    .title{
        font-size: 25;
        font-weight: bold;
        margin-top: 10;
        color: $title;
    }
    .subtitle{
        color: $subtitle;
    }
    .lbl-program{
        font-size: 13;
    }
    .viewmore{
        color: $primary;
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