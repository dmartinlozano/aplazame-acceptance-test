Feature: Home in demo of Aplazame
  As an user
  In order to check the home page
  I want to be able to check all elements

  Scenario: Home is available
    Given I open home page
    Then I should see home page

  Scenario: Different prices for a article.
    Given I see "Retail" button how selected
    When The price of the article is "29,00€"
    And The minium fee is "2,23"
    And I select Set button
    And The price of the article is "43,50€"
    And The minium fee is "3,35"
    And I select Unboxed button
    And The price of the article is "23,20€"
    Then The minium fee is "1,78"

  Scenario: Different amounts of an article update the terms of the deferred payment.
    Given I select Unboxed button
    And The amount of the article is "1"
    And The minium fee is "1,78"
    When I select plus button
    And The amount of the article is "2"
    And The minium fee is "3,57"
    And I select plus button
    And The amount of the article is "3"
    And The minium fee is "5,35"
    And I select minus button
    And The amount of the article is "2"
    And The minium fee is "3,57"

  Scenario: The fee payment is the same in fee payment
    Given I select Unboxed button
    When I put "1" in the amount of the article
    And The minium fee is "1,78"
    And I select show info button
    And I should see fee payment modal
    And I should see the minium fee "1,78" in fee payment
    And I close fee feePayment modal
    And I shouldn't see fee payment modal
    Then I should see home page
