import src.driver as driver
import unittest
import selenium.webdriver as webdriver
import selenium.webdriver.remote.webelement as webelement


class TestDriver(unittest.TestCase):
    """
    Unit testing for the Driver class.
    @author: Jared Barrow
    """

    def setUp(self):
        self.test_driver = driver.Driver()
        self.test_driver.set_url('https://www.amazon.com/Learn-Selenium'
                                 '-data-driven-frameworks-applications/'
                                 'dp/183898304X/ref=sr_1_2_sspa?dchild'
                                 '=1&keywords=selenium+book&qid=1594045'
                                 '454&sr=8-2-spons&psc=1&spLa=ZW5jcnlw'
                                 'dGVkUXVhbGlmaWVyPUEyNTVLOVdMSEhMR1E3'
                                 'JmVuY3J5cHRlZElkPUEwMjQxMjMxMjM1MDZR'
                                 'OTlTNDNUJmVuY3J5cHRlZEFkSWQ9QTEwMTA2'
                                 'MDIyTVZYM1EzM0RKUk5QJndpZGdldE5hbWU9c'
                                 '3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0J'
                                 'mRvTm90TG9nQ2xpY2s9dHJ1ZQ==')

    def tearDown(self):
        self.test_driver.quit()

    def test_module_creation(self):
        """
        desc: Tests that the driver class has loaded properly.
        """

    def test_set_up_options(self):
        """
        desc: Tests the method that sets the options for the Driver.
        """

    def test_get_element_text(self):
        """
        desc: Tests the method that retrieves an element's text.
        """

    def test_get_element(self):
        """
        desc: Tests the method that retrieves an element.
        TODO: Figure out a way to test whether the correct element was 
        received.
        """

    def test_get_element_with_index(self):
        """
        desc: Tests the method that retrieves an element also using that
        element's index in the list of elements.
        """
        return

    def test_set_url(self):
        """
        desc: Test the method that sets the url for the driver to pull
        elements from.
        """
        return

    def test_quit(self):
        """
        desc: Test the Driver quit method.
        """
        return