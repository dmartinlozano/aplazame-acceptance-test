Feature: Order payment in demo of Aplazame
  As an user
  In order to check the order payment modal
  I want to be able to check all elements

  Scenario: Payment ok
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "39576184S" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
#    TODO: The credit card is stored in demo mode !!!
#    And I should see new credit card
#    And I put "4111 1111 1111 1111" in credit card input
#    And I put "11 / 20" in expired date input
#    And I put "555" in cvv input
    And I should see a previous credit card with "VISA    ••••    1111        11/20"
    And I should see a previous credit card with "VISA    ••••    1881        11/23"
    And I select "VISA    ••••    1111        11/20" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "Pedido completado" in payment modal
    And I should see the text "Hemos recibido correctamente el pago de tu entrada y tu solicitud de financiación ha sido aprobada. ¡Disfruta de tu compra!" in payment modal
    And I should see the text "Antes de que te vayas necesitamos verificar tu identidad" in payment modal

  Scenario: Payment ko: without funds
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "39576184S" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
    And I should see a previous credit card with "VISA    ••••    1111        11/20"
    And I should see a previous credit card with "VISA    ••••    1881        11/23"
    And I select "VISA    ••••    1881        11/23" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "¡No hemos podido terminar de tramitar tu financiación!" in payment modal
    And I should see the text "Tu banco ha denegado el cobro del pago inicial en tu tarjeta." in payment modal

  Scenario: Payment ko: Reported in a solvency file
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "99999999R" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
    And I should see a previous credit card with "VISA    ••••    1111        12/18"
    And I select "VISA    ••••    1111        12/18" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "¡Lo sentimos! No podemos aprobar tu petición de financiación para esta compra." in payment modal
    And I should see the text "Hemos comprobado tus antecedentes crediticios y estás reportado en un fichero de solvencia por incumplimiento en algún pago. Vuelve a la tienda y selecciona otro método de pago para finalizar la compra." in payment modal

  Scenario: Payment ko: Exceeded the maximum amount of credit granted
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "99999996K" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
    And I should see a previous credit card with "VISA    ••••    1111        11/20"
    And I select "VISA    ••••    1111        11/20" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "¡Lo sentimos!" in payment modal
    And I should see the text "No podemos aprobar tu solicitud de financiación para esta compra. Has superado la cantidad máxima de crédito disponible en Aplazame. A medida que vayas reduciendo el saldo pendiente de pago del resto de financiaciones que tienes con nosotros, podrás volver a comprar con Aplazame." in payment modal

  Scenario: Payment ko: Does not exceed the admission criteria of Aplazame
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "99999998T" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
    And I should see a previous credit card with "VISA    ••••    1111        11/20"
    And I select "VISA    ••••    1111        11/20" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "¡Lo sentimos!" in payment modal
    And I should see the text "No podemos aprobar tu petición de financiación para esta compra. Tu solicitud no cumple los criterios de admisión de crédito de Aplazame. Vuelve a la tienda y selecciona otro método de pago para finalizar tu compra." in payment modal


  Scenario: Payment ko: Have outstanding defaults
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "99999997E" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
    And I should see a previous credit card with "VISA    ••••    1111        11/20"
    And I select "VISA    ••••    1111        11/20" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "¡Lo sentimos!" in payment modal
    And I should see the text "No podemos aprobar tu solicitud de financiación para esta compra. Tienes impagos pendientes con Aplazame que es urgente que regularices cuanto antes." in payment modal


  Scenario: Payment ko: You must upload your ID at checkout
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "99999995C" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
    And I should see a previous credit card with "VISA    ••••    1111        11/20"
    And I select "VISA    ••••    1111        11/20" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "Para terminar de tramitar tu solicitud de crédito necesitamos que nos adjuntes tu DNI o NIE por ambas caras.Estamos validando la documentación que nos has adjuntado para terminar de tramitar tu solicitud de crédito con Aplazame." in payment modal

  Scenario: Payment ko: Confirmation error with shop, rejected
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "99999993H" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
    And I should see a previous credit card with "VISA    ••••    1111        1/20"
    And I select "VISA    ••••    1111        1/20" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "¡Lo sentimos!" in payment modal
    And I should see the text "Hemos intentado confirmar tu pedido con la tienda pero ésta lo ha cancelado. Hemos anulado tu solicitud de financiación para que, si lo deseas, puedas volver a la tienda y repetir tu compra." in payment modal


  Scenario: Payment ko: Confirmation with shop fails in all attempts
    Given I open home page
    And I should see home page
    And I select payment button
    And I should see order page
    And I should see order modal
    And I select Continue button
    And I should see personal info
    When I put "99999994L" in nif input
    And I put "612345678" in mobile input
    And I put "29/10/1981" in birthdate input
    And I put "Plaza Puerta del Sol, 1, Madrid" in address input
    And I put "4 2 A" in floor input
    And I select I read privacy policy if available
    And I sould see Continue button wihtout loading data
    And I should see a previous credit card with "VISA    ••••    1111        12/20"
    And I select "VISA    ••••    1111        12/20" credit card
    And I select Continue button
    And I should see sms code input
    And I put the sms code input equals sandbox label
    And I select Continue button
    And I should see result payment modal
    Then I should see the text "¡Lo sentimos!" in payment modal
    And I should see the text "Hemos intentado confirmar tu pedido con la tienda pero éste no ha podido procesarse. Hemos cancelado tu solicitud de financiación para que, si lo deseas, puedas volver a la tienda y repetir tu compra." in payment modal
