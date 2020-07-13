<template>
    <Page actionBarHidden="true" @tap="dismissKeyboard">
        <StackLayout class="page">
            <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,auto,*,*" columns="*" >

                <Image row="0" class="logo" src="~/assets/images/logo.png" stretch="aspectFit" />
                <Label row="1" class="title content-field-inital" text="Cambiar contraseña" />
                <Label row="2" class="subtitle" text="Pronto estarás de vuelta con nosotros :)" />
                <Label row="3" class="content-field subtitle-2" text="Username o DNI" />
                <TextField row="4" :isEnabled="!isBusy" id="tfUsername" @returnPress="focusEmail" returnKeyType="next" v-model="user.username" class="text-field" hint="12345678" keyboardType="text" />
                <Label row="5" class="content-field subtitle-2" text="Email" />
                <TextField row="6" :isEnabled="!isBusy" id="tfEmail" rf="email" @returnPress="focusPassword" returnKeyType="next" v-model="user.email" class="text-field" hint="fisi@unmsm.edu.pe" keyboardType="email" />
                <Label row="7" class="content-2-field subtitle-2" text="Contraseña" />
                <GridLayout row="8" rows="*" columns="*,auto" class="input-border">
                    <TextField col="0" :isEnabled="!isBusy" @returnPress="focusConfirmPassword" id="tfPass" ref="password" hint="password" :secure="!showPassword" returnKeyType="done" v-model="user.password" class="text-field" keyboardType="email" />
                    <Label @tap="changePasswordVisibility" col="1" class="icon fa" verticalAlignment="center" :text="showPassword?`\uf070`:`\uf06e`" />
                </GridLayout>
                <Label row="9" class="content-2-field subtitle-2" text="Confirmar contraseña" />
                <GridLayout row="10" rows="*" columns="*,auto" class="input-border">
                    <TextField col="0" :isEnabled="!isBusy" @returnPress="goHome" id="tfPassConfirm" ref="passwordConfirm" hint="password" :secure="!showPasswordConfirm" returnKeyType="done" v-model="user.confirmPassword" class="text-field" keyboardType="email" />
                    <Label @tap="changePasswordConfirmVisibility" col="1" class="icon fa" verticalAlignment="center" :text="showPasswordConfirm?`\uf070`:`\uf06e`" />
                </GridLayout>

                <Button row="11" :isEnabled="!isBusy" class="content-field btn-signin" text="Recuperar" @tap="goHome" />
                
                <Label row="12" class="content-field label-caption" horizontalAlignment="center" text="o usa tus redes sociales" />
                
                <GridLayout row="13" rows="auto" columns="*,*" class="content-field">
                    <GridLayout @tap="loginGoogle" :isEnabled="!isBusy" class="btn-google" col="0" rows="*" columns="70,*">
                        <Image verticalAlignment="center" horizontalAlignment="right" row="0" col="0" src="~/assets/icons/google.png" />
                        <Label verticalAlignment="center" horizontalAlignment="left" row="0" col="1" text="Google" />
                    </GridLayout>
                    <Button @tap="loginFacebook" height="30rem" :isEnabled="!isBusy" col="1" class="btn-facebook fab" :text="`\uf39e \t\ Facebook`"  />
                </GridLayout>

                <GridLayout row="14" rows="auto" columns="*,auto" class="content-footer">
                    <Label :isEnabled="!isBusy" @tap="forgotPassword" col="0" class="subtitle" text="¿Olvidaste tu contraseña?" />
                    <Label @tap="signup" :isEnabled="!isBusy" col="1" class="subtitle-2" text="Sign up" />
                </GridLayout>

            </GridLayout>

            <!-- <Image class="logo" src="~/assets/images/logo.png" stretch="aspectFit" />
            
                <GridLayout rows="auto,auto" class="content-field-inital">
                    <Label row="0" class="title" text="Cambiar contraseña" />
                    <Label row="1" class="subtitle" text="Pronto estarás de vuelta con nosotros :)" />
                </GridLayout>

                <GridLayout rows="auto,auto" class="content-field">
                    <Label row="0" class="subtitle-2" text="Username o DNI" />
                    <TextField :isEnabled="!isBusy" id="tfUsername" @returnPress="focusEmail" returnKeyType="next" row="1" v-model="user.username" class="text-field" hint="12345678" keyboardType="text" />
                </GridLayout>

                <GridLayout rows="auto,auto" class="content-field">
                    <Label row="0" class="subtitle-2" text="Email" />
                    <TextField :isEnabled="!isBusy" id="tfEmail" rf="email" @returnPress="focusPassword" returnKeyType="next" row="1" v-model="user.email" class="text-field" hint="fisi@unmsm.edu.pe" keyboardType="email" />
                </GridLayout>

                <GridLayout rows="auto,auto" class="content-2-field">
                    <Label row="0" class="subtitle-2" text="Contraseña" />
                    <GridLayout row="1" rows="*" columns="*,auto" class="input-border">
                        <TextField col="0" :isEnabled="!isBusy" @returnPress="goHome" id="tfPass" ref="password" hint="password" :secure="!showPassword" returnKeyType="done" v-model="user.password" class="text-field" keyboardType="email" />
                        <Label @tap="changePasswordVisibility" col="1" class="icon fa" verticalAlignment="center" :text="showPassword?`\uf070`:`\uf06e`" />
                    </GridLayout>
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
                </GridLayout> -->
        </StackLayout>
    </Page>
</template>

<script>
import Home from "./home";

export default {
    data() {
        return {
            isBusy: false,
            showPassword: false,
            showPasswordConfirm: false,
            user: {
                username: null,
                email: null,
                password: null,
                confirmPassword: null
            }
        }
    },
    methods: {
        changePasswordVisibility(){
            this.showPassword = !this.showPassword;
            this.$refs.password.nativeView.focus();
        },
        changePasswordConfirmVisibility(){
            this.showPasswordConfirm = !this.showPasswordConfirm;
            this.$refs.passwordConfirm.nativeView.focus();
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
        focusConfirmPassword() {
            this.$refs.passwordConfirm.nativeView.focus();
        },
        focusEmail(){
            this.$refs.email.nativeView.focus();
        },
        dismissKeyboard(args){
            var layout = args.object;
            var tfUsername = layout.getViewById('tfUsername');
            var tfEmail = layout.getViewById('tfEmail');
            var tfPass = layout.getViewById('tfPass');
            var tfConfirmPass = layout.getViewById('tfPassConfirm');
            tfConfirmPass.android.clearFocus();
            tfUsername.android.clearFocus();
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
            this.$feedback.info({
                message: 'Pronto disponible',
                duration: 2500
            })
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
        margin-top: 20;
        height: 150;
        font-weight: bold;
    }
    .content-field{
        margin-top: 10;
    }
    .content-field-inital{
        margin-top: -10;
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
        font-size: 25;
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
        margin-top: -2;
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