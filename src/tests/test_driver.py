import src.driver as driver
import unittest 


class TestDriver(unittest.TestCase):
    """
    Unit testing for the Driver class.
    @author: Jared Barrow
    """
    def test_module_creation(self):
        """
        desc: Tests that the driver class has loaded properly.
        """
        test_driver = driver.Driver()
        test_driver_loaded_properly = \
            'Driver' == test_driver.__class__.__name__
        self.assertTrue(test_driver_loaded_properly)
