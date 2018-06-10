Feature: Order conditions in demo of Aplazame
  As an user
  In order to check the order conditions modal
  I want to be able to check all elements

  Scenario: Order modal is available
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    Then I should see order modal

  Scenario: Instalments conditions
    Given I should see "12 meses" instalments
    When I select instalments button
    And I should see instalments modal
    And I select "4 meses" instalment
    And I shouldn't see instalments modal
    And I should see order modal
    And I should see "4 meses" instalments
    Then I should see Total span

  Scenario: Payday conditions
    Given I select payDay payButton
    When I should see payDay modal
    And I select "18" how payDay
    And I shouldn't see payDay modal
    And I should see order modal
    And I should see "día 18" payDay
