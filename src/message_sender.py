from twilio.rest import Client


class MessageSender:
    def __init__(self, phone_number='', sid='', token=''):
        self.user_number = phone_number
        self.account_sid = sid
        self.auth_token = token
        self.message = ''
        self.src_number = '+14092481235'

    def send_text(self):
        client = Client(self.account_sid, self.auth_token)
        client.messages.create(self.message,
                               self.src_number,
                               self.user_number)
