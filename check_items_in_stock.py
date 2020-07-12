import json
from src import item, message_sender
# Read in config data: item url, user phone number.
with open('config/item_check_config.json', 'r') as config_file:
    config_data = json.load(config_file)["config_data"]
    item_url = config_data['url']
    user_number = config_data['user_phone_number']
    sid = config_data['account_sid']
    token = config_data['auth_token']

# Create an item for that url.
barbell = item.Item(item_url)

# Check if the item is in stock, if so, send a text to User.
if barbell.is_in_stock():
    sender = message_sender.MessageSender(user_number, sid, token)
    sender.message = 'Barbell in stock!'
    sender.send_text()