import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import config from './config';

Vue.use(Vuex);

const state = {
    user: null,
    programs: null,
    program: null,
    concepts: null
}

const mutations = {
    setUser(state,val){
        state.user = val;
    },
    setPrograms(state,val){
        state.programs = val;
    },
    setProgram(state,val){
        state.program = val;
    },
    getConcepts(state,val){
        state.concepts = val;
    }
}

const actions = {
    getConcepts({commit,state}){
        return new Promise( async(res,rej)=>{
            if(!state.concepts){
                const response = await fetch(`${config.URL}/concepto/conceptos`);
                if(response.status==500){
                    rej('err');
                } else if(response.status==200){
                    let data = await response.json();
                    commit('getConcepts',data);
                    res('ok')
                }
            } else {
                res('ok');
            }
        });
    },
    setProgram({commit,state},val){
        return new Promise( async(res,rej)=>{
            const response = await fetch(`${config.URL}/recaudaciones/alumno/concepto/listar_cod/${val}`);
            if(response.status==500){
                rej('err');
            } else if(response.status==200){
                let data = await response.json();
                commit('setProgram',data);
                res('ok')
            }
        });
    },
    setPrograms({commit,state},val){
        return new Promise( async(res,rej)=>{
            const response = await fetch(`${config.URL}/alumnoprograma/buscard/${state.user.dniM}`);
            if(response.status==500){
                rej('err');
            } else if(response.status==200){
                let data = await response.json();
                commit('setPrograms',data);
                res('ok')
            }
        });
    },
    setUser({commit}, user){
        return new Promise (async (res,rej)=>{
            const response = await fetch(`${config.URL}/usuario/alumnoprograma/buscar/${user.password}/${user.email}`)
            if(response.status==500){
                rej('err');
            } else if(response.status==200){
                let data = await response.json();
                commit('setUser',data);
                res(data)
            }
        })
    },
    changePassword({commit}, user){
        return new Promise(async (res,rej)=>{
            const response = await fetch(`${config.URL}/usuario/alumnoprograma/actualizar/${user.username}/${user.email}/${user.password}`)
            if(response.status==500){
                rej('err');
            } else if(response.status==200){
                let data = await response.json();
                res('ok')
            }
        });
    },
    logout({commit}){
        commit('setUser',null);
        commit('setPrograms',null);
    }
}

const getters = {
    name: state => {
        return state.user?state.user.nomAlumno.split(' ')[0]:null
    },
    fullName: state => {
        return state.user?`${state.user.nomAlumno} ${state.user.apePaterno}`:null
    },
    program: state => {
        return (id) => state.programs?state.programs.filter(e=>e.codAlumno==id)[0]:null
    }
}

export default new Vuex.Store({state,mutations,actions,getters});