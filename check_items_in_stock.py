from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from twilio.rest import Client


def main():
    # Set up the driver.
    options_for_driver = webdriver.ChromeOptions()
    options_for_driver.add_argument('headless')
    options_for_driver.add_argument('window-size=1920x1080')
    options_for_driver.add_argument('disable-gpu')
    options_for_driver.add_argument('--disable-notifications')
    options_for_driver.add_argument('--no-sandbox')
    options_for_driver.add_argument('--verbose')
    driver = webdriver.Chrome(
        ChromeDriverManager().install(),
        options=options_for_driver)
    # Get the target element from the webpage.
    driver.get('https://www.amazon.com/Black-Bolshevik-Autobiography-Afro-American-1978-05-01/dp/B01A0CJAVC/ref=sr_1_1?crid=2XJXQ1QNLPS3M&dchild=1&keywords=black+bolshevik&qid=1592509830&sprefix=black+bolshe%2Caps%2C144&sr=8-1')
    while True:
        title_element = driver.find_element_by_xpath('//*[@id="productTitle"]')
        price_element = driver.find_element_by_xpath('//*[@id="a-autoid-5-announce"]/span[2]/span')
        # Send me a text of the target element text.
        twilio_account_sid = 'AC689de5b35796caebd1b5879f24dab121'
        twilio_auth_token = 'eb39b928334ce13dcb03176452baa017'
        client = Client(twilio_account_sid, twilio_auth_token)


        price = float(price_element.text[1:])
        title = title_element.text
        if price < 100.00:
            message = 'The price dropped for ' + title + '! It is now $' + str(price) + '.'
            client.messages \
                .create(
                body=message,
                from_='+12513330449',
                to='17573748140'
            )
        else:
            print('Book still too expensive.')

    driver.close()


main()