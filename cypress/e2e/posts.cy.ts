describe('Post CRUD Operations', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/posts*', { fixture: 'posts.json' }).as('getPosts')
        cy.visit('/')
        cy.window().then((win) => {
            win.localStorage.setItem('userName', Cypress.env('TEST_USER_NAME'))
            win.localStorage.setItem('token', Cypress.env('TEST_TOKEN'))
        })
        cy.visit('/')
        cy.wait('@getPosts')
    })

    it('should create a new post', () => {
        cy.intercept('GET', '**/users', {
            statusCode: 200,
            body: { data: [{ id: 7565897, name: 'Test User' }] }
        }).as('getUsers')

        cy.get('button').contains('Create Post').click()
        cy.url().should('include', '/createPost')
        cy.wait('@getUsers')

        const newPost = {
            title: 'New Test Post',
            body: 'This is a new test post'
        }

        cy.intercept('POST', '**/posts', {
            statusCode: 201,
            body: { data: { ...newPost, user_id: 7565897 } }
        }).as('createPost')

        cy.intercept('GET', '**/posts*', {
            statusCode: 200,
            body: {
                data: [{ id: 1, ...newPost, user_id: 7565897 }],
                meta: { pagination: { total: 1, pages: 1, page: 1, limit: 10 } }
            }
        }).as('getUpdatedPosts')

        cy.get('input[name="title"]').type(newPost.title)
        cy.get('textarea[name="body"]').type(newPost.body)
        cy.get('button[name="submit"]').click()

        cy.wait('@createPost')
        cy.wait('@getUpdatedPosts')
        cy.get('.ant-card').should('contain', newPost.title)
    })

    it('should search for posts', () => {
        const searchTerm = 'Test Post 1'
        cy.get('input[placeholder="Search by title"]').type(searchTerm)
        cy.get('.ant-card').should('have.length', 1)
        cy.get('.ant-card').first().should('contain', searchTerm)
    })

    it('should edit a post', () => {
        const updatedPost = {
            title: 'Updated Test Post',
            body: 'This is an updated test post'
        }

        cy.intercept('GET', '**/posts/*', {
            statusCode: 200,
            body: { data: { id: 1, ...updatedPost, user_id: 123 } }
        }).as('getPostDetail')

        cy.intercept('PUT', '**/posts/*', {
            statusCode: 200,
            body: { data: { id: 1, ...updatedPost, user_id: 123 } }
        }).as('updatePost')

        cy.get('.ant-card').first().within(() => {
            cy.contains('Edit').click()
        })

        cy.wait('@getPostDetail')

        cy.get('input[name="title"]').clear().type(updatedPost.title).should('have.value', updatedPost.title)
        cy.get('textarea[name="body"]').clear().type(updatedPost.body).should('have.value', updatedPost.body)
        cy.get('button[name="submit"]').click()

        cy.wait('@updatePost')
        cy.get('.ant-card').first().should('contain', updatedPost.title)
    })

    it('should delete a post', () => {
        cy.intercept('DELETE', '**/posts/*', {
            statusCode: 204
        }).as('deletePost')

        cy.get('.ant-card').first().within(() => {
            cy.contains('Delete').click()
        })

        cy.get('.ant-modal-title').should('contain', 'Confirm Deletion')
        cy.contains('Yes, Delete').click()

        cy.wait('@deletePost')
        cy.get('.ant-message-success').should('be.visible')
    })

    it('should handle pagination', () => {
        const page2Response = {
            data: [
                {
                    id: 3,
                    title: "Test Post 3",
                    body: "This is the content of test post 3",
                    user_id: 123
                }
            ],
            meta: {
                pagination: {
                    total: 20,
                    pages: 2,
                    page: 2,
                    limit: 10
                }
            }
        }

        cy.intercept('GET', '**/posts*page=2*', page2Response).as('getPage2')

        cy.get('.ant-pagination-item-2').click()
        cy.wait('@getPage2')
        cy.get('.ant-card').should('contain', 'Test Post 3')
    })
}) 