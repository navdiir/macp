<template>
    <Page actionBarHidden="true">
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
                <GridLayout rows="*,*,*,*,auto" columns="auto,*,auto" class="content-1-field">
                    <Label row="0" @tap="$refs.drawer.nativeView.showDrawer()" col="0" class="icon fa" :text="`\uf0c9`" />
                    <Label row="0" @tap="settings" col="2" class="icon fa" :text="`\uf4fe`" />

                    <Image row="1" col="0" colSpan="3" src="~/assets/images/profile.png" stretch="aspectFit" class="imageCenter" />
                
                    <Label row="2" col="0" colSpan="3" horizontalAlignment="center"  class="title" :text="`¡Bienvenido ${name}!`" />
                    
                    <Button row="3" col="0" colSpan="3" class="btn-program" text="Ver Programas" @tap="goPrograms" />

                    <Image row="4" col="0" colSpan="3" class="logo1" src="~/assets/images/logo.png" stretch="aspectFit" />
                </GridLayout>
            </StackLayout>

        </RadSideDrawer>
    </Page>
</template>

<script>
import Login from "./login";
import Programs from './programs';

export default {
    data:()=>({
        menus: [
            {name: '\uf015 Inicio', route: null},
            {name: '\uf15c Programas', route: Programs}
        ]
    }),
    computed: {
        name(){
            return this.$store.getters.name
        },
        fullName(){
            return this.$store.getters.fullName;
        }
    },
    methods: {
        sideAction(val){
            if(val.item.route){
                this.$navigateTo(val.item.route,{clearHistory: false});
            } else {
                this.$refs.drawer.nativeView.closeDrawer();
            }
        },
        logout() {
            this.$navigateTo(Login,{clearHistory: true});
            this.$store.dispatch('logout');
        },
        settings(){
            this.$feedback.info({
                message: 'Pronto disponible',
                duration: 2500
            })
        },
        goPrograms(){
            this.$navigateTo(Programs,{clearHistory:false});
        }
    }
};
</script>

<style lang="scss" scoped>
    @import '~/app.scss';

    .content-1-field{
        margin-top: 20;
        margin-left: 20;
        margin-right: 20;
        margin-bottom: 20;
    }
    
    .title{
        font-size: 20;
    }
    .icon{
        color: $subtitle;
        font-size: 25;
    }
    .logo1{
        height: 150;
    }
    .btn-program{
        margin-left: 40;
        margin-right: 40;
        margin-top:80;
        margin-bottom:80;
        background-color: $primary;
        color: white;
        border-radius: 12;
    }
    .imageCenter{
        max-height: 150;
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