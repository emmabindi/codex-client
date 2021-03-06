import { bookmarkBuilder } from '../support/generate'

describe("when adding text to make a new bookmark", () => {
  beforeEach(() => {
    cy.fixture("user").then((user) => {
      window.localStorage.setItem("token", user.token);
      window.localStorage.setItem("auth", true)
    });
    cy.visit("/dashboard/bookmarks");
  });

  it("should be able to submit the form and remain on the /bookmarks page", () => {
    const bookmark = bookmarkBuilder()
    cy.url().should("include", "dashboard/bookmarks");
    cy.findByPlaceholderText(/Title/i).type(bookmark.title).should("contain.value", bookmark.title)
    cy.findByPlaceholderText(/URL/i).type(bookmark.url).should("contain.value", bookmark.url)
    cy.findByPlaceholderText(/Description/i).type(bookmark.description).should("contain.value", bookmark.description)
    cy.get('#categories').select('Front End').should("have.value", '1') 
    cy.get('#languages').select('JavaScript').should("have.value", '1') 
    cy.get('form').submit()
    .url()
    .should('contain', 'http://localhost:8080/dashboard/bookmarks')
    });
});
