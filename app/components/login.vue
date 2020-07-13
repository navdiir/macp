<template>
    <Page actionBarHidden="true" @tap="dismissKeyboard">
        <StackLayout class="page">
            <Image class="logo" src="~/assets/images/logo.png" stretch="aspectFit" />
            
            <GridLayout rows="auto,auto" class="content-field">
                <Label row="0" class="title" text="Inicia sesión" />
                <Label row="1" class="subtitle" text="¡Hola! Es genial volver a verte" />
            </GridLayout>

            <GridLayout rows="auto,auto" class="content-field">
                <Label row="0" class="subtitle-2" text="Email o DNI" />
                <TextField :isEnabled="!isBusy" id="tfEmail" @returnPress="focusPassword" returnKeyType="next" row="1" v-model="user.email" class="text-field" hint="fisi@unmsm.edu.pe" keyboardType="email" />
            </GridLayout>

            <GridLayout rows="auto,auto" class="content-2-field">
                <Label row="0" class="subtitle-2" text="Contraseña" />
                <GridLayout row="1" rows="*" columns="*,auto" class="input-border">
                    <TextField col="0" :isEnabled="!isBusy" @returnPress="goHome" id="tfPass" ref="password" hint="password" :secure="!showPassword" returnKeyType="done" v-model="user.password" class="text-field" keyboardType="email" />
                    <Label @tap="changePasswordVisibility" col="1" class="icon fa" verticalAlignment="center" :text="showPassword?`\uf070`:`\uf06e`" />
                </GridLayout>
            </GridLayout>

            <GridLayout rows="auto" class="content-field">
                <Button :isEnabled="!isBusy" class="btn-signin" text="Sign In" @tap="goHome" />
            </GridLayout>

            <GridLayout rows="auto" class="content-field">
                <Label class="label-caption" horizontalAlignment="center" text="o usa tus redes sociales" />
            </GridLayout>
            
            <GridLayout rows="auto" columns="*,*" class="content-field">
                <GridLayout @tap="loginGoogle" :isEnabled="!isBusy" class="btn-google" col="0" rows="*" columns="70,*">
                    <Image verticalAlignment="center" horizontalAlignment="right" row="0" col="0" src="~/assets/icons/google.png" />
                    <Label verticalAlignment="center" horizontalAlignment="left" row="0" col="1" text="Google" />
                </GridLayout>
                <Button @tap="loginFacebook" height="30rem" :isEnabled="!isBusy" col="1" class="btn-facebook fab" :text="`\uf39e \t\ Facebook`"  />
            </GridLayout>

            <GridLayout rows="auto" columns="*,auto" class="content-footer">
                <Label :isEnabled="!isBusy" @tap="forgotPassword" col="0" class="subtitle" text="¿Olvidaste tu contraseña?" />
                <Label @tap="signup" :isEnabled="!isBusy" col="1" class="subtitle-2" text="Sign up" />
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
import Home from "./home";
import Forgot from './forgot';

export default {
    data() {
        return {
            isBusy: false,
            showPassword: false,
            user: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        changePasswordVisibility(){
            this.showPassword = !this.showPassword;
            this.$refs.password.nativeView.focus();
        },
        async goHome(){
            const reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const reDNI = /^[0-9]{8}$/;

            if(!reEmail.test(this.user.email) && !reDNI.test(this.user.email)){
                this.$feedback.error({
                    title: 'Campos incorrectos',
                    message: 'Ingresa un correo o DNI válido.',
                    duration: 2500
                });
                return;
            }

            if(!this.user.password){
                this.$feedback.error({
                    title: 'Campos incorrectos',
                    message: 'Ingresa tu contraseña.',
                    duration: 2500
                });
                return;
            }

            this.isBusy = true;
            this.$loadingindicator.show({message:'Cargando ...',dimBackground: true, color: '#f85f6a',android:{cancelable:false}});
            try{
                await this.$store.dispatch('setUser',this.user);
                this.$loadingindicator.hide();
                this.isBusy = false;
                this.$feedback.success({
                    message: `Todo correcto :)`,
                    duration: 200
                })
                this.$navigateTo(Home,{clearHistory:true});
            } catch (err){
                this.$loadingindicator.hide();
                this.isBusy = false;
                this.$feedback.error({
                    title: 'Algo salió mal',
                    message: 'Información incorrecta',
                    duration: 2500
                })
            }
        },
        focusPassword() {
            this.$refs.password.nativeView.focus();
        },
        dismissKeyboard(args){
            var layout = args.object;
            var tfEmail = layout.getViewById('tfEmail');
            var tfPass = layout.getViewById('tfPass');
            tfEmail.android.clearFocus();
            tfPass.android.clearFocus();
        },
        loginGoogle(){
            this.$feedback.info({
                message: 'Pronto disponible',
                duration: 2500
            })
        },
        loginFacebook(){
            this.$feedback.info({
                message: 'Pronto disponible',
                duration: 2500
            })
        },
        signup(){
            this.$feedback.info({
                message: 'Pronto disponible',
                duration: 2500
            })
        },
        forgotPassword(){
            this.$navigateTo(Forgot,{clearHistory:false});
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~/app.scss';

    .page {
        margin-left: 40;
        margin-right: 40;
    }
    .logo {
        margin-bottom: 12;
        margin-top: 50;
        height: 150;
        font-weight: bold;
    }
    .content-field{
        margin-top: 20;
    }
    .content-2-field{
        margin-top:10;
    }
    .content-footer{
        margin-top:20rem;
        margin-left: 20;
        margin-right: 20;
    }
    .title {
        color: $title;
        font-weight: bold;
        font-size: 30;
    }
    .subtitle{
        color: $subtitle;
        font-size: 15;
    }
    .subtitle-2{
        color: $primary;
        font-size: 15;
        font-weight: bold;
    } 
    .text-field{
        color: black;
        placeholder-color: $subtitle;
        margin-left:0;
        font-size: 15;
    }
    .btn-signin{
        background-color: $primary;
        color: white;
        border-radius: 12;
    }
    .label-caption{
        color: $subtitle;
        font-size: 12;
    }
    .btn-google{
        border-width: 1;
        border-color: black;
        border-radius: 5;
        Image{
            height: 20rem;
            margin-left: 10;
            margin-right: 10;
        }
        Label{
            font-size: 15;
        }
        height: 30rem;
    }
    .btn-facebook{
        background-color: #3b5998;
        color: white;
        border-radius: 5;

    }
    .icon{
        margin-left: -40rem;
        color: $subtitle;
    }
</style>