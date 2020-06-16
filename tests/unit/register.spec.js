import { mount } from "@vue/test-utils";
import { expect } from "chai";
import Register from "@/components/Register.vue"

describe('Register.vue', () => {
    //Given/Arrange (dado que existe...)
    const wrapper = mount(Register)
    let checkbox = wrapper.find('input[type="checkbox"]')
    let registerBtn = wrapper.find('button[type="submit"]')

    it('has a disabled button', () => {
        //When/Act (cuando pasa sierta cosa o evento)
        checkbox.setChecked(false)
        //then/Assert (entonces , pasa cierta cosa)
        expect(registerBtn.classes('is-disabled')).to.be.true
    })
    it('has a button not disabled when checkbox is checked', () => {
        checkbox.setChecked(true)
        expect(registerBtn.classes('is-disabled')).to.be.false
    })
    it('registers a User', ()=>{
        //0) Cargar el componente con los metodos de prueba
        let isSent = false
        function stubMethod() { isSent = true }
        const wrapper = mount(Register,{
            methods:{
                submitForm: stubMethod
            }
        })
        //1) Encontrar los campos necesarios
        let userName = wrapper.find('input[type="text"]')
        let email = wrapper.find('input[type="email"]')
        let password = wrapper.find('input[type="password"]')
        let registerBtn = wrapper.find('button[type="submit"]')
        //2) Asignar los valores a los campos
        userName.setValue('Baltazar Bratt')
        email.setValue('bbratt@hollywood.com')
        password.setValue('DanceFight')
        //3) Enviar formulario
        registerBtn.trigger('click')
        //4) Probar que se envie el registro
        expect(isSent).to.be.true
    })
})
