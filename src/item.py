from src import driver


class Item:
    """
    Represents a single item to check the stock on.
    @author: Jared Barrow
    """
    def __init__(self, url=''):
        self.url = url
        self.element_path = ''
        self.path_index = -1
        self.driver = driver.Driver()

    def is_in_stock(self):
        self.driver.set_url(self.url)
        stock_text = self.driver.get_element_text(self.element_path)
        self.driver.quit()

        return stock_text == 'In Stock'


class AmazonItem(Item):
    def is_in_stock(self):
        return


class WalmartItem(Item):
    def is_in_stock(self):
        return


class RougeFitnessItem(Item):
    """
    Represents an item from Rogue Fitness to check the stock on.
    @author: Jared Barrow
    """
    def is_in_stock(self):
        self.driver.set_url(self.url)
        stock_text = self.driver.get_element_text_with_tag_name('body')
        self.driver.quit()

        return stock_text != 'Notify Me'

    def indexed_item_is_in_stock(self, index=-1):
        self.driver.set_url(self.url)
        stock_text = self.driver.get_element_with_index(
            self.element_path, index)
        self.driver.quit()

        return stock_text != 'Notify Me'



