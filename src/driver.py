from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver


class Driver:
    """
    Encapsulates the Chrome WebDriver.
    @author: Jared Barrow
    """
    def __init__(self):
        self.options = self.set_up_options()
        self.__driver = webdriver.Chrome(
            ChromeDriverManager().install(),
            options=self.options)

    def set_up_options(self):
        options = webdriver.ChromeOptions()
        options.add_argument(
            'headless')  # enable headless browser navigation
        options.add_argument('window-size=1920x1080')  # set window size
        options.add_argument('disable-gpu')
        options.add_argument("--disable-notifications")
        options.add_argument('--no-sandbox')
        options.add_argument('--verbose')
        return options

    def get_element_text(self,  xpath='') -> str:
        element = self.get_element(xpath)
        return element.text

    def get_element(self, xpath='') -> property:
        return self.__driver.find_element_by_xpath(xpath)

    def get_element_with_index(self, xpath='', index=-1):
        return self.__driver.find_element_by_xpath(xpath)[index]

    def set_url(self, url=''):
        self.__driver.get(url)

    def quit(self):
        self.__driver.quit()
