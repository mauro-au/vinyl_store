describe('Landing Page', () => {
    it('Toggle the hambueger buttom', () => {
        cy.viewport('iphone-6')
        cy.visit('/')
        cy.get('#navbarMenu').should('not.have.css', 'display', 'block')
    })
})
