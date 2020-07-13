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
                <GridLayout rows="auto,auto,auto,*" columns="auto,*,auto" class="content-1-field">
                    <Label row="0" @tap="$refs.drawer.nativeView.showDrawer()" col="0" class="icon fa" :text="`\uf0c9`" />
                    <Label row="0" @tap="settings" col="2" class="icon fa" :text="`\uf4fe`" />

                    <Label row="1" col="0" colSpan="3" class="labelPrograms" text="Programas" />

                    <SearchBar textFieldHintColor="#989eb1" id='searchBox' ref="sb" @loaded="sbLoaded" row="2" col="0" colSpan="3"  hint="Buscar programa..." v-model="search"  />

                    <ListView @tap="listAction" row="3" col="0" colSpan="3" for="program in programsFiltered" @itemTap="programAction">
                        <v-template>
                            <GridLayout  rows="*" columns="*,auto">
                                <Label :textWrap="true" row="0" col="0" class="lbl-program fa" :text="`\uf518 (${program.siglaProg.trim()}) ${program.nom_programa}`" />
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
import Program from './program';
import Login from "./login";
import Home from './home';
import { SearchBar } from 'tns-core-modules';

export default {
    data:()=>({
        menus: [
            {name: '\uf015 Inicio', route: Home},
            {name: '\uf15c Programas', route: null}
        ],
        search: null
    }),
    async mounted(){
        if(!this.$store.state.programs){
            this.$loadingindicator.show({message:'Cargando ...',dimBackground: true, color: '#f85f6a',android:{cancelable:false}});
            await this.$store.dispatch('setPrograms');
            this.$loadingindicator.hide();
        }
    },
    computed:{
        programsFiltered(){
            return this.programs?this.programs.filter(e=>this.search?(e.nom_programa.toLowerCase().indexOf(this.search.toLowerCase())!=-1  || e.siglaProg.toLowerCase().indexOf(this.search.toLowerCase())!=-1):true):[];
        },
        programs(){
            return this.$store.state.programs;
        },
        fullName(){
            return this.$store.getters.fullName;
        } 
    },
    methods:{
        listAction(){},
        sbLoaded(args){
            const searchBar = args.object;
            searchBar.android.clearFocus();
            searchBar.textFieldHintColor = '#989eb1';
        },
        programAction(val){
            this.$navigateTo(Program,{props:{program:val.item}});
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
    .labelPrograms{
        font-size: 35;
        margin-top: 10;
    }
    .lbl-program{
        font-size: 13;
    }
    .viewmore{
        color: $primary;
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